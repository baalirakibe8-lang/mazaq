
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
import { Category, Recipe, Author, Video } from './types';
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
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      // Map category labels to keys for comparison
      const categoryKeysMap: Record<string, string> = {
        'حلويات': 'desserts',
        'أطباق رئيسية': 'main',
        'سريعة': 'fast',
        'صحية': 'healthy',
        'مقبلات': 'appetizers'
      };
      
      const recipeKey = categoryKeysMap[recipe.category] || 'main';
      const matchesCategory = activeCategoryKey === 'all' || recipeKey === activeCategoryKey;
      
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.tags.some(t => t.includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [recipes, activeCategoryKey, searchQuery]);

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
    setCurrentPage('recipe-detail');
    window.scrollTo(0, 0);
  };

  const handleChefClick = (id: string) => {
    setSelectedChefId(id);
    setCurrentPage('chef-profile');
    window.scrollTo(0, 0);
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
      author: CHEFS[0], // Current logged in user (mocked)
      isDraft: false
    };

    setRecipes(prev => [newRecipe, ...prev]);
    setCurrentPage('chef-dashboard');
    window.scrollTo(0, 0);
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
          <div className="space-y-20 py-8">
            <section className="relative rounded-[4rem] overflow-hidden bg-stone-900 h-[600px] flex items-center shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600" 
                alt="Main" 
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className={`relative container mx-auto px-12 z-10 text-white animate-fade-in ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="inline-block bg-orange-600/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 mb-6">
                  <span className="text-sm font-bold tracking-widest uppercase">{t.slogan}</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black font-serif-ar mb-8 leading-[1.1]">
                  {lang === 'ar' ? (
                    <>تذوق <span className="text-orange-500">الإبداع</span> <br/>بأنامل خبرائنا</>
                  ) : (
                    <>Taste <span className="text-orange-500">Creativity</span> <br/>from our Experts</>
                  )}
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed text-stone-200">
                  {t.heroDesc}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button onClick={() => setCurrentPage('recipes')} className="bg-orange-600 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-xl active:scale-95">{t.discoverRecipes}</button>
                  <button onClick={() => setCurrentPage('chefs')} className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all active:scale-95">{t.meetChefs}</button>
                </div>
              </div>
            </section>

            <section className="animate-fade-in">
              <div className="flex justify-between items-end mb-12">
                <div className={`${lang === 'ar' ? 'border-r-8 pr-6' : 'border-l-8 pl-6'} border-orange-600`}>
                  <span className="text-orange-600 font-black uppercase tracking-widest text-xs mb-2 block">{t.stars}</span>
                  <h2 className="text-4xl font-black text-stone-900 font-serif-ar">{t.trendingChefs}</h2>
                </div>
                <button onClick={() => setCurrentPage('chefs')} className="bg-stone-100 hover:bg-orange-600 hover:text-white text-stone-900 px-6 py-3 rounded-2xl font-bold transition-all active:scale-95">{t.viewAll}</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {CHEFS.slice(0, 3).map(chef => <ChefCard key={chef.id} chef={chef} onClick={handleChefClick} lang={lang} />)}
              </div>
            </section>

            <section className="bg-stone-900 rounded-[4rem] p-16 text-white overflow-hidden relative">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-16">
                   <h2 className="text-4xl font-black font-serif-ar">{t.reelsSection}</h2>
                   <button onClick={() => setCurrentPage('videos')} className="text-orange-400 font-bold hover:text-orange-300">{t.watchAll}</button>
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
          <div className="py-8 animate-fade-in">
            <h1 className="text-5xl font-black text-stone-900 mb-12 font-serif-ar">{t.recipeRepo} ({filteredRecipes.length})</h1>
            <div className="flex flex-col md:flex-row gap-8 mb-16 items-center">
              <div className="relative flex-1 group">
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full bg-white border border-stone-200 rounded-[2rem] px-8 py-5 pr-14 outline-none shadow-sm focus:ring-4 focus:ring-orange-50 transition-all" 
                />
                <svg xmlns="http://www.w3.org/2000/svg" className={`absolute top-1/2 -translate-y-1/2 h-6 w-6 text-stone-300 group-focus-within:text-orange-500 transition-colors ${lang === 'ar' ? 'right-6' : 'left-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="flex flex-wrap gap-3">
                {Object.keys(t.categories).map((key) => {
                  const catLabel = (t.categories as any)[key];
                  const isActive = activeCategoryKey === key;
                  return (
                    <button 
                      key={key} 
                      onClick={() => setActiveCategoryKey(key)} 
                      className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all ${isActive ? 'bg-orange-600 text-white shadow-xl scale-105' : 'bg-white text-stone-500 hover:bg-stone-50'}`}
                    >
                      {catLabel}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredRecipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onClick={handleRecipeClick} lang={lang} />)}
              {filteredRecipes.length === 0 && <div className="col-span-full py-20 text-center text-stone-400 italic">{t.noResults}</div>}
            </div>
          </div>
        );

      case 'chefs':
        return (
          <div className="py-12 animate-fade-in">
            <h1 className="text-6xl font-black text-stone-900 mb-20 font-serif-ar text-center">{t.meetChefs}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {CHEFS.map(chef => <ChefCard key={chef.id} chef={chef} onClick={handleChefClick} lang={lang} />)}
            </div>
          </div>
        );

      case 'videos':
        return (
          <div className="py-12 animate-fade-in">
            <h1 className="text-5xl font-black text-stone-900 mb-12 font-serif-ar text-center">{t.reelsSection}</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {VIDEOS.map(v => <VideoCard key={v.id} video={v} chefName={CHEFS.find(c => c.id === v.chefId)?.name} onClick={handleVideoClick} lang={lang} />)}
            </div>
          </div>
        );

      case 'store':
        return (
          <div className="py-12 animate-fade-in">
            <h1 className="text-6xl font-black text-stone-900 mb-16 font-serif-ar text-center">{t.digitalStore}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {PRODUCTS.map(product => <StoreItem key={product.id} product={product} lang={lang} />)}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="py-12 animate-fade-in">
            <h1 className="text-5xl font-black text-stone-900 mb-12 font-serif-ar text-center">{t.proTips}</h1>
            <div className="space-y-12 max-w-5xl mx-auto">
              {BLOG_POSTS.map(post => (
                <article key={post.id} className="bg-white rounded-[3rem] p-8 border border-stone-100 flex flex-col md:flex-row gap-10 hover:shadow-2xl transition-all group cursor-pointer">
                  <div className="md:w-1/3 aspect-square overflow-hidden rounded-[2.5rem]"><img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} /></div>
                  <div className={`md:w-2/3 py-4 flex flex-col justify-center ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    <span className="text-orange-600 font-bold text-xs mb-4">{post.date}</span>
                    <h2 className="text-3xl font-bold mb-6 group-hover:text-orange-600 transition-colors">{post.title}</h2>
                    <p className="text-stone-600 text-lg leading-relaxed mb-8">{post.excerpt}</p>
                    <button className="text-stone-900 font-black flex items-center gap-2 active:scale-95">{t.readMore} ➔</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        );

      default:
        return <div className="py-20 text-center font-bold">404 - Page not found</div>;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-orange-100 selection:text-orange-900 ${lang === 'ar' ? 'font-serif-ar' : ''}`}>
      <Header 
        onNavigate={(page) => {
          if (page === 'chefs-entry') setCurrentPage('chef-dashboard');
          else setCurrentPage(page);
          window.scrollTo(0, 0);
        }} 
        currentPage={currentPage} 
        lang={lang}
        onToggleLang={toggleLanguage}
      />
      
      <main className="flex-grow container mx-auto px-4 py-8">
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
