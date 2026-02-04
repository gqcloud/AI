/**
 * Zustand Store - 全局状态管理
 * 播放器状态、用户状态等
 */

import { create } from 'zustand';

// ==================== 类型定义 ====================

/** 歌曲信息 */
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: number;
  coverArt: string;
  audioUrl: string;
  releaseDate?: string;
  genre?: string[];
  liked: boolean;
  playCount: number;
}

/** 专辑信息 */
export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverArt: string;
  releaseDate: string;
  genre: string[];
  songs: Song[];
  duration: number;
  songCount: number;
}

/** 播放列表/歌单 */
export interface Playlist {
  id: string;
  title: string;
  description?: string;
  coverArt?: string;
  songIds: string[];
  songCount: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
}

/** 播放模式 */
export enum PlaybackMode {
  NORMAL = 'normal',
  SINGLE = 'single',
  SHUFFLE = 'shuffle',
  REPEAT = 'repeat',
}

// ==================== Mock 数据 ====================

const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    album: '÷ (Divide)',
    albumId: 'album-1',
    duration: 234000,
    coverArt: 'https://picsum.photos/300/300?random=1',
    audioUrl: '',
    releaseDate: '2017-01-06',
    genre: ['Pop'],
    liked: false,
    playCount: 2500000000,
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    albumId: 'album-2',
    duration: 200000,
    coverArt: 'https://picsum.photos/300/300?random=2',
    audioUrl: '',
    releaseDate: '2020-03-20',
    genre: ['Synth-pop', 'R&B'],
    liked: true,
    playCount: 3400000000,
  },
  {
    id: '3',
    title: 'Dance Monkey',
    artist: 'Tones and I',
    album: 'The Kids Are Coming',
    albumId: 'album-3',
    duration: 210000,
    coverArt: 'https://picsum.photos/300/300?random=3',
    audioUrl: '',
    releaseDate: '2019-05-10',
    genre: ['Electropop'],
    liked: false,
    playCount: 1900000000,
  },
];

const mockAlbums: Album[] = [
  {
    id: 'album-1',
    title: '÷ (Divide)',
    artist: 'Ed Sheeran',
    artistId: 'artist-1',
    coverArt: 'https://picsum.photos/300/300?random=4',
    releaseDate: '2017-01-06',
    genre: ['Pop', 'Hip-hop'],
    songs: mockSongs.slice(0, 1),
    duration: 234000,
    songCount: 12,
  },
  {
    id: 'album-2',
    title: 'After Hours',
    artist: 'The Weeknd',
    artistId: 'artist-2',
    coverArt: 'https://picsum.photos/300/300?random=5',
    releaseDate: '2020-03-20',
    genre: ['Synth-pop', 'R&B'],
    songs: mockSongs.slice(1, 2),
    duration: 200000,
    songCount: 14,
  },
];

const mockPlaylists: Playlist[] = [
  {
    id: 'playlist-1',
    title: '今日推荐',
    description: '根据你的喜好推荐的歌曲',
    coverArt: 'https://picsum.photos/300/300?random=6',
    songIds: ['1', '2', '3'],
    songCount: 30,
    duration: 3600000,
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-04T00:00:00Z',
    liked: true,
  },
];

// ==================== 播放器 Store ====================

interface PlayerStore {
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
  playlist: Song[];
  likedSongs: Set<string>;
  recentPlayed: Song[];
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
  getNextSong: () => Song | null;
  getPreviousSong: () => Song | null;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
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
  likedSongs: new Set(['2']),
  recentPlayed: [],

  play: (song: Song) => {
    set((state) => ({
      currentSong: song,
      isPlaying: true,
      currentTime: 0,
      duration: song.duration,
      history: [song, ...state.history.slice(0, 19)],
    }));
  },

  pause: () => set({ isPlaying: false }),

  togglePlay: () => {
    const { currentSong, isPlaying } = get();
    if (currentSong) {
      set({ isPlaying: !isPlaying });
    }
  },

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

  previous: () => {
    const { currentIndex, queue, currentTime } = get();

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
      const lastSong = queue[queue.length - 1];
      if (lastSong) {
        get().play(lastSong);
        set({ currentIndex: queue.length - 1 });
      }
    }
  },

  seek: (time: number) => set({ currentTime: time }),

  setVolume: (volume: number) => set({ volume, isMuted: volume === 0 }),

  toggleMute: () => {
    const { volume, isMuted } = get();
    if (isMuted) {
      set({ isMuted: false });
    } else {
      set({ isMuted: true });
    }
  },

  setPlaybackMode: (mode: PlaybackMode) => set({ playbackMode: mode }),

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

  addToQueue: (song: Song) => {
    set((state) => ({
      queue: [...state.queue, song],
    }));
  },

  removeFromQueue: (index: number) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index),
      currentIndex: state.currentIndex > index ? state.currentIndex - 1 : state.currentIndex,
    }));
  },

  clearQueue: () => set({ queue: [], currentIndex: -1, currentSong: null, isPlaying: false }),

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

    set((state) => {
      if (state.currentSong?.id === songId) {
        return {
          currentSong: { ...state.currentSong, liked: !state.currentSong.liked },
        };
      }
      return {};
    });
  },

  addRecentPlayed: (song: Song) => {
    set((state) => {
      const filtered = state.recentPlayed.filter((s) => s.id !== song.id);
      return {
        recentPlayed: [song, ...filtered.slice(0, 19)],
      };
    });
  },

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
  sidebarOpen: boolean;
  currentPage: 'home' | 'browse' | 'library';
  queueDrawerOpen: boolean;
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
  albums: Album[];
  playlists: Playlist[];
  songs: Song[];
  setAlbums: (albums: Album[]) => void;
  setPlaylists: (playlists: Playlist[]) => void;
}

export const useDataStore = create<DataStore>((set) => ({
  albums: mockAlbums,
  playlists: mockPlaylists,
  songs: mockSongs,

  setAlbums: (albums) => set({ albums }),
  setPlaylists: (playlists) => set({ playlists }),
}));
