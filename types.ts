
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number; // in seconds
  lyrics?: string[];
  artistId: string;
  albumId: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  cover: string;
  year: number;
  songs: Song[];
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  cover: string;
  songs: Song[];
  isSystem?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  topSongs: Song[];
  albums: Album[];
}
