
import { Song, Album, Playlist, Artist } from './types';

export const SONGS: Song[] = [
  {
    id: '1',
    title: 'Starboy',
    artist: 'The Weeknd',
    album: 'Starboy',
    cover: 'https://picsum.photos/seed/starboy/400/400',
    duration: 230,
    artistId: 'weeknd',
    albumId: 'starboy_album',
    lyrics: ['我试着让你陷入最糟的情绪, ah', 'P1 比你的礼拜鞋还要干净, ah', '仪表盘上显示着 1.2, ah', '像罗德曼一样在篮板球前准备就绪, ah']
  },
  {
    id: '2',
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    cover: 'https://picsum.photos/seed/blinding/400/400',
    duration: 200,
    artistId: 'weeknd',
    albumId: 'after_hours',
    lyrics: ['我一直试着打电话', '我已经独自待得够久了', '也许你可以教我如何去爱, 也许', '我正经历着戒断反应']
  },
  {
    id: '3',
    title: 'Cruel Summer',
    artist: 'Taylor Swift',
    album: 'Lover',
    cover: 'https://picsum.photos/seed/lover/400/400',
    duration: 178,
    artistId: 'taylor',
    albumId: 'lover_album'
  },
  {
    id: '4',
    title: 'Fortnight',
    artist: 'Taylor Swift',
    album: 'The Tortured Poets Department',
    cover: 'https://picsum.photos/seed/poets/400/400',
    duration: 228,
    artistId: 'taylor',
    albumId: 'ttpd'
  },
  {
    id: '5',
    title: 'Birds of a Feather',
    artist: 'Billie Eilish',
    album: 'HIT ME HARD AND SOFT',
    cover: 'https://picsum.photos/seed/billie/400/400',
    duration: 210,
    artistId: 'billie',
    albumId: 'hmhas'
  }
];

export const ARTISTS: Artist[] = [
  {
    id: 'weeknd',
    name: 'The Weeknd',
    image: 'https://picsum.photos/seed/weeknd_pfp/600/600',
    bio: 'Abel Makkonen Tesfaye，艺名 The Weeknd，是一位加拿大创作型歌手和演员。',
    topSongs: SONGS.slice(0, 2),
    albums: []
  },
  {
    id: 'taylor',
    name: 'Taylor Swift',
    image: 'https://picsum.photos/seed/taylor_pfp/600/600',
    bio: 'Taylor Alison Swift 是一位美国创作型歌手。',
    topSongs: SONGS.slice(2, 4),
    albums: []
  }
];

export const PLAYLISTS: Playlist[] = [
  {
    id: 'today_hits',
    name: '今日热门',
    description: '当下全球最热门的歌曲。',
    cover: 'https://picsum.photos/seed/hits/500/500',
    songs: SONGS,
    isSystem: true
  },
  {
    id: 'new_music',
    name: '每日新歌',
    description: '每日更新的潮流新曲。',
    cover: 'https://picsum.photos/seed/daily/500/500',
    songs: [SONGS[4], SONGS[0], SONGS[3]],
    isSystem: true
  }
];
