
import React from 'react';
import { Product } from '../types';
import { translations } from '../translations';

interface StoreItemProps {
  product: Product;
  lang: 'ar' | 'en';
}

const StoreItem: React.FC<StoreItemProps> = ({ product, lang }) => {
  const t = translations[lang];

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all p-4 group">
      <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
        <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-stone-800`}>
          {product.format}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-stone-800 mb-2">{product.name}</h3>
      <p className="text-stone-500 text-sm mb-6 line-clamp-2">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-2xl font-black text-orange-600">${product.price}</span>
        <button className="bg-stone-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors shadow-lg active:scale-95">
          {t.buyNow}
        </button>
      </div>
    </div>
  );
};

export default StoreItem;
