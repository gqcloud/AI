/**
 * Library Page
 * 资料库页面
 */

import React from 'react';
import AlbumCard from '../../components/common/AlbumCard';
import { useDataStore, usePlayerStore } from '../../store';

const Library: React.FC = () => {
  const { albums, playlists } = useDataStore();
  const { setQueue } = usePlayerStore();

  const handlePlayAlbum = (album: any) => {
    setQueue(album.songs, 0);
  };

  return (
    <div className="p-8 space-y-12 animate-fadeIn">
      <h1 className="text-5xl font-bold tracking-tight">资料库</h1>

      {/* 我的专辑 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white/90">我的专辑</h2>
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

      {/* 我的播放列表 */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-white/90">我的播放列表</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-neutral-800">
                {playlist.coverArt ? (
                  <img
                    src={playlist.coverArt}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center">
                    <span className="text-6xl">🎵</span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-semibold truncate text-white/90 text-base mb-1 group-hover:text-pink-500 transition-colors leading-tight">
                  {playlist.title}
                </h4>
                <p className="text-sm text-white/50 truncate leading-tight">
                  {playlist.songCount} 首歌曲
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Library;
