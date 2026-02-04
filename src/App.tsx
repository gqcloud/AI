/**
 * App Component - 使用 store 版本
 */

import React from 'react';
import { useUIStore } from './store';
import Sidebar from './components/layout/Sidebar';

const App: React.FC = () => {
  console.log('App component rendering...');
  const { currentPage } = useUIStore();

  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <h1 className="text-2xl font-bold mb-4">Store 版本测试</h1>
      <p className="text-lg mb-4">当前页面: {currentPage}</p>
      <Sidebar />
    </div>
  );
};

export default App;
