import React, { useState, useEffect } from 'react';
import { Comment } from '../types';
import { getCommentsBySongId, saveComment, likeComment, deleteComment } from '../utils/storage';
import { Heart, Send, Trash2, User } from 'lucide-react';

interface CommentSectionProps {
  songId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ songId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState(() => localStorage.getItem('music_username') || '匿名用户');

  useEffect(() => {
    setComments(getCommentsBySongId(songId));
  }, [songId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      songId,
      userId: localStorage.getItem('music_userid') || Date.now().toString(),
      userName,
      content: newComment.trim(),
      createdAt: new Date().toISOString(),
      likes: 0
    };

    saveComment(comment);
    setComments(getCommentsBySongId(songId));
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    likeComment(commentId);
    setComments(getCommentsBySongId(songId));
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('确定要删除这条评论吗？')) {
      deleteComment(commentId);
      setComments(getCommentsBySongId(songId));
    }
  };

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

  const currentUserId = localStorage.getItem('music_userid') || '';

  return (
    <div className="space-y-6">
      <div className="glass rounded-xl p-4 space-y-4">
        <h4 className="font-bold text-lg">评论 {comments.length}</h4>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
              <User size={20} className="text-rose-500" />
            </div>
            <input
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
                localStorage.setItem('music_username', e.target.value);
              }}
              placeholder="输入你的昵称"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你的想法..."
              rows={2}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-rose-500 transition-colors resize-none"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <p>暂无评论，快来抢沙发~</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <div>
                    <span className="font-medium text-sm">{comment.userName}</span>
                    <span className="text-gray-500 text-xs ml-2">{formatTime(comment.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Heart size={16} className={comment.likes > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                    <span className="text-xs">{comment.likes}</span>
                  </button>
                  {comment.userId === currentUserId && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-gray-300 text-sm pl-11">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
