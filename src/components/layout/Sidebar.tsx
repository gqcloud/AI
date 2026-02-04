/**
 * Sidebar Component
 * 侧边栏组件
 */

import React from 'react';
import { Home, Radio, Disc, Library } from 'lucide-react';
import { useUIStore, usePlayerStore, Song } from '../../store';

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

  const handleSongClick = (song: Song) => {
    play(song);
    addRecentPlayed(song);
  };

  return (
    <aside className="w-64 bg-primary-light border-r border-border flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Music</h1>
      </div>

      <nav className="px-3 mb-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent text-white'
                  : 'text-text-secondary hover:bg-primary-lighter hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1 px-6 overflow-y-auto">
        <h3 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-3">
          最近播放
        </h3>
        <div className="space-y-2">
          {recentPlayed.slice(0, 10).map((song) => (
            <button
              key={song.id}
              onClick={() => handleSongClick(song)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-primary-lighter transition-all group"
            >
              <img
                src={song.coverArt}
                alt={song.title}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1 min-w-0 text-left">
                <h4 className="text-sm font-medium truncate">{song.title}</h4>
                <p className="text-xs text-text-secondary truncate">{song.artist}</p>
              </div>
            </button>
          ))}
          {recentPlayed.length === 0 && (
            <p className="text-sm text-text-tertiary">暂无最近播放</p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
