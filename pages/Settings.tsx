
import React from 'react';
import { ChevronRight, LogOut, Shield, Wifi, Music2, Globe, Sparkles } from 'lucide-react';

const Settings: React.FC = () => {
  const sections = [
    {
      title: '订阅',
      items: [
        { label: '管理订阅', icon: Sparkles, color: 'text-rose-500' },
        { label: '兑换礼品卡', icon: Music2, color: 'text-blue-500' },
      ]
    },
    {
      title: '偏好设置',
      items: [
        { label: '音频质量', icon: Wifi, value: '高解析度无损' },
        { label: '语言', icon: Globe, value: '简体中文' },
        { label: '隐私与安全', icon: Shield },
      ]
    }
  ];

  return (
    <div className="p-6 md:p-10 pb-40 space-y-10">
      <header className="flex flex-col items-center gap-4 pt-10">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 p-1">
          <img src="https://picsum.photos/seed/user/200/200" className="w-full h-full rounded-full object-cover border-4 border-black" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold">John Appleseed</h2>
          <p className="text-rose-500 font-medium text-sm">Apple Music 个人订阅</p>
        </div>
      </header>

      <div className="space-y-8 max-w-2xl mx-auto">
        {sections.map(section => (
          <div key={section.title} className="space-y-3">
            <h3 className="px-4 text-[10px] uppercase font-bold text-white/40 tracking-widest">{section.title}</h3>
            <div className="bg-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
              {section.items.map(item => (
                <button key={item.label} className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
                  <div className="flex items-center gap-3">
                    {item.icon && <item.icon size={20} className={item.color || 'text-white/60'} />}
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-sm text-white/40">{item.value}</span>}
                    <ChevronRight size={16} className="text-white/20 group-hover:text-white transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <button className="w-full flex items-center justify-center gap-2 p-4 bg-white/5 text-rose-500 rounded-2xl hover:bg-rose-500/10 transition-colors font-bold">
          <LogOut size={20} /> 退出登录
        </button>
        
        <p className="text-center text-[10px] text-white/20 font-bold uppercase tracking-widest">版本 4.5.0 (2938)</p>
      </div>
    </div>
  );
};

export default Settings;
