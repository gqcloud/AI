
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Song } from '../types';
import { SONGS } from '../mockData';

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Song[];
  isFullPlayerOpen: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  nextSong: () => void;
  prevSong: () => void;
  setVolume: (v: number) => void;
  setProgress: (p: number) => void;
  setFullPlayerOpen: (open: boolean) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (id: string) => void;
  setQueue: (songs: Song[]) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [queue, setQueue] = useState<Song[]>(SONGS);
  const [isFullPlayerOpen, setFullPlayerOpen] = useState(false);
  
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && currentSong) {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= currentSong.duration) {
            nextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, currentSong]);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setProgress(0);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextSong = () => {
    if (!currentSong) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    const nextIdx = (idx + 1) % queue.length;
    setCurrentSong(queue[nextIdx]);
    setProgress(0);
  };

  const prevSong = () => {
    if (!currentSong) return;
    const idx = queue.findIndex(s => s.id === currentSong.id);
    const prevIdx = (idx - 1 + queue.length) % queue.length;
    setCurrentSong(queue[prevIdx]);
    setProgress(0);
  };

  const addToQueue = (song: Song) => setQueue([...queue, song]);
  const removeFromQueue = (id: string) => setQueue(queue.filter(s => s.id !== id));

  return (
    <PlayerContext.Provider value={{
      currentSong, isPlaying, progress, volume, queue, isFullPlayerOpen,
      playSong, togglePlay, nextSong, prevSong, setVolume, setProgress,
      setFullPlayerOpen, addToQueue, removeFromQueue, setQueue
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error("usePlayer must be used within PlayerProvider");
  return context;
};
