
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const MiniPlayer: React.FC = () => {
  const { currentSong, isPlaying, togglePlay, nextSong, setFullPlayerOpen, progress } = usePlayer();

  if (!currentSong) return null;

  return (
    <div className="fixed bottom-[88px] md:bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-4xl z-[60]">
      <motion.div
        layoutId="mini-player"
        onClick={() => setFullPlayerOpen(true)}
        className="glass rounded-xl p-2 flex items-center gap-3 border border-white/10 shadow-2xl cursor-pointer"
      >
        <div className="relative h-12 w-12 flex-shrink-0">
           <img
            src={currentSong.cover}
            alt={currentSong.title}
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <div className="flex-1 min-w-0 pr-4">
          <h4 className="text-sm font-bold text-white truncate">{currentSong.title}</h4>
          <p className="text-xs text-white/50 truncate font-medium">{currentSong.artist}</p>
        </div>

        <div className="flex items-center gap-4 px-2">
          <button
            onClick={(e) => { e.stopPropagation(); togglePlay(); }}
            className="text-white hover:text-rose-500 transition-colors"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSong(); }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <SkipForward size={24} fill="currentColor" />
          </button>
        </div>

        {/* Mini progress line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full overflow-hidden bg-white/5 mx-2 mb-1">
          <motion.div
            className="h-full bg-rose-500"
            style={{ width: `${(progress / currentSong.duration) * 100}%` }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MiniPlayer;
