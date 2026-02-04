/**
 * AlbumCard Component
 * 专辑卡片组件
 */

import React from 'react';
import { Play } from 'lucide-react';

interface AlbumCardProps {
  album: any;
  onPlay?: (album: any) => void;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ album, onPlay }) => {
  const handlePlay = () => {
    onPlay?.(album);
  };

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square mb-4 overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 bg-neutral-800">
        <img
          src={album.coverArt}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={handlePlay}
          className="absolute bottom-3 right-3 w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 shadow-lg shadow-pink-600/40"
        >
          <Play size={28} className="fill-current ml-1 text-white" strokeWidth={3} />
        </button>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      <div className="min-w-0">
        <h4 className="font-semibold truncate text-white/90 text-base mb-1 group-hover:text-pink-500 transition-colors leading-tight">
          {album.title}
        </h4>
        <p className="text-sm text-white/50 truncate leading-tight">
          {album.artist}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;
