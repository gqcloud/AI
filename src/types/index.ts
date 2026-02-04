/**
 * OpenSpec - API 接口定义
 * 音乐应用的核心数据结构
 */

// ==================== 核心实体 ====================

/** 歌曲信息 */
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  albumId: string;
  duration: number; // 毫秒
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
  duration: number; // 总时长（毫秒）
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

/** 艺术家 */
export interface Artist {
  id: string;
  name: string;
  image?: string;
  bio?: string;
  followerCount: number;
  albums: Album[];
  popularSongs: Song[];
  genres: string[];
}

/** 音乐分类 */
export interface Category {
  id: string;
  name: string;
  icon?: string;
  description: string;
  color: string;
}

// ==================== 播放器状态 ====================

/** 播放状态 */
export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  playbackMode: PlaybackMode;
  queue: Song[];
  currentIndex: number;
  history: Song[];
}

/** 播放模式 */
export enum PlaybackMode {
  /** 顺序播放 */
  NORMAL = 'normal',
  /** 单曲循环 */
  SINGLE = 'single',
  /** 随机播放 */
  SHUFFLE = 'shuffle',
  /** 列表循环 */
  REPEAT = 'repeat',
}

// ==================== API 响应 ====================

/** 通用 API 响应 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/** 分页响应 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==================== 搜索和过滤 ====================

/** 搜索结果 */
export interface SearchResult {
  songs: Song[];
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
}

/** 排序选项 */
export enum SortOption {
  RECENT = 'recent',
  POPULAR = 'popular',
  ALPHABETICAL = 'alphabetical',
  DURATION = 'duration',
}

/** 过滤条件 */
export interface FilterOptions {
  genre?: string;
  year?: {
    from?: number;
    to?: number;
  };
  minDuration?: number;
  maxDuration?: number;
}
