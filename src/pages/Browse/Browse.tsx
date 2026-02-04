/**
 * Browse Page
 * 浏览页面
 */

import React from 'react';
import { mockCategories } from '../../api';
import { Category } from '../../types';

const Browse: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <h1 className="text-4xl font-bold">浏览</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <button
      className="relative rounded-xl overflow-hidden p-8 text-left transition-all hover:-translate-y-1 hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${category.color}, ${category.color}b3)`,
      }}
    >
      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
      <p className="text-sm opacity-90">{category.description}</p>
    </button>
  );
};

export default Browse;
