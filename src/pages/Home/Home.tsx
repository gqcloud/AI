/**
 * Home Page
 * 首页
 */

import React from 'react';
import { usePlayerStore, useDataStore } from '../../store';
import AlbumCard from '../../components/common/AlbumCard';

const Home: React.FC = () => {
  const { albums } = useDataStore();
  const { setQueue } = usePlayerStore();

  const handlePlayAlbum = (album: any) => {
    setQueue(album.songs, 0);
  };

  return (
    <div className="p-8 space-y-12 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-3xl overflow-hidden p-16 bg-gradient-to-br from-pink-600 via-pink-500 to-pink-600 shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-5xl font-bold mb-3 tracking-tight">
            精选推荐
          </h2>
          <p className="text-xl text-white/90 font-medium">
            为你精心挑选的音乐
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>

      {/* Featured Albums */}
      <section className="animate-scaleIn" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">热门专辑</h2>
          <button className="text-pink-500 hover:text-pink-400 font-semibold text-lg transition-colors">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {albums.map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onPlay={handlePlayAlbum}
            />
          ))}
        </div>
      </section>

      {/* For You */}
      <section className="animate-scaleIn" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">为你推荐</h2>
          <button className="text-pink-500 hover:text-pink-400 font-semibold text-lg transition-colors">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {albums.slice().reverse().map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onPlay={handlePlayAlbum}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
