/**
 * 简单的测试页面
 */

import React from 'react';

const TestApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-primary text-white p-8">
      <h1 className="text-4xl font-bold mb-4">测试页面</h1>
      <p className="text-xl">如果你能看到这个页面，说明 React 正常工作了！</p>
    </div>
  );
};

export default TestApp;
