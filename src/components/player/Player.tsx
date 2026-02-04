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
  ListMusic,
} from 'lucide-react';
import { usePlayerStore } from '../../store';
import { formatTime, usePlayer } from '../../hooks';

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

  const { handleSeek } = usePlayer(audioRef.current);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const isLiked = currentSong ? likedSongs.has(currentSong.id) : false;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    handleSeek(percentage);
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
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface backdrop-blur-lg border-t border-border flex items-center justify-center">
        <p className="text-text-tertiary">选择歌曲开始播放</p>
      </div>
    );
  }

  return (
    <>
      {/* 音频元素 */}
      <audio ref={audioRef} />

      {/* 播放器栏 */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface backdrop-blur-lg border-t border-border flex items-center px-6 gap-6">
        {/* 歌曲信息 */}
        <div className="flex items-center gap-4 w-80">
          <img
            src={currentSong.coverArt}
            alt={currentSong.title}
            className="w-14 h-14 rounded object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate">{currentSong.title}</h4>
            <p className="text-sm text-text-secondary truncate">
              {currentSong.artist}
            </p>
          </div>
          <button
            onClick={() => currentSong && toggleLike(currentSong.id)}
            className={`p-2 rounded transition-colors ${
              isLiked
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Heart size={20} className={isLiked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* 播放控制 */}
        <div className="flex-1 flex flex-col items-center gap-2">
          {/* 控制按钮 */}
          <div className="flex items-center gap-4">
            <button
              onClick={handlePlaybackModeClick}
              className={`p-2 rounded transition-colors ${
                playbackMode !== 'normal'
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {playbackMode === 'shuffle' ? (
                <Shuffle size={18} />
              ) : (
                <Repeat size={18} />
              )}
            </button>
            <button
              onClick={previous}
              className="p-2 rounded text-text-primary hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 rounded-full bg-white text-primary hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-1" />
              )}
            </button>
            <button
              onClick={next}
              className="p-2 rounded text-text-primary hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* 进度条 */}
          <div className="w-full flex items-center gap-3">
            <span className="text-xs text-text-secondary w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <div
              onClick={handleProgressClick}
              className="flex-1 h-1 bg-primary-lighter rounded-full cursor-pointer relative group"
            >
              <div
                className="absolute top-0 left-0 h-full bg-white rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progress}%`, transform: 'translate(-50%, -50%)' }}
              />
            </div>
            <span className="text-xs text-text-secondary w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* 音量和其他 */}
        <div className="flex items-center gap-4 w-48 justify-end">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="p-2 rounded text-text-secondary hover:text-text-primary transition-colors"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 accent-white"
            />
          </div>
          {/* <button className="p-2 rounded text-text-secondary hover:text-text-primary transition-colors">
            <ListMusic size={18} />
          </button> */}
        </div>
      </div>
    </>
  );
};

export default Player;
