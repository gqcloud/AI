/**
 * Player Component
 * 底部播放器组件
 */

import React, { useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
} from 'lucide-react';
import { usePlayerStore } from '../../store';

const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playbackMode,
    likedSongs,
    togglePlay,
    next,
    previous,
    setVolume,
    toggleMute,
    setPlaybackMode,
    toggleLike,
  } = usePlayerStore();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isLiked = currentSong ? likedSongs.has(currentSong.id) : false;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    if (audioRef.current && duration) {
      const newTime = (percentage / 100) * duration;
      audioRef.current.currentTime = newTime / 1000;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handlePlaybackModeClick = () => {
    const modes = ['normal', 'shuffle', 'repeat'] as const;
    const currentIndex = modes.indexOf(playbackMode as any);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setPlaybackMode(nextMode as any);
  };

  if (!currentSong) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-white/10 flex items-center justify-center">
        <p className="text-white/40 text-lg">选择歌曲开始播放</p>
      </div>
    );
  }

  return (
    <>
      <audio ref={audioRef} />

      <div className="fixed bottom-0 left-0 right-0 h-24 glass border-t border-white/10 flex items-center px-8 gap-8">
        {/* 歌曲信息 */}
        <div className="flex items-center gap-4 w-80 flex-shrink-0">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-16 h-16 rounded-xl shadow-lg object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold truncate text-white text-base mb-1">
              {currentSong.title}
            </h4>
            <p className="text-sm text-white/60 truncate">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={() => currentSong && toggleLike(currentSong.id)}
            className={`p-2.5 rounded-2xl transition-all duration-200 ${
              isLiked
                ? 'text-pink-500'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} strokeWidth={2.5} />
          </button>
        </div>

        {/* 播放控制 */}
        <div className="flex-1 flex flex-col items-center gap-3 max-w-2xl">
          <div className="flex items-center gap-5">
            <button
              onClick={handlePlaybackModeClick}
              className={`p-2.5 rounded-2xl transition-all duration-200 ${
                playbackMode !== 'normal'
                  ? 'text-pink-500'
                  : 'text-white/40 hover:text-white/70'
              }`}
            >
              {playbackMode === 'shuffle' ? (
                <Shuffle size={20} strokeWidth={2.5} />
              ) : (
                <Repeat size={20} strokeWidth={2.5} />
              )}
            </button>
            <button
              onClick={previous}
              className="p-2.5 rounded-2xl text-white hover:text-white/80 transition-all duration-200"
            >
              <SkipBack size={22} strokeWidth={2.5} />
            </button>
            <button
              onClick={togglePlay}
              className="p-4 rounded-full bg-white text-black hover:scale-105 transition-all duration-200 shadow-xl shadow-white/20"
            >
              {isPlaying ? (
                <Pause size={24} className="fill-current" />
              ) : (
                <Play size={24} className="fill-current ml-0.5" strokeWidth={3} />
              )}
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded-2xl text-white hover:text-white/80 transition-all duration-200"
            >
              <SkipForward size={22} strokeWidth={2.5} />
            </button>
          </div>

          <div className="w-full flex items-center gap-4">
            <span className="text-xs text-white/40 w-12 text-right font-medium tabular-nums">
              {Math.floor(currentTime / 60000)}:{Math.floor((currentTime % 60000) / 1000).toString().padStart(2, '0')}
            </span>
            <div
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-white/10 rounded-full cursor-pointer relative group"
            >
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all group-hover:bg-pink-500"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <span className="text-xs text-white/40 w-12 font-medium tabular-nums">
              {Math.floor(duration / 60000)}:{Math.floor((duration % 60000) / 1000).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 音量 */}
        <div className="flex items-center gap-3 w-48 flex-shrink-0 justify-end">
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-2xl text-white/40 hover:text-white/70 transition-all duration-200"
          >
            {isMuted ? (
              <VolumeX size={20} strokeWidth={2.5} />
            ) : (
              <Volume2 size={20} strokeWidth={2.5} />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-28 h-1 bg-white/10 rounded-full cursor-pointer appearance-none"
          />
        </div>
      </div>
    </>
  );
};

export default Player;
