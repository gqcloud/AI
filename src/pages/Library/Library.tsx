/**
 * Library Page
 * 资料库页面
 */

import React from 'react';
import AlbumCard from '../../components/common/AlbumCard';
import { useDataStore, usePlayerStore } from '../../store';
import { Album } from '../../types';

const Library: React.FC = () => {
  const { albums, playlists } = useDataStore();
  const { setQueue } = usePlayerStore();

  const handlePlayAlbum = (album: Album) => {
    setQueue(album.songs, 0);
  };

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-bold">资料库</h1>

      {/* 我的专辑 */}
      <section>
        <h2 className="text-xl font-bold mb-4">我的专辑</h2>
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

      {/* 我的播放列表 */}
      <section>
        <h2 className="text-xl font-bold mb-4">我的播放列表</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square mb-3 overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {playlist.coverArt ? (
                  <img
                    src={playlist.coverArt}
                    alt={playlist.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center">
                    <span className="text-6xl">🎵</span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h4 className="font-medium truncate mb-1 group-hover:text-accent transition-colors">
                  {playlist.title}
                </h4>
                <p className="text-sm text-text-secondary truncate">
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
