/**
 * App Component
 * 主应用组件
 */

import React from 'react';
import { useUIStore } from './store';
import Sidebar from './components/layout/Sidebar';
import Player from './components/player/Player';
import Home from './pages/Home/Home';
import Browse from './pages/Browse/Browse';
import Library from './pages/Library/Library';

const App: React.FC = () => {
  const { currentPage } = useUIStore();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'browse':
        return <Browse />;
      case 'library':
        return <Library />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto pb-20 bg-gradient-to-b from-black to-neutral-900">
          {renderPage()}
        </main>
      </div>
      <Player />
    </div>
  );
};

export default App;
