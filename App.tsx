
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RecipeCard from './components/RecipeCard';
import RecipeDetail from './components/RecipeDetail';
import ChefCard from './components/ChefCard';
import ChefProfile from './components/ChefProfile';
import ChefDashboard from './components/ChefDashboard';
import AddRecipeForm from './components/AddRecipeForm';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import StoreItem from './components/StoreItem';
import { RECIPES as INITIAL_RECIPES, PRODUCTS, BLOG_POSTS, CHEFS, VIDEOS } from './data/mockData';
import { Category, Recipe } from './types';
import { translations } from './translations';

const App: React.FC = () => {
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedChefId, setSelectedChefId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

  const t = translations[lang];

  useEffect(() => {
    const direction = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = lang;
    document.body.style.direction = direction;
  }, [lang]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const categoryKeysMap: Record<string, string> = {
        'حلويات': 'desserts',
        'أطباق رئيسية': 'main',
        'سريعة': 'fast',
        'صحية': 'healthy',
        'مقبلات': 'appetizers'
      };
      
      const recipeKey = categoryKeysMap[recipe.category] || 'main';
      const matchesCategory = activeCategoryKey === 'all' || recipeKey === activeCategoryKey;
      
      const searchableText = `${recipe.title} ${recipe.description} ${recipe.tags.join(' ')}`.toLowerCase();
      const matchesSearch = searchQuery === '' || searchableText.includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategoryKey, searchQuery]);

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
    setCurrentPage('recipe-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChefClick = (id: string) => {
    setSelectedChefId(id);
    setCurrentPage('chef-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVideoClick = (id: string) => {
    setSelectedVideoId(id);
  };

  const handleAddRecipe = (data: any) => {
    const newRecipe: Recipe = {
      id: `new-${Date.now()}`,
      title: data.title || 'وصفة جديدة',
      description: data.description || '',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
      category: data.category as Category,
      prepTime: data.prepTime || 0,
      cookTime: data.cookTime || 0,
      servings: data.servings || 1,
      difficulty: data.difficulty as any,
      ingredients: data.ingredients || [],
      steps: data.steps || [],
      rating: 5.0,
      reviews: 0,
      tags: ['جديد'],
      nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      author: CHEFS[0],
      isDraft: false
    };

    setRecipes(prev => [newRecipe, ...prev]);
    setCurrentPage('chef-dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'ar' ? 'en' : 'ar');
  };

  const renderContent = () => {
    if (currentPage === 'recipe-detail' && selectedRecipeId) {
      const recipe = recipes.find(r => r.id === selectedRecipeId);
      if (recipe) return <RecipeDetail recipe={recipe} onBack={() => setCurrentPage('recipes')} lang={lang} />;
    }

    if (currentPage === 'chef-profile' && selectedChefId) {
      const chef = CHEFS.find(c => c.id === selectedChefId);
      const chefRecipes = recipes.filter(r => r.author.id === selectedChefId);
      const chefVideos = VIDEOS.filter(v => v.chefId === selectedChefId);
      if (chef) return (
        <ChefProfile 
          chef={chef} 
          recipes={chefRecipes} 
          videos={chefVideos} 
          onRecipeClick={handleRecipeClick}
          onVideoClick={handleVideoClick}
          onBack={() => setCurrentPage('chefs')}
          lang={lang}
        />
      );
    }

    if (currentPage === 'chef-dashboard') {
      const chef = CHEFS[0];
      const chefRecipes = recipes.filter(r => r.author.id === chef.id);
      const chefVideos = VIDEOS.filter(v => v.chefId === chef.id);
      return <ChefDashboard chef={chef} recipes={chefRecipes} videos={chefVideos} onAddRecipe={() => setCurrentPage('add-recipe')} lang={lang} />;
    }

    if (currentPage === 'add-recipe') {
      return <AddRecipeForm onCancel={() => setCurrentPage('chef-dashboard')} onSubmit={handleAddRecipe} lang={lang} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <div className="space-y-24 py-8">
            {/* Hero Section */}
            <section className="relative rounded-[3rem] md:rounded-[5rem] overflow-hidden bg-stone-900 h-[650px] flex items-center shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600" 
                alt="Main Cooking Hero" 
                className="absolute inset-0 w-full h-full object-cover opacity-60"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/40 to-transparent"></div>
              <div className={`relative container mx-auto px-6 md:px-12 z-10 text-white animate-fade-in ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="inline-flex items-center gap-2 bg-orange-600/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold tracking-widest uppercase">{t.slogan}</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-black font-serif-ar mb-8 leading-[1.1] max-w-4xl">
                  {lang === 'ar' ? (
                    <>تذوق <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">الإبداع</span> <br/>بأنامل خبرائنا</>
                  ) : (
                    <>Taste <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">Creativity</span> <br/>from our Experts</>
                  )}
                </h1>
                <p className="text-lg md:text-2xl max-w-2xl mb-12 leading-relaxed text-stone-200 font-medium">
                  {t.heroDesc}
                </p>
                <div className="flex flex-wrap gap-6">
                  <button onClick={() => setCurrentPage('recipes')} className="bg-orange-600 text-white px-10 md:px-14 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-2xl shadow-orange-600/20 active:scale-95">{t.discoverRecipes}</button>
                  <button onClick={() => setCurrentPage('chefs')} className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 md:px-14 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95">{t.meetChefs}</button>
                </div>
              </div>
            </section>

            {/* Trending Chefs */}
            <section className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
                <div className={`${lang === 'ar' ? 'border-r-8 pr-6' : 'border-l-8 pl-6'} border-orange-600 text-center md:text-right`}>
                  <span className="text-orange-600 font-black uppercase tracking-widest text-xs mb-2 block">{t.stars}</span>
                  <h2 className="text-4xl md:text-5xl font-black text-stone-900 font-serif-ar">{t.trendingChefs}</h2>
                </div>
                <button onClick={() => setCurrentPage('chefs')} className="group flex items-center gap-3 bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-900 px-8 py-4 rounded-2xl font-bold transition-all active:scale-95">
                  {t.viewAll}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform group-hover:translate-x-${lang === 'ar' ? '-2' : '2'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {CHEFS.slice(0, 3).map(chef => <ChefCard key={chef.id} chef={chef} onClick={handleChefClick} lang={lang} />)}
              </div>
            </section>

            {/* Reels Section */}
            <section className="bg-stone-900 rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-16">
                   <h2 className="text-4xl font-black font-serif-ar">{t.reelsSection}</h2>
                   <button onClick={() => setCurrentPage('videos')} className="flex items-center gap-2 text-orange-400 font-bold hover:text-orange-300 transition-colors">
                     {t.watchAll}
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                   </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {VIDEOS.slice(0, 5).map(v => <VideoCard key={v.id} video={v} chefName={CHEFS.find(c => c.id === v.chefId)?.name} onClick={handleVideoClick} lang={lang} />)}
                </div>
              </div>
            </section>
          </div>
        );

      case 'recipes':
        return (
          <div className="py-12 animate-fade-in container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 mb-16 font-serif-ar text-center">{t.recipeRepo}</h1>
            <div className="flex flex-col lg:flex-row gap-8 mb-20 items-center">
              <div className="relative flex-1 group w-full">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-white border border-stone-200 rounded-[2.5rem] px-10 py-6 pr-16 outline-none shadow-sm focus:ring-8 focus:ring-orange-500/5 focus:border-orange-500 transition-all text-lg" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-1/2 -translate-y-1/2 h-7 w-7 text-stone-300 group-focus-within:text-orange-500 transition-colors ${lang === 'ar' ? 'right-6' : 'left-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                {Object.keys(t.categories).map((key) => {
                  const catLabel = (t.categories as any)[key];
                  const isActive = activeCategoryKey === key;
                  return (
                    <button 
                      key={key} 
                      onClick={() => setActiveCategoryKey(key)} 
                      className={`px-10 py-4 rounded-[1.5rem] text-base font-bold transition-all ${isActive ? 'bg-orange-600 text-white shadow-2xl shadow-orange-600/20 scale-105' : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200 hover:border-stone-300'}`}
                    >
                      {catLabel}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} lang={lang} />)}
              {filteredRecipes.length === 0 && (
                <div className="col-span-full py-32 text-center">
                  <div className="text-8xl mb-8">🥘</div>
                  <p className="text-stone-400 text-2xl font-medium italic">{t.noResults}</p>
                </div>
              )}
            </div>
          </div>
        );

      case 'chefs':
        return (
          <div className="py-16 animate-fade-in container mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black text-stone-900 mb-24 font-serif-ar text-center leading-tight">{t.meetChefs}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              {CHEFS.map(chef => <ChefCard key={chef.id} chef={chef} onClick={handleChefClick} lang={lang} />)}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="py-16 animate-fade-in container mx-auto px-4">
            <h1 className="text-5xl md:text-7xl font-black text-stone-900 mb-16 font-serif-ar text-center">{t.reelsSection}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {VIDEOS.map(v => <VideoCard key={v.id} video={v} chefName={CHEFS.find(c => c.id === v.chefId)?.name} onClick={handleVideoClick} lang={lang} />)}
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="py-16 animate-fade-in container mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black text-stone-900 mb-24 font-serif-ar text-center">{t.digitalStore}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {PRODUCTS.map(product => <StoreItem key={product.id} product={product} lang={lang} />)}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="py-16 animate-fade-in container mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-black text-stone-900 mb-24 font-serif-ar text-center">{t.proTips}</h1>
            <div className="space-y-16 max-w-5xl mx-auto">
              {BLOG_POSTS.map(post => (
                <article key={post.id} className="bg-white rounded-[4rem] p-10 border border-stone-100 flex flex-col md:flex-row gap-12 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all group cursor-pointer overflow-hidden">
                  <div className="md:w-1/3 aspect-square overflow-hidden rounded-[3rem] shadow-xl">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={post.title} />
                  </div>
                  <div className={`md:w-2/3 py-6 flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="text-orange-600 font-black text-sm mb-6 uppercase tracking-widest">{post.date}</span>
                    <h2 className="text-3xl md:text-4xl font-black mb-8 group-hover:text-orange-600 transition-colors leading-tight font-serif-ar">{post.title}</h2>
                    <p className="text-stone-500 text-xl leading-relaxed mb-10 line-clamp-3 font-medium">{post.excerpt}</p>
                    <button className="text-stone-900 font-black text-lg flex items-center gap-3 active:scale-95 group/btn">
                      {t.readMore} 
                      <span className={`transition-transform duration-300 group-hover/btn:translate-x-${lang === 'ar' ? '-2' : '2'}`}>➔</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="py-40 text-center animate-fade-in">
            <h1 className="text-9xl font-black text-stone-200 mb-8">404</h1>
            <p className="text-2xl text-stone-500 mb-12 font-bold">{lang === 'ar' ? 'عذراً، الصفحة غير موجودة' : 'Sorry, Page Not Found'}</p>
            <button onClick={() => setCurrentPage('home')} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold shadow-xl">{t.home}</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-orange-600 selection:text-white bg-stone-50">
      <Header 
        onNavigate={(page) => {
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        currentPage={currentPage} 
        lang={lang}
        onToggleLang={toggleLanguage}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {selectedVideoId && (
        <VideoPlayer 
          video={VIDEOS.find(v => v.id === selectedVideoId)!} 
          chef={CHEFS.find(c => c.id === VIDEOS.find(v => v.id === selectedVideoId)?.chefId)!}
          onClose={() => setSelectedVideoId(null)}
          lang={lang}
        />
      )}

      <Footer lang={lang} />
    </div>
  );
};

export default App;
