
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Settings from './pages/Settings';
import Community from './pages/Community';
import MiniPlayer from './components/MiniPlayer';
import PlayerOverlay from './components/PlayerOverlay';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PlayerProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/community" element={<Community />} />
            <Route path="/library" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <MiniPlayer />
        <PlayerOverlay />
      </PlayerProvider>
    </ThemeProvider>
  );
};

export default App;
