
import React from 'react';
import { Author, Recipe, Video } from '../types';
import { translations } from '../translations';

interface ChefDashboardProps {
  chef: Author;
  recipes: Recipe[];
  videos: Video[];
  onAddRecipe: () => void;
  lang: 'ar' | 'en';
}

const ChefDashboard: React.FC<ChefDashboardProps> = ({ chef, recipes, videos, onAddRecipe, lang }) => {
  const t = translations[lang];

  return (
    <div className="animate-fade-in space-y-12 py-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white p-8 rounded-[3rem] border border-stone-100 shadow-sm">
        <div className="flex items-center gap-6">
          <img src={chef.avatar} className="w-20 h-20 rounded-2xl object-cover shadow-lg" alt={chef.name} />
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h1 className="text-3xl font-black text-stone-900 font-serif-ar">{t.welcome}، {chef.name}</h1>
            <p className="text-stone-500 font-medium">{t.chefStatus}</p>
          </div>
        </div>
        <button 
          onClick={onAddRecipe}
          className="bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:bg-orange-700 transition-all flex items-center gap-3 active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t.postNewRecipe}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t.totalFollowers, value: chef.followers?.toLocaleString(), icon: '👥', color: 'bg-blue-50 text-blue-600' },
          { label: t.recipeViews, value: '145.2k', icon: '👁️', color: 'bg-orange-50 text-orange-600' },
          { label: t.averageRating, value: '4.9', icon: '⭐', color: 'bg-yellow-50 text-yellow-600' },
          { label: t.estimatedEarnings, value: '$1,240', icon: '💰', color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <p className="text-stone-400 text-xs font-bold uppercase tracking-tighter">{stat.label}</p>
              <p className="text-2xl font-black text-stone-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Management */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] p-8 border border-stone-100 shadow-sm">
            <h3 className={`text-xl font-bold text-stone-900 mb-8 ${lang === 'ar' ? 'border-r-4 pr-4' : 'border-l-4 pl-4'} border-orange-600`}>
              {t.manageRecipes}
            </h3>
            <div className="space-y-4">
              {recipes.slice(0, 5).map(recipe => (
                <div key={recipe.id} className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-2xl transition-colors border border-transparent hover:border-stone-100 group">
                  <div className="flex items-center gap-4">
                    <img src={recipe.image} className="w-16 h-16 rounded-xl object-cover" alt={recipe.title} />
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <h4 className="font-bold text-stone-800">{recipe.title}</h4>
                      <p className="text-xs text-stone-400">{recipe.reviews} {t.reviewsCount} • {(t.categories as any)[Object.keys(translations.ar.categories).find(key => (translations.ar.categories as any)[key] === recipe.category) || 'all']}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-stone-400 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button className="p-2 text-stone-400 hover:text-red-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Audience Insights */}
        <div className="bg-stone-900 text-white rounded-[3rem] p-8 shadow-xl">
          <h3 className="text-xl font-bold mb-8 text-orange-400">{t.audienceAnalytics}</h3>
          <div className="space-y-8">
            <div className="space-y-2">
              <div className={`flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span>{t.countries.sa}</span>
                <span>45%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className={`bg-orange-600 h-full w-[45%] ${lang === 'ar' ? 'float-right' : 'float-left'}`}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span>{t.countries.ae}</span>
                <span>22%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className={`bg-blue-400 h-full w-[22%] ${lang === 'ar' ? 'float-right' : 'float-left'}`}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className={`flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400 ${lang === 'en' ? 'flex-row' : 'flex-row-reverse'}`}>
                <span>{t.countries.eg}</span>
                <span>18%</span>
              </div>
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div className={`bg-emerald-400 h-full w-[18%] ${lang === 'ar' ? 'float-right' : 'float-left'}`}></div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 bg-white/5 rounded-[2rem] border border-white/10">
            <p className="text-sm text-stone-300 italic">
              {t.proTipVideo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefDashboard;
