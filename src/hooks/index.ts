/**
 * Custom React Hooks
 * 可复用的逻辑封装
 */

import { useEffect, useRef, useState } from 'react';
import { usePlayerStore } from '../store';

// ==================== 播放器 Hook ====================

/**
 * 格式化时间（毫秒 -> MM:SS）
 */
export function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

/**
 * 播放器 Hook
 * 管理音频播放和时间更新
 */
export function usePlayer(audioElement: HTMLAudioElement | null) {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    next,
  } = usePlayerStore();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!audioElement) return;

    // 设置音量
    audioElement.volume = isMuted ? 0 : volume / 100;

    // 播放/暂停
    if (isPlaying) {
      audioElement.play().catch(console.error);
    } else {
      audioElement.pause();
    }
  }, [isPlaying, volume, isMuted, audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    // 更新当前歌曲
    if (currentSong) {
      audioElement.src = currentSong.audioUrl;
      audioElement.load();
      setIsReady(true);
    }
  }, [currentSong, audioElement]);

  useEffect(() => {
    if (!audioElement) return;

    const updateTime = () => {
      if (audioElement.duration && audioElement.currentTime) {
        usePlayerStore.setState({
          currentTime: audioElement.currentTime * 1000,
          duration: audioElement.duration * 1000,
        });
      }
    };

    const handleEnded = () => {
      next();
    };

    audioElement.addEventListener('timeupdate', updateTime);
    audioElement.addEventListener('ended', handleEnded);

    return () => {
      audioElement.removeEventListener('timeupdate', updateTime);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, [audioElement, next]);

  const handleSeek = (progress: number) => {
    if (!audioElement || !duration) return;
    const newTime = (progress / 100) * duration;
    audioElement.currentTime = newTime / 1000;
    seek(newTime);
  };

  return {
    isReady,
    handleSeek,
  };
}

// ==================== 本地存储 Hook ====================

/**
 * 本地存储 Hook
 * 自动同步到 localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// ==================== 防抖 Hook ====================

/**
 * 防抖 Hook
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ==================== 点击外部 Hook ====================

/**
 * 点击外部 Hook
 * 用于关闭弹窗、下拉菜单等
 */
export function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

// ==================== 媒体查询 Hook ====================

/**
 * 媒体查询 Hook
 * 用于响应式设计
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}

// ==================== 滚动位置 Hook ====================

/**
 * 滚动位置 Hook
 */
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener('scroll', updatePosition);
    };
  }, []);

  return scrollPosition;
}

// ==================== 键盘快捷键 Hook ====================

/**
 * 键盘快捷键 Hook
 */
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const action = shortcuts[key];

      if (action && !(event.target instanceof HTMLInputElement)) {
        event.preventDefault();
        action();
      }
    };

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [shortcuts]);
}

// ==================== 复制到剪贴板 Hook ====================

/**
 * 复制到剪贴板 Hook
 */
export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return { isCopied, copy };
}
