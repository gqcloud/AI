/**
 * Zustand Store - 全局状态管理
 * 播放器状态、用户状态等
 */

import { create } from 'zustand';
import { Song, PlaybackMode } from '../types';
import { mockSongs, mockAlbums, mockPlaylists } from '../api';

// ==================== 播放器 Store ====================

interface PlayerStore {
  // 播放状态
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackMode: PlaybackMode;
  queue: Song[];
  currentIndex: number;
  history: Song[];

  // 播放列表
  playlist: Song[];

  // 喜欢的歌曲
  likedSongs: Set<string>;

  // 最近播放
  recentPlayed: Song[];

  // Actions
  play: (song: Song) => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlaybackMode: (mode: PlaybackMode) => void;
  setQueue: (songs: Song[], startIndex?: number) => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  toggleLike: (songId: string) => void;
  addRecentPlayed: (song: Song) => void;

  // 获取下一首歌曲
  getNextSong: () => Song | null;
  // 获取上一首歌曲
  getPreviousSong: () => Song | null;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // 初始状态
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 80,
  isMuted: false,
  playbackMode: PlaybackMode.NORMAL,
  queue: [],
  currentIndex: -1,
  history: [],
  playlist: mockSongs,
  likedSongs: new Set(['2']), // 模拟已喜欢的歌曲
  recentPlayed: [],

  // 播放歌曲
  play: (song: Song) => {
    set((state) => ({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      duration: song.duration,
      history: [song, ...state.history.slice(0, 19)], // 保持最近20首
    }));
  },

  // 暂停
  pause: () => set({ isPlaying: false }),

  // 切换播放/暂停
  togglePlay: () => {
    const { currentSong, isPlaying } = get();
    if (currentSong) {
      set({ isPlaying: !isPlaying });
    }
  },

  // 下一首
  next: () => {
    const { currentIndex, queue, playbackMode, getNextSong } = get();

    if (playbackMode === PlaybackMode.SHUFFLE) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      const nextSong = queue[randomIndex];
      if (nextSong) {
        get().play(nextSong);
        set({ currentIndex: randomIndex });
      }
      return;
    }

    if (currentIndex < queue.length - 1) {
      const nextSong = queue[currentIndex + 1];
      if (nextSong) {
        get().play(nextSong);
        set({ currentIndex: currentIndex + 1 });
      }
    } else if (playbackMode === PlaybackMode.REPEAT) {
      const firstSong = queue[0];
      if (firstSong) {
        get().play(firstSong);
        set({ currentIndex: 0 });
      }
    }
  },

  // 上一首
  previous: () => {
    const { currentIndex, queue, currentTime } = get();

    // 如果播放超过3秒，则重新播放当前歌曲
    if (currentTime > 3000) {
      set({ currentTime: 0 });
      return;
    }

    if (currentIndex > 0) {
      const prevSong = queue[currentIndex - 1];
      if (prevSong) {
        get().play(prevSong);
        set({ currentIndex: currentIndex - 1 });
      }
    } else {
      // 在第一首歌时，跳到最后一首
      const lastSong = queue[queue.length - 1];
      if (lastSong) {
        get().play(lastSong);
        set({ currentIndex: queue.length - 1 });
      }
    }
  },

  // 跳转
  seek: (time: number) => set({ currentTime: time }),

  // 设置音量
  setVolume: (volume: number) => set({ volume, isMuted: volume === 0 }),

  // 切换静音
  toggleMute: () => {
    const { volume, isMuted } = get();
    if (isMuted) {
      set({ isMuted: false });
    } else {
      set({ isMuted: true });
    }
  },

  // 设置播放模式
  setPlaybackMode: (mode: PlaybackMode) => set({ playbackMode: mode }),

  // 设置播放队列
  setQueue: (songs: Song[], startIndex = 0) => {
    const song = songs[startIndex];
    set({
      queue: songs,
      currentIndex: startIndex,
    });
    if (song) {
      get().play(song);
    }
  },

  // 添加到队列
  addToQueue: (song: Song) => {
    set((state) => ({
      queue: [...state.queue, song],
    }));
  },

  // 从队列移除
  removeFromQueue: (index: number) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index),
      currentIndex: state.currentIndex > index ? state.currentIndex - 1 : state.currentIndex,
    }));
  },

  // 清空队列
  clearQueue: () => set({ queue: [], currentIndex: -1, currentSong: null, isPlaying: false }),

  // 切换喜欢状态
  toggleLike: (songId: string) => {
    set((state) => {
      const likedSongs = new Set(state.likedSongs);
      if (likedSongs.has(songId)) {
        likedSongs.delete(songId);
      } else {
        likedSongs.add(songId);
      }
      return { likedSongs };
    });

    // 更新当前歌曲的喜欢状态
    set((state) => {
      if (state.currentSong?.id === songId) {
        return {
          currentSong: { ...state.currentSong, liked: !state.currentSong.liked },
        };
      }
      return {};
    });
  },

  // 添加到最近播放
  addRecentPlayed: (song: Song) => {
    set((state) => {
      // 移除已存在的，然后添加到开头
      const filtered = state.recentPlayed.filter((s) => s.id !== song.id);
      return {
        recentPlayed: [song, ...filtered.slice(0, 19)],
      };
    });
  },

  // 获取下一首
  getNextSong: () => {
    const { currentIndex, queue, playbackMode } = get();

    if (queue.length === 0) return null;

    if (playbackMode === PlaybackMode.SHUFFLE) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      return queue[randomIndex];
    }

    if (currentIndex < queue.length - 1) {
      return queue[currentIndex + 1];
    }

    if (playbackMode === PlaybackMode.REPEAT) {
      return queue[0];
    }

    return null;
  },

  // 获取上一首
  getPreviousSong: () => {
    const { currentIndex, queue } = get();

    if (queue.length === 0) return null;

    if (currentIndex > 0) {
      return queue[currentIndex - 1];
    }

    return queue[queue.length - 1];
  },
}));

// ==================== UI Store ====================

interface UIStore {
  // 侧边栏状态
  sidebarOpen: boolean;

  // 当前页面
  currentPage: 'home' | 'browse' | 'library';

  // 播放列表抽屉
  queueDrawerOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setCurrentPage: (page: 'home' | 'browse' | 'library') => void;
  toggleQueueDrawer: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  currentPage: 'home',
  queueDrawerOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setCurrentPage: (page) => set({ currentPage: page }),

  toggleQueueDrawer: () => set((state) => ({ queueDrawerOpen: !state.queueDrawerOpen })),
}));

// ==================== Data Store ====================

interface DataStore {
  albums: typeof mockAlbums;
  playlists: typeof mockPlaylists;
  artists: typeof mockSongs;

  // Actions
  setAlbums: (albums: typeof mockAlbums) => void;
  setPlaylists: (playlists: typeof mockPlaylists) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  albums: mockAlbums,
  playlists: mockPlaylists,
  artists: mockSongs,

  setAlbums: (albums) => set({ albums }),
  setPlaylists: (playlists) => set({ playlists }),
}));
