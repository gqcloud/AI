import { Comment } from '../types';

const COMMENTS_KEY = 'music_comments';

export const getComments = (): Comment[] => {
  try {
    const stored = localStorage.getItem(COMMENTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const getCommentsBySongId = (songId: string): Comment[] => {
  return getComments().filter(c => c.songId === songId);
};

export const saveComment = (comment: Comment): void => {
  const comments = getComments();
  comments.unshift(comment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

export const deleteComment = (commentId: string): void => {
  const comments = getComments().filter(c => c.id !== commentId);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

export const likeComment = (commentId: string): void => {
  const comments = getComments().map(c => {
    if (c.id === commentId) {
      return { ...c, likes: c.likes + 1 };
    }
    return c;
  });
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

export const getUserComments = (userId: string): Comment[] => {
  return getComments().filter(c => c.userId === userId);
};
