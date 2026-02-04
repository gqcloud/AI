/**
 * AlbumCard Component
 * 专辑卡片组件
 */

import React from 'react';
import { Play } from 'lucide-react';
import { Album } from '../../types';

interface AlbumCardProps {
  album: Album;
  onPlay?: (album: Album) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay }) => {
  const handlePlay = () => {
    onPlay?.(album);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-all duration-300">
        <img
          src={album.coverArt}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-2 right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 transform shadow-lg"
        >
          <Play size={24} className="fill-current ml-1" />
        </button>
      </div>
      <div className="min-w-0">
        <h4 className="font-medium truncate mb-1 group-hover:text-accent transition-colors">
          {album.title}
        </h4>
        <p className="text-sm text-text-secondary truncate">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
