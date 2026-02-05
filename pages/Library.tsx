
import React from 'react';
import { Heart, Download, Clock, User, ChevronRight } from 'lucide-react';
import { PLAYLISTS } from '../mockData';

const Library: React.FC = () => {
  const librarySections = [
    { label: '最近播放', icon: Clock, color: 'text-blue-500' },
    { label: '个人收藏', icon: Heart, color: 'text-rose-500' },
    { label: '下载', icon: Download, color: 'text-green-500' },
    { label: '艺人', icon: User, color: 'text-purple-500' },
  ];

  return (
    <div className="p-6 md:p-10 pb-40 space-y-10">
      <h1 className="text-3xl font-bold text-primary">资料库</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {librarySections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.label}
              className="flex items-center justify-between p-4 bg-card rounded-xl hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg bg-card ${section.color}`}>
                  <Icon size={24} />
                </div>
                <span className="font-bold text-primary">{section.label}</span>
              </div>
              <ChevronRight size={20} className="text-tertiary" />
            </button>
          );
        })}
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-primary">歌单</h3>
          <button className="text-rose-500 text-sm font-semibold">新建歌单</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 shadow-lg">
                <img src={playlist.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <h4 className="font-bold text-sm truncate text-primary">{playlist.name}</h4>
              <p className="text-xs text-tertiary truncate">歌单</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;
