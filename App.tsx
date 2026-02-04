
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Settings from './pages/Settings';
import MiniPlayer from './components/MiniPlayer';
import PlayerOverlay from './components/PlayerOverlay';

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/library" element={<Library />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
      <MiniPlayer />
      <PlayerOverlay />
    </PlayerProvider>
  );
};

export default App;
