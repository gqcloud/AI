
import React from 'react';
import { SONGS, PLAYLISTS } from '../mockData';
import { usePlayer } from '../context/PlayerContext';
import { Play } from 'lucide-react';

const Home: React.FC = () => {
  const { playSong } = usePlayer();

  return (
    <div className="p-6 md:p-10 space-y-10 pb-40">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">现在就听</h1>
        <p className="text-gray-400 font-medium">今日为你推荐</p>
      </header>

      {/* Hero Section */}
      <section className="relative h-64 md:h-80 w-full rounded-2xl overflow-hidden group">
        <img
          src="https://picsum.photos/seed/hero/1200/400"
          className="absolute inset-0 w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
          <span className="text-[10px] uppercase font-black tracking-widest text-rose-500 mb-2">编辑精选</span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">流行乐精选</h2>
          <p className="text-white/60 max-w-lg mb-6 line-clamp-2">聆听定义当下潮流的旋律，汇聚你最爱艺人的大热单曲。</p>
          <button className="w-fit px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-white/90 transition-colors">
            <Play size={18} fill="currentColor" /> 立即播放
          </button>
        </div>
      </section>

      {/* Featured Playlists */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold tracking-tight">推荐歌单</h3>
          <button className="text-rose-500 text-sm font-semibold hover:underline">查看全部</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {PLAYLISTS.map((playlist) => (
            <div key={playlist.id} className="group cursor-pointer">
              <div className="aspect-square rounded-xl overflow-hidden mb-3 relative shadow-lg">
                <img src={playlist.cover} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Play size={40} className="text-white fill-white" />
                </div>
              </div>
              <h4 className="font-bold text-sm truncate">{playlist.name}</h4>
              <p className="text-xs text-gray-500 truncate">{playlist.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold tracking-tight">新歌速递</h3>
          <button className="text-rose-500 text-sm font-semibold hover:underline">查看全部</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
          {SONGS.map((song) => (
            <div
              key={song.id}
              onClick={() => playSong(song)}
              className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group"
            >
              <img src={song.cover} className="w-16 h-16 rounded-lg object-cover shadow-md" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate group-hover:text-rose-500 transition-colors">{song.title}</h4>
                <p className="text-xs text-gray-500 truncate font-medium">{song.artist}</p>
              </div>
              <button className="p-2 text-white/0 group-hover:text-rose-500 transition-colors">
                <Play size={20} fill="currentColor" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
