/**
 * Browse Page
 * 浏览页面
 */

import React from 'react';
import { mockCategories } from '../../api';

const Browse: React.FC = () => {
  return (
    <div className="p-8 space-y-12 animate-fadeIn">
      <h1 className="text-4xl font-bold tracking-tight mb-2">浏览</h1>
      <p className="text-lg text-white/60 mb-8">探索你喜欢的音乐风格</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

interface CategoryCardProps {
  category: any;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <button className="relative group cursor-pointer overflow-hidden rounded-3xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div
        className="absolute inset-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `linear-gradient(135deg, ${category.color}, ${category.color}cc)`,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-2 tracking-tight">{category.name}</h3>
        <p className="text-base text-white/80">{category.description}</p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </button>
  );
};

export default Browse;
