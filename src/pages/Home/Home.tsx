/**
 * Home Page
 * 首页
 */

import React from 'react';
import { usePlayerStore, useDataStore } from '../../store';
import AlbumCard from '../../components/common/AlbumCard';
import { Album } from '../../types';

const Home: React.FC = () => {
  const { albums, playlists } = useDataStore();
  const { setQueue } = usePlayerStore();

  const handlePlayAlbum = (album: Album) => {
    setQueue(album.songs, 0);
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent to-accent-hover p-12">
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">精选推荐</h2>
          <p className="text-lg opacity-90">为你精心挑选的音乐</p>
        </div>
      </div>

      {/* Featured Albums */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">热门专辑</h2>
          <button className="text-accent hover:underline font-medium">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">为你推荐</h2>
          <button className="text-accent hover:underline font-medium">
            查看全部
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
