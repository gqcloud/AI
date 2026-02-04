
import React, { useState } from 'react';
import { Search as SearchIcon, X, TrendingUp } from 'lucide-react';
import { SONGS, ARTISTS } from '../mockData';
import { usePlayer } from '../context/PlayerContext';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const { playSong } = usePlayer();

  const filteredSongs = SONGS.filter(s =>
    s.title.toLowerCase().includes(query.toLowerCase()) ||
    s.artist.toLowerCase().includes(query.toLowerCase())
  );

  const filteredArtists = ARTISTS.filter(a =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const categories = ['另类', '电子', '爵士', '流行', '说唱', '摇滚', '古典', '节奏布鲁斯'];

  return (
    <div className="p-6 md:p-10 pb-40 space-y-8">
      <h1 className="text-3xl font-bold">搜索</h1>
      
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="艺人、歌曲、歌词及更多"
          className="w-full bg-white/10 border border-white/5 rounded-xl py-3 pl-12 pr-12 text-white placeholder-white/30 focus:bg-white/15 transition-all"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
            <X size={20} />
          </button>
        )}
      </div>

      {!query ? (
        <div className="space-y-10">
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={20} className="text-rose-500" /> 热门搜索
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Taylor Swift', 'The Weeknd', '夏日心情', '最新单曲', 'Billie Eilish'].map(item => (
                <button
                  key={item}
                  onClick={() => setQuery(item)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4">浏览类别</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <div
                  key={cat}
                  className="h-28 rounded-xl p-4 flex items-end relative overflow-hidden cursor-pointer group"
                  style={{ backgroundColor: `hsl(${i * 40}, 60%, 40%)` }}
                >
                  <span className="font-bold relative z-10">{cat}</span>
                  <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredArtists.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-white/60">艺人</h3>
              <div className="flex gap-6 overflow-x-auto pb-4">
                {filteredArtists.map(artist => (
                  <div key={artist.id} className="flex-shrink-0 w-32 flex flex-col items-center text-center group cursor-pointer">
                    <img src={artist.image} className="w-32 h-32 rounded-full object-cover mb-2 shadow-lg group-hover:brightness-110 transition-all" />
                    <span className="text-sm font-bold truncate w-full">{artist.name}</span>
                    <span className="text-[10px] uppercase text-gray-500 font-black">艺人</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-lg font-bold mb-4 text-white/60">歌曲</h3>
            <div className="space-y-2">
              {filteredSongs.map(song => (
                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 cursor-pointer group"
                >
                  <img src={song.cover} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm truncate">{song.title}</h4>
                    <p className="text-xs text-gray-500 truncate">{song.artist}</p>
                  </div>
                </div>
              ))}
              {filteredSongs.length === 0 && (
                <p className="text-center text-white/40 py-10">未找到与“{query}”相关的结果</p>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Search;
