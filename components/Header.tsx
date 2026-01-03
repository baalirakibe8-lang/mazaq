
import React, { useState } from 'react';
import { translations } from '../translations';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  lang: 'ar' | 'en';
  onToggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, lang, onToggleLang }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { name: t.home, id: 'home' },
    { name: t.recipes, id: 'recipes' },
    { name: t.chefs, id: 'chefs' },
    { name: t.videos, id: 'videos' },
    { name: t.store, id: 'store' },
    { name: t.blog, id: 'blog' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-11 h-11 bg-stone-900 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl group-hover:bg-orange-600 transition-all duration-500 group-hover:rotate-6">
            {t.brand[0]}
          </div>
          <span className="text-2xl font-bold font-serif-ar text-stone-800 tracking-tight">{t.brand}</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-extrabold transition-all relative py-2 group ${
                  isActive ? 'text-orange-600' : 'text-stone-500 hover:text-orange-600'
                }`}
              >
                {item.name}
                <span 
                  className={`absolute bottom-0 h-[3px] rounded-full transition-all duration-300 ease-out ${
                    lang === 'ar' ? 'right-0' : 'left-0'
                  } ${
                    isActive 
                      ? 'w-full bg-orange-600 shadow-[0_2px_8px_rgba(234,88,12,0.4)]' 
                      : 'w-0 bg-orange-300 group-hover:w-full opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={onToggleLang}
            className="text-sm font-black text-stone-600 hover:text-orange-600 px-3 py-1 border border-stone-200 rounded-lg transition-all"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
          <button 
            onClick={() => onNavigate('chef-dashboard')} 
            className="bg-stone-900 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            <span>{t.chefEntry}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-stone-600 p-2 hover:bg-stone-50 rounded-xl transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100 py-6 absolute w-full left-0 shadow-2xl animate-fade-in overflow-hidden">
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button 
                  key={item.id} 
                  onClick={() => { onNavigate(item.id); setIsMenuOpen(false); }} 
                  className={`text-lg font-bold transition-all ${
                    isActive ? 'text-orange-600 scale-110' : 'text-stone-600'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <div className="w-full px-12 pt-4 border-t border-stone-50 flex flex-col gap-4">
              <button 
                onClick={onToggleLang}
                className="w-full py-4 text-stone-600 font-bold border border-stone-200 rounded-2xl"
              >
                {lang === 'ar' ? 'English' : 'عربي'}
              </button>
              <button 
                onClick={() => { onNavigate('chef-dashboard'); setIsMenuOpen(false); }} 
                className="w-full bg-stone-900 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95"
              >
                {t.chefEntry}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
