
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Added Disc to the imports from lucide-react
import { ChevronDown, Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, ListMusic, Mic2, Share2, MoreHorizontal, Disc } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const PlayerOverlay: React.FC = () => {
  const { currentSong, isPlaying, progress, volume, setVolume, togglePlay, nextSong, prevSong, setFullPlayerOpen, isFullPlayerOpen } = usePlayer();
  const [activeTab, setActiveTab] = useState<'cover' | 'lyrics'>('cover');

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isFullPlayerOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-primary backdrop-blur-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="p-6 flex justify-between items-center z-10">
            <button onClick={() => setFullPlayerOpen(false)} className="p-2 bg-card rounded-full text-secondary">
              <ChevronDown size={24} />
            </button>
            <div className="flex-1 text-center">
              <p className="text-[10px] uppercase tracking-widest text-tertiary font-bold mb-1">正在播放专辑</p>
              <p className="text-sm font-semibold text-secondary truncate max-w-[200px] mx-auto">{currentSong.album}</p>
            </div>
            <button className="p-2 bg-card rounded-full text-secondary">
              <MoreHorizontal size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md aspect-square relative group">
              {activeTab === 'cover' ? (
                <motion.img
                  layoutId="player-album-art"
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className="w-full h-full object-cover rounded-2xl shadow-theme"
                  animate={{ scale: isPlaying ? 1 : 0.85 }}
                  transition={{ type: 'spring', damping: 20 }}
                />
              ) : (
                <div className="h-full w-full flex flex-col text-left overflow-y-auto px-4 py-8 space-y-8 mask-fade">
                  {currentSong.lyrics?.map((line, i) => (
                    <p key={i} className={`text-2xl font-bold transition-all duration-300 ${i === Math.floor(progress / 10) % (currentSong.lyrics?.length || 1) ? 'text-primary scale-105' : 'text-tertiary'}`}>
                      {line}
                    </p>
                  )) || <p className="text-tertiary">暂无歌词。</p>}
                </div>
              )}
            </div>

            <div className="w-full max-w-md mt-12 space-y-6">
              <div className="flex justify-between items-end">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-bold truncate leading-tight text-primary">{currentSong.title}</h2>
                  <p className="text-rose-500 font-medium truncate">{currentSong.artist}</p>
                </div>
                <div className="flex gap-4 items-center">
                   <button className="text-secondary hover:text-primary"><Share2 size={20}/></button>
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="relative h-1.5 w-full bg-card rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-secondary"
                    style={{ width: `${(progress / currentSong.duration) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-bold text-tertiary">
                  <span>{formatTime(progress)}</span>
                  <span>-{formatTime(currentSong.duration - progress)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center px-4">
                <button className="text-tertiary hover:text-rose-500"><Shuffle size={20} /></button>
                <div className="flex items-center gap-10">
                  <button onClick={prevSong} className="text-primary transform transition-transform hover:scale-110 active:scale-90">
                    <SkipBack size={36} fill="currentColor" />
                  </button>
                  <button onClick={togglePlay} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center transform transition-transform hover:scale-105 active:scale-95 shadow-xl">
                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                  </button>
                  <button onClick={nextSong} className="text-primary transform transition-transform hover:scale-110 active:scale-90">
                    <SkipForward size={36} fill="currentColor" />
                  </button>
                </div>
                <button className="text-tertiary hover:text-rose-500"><Repeat size={20} /></button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-4 pt-4 text-tertiary">
                <Volume2 size={16} />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="flex-1 h-1 bg-card rounded-full appearance-none accent-white cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Footer Options */}
          <div className="p-10 flex justify-center items-center gap-16 text-tertiary safe-bottom">
            <button onClick={() => setActiveTab('lyrics')} className={`transition-colors ${activeTab === 'lyrics' ? 'text-primary' : 'hover:text-primary'}`}>
              <Mic2 size={22} />
            </button>
            <button onClick={() => setActiveTab('cover')} className={`transition-colors ${activeTab === 'cover' ? 'text-primary' : 'hover:text-primary'}`}>
              <Disc size={22} />
            </button>
            <button className="hover:text-primary">
              <ListMusic size={22} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PlayerOverlay;
