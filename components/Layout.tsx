
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, Settings, Disc } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: '现在就听', icon: Home, path: '/' },
    { label: '搜索', icon: Search, path: '/search' },
    { label: '资料库', icon: Library, path: '/library' },
    { label: '设置', icon: Settings, path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 glass border-r border-white/10 p-6 space-y-8 z-20">
        <div className="flex items-center gap-3 px-2 mb-4">
          <Disc className="text-rose-500" size={32} />
          <span className="text-xl font-bold tracking-tight">Music</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive ? 'bg-rose-500 text-white' : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col overflow-hidden pb-24 md:pb-0">
        <div className="flex-1 overflow-y-auto scroll-smooth">
          {children}
        </div>
      </main>

      {/* Bottom Nav - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 px-6 pt-3 pb-8 flex justify-between items-center z-40 safe-bottom">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 transition-colors duration-200 ${
                isActive ? 'text-rose-500' : 'text-gray-400'
              }`}
            >
              <Icon size={24} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
