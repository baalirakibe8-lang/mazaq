
import React from 'react';
import { Author, Recipe, Video } from '../types';
import RecipeCard from './RecipeCard';
import VideoCard from './VideoCard';
import { translations } from '../translations';

interface ChefProfileProps {
  chef: Author;
  recipes: Recipe[];
  videos: Video[];
  onRecipeClick: (id: string) => void;
  onVideoClick: (id: string) => void;
  onBack: () => void;
  lang: 'ar' | 'en';
}

const ChefProfile: React.FC<ChefProfileProps> = ({ chef, recipes, videos, onRecipeClick, onVideoClick, onBack, lang }) => {
  const [activeTab, setActiveTab] = React.useState<'recipes' | 'videos'>('recipes');
  const t = translations[lang];

  return (
    <div className="animate-fade-in py-8">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-stone-500 hover:text-orange-600 transition-colors font-medium group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <span>{lang === 'ar' ? 'العودة للاكتشاف' : 'Back to Discovery'}</span>
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-[3rem] overflow-hidden border border-stone-100 shadow-sm mb-12">
        <div className="h-64 relative">
          <img src={chef.coverImage} className="w-full h-full object-cover" alt="Cover" />
          <div className="absolute inset-0 bg-stone-900/30"></div>
        </div>
        <div className="px-12 pb-12 -mt-16 relative">
          <div className="flex flex-col md:flex-row items-end gap-8 mb-8">
            <img 
              src={chef.avatar} 
              alt={chef.name} 
              className="w-40 h-40 rounded-[2.5rem] border-8 border-white shadow-2xl object-cover relative z-10"
            />
            <div className="flex-grow pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-stone-900 font-serif-ar">{chef.name}</h1>
                {chef.isVerified && (
                  <span className="text-blue-500 bg-blue-50 p-1.5 rounded-full" title={lang === 'ar' ? 'موثق' : 'Verified'}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-stone-500 max-w-2xl leading-relaxed italic">"{chef.bio}"</p>
            </div>
            <div className="flex gap-4 pb-4">
               <button className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-orange-700 transition-all hover:-translate-y-1">{t.follow}</button>
               <button className="bg-stone-100 text-stone-600 px-6 py-4 rounded-2xl font-bold hover:bg-stone-200 transition-all">{t.share}</button>
            </div>
          </div>

          <div className={`grid grid-cols-3 md:grid-cols-4 gap-8 py-8 border-t border-stone-100 ${lang === 'en' ? 'text-left' : 'text-right'}`}>
            <div className="text-center">
              <span className="block text-2xl font-black text-stone-900">{chef.followers?.toLocaleString()}</span>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-tighter">{t.followers}</span>
            </div>
            <div className={`text-center ${lang === 'ar' ? 'border-r' : 'border-l'} border-stone-100`}>
              <span className="block text-2xl font-black text-stone-900">{recipes.length}</span>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-tighter">{lang === 'ar' ? 'وصفة' : 'Recipes'}</span>
            </div>
            <div className={`text-center ${lang === 'ar' ? 'border-r' : 'border-l'} border-stone-100`}>
              <span className="block text-2xl font-black text-stone-900">{videos.length}</span>
              <span className="text-stone-400 text-xs font-bold uppercase tracking-tighter">{lang === 'ar' ? 'فيديو' : 'Videos'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-12 border-b border-stone-200 mb-12">
        <button 
          onClick={() => setActiveTab('recipes')}
          className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'recipes' ? 'text-orange-600' : 'text-stone-400'}`}
        >
          {t.writtenRecipes}
          {activeTab === 'recipes' && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-600 rounded-full animate-fade-in"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('videos')}
          className={`pb-4 font-bold text-lg transition-all relative ${activeTab === 'videos' ? 'text-orange-600' : 'text-stone-400'}`}
        >
          {t.cookingVideos}
          {activeTab === 'videos' && <div className="absolute bottom-0 left-0 w-full h-1 bg-orange-600 rounded-full animate-fade-in"></div>}
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === 'recipes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map(r => <RecipeCard key={r.id} recipe={r} onClick={onRecipeClick} lang={lang} />)}
            {recipes.length === 0 && <p className="text-stone-400 col-span-full py-12 text-center italic">{lang === 'ar' ? 'لا توجد وصفات منشورة بعد.' : 'No recipes published yet.'}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {videos.map(v => <VideoCard key={v.id} video={v} onClick={onVideoClick} lang={lang} />)}
            {videos.length === 0 && <p className="text-stone-400 col-span-full py-12 text-center italic">{lang === 'ar' ? 'لا توجد فيديوهات منشورة بعد.' : 'No videos published yet.'}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefProfile;
