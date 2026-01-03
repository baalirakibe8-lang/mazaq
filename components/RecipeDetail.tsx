
import React from 'react';
import { Recipe } from '../types';
import { translations } from '../translations';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  lang: 'ar' | 'en';
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, lang }) => {
  const t = translations[lang];

  // Helper to convert minutes to ISO 8601 Duration format required by Schema.org (e.g., PT20M)
  const toIsoDuration = (minutes: number) => `PT${minutes}M`;

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": recipe.title,
    "image": [recipe.image],
    "author": {
      "@type": "Person",
      "name": recipe.author.name
    },
    "datePublished": "2024-01-01",
    "description": recipe.description,
    "prepTime": toIsoDuration(recipe.prepTime),
    "cookTime": toIsoDuration(recipe.cookTime),
    "totalTime": toIsoDuration(recipe.prepTime + recipe.cookTime),
    "keywords": recipe.tags.join(', '),
    "recipeCategory": recipe.category,
    "recipeYield": `${recipe.servings} ${lang === 'ar' ? 'أشخاص' : 'people'}`,
    "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
    "recipeInstructions": recipe.steps.map((step, idx) => ({
      "@type": "HowToStep",
      "name": `${lang === 'ar' ? 'الخطوة' : 'Step'} ${idx + 1}`,
      "text": step.instruction,
      "position": idx + 1
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} calories`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`
    }
  };

  return (
    <div className="animate-fade-in py-8">
      {/* Structured Data for SEO Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-stone-500 hover:text-orange-600 transition-colors font-medium group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform group-hover:translate-x-1 ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        <span>{lang === 'ar' ? 'العودة للوصفات' : 'Back to Recipes'}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Right Column: Title and Content (8/12) */}
        <div className="lg:col-span-8 order-2 lg:order-1">
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-orange-600 text-white font-bold text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg shadow-orange-200">
                {recipe.category}
              </span>
              <div className="flex items-center gap-1 px-3 py-1 bg-yellow-50 rounded-full border border-yellow-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-stone-800 font-bold text-xs">{recipe.rating}</span>
                <span className="text-stone-400 text-[10px]">({recipe.reviews} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
              </div>
              <div className="flex gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="text-stone-400 text-xs font-medium">#{tag}</span>
                ))}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-8 font-serif-ar leading-tight">
              {recipe.title}
            </h1>

            {/* Author Info */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-stone-50 rounded-2xl border border-stone-100 w-fit">
              <img src={recipe.author.avatar} alt={recipe.author.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
              <div>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">{lang === 'ar' ? 'بواسطة الشيف' : 'By Chef'}</p>
                <p className="text-stone-800 font-bold">{recipe.author.name}</p>
              </div>
            </div>

            <p className="text-xl text-stone-600 leading-relaxed italic border-r-4 border-stone-200 pr-6">
              "{recipe.description}"
            </p>
          </div>

          <div className="mt-16">
            <h4 className="text-2xl font-bold text-stone-800 mb-10 border-r-4 border-orange-600 pr-4">{t.steps}</h4>
            <div className="space-y-12">
              {recipe.steps.map((step, idx) => (
                <div key={idx} className="flex gap-8 group scroll-mt-32">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-100 text-stone-400 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:shadow-lg group-hover:shadow-orange-200">
                    {idx + 1}
                  </div>
                  <div className="pt-2 flex-grow">
                    <p className="text-stone-700 text-lg leading-relaxed font-medium mb-4">{step.instruction}</p>
                    {step.image && (
                      <img src={step.image} className="w-full h-64 object-cover rounded-[2rem] shadow-sm border border-stone-100" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Left Column: Stats and Sidebar (4/12) */}
        <div className="lg:col-span-4 order-1 lg:order-2 space-y-8">
          <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* External Video Guide Section */}
          {(recipe.externalVideoUrl || recipe.videoId) && (
            <div className="bg-white p-8 rounded-[2.5rem] border border-orange-200 shadow-sm overflow-hidden relative group/video">
              <h4 className="text-xl font-bold text-stone-800 mb-6 relative z-10 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.videoGuideTitle}
              </h4>
              <a 
                href={recipe.externalVideoUrl || '#'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {t.watchGuide}
              </a>
            </div>
          )}

          {/* Nutrition Card */}
          <div className="bg-stone-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
            <h4 className="text-xl font-bold mb-6 text-orange-400 relative z-10">{t.nutrition}</h4>
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-black text-white">{recipe.nutrition.calories}</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">{t.calories}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-black text-white">{recipe.nutrition.protein}g</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">{t.protein}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-black text-white">{recipe.nutrition.carbs}g</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">{t.carbs}</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <p className="text-2xl font-black text-white">{recipe.nutrition.fat}g</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase">{t.fat}</p>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-[2.5rem] border border-stone-100 shadow-sm">
            <h4 className="text-xl font-bold text-stone-800 mb-6 border-r-4 border-orange-600 pr-3">{t.ingredients}</h4>
            <ul className="space-y-4">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-4 text-stone-600">
                  <span className="font-black text-orange-600">{ing.amount} {ing.unit}</span>
                  <span className="font-medium">{ing.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
