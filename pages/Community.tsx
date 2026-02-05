import React, { useState, useEffect } from 'react';
import { Comment } from '../types';
import { getComments } from '../utils/storage';
import { SONGS } from '../mockData';
import { Heart, MessageCircle, Music, Search, TrendingUp, User } from 'lucide-react';

const Community: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'popular'>('all');

  useEffect(() => {
    setComments(getComments());
  }, []);

  const getSongById = (songId: string) => {
    return SONGS.find(s => s.id === songId);
  };

  const filteredComments = comments
    .filter(comment => {
      const song = getSongById(comment.songId);
      const searchLower = searchTerm.toLowerCase();
      return (
        comment.userName.toLowerCase().includes(searchLower) ||
        comment.content.toLowerCase().includes(searchLower) ||
        song?.title.toLowerCase().includes(searchLower) ||
        song?.artist.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      if (filter === 'popular') {
        return b.likes - a.likes;
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return '刚刚';
    if (diffMins < 60) return `${diffMins}分钟前`;
    if (diffHours < 24) return `${diffHours}小时前`;
    if (diffDays < 7) return `${diffDays}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  const groupedComments = filteredComments.reduce((acc, comment) => {
    const songId = comment.songId;
    if (!acc[songId]) {
      acc[songId] = {
        song: getSongById(songId),
        comments: []
      };
    }
    acc[songId].comments.push(comment);
    return acc;
  }, {} as Record<string, { song: typeof SONGS[0] | undefined; comments: Comment[] }>);

  return (
    <div className="p-6 md:p-10 space-y-8 pb-40">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">社区</h1>
        <p className="text-secondary font-medium">发现乐迷们的精彩评论</p>
      </header>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="搜索评论、歌曲或用户..."
            className="w-full bg-card border border-theme rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-rose-500 transition-colors text-primary"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              filter === 'all' ? 'bg-rose-500 text-white' : 'bg-card text-secondary hover:bg-card/80'
            }`}
          >
            <MessageCircle size={18} /> 最新
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2 ${
              filter === 'popular' ? 'bg-rose-500 text-white' : 'bg-card text-secondary hover:bg-card/80'
            }`}
          >
            <TrendingUp size={18} /> 热门
          </button>
        </div>
      </div>

      {filteredComments.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-card flex items-center justify-center">
            <MessageCircle size={40} className="text-tertiary" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-primary">暂无评论</h3>
          <p className="text-tertiary">成为第一个分享想法的人吧！</p>
        </div>
      ) : (
        <div className="space-y-8">
          {(Object.entries(groupedComments) as [string, { song: typeof SONGS[0] | undefined; comments: Comment[] }][]).map(([songId, data]) => (
            <div key={songId} className="space-y-4">
              {data.song && (
                <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-theme">
                  <img src={data.song.cover} alt={data.song.title} className="w-16 h-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-primary">{data.song.title}</h3>
                    <p className="text-secondary text-sm">{data.song.artist}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-rose-500">
                    <Music size={18} />
                    <span className="text-sm font-medium">{data.comments.length} 条评论</span>
                  </div>
                </div>
              )}
              <div className="space-y-3 pl-4 border-l-2 border-theme">
                {data.comments.map((comment) => (
                  <div key={comment.id} className="glass rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                          <User size={18} className="text-rose-500" />
                        </div>
                        <div>
                          <span className="font-medium text-primary">{comment.userName}</span>
                          <span className="text-tertiary text-xs ml-2">{formatTime(comment.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-tertiary">
                        <Heart size={16} className={comment.likes > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                        <span className="text-sm">{comment.likes}</span>
                      </div>
                    </div>
                    <p className="text-secondary pl-13">{comment.content}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;
