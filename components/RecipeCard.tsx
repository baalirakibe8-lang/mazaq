
import React from 'react';
import { Recipe } from '../types';
import { translations } from '../translations';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipeId: string) => void;
  lang: 'ar' | 'en';
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, lang }) => {
  const t = translations[lang];

  const getDifficultyColor = (difficulty: string) => {
    // Basic mapping for difficulty translations
    const diff = difficulty === 'سهل' || difficulty === 'Easy' ? 'easy' :
                 difficulty === 'متوسط' || difficulty === 'Medium' ? 'medium' : 'hard';

    switch (diff) {
      case 'easy': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'hard': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-stone-50 text-stone-700 border-stone-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    if (lang === 'en') {
      if (difficulty === 'سهل') return 'Easy';
      if (difficulty === 'متوسط') return 'Medium';
      if (difficulty === 'صعب') return 'Hard';
    }
    return difficulty;
  };

  const getFirstSentence = (text: string) => {
    const firstSentence = text.split(/[.!?]/)[0];
    return firstSentence ? firstSentence.trim() + '.' : text;
  };

  return (
    <div 
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-3 hover:scale-[1.015] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer border border-stone-100/60 flex flex-col h-full will-change-transform"
      onClick={() => onClick(recipe.id)}
    >
      <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      </div>

      <div className="relative h-64 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className={`absolute top-4 ${lang === 'ar' ? 'right-4' : 'left-4'} flex flex-col gap-2 items-end z-10 transition-transform duration-500 group-hover:-translate-y-1`}>
          <div className="bg-orange-600/90 backdrop-blur-md text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-lg border border-white/20 uppercase tracking-wide">
            {lang === 'en' ? (translations.en.categories as any)[Object.keys(translations.ar.categories).find(key => (translations.ar.categories as any)[key] === recipe.category) || 'all'] : recipe.category}
          </div>
          {recipe.featured && (
            <div className="bg-yellow-400 text-stone-900 text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-yellow-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {lang === 'ar' ? 'مختاراتنا' : 'Featured'}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-stone-800 text-sm font-bold">{recipe.rating}</span>
            <span className="text-stone-400 text-xs">({recipe.reviews})</span>
          </div>
          <div className="flex gap-1">
            {recipe.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] bg-stone-100 text-stone-500 px-2 py-0.5 rounded-md font-medium">#{tag}</span>
            ))}
          </div>
        </div>

        <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1 font-serif-ar leading-snug">
          {recipe.title}
        </h3>
        
        <p className="text-stone-400 text-[13px] line-clamp-2 leading-[1.6] mb-6 flex-grow font-medium italic">
          {getFirstSentence(recipe.description)}
        </p>

        <div className="grid grid-cols-3 gap-2 mb-6 text-stone-500 text-[11px] font-medium border-b border-stone-50 pb-4">
          <div className={`flex flex-col items-center gap-1.5 ${lang === 'ar' ? 'border-l' : 'border-r'} border-stone-100`}>
            <span className="text-stone-400 uppercase tracking-tighter text-[9px]">{t.prep}</span>
            <span className="text-stone-800 font-bold">{recipe.prepTime} {lang === 'ar' ? 'د' : 'min'}</span>
          </div>
          <div className={`flex flex-col items-center gap-1.5 ${lang === 'ar' ? 'border-l' : 'border-r'} border-stone-100`}>
            <span className="text-stone-400 uppercase tracking-tighter text-[9px]">{t.cook}</span>
            <span className="text-stone-800 font-bold">{recipe.cookTime} {lang === 'ar' ? 'د' : 'min'}</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-stone-400 uppercase tracking-tighter text-[9px]">{t.servings}</span>
            <span className="text-stone-800 font-bold">{recipe.servings}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 mt-auto">
          <div className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${getDifficultyColor(recipe.difficulty)} shadow-sm transition-transform duration-300 group-hover:scale-105`}>
            {getDifficultyLabel(recipe.difficulty)}
          </div>
          <div className={`text-orange-600 text-[11px] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 ${lang === 'ar' ? 'translate-x-4 group-hover:translate-x-0' : '-translate-x-4 group-hover:translate-x-0'}`}>
            {lang === 'ar' ? 'شاهد الوصفة' : 'View Recipe'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
