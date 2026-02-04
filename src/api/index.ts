/**
 * OpenSpec - API 接口定义
 * 遵循 OpenAPI 3.0 规范风格的接口文档
 */

import {
  ApiResponse,
  PaginatedResponse,
  Song,
  Album,
  Artist,
  Playlist,
  SearchResult,
  FilterOptions,
  SortOption,
  PlaybackMode,
  Category,
} from '../types';

// ==================== Base API Configuration ====================

const API_BASE_URL = '/api/v1';
const API_TIMEOUT = 10000;

// ==================== Auth API ====================

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: 用户登录
 *     description: 使用邮箱或手机号登录
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               account:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 登录成功
 *       401:
 *         description: 认证失败
 */
export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

// ==================== Song API ====================

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: 获取歌曲详情
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回歌曲信息
 */
export async function getSongById(id: string): Promise<ApiResponse<Song>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {} as Song,
  };
}

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: 获取歌曲列表
 *     tags: [Songs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回歌曲列表
 */
export interface GetSongsParams {
  page?: number;
  pageSize?: number;
  genre?: string;
  sort?: SortOption;
}

export async function getSongs(
  params?: GetSongsParams
): Promise<ApiResponse<PaginatedResponse<Song>>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0,
    },
  };
}

// ==================== Album API ====================

/**
 * @swagger
 * /albums/{id}:
 *   get:
 *     summary: 获取专辑详情
 *     tags: [Albums]
 */
export async function getAlbumById(id: string): Promise<ApiResponse<Album>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {} as Album,
  };
}

/**
 * @swagger
 * /albums:
 *   get:
 *     summary: 获取专辑列表
 *     tags: [Albums]
 */
export interface GetAlbumsParams {
  page?: number;
  pageSize?: number;
  genre?: string;
  artistId?: string;
}

export async function getAlbums(
  params?: GetAlbumsParams
): Promise<ApiResponse<PaginatedResponse<Album>>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {
      items: [],
      total: 0,
      page: 1,
      pageSize: 20,
      totalPages: 0,
    },
  };
}

// ==================== Artist API ====================

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: 获取艺术家详情
 *     tags: [Artists]
 */
export async function getArtistById(id: string): Promise<ApiResponse<Artist>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {} as Artist,
  };
}

// ==================== Playlist API ====================

/**
 * @swagger
 * /playlists/{id}:
 *   get:
 *     summary: 获取播放列表详情
 *     tags: [Playlists]
 */
export async function getPlaylistById(id: string): Promise<ApiResponse<Playlist>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {} as Playlist,
  };
}

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: 获取用户的播放列表
 *     tags: [Playlists]
 */
export async function getUserPlaylists(): Promise<ApiResponse<Playlist[]>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: [],
  };
}

/**
 * @swagger
 * /playlists:
 *   post:
 *     summary: 创建播放列表
 *     tags: [Playlists]
 */
export interface CreatePlaylistRequest {
  title: string;
  description?: string;
  songIds: string[];
}

export async function createPlaylist(
  data: CreatePlaylistRequest
): Promise<ApiResponse<Playlist>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {} as Playlist,
  };
}

// ==================== Search API ====================

/**
 * @swagger
 * /search:
 *   get:
 *     summary: 搜索音乐
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, songs, albums, artists, playlists]
 */
export interface SearchParams {
  q: string;
  type?: 'all' | 'songs' | 'albums' | 'artists' | 'playlists';
  page?: number;
  pageSize?: number;
}

export async function search(
  params: SearchParams
): Promise<ApiResponse<SearchResult>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: {
      songs: [],
      albums: [],
      artists: [],
      playlists: [],
    },
  };
}

// ==================== User API ====================

/**
 * @swagger
 * /user/liked/songs:
 *   get:
 *     summary: 获取用户喜欢的歌曲
 *     tags: [User]
 */
export async function getLikedSongs(): Promise<ApiResponse<Song[]>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: [],
  };
}

/**
 * @swagger
 * /user/liked/songs/{id}:
 *   post:
 *     summary: 添加歌曲到喜欢列表
 *     tags: [User]
 */
export async function likeSong(id: string): Promise<ApiResponse<void>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: undefined,
  };
}

/**
 * @swagger
 * /user/liked/songs/{id}:
 *   delete:
 *     summary: 从喜欢列表移除歌曲
 *     tags: [User]
 */
export async function unlikeSong(id: string): Promise<ApiResponse<void>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: undefined,
  };
}

/**
 * @swagger
 * /user/recent:
 *   get:
 *     summary: 获取最近播放
 *     tags: [User]
 */
export async function getRecentPlayed(): Promise<ApiResponse<Song[]>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: [],
  };
}

// ==================== Category API ====================

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: 获取音乐分类
 *     tags: [Categories]
 */
export async function getCategories(): Promise<ApiResponse<Category[]>> {
  // TODO: 实际 API 调用
  return {
    success: true,
    data: [],
  };
}

// ==================== Mock Data ====================

/**
 * Mock 数据 - 用于开发和演示
 * 实际项目中应替换为真实的 API 调用
 */
export const mockSongs: Song[] = [
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

export const mockAlbums: Album[] = [
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

export const mockPlaylists: Playlist[] = [
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

export const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Ed Sheeran',
    image: 'https://picsum.photos/300/300?random=7',
    bio: '英国创作型歌手',
    followerCount: 85000000,
    albums: [mockAlbums[0]],
    popularSongs: [mockSongs[0]],
    genres: ['Pop', 'Hip-hop'],
  },
  {
    id: 'artist-2',
    name: 'The Weeknd',
    image: 'https://picsum.photos/300/300?random=8',
    bio: '加拿大歌手、词曲作者和唱片制作人',
    followerCount: 78000000,
    albums: [mockAlbums[1]],
    popularSongs: [mockSongs[1]],
    genres: ['Synth-pop', 'R&B'],
  },
];

export const mockCategories: Category[] = [
  {
    id: 'category-1',
    name: '流行音乐',
    description: '最受欢迎的流行歌曲',
    color: '#fa2d48',
  },
  {
    id: 'category-2',
    name: '嘻哈',
    description: '精选嘻哈音乐',
    color: '#ff9500',
  },
  {
    id: 'category-3',
    name: '摇滚',
    description: '经典摇滚音乐',
    color: '#007aff',
  },
  {
    id: 'category-4',
    name: '电子',
    description: '电子音乐精选',
    color: '#5856d6',
  },
  {
    id: 'category-5',
    name: '古典',
    description: '古典音乐欣赏',
    color: '#34c759',
  },
  {
    id: 'category-6',
    name: '爵士',
    description: '爵士音乐精选',
    color: '#ffcc00',
  },
];
