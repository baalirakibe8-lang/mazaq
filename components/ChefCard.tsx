
import React from 'react';
import { Author } from '../types';
import { translations } from '../translations';

// Fix: Added lang to ChefCardProps
interface ChefCardProps {
  chef: Author;
  onClick: (id: string) => void;
  lang: 'ar' | 'en';
}

const ChefCard: React.FC<ChefCardProps> = ({ chef, onClick, lang }) => {
  const t = translations[lang];

  return (
    <div 
      onClick={() => onClick(chef.id)}
      className="group bg-white rounded-[2.5rem] p-6 border border-stone-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-stone-50 group-hover:bg-orange-50 transition-colors"></div>
      
      <div className="relative z-10">
        <div className="relative inline-block mb-4">
          <img 
            src={chef.avatar} 
            alt={chef.name} 
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          {chef.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-600 transition-colors">{chef.name}</h3>
        <p className="text-stone-400 text-xs mb-4 font-medium uppercase tracking-widest">{chef.followers?.toLocaleString()} {t.followers}</p>
        <p className="text-stone-500 text-sm line-clamp-2 mb-6 h-10 leading-relaxed italic">"{chef.bio}"</p>
        
        <button className="w-full py-3 rounded-2xl bg-stone-900 text-white font-bold text-sm hover:bg-orange-600 transition-all shadow-md active:scale-95">
          {lang === 'ar' ? 'مشاهدة الملف' : 'View Profile'}
        </button>
      </div>
    </div>
  );
};

export default ChefCard;
