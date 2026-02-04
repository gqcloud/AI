/**
 * Sidebar Component
 * 侧边栏组件
 */

import React from 'react';
import { Home, Radio, Disc, Library, ChevronRight } from 'lucide-react';
import { useUIStore, usePlayerStore } from '../../store';

const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage } = useUIStore();
  const { recentPlayed, play, addRecentPlayed } = usePlayerStore();

  const navItems = [
    {
      id: 'home',
      label: '首页',
      icon: Home,
    },
    {
      id: 'browse',
      label: '浏览',
      icon: Disc,
    },
    {
      id: 'radio',
      label: '电台',
      icon: Radio,
    },
    {
      id: 'library',
      label: '资料库',
      icon: Library,
    },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'radio') {
      return;
    }
    setCurrentPage(id as 'home' | 'browse' | 'library');
  };

  const handleSongClick = (song: any) => {
    play(song);
    addRecentPlayed(song);
  };

  return (
    <aside className="w-72 bg-[#1c1c1e] flex flex-col border-r border-neutral-800">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-3xl font-bold tracking-tight">Music</h1>
      </div>

      {/* Navigation */}
      <nav className="px-4 mb-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 font-medium text-base ${
                isActive
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon size={22} strokeWidth={2.5} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Recently Played */}
      <div className="flex-1 px-6 overflow-y-auto">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">
          最近播放
        </h3>
        <div className="space-y-1.5">
          {recentPlayed.slice(0, 10).map((song: any, index: number) => (
            <button
              key={song.id}
              onClick={() => handleSongClick(song)}
              className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-white/10 transition-all duration-200 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={song.coverArt}
                alt={song.title}
                className="w-11 h-11 rounded-lg object-cover shadow-md group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-sm font-semibold truncate text-white/90 group-hover:text-white transition-colors">
                  {song.title}
                </h4>
                <p className="text-xs text-white/50 truncate mt-0.5">
                  {song.artist}
                </p>
              </div>
            </button>
          ))}
          {recentPlayed.length === 0 && (
            <p className="text-sm text-white/40 py-4">暂无最近播放</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
