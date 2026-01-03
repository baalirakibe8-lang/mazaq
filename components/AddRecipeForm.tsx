
import React, { useState, useRef } from 'react';
import { translations } from '../translations';
import { Category, Ingredient, Step } from '../types';

interface AddRecipeFormProps {
  onCancel: () => void;
  onSubmit: (data: any) => void;
  lang: 'ar' | 'en';
}

const AddRecipeForm: React.FC<AddRecipeFormProps> = ({ onCancel, onSubmit, lang }) => {
  const t = translations[lang];
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'أطباق رئيسية' as Category,
    difficulty: 'متوسط',
    servings: 4,
    prepTime: 20,
    cookTime: 30,
    ingredients: [{ name: '', amount: '', unit: lang === 'ar' ? 'غرام' : 'g' }] as Ingredient[],
    steps: [{ instruction: '', image: undefined }] as Step[],
    externalVideoUrl: '',
    allowComments: true,
    isFeatured: false
  });

  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoName, setVideoName] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleNext = () => currentStep < totalSteps && setCurrentStep(prev => prev + 1);
  const handlePrev = () => currentStep > 1 && setCurrentStep(prev => prev - 1);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: lang === 'ar' ? 'غرام' : 'g' }]
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addStep = () => {
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { instruction: '', image: undefined }]
    }));
  };

  const removeStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const updateStep = (index: number, instruction: string) => {
    const newSteps = [...formData.steps];
    newSteps[index].instruction = instruction;
    setFormData(prev => ({ ...prev, steps: newSteps }));
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) { 
        alert(lang === 'ar' ? 'حجم الفيديو كبير جداً (الحد الأقصى 50 ميجابايت)' : 'Video file is too large (50MB max)');
        return;
      }
      setVideoName(file.name);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const removeVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
    }
    setVideoPreview(null);
    setVideoName(null);
    if (videoInputRef.current) videoInputRef.current.value = '';
  };

  const renderProgress = () => (
    <div className="mb-12 relative">
      <div className="flex justify-between items-center mb-4 relative z-10">
        {[1, 2, 3, 4, 5].map(step => (
          <div key={step} className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all duration-500 shadow-sm ${
              currentStep >= step ? 'bg-orange-600 text-white scale-110 shadow-orange-100' : 'bg-white text-stone-300 border border-stone-100'
            }`}>
              {step}
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter hidden md:block ${
              currentStep >= step ? 'text-orange-600' : 'text-stone-300'
            }`}>
              {(t.wizard as any)[`step${step}`]}
            </span>
          </div>
        ))}
      </div>
      <div className="h-0.5 bg-stone-100 w-full absolute top-6 left-0 -z-0">
        <div 
          className="h-full bg-orange-600 transition-all duration-700 ease-out" 
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </div>
  );

  const Step1 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.recipeTitleLabel}</label>
          <input 
            type="text" 
            value={formData.title} 
            onChange={e => updateField('title', e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-orange-100 transition-all font-bold" 
            placeholder={t.recipeTitlePlaceholder} 
          />
        </div>
        <div className="space-y-4">
          <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.categoryLabel}</label>
          <select 
            value={formData.category}
            onChange={e => updateField('category', e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-orange-100 transition-all font-bold"
          >
            {Object.entries(t.categories).filter(([key]) => key !== 'all').map(([key, label]) => (
              <option key={key} value={label as string}>{label as string}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.shortDescLabel}</label>
        <textarea 
          value={formData.description}
          onChange={e => updateField('description', e.target.value)}
          className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-orange-100 transition-all font-medium h-32 leading-relaxed" 
          placeholder={t.shortDescPlaceholder}
        ></textarea>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-stone-400 uppercase block">{t.prepTimeLabel}</label>
          <input type="number" value={formData.prepTime} onChange={e => updateField('prepTime', +e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-stone-400 uppercase block">{t.cookTimeLabel}</label>
          <input type="number" value={formData.cookTime} onChange={e => updateField('cookTime', +e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-stone-400 uppercase block">{t.servings}</label>
          <input type="number" value={formData.servings} onChange={e => updateField('servings', +e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-stone-400 uppercase block">{t.difficulty}</label>
          <select value={formData.difficulty} onChange={e => updateField('difficulty', e.target.value)} className="w-full bg-stone-50 border border-stone-100 rounded-xl px-4 py-3 outline-none">
            <option>{lang === 'ar' ? 'سهل' : 'Easy'}</option>
            <option>{lang === 'ar' ? 'متوسط' : 'Medium'}</option>
            <option>{lang === 'ar' ? 'صعب' : 'Hard'}</option>
          </select>
        </div>
      </div>
    </div>
  );

  const Step2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-stone-800">{t.wizard.step2}</h3>
        <button 
          onClick={addIngredient}
          className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl text-xs font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {t.wizard.addIngredient}
        </button>
      </div>
      <div className="space-y-4">
        {formData.ingredients.map((ing, idx) => (
          <div key={idx} className="flex gap-4 items-end animate-fade-in bg-stone-50/30 p-4 rounded-2xl border border-stone-50">
            <div className="flex-grow space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase">{t.wizard.ingredientName}</label>
              <input 
                type="text" 
                value={ing.name}
                onChange={e => updateIngredient(idx, 'name', e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                placeholder={lang === 'ar' ? 'مثلاً: دقيق' : 'e.g. Flour'} 
              />
            </div>
            <div className="w-24 space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase">{t.wizard.amount}</label>
              <input 
                type="text" 
                value={ing.amount}
                onChange={e => updateIngredient(idx, 'amount', e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 outline-none" 
              />
            </div>
            <div className="w-32 space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase">{t.wizard.unit}</label>
              <select 
                value={ing.unit}
                onChange={e => updateIngredient(idx, 'unit', e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-xl px-4 py-3 outline-none"
              >
                <option>{lang === 'ar' ? 'غرام' : 'g'}</option>
                <option>{lang === 'ar' ? 'كوب' : 'Cup'}</option>
                <option>{lang === 'ar' ? 'ملعقة كبيرة' : 'tbsp'}</option>
                <option>{lang === 'ar' ? 'ملعقة صغيرة' : 'tsp'}</option>
                <option>{lang === 'ar' ? 'حبة' : 'Piece'}</option>
              </select>
            </div>
            {formData.ingredients.length > 1 && (
              <button 
                onClick={() => removeIngredient(idx)}
                className="p-3 text-stone-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Step3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-xl font-bold text-stone-800">{t.wizard.step3}</h3>
        <button 
          onClick={addStep}
          className="bg-orange-50 text-orange-600 px-6 py-3 rounded-2xl text-xs font-bold hover:bg-orange-600 hover:text-white transition-all flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          {t.wizard.addStep}
        </button>
      </div>
      <div className="space-y-8">
        {formData.steps.map((step, idx) => (
          <div key={idx} className="flex gap-6 items-start group animate-fade-in relative p-6 bg-stone-50/50 rounded-3xl border border-stone-50">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-stone-300 flex-shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
              {idx + 1}
            </div>
            <div className="flex-grow space-y-4">
              <textarea 
                value={step.instruction}
                onChange={e => updateStep(idx, e.target.value)}
                className="w-full bg-white border border-stone-100 rounded-2xl px-6 py-4 outline-none h-24 focus:ring-4 focus:ring-orange-100 transition-all resize-none"
                placeholder={t.wizard.stepInstruction}
              ></textarea>
              <div className="flex items-center gap-4">
                 <button className="text-[10px] font-black text-stone-400 uppercase tracking-widest flex items-center gap-2 hover:text-orange-600 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                   {t.dishPhotoLabel}
                 </button>
              </div>
            </div>
            {formData.steps.length > 1 && (
              <button 
                onClick={() => removeStep(idx)}
                className="p-3 text-stone-300 hover:text-red-500 transition-all hover:bg-red-50 rounded-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const Step4 = () => (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.dishPhotoLabel}</label>
          <div className="p-8 border-2 border-dashed border-stone-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-orange-300 transition-all cursor-pointer bg-stone-50/50 min-h-[200px]">
            <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className="text-stone-800 font-bold text-sm">{t.uploadPhoto}</p>
          </div>
        </div>

        {/* Enhanced Video Upload */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.reelLabel}</label>
            <span className="text-[10px] bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-black uppercase tracking-tighter">60s Max</span>
          </div>
          
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            ref={videoInputRef}
            onChange={handleVideoChange}
          />

          <div 
            onClick={() => !videoPreview && videoInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-[2.5rem] transition-all overflow-hidden group min-h-[200px] flex flex-col items-center justify-center ${
              videoPreview 
                ? 'border-orange-500 bg-stone-900 ring-4 ring-orange-50' 
                : 'border-stone-200 bg-stone-50/50 hover:border-orange-400 hover:bg-white cursor-pointer'
            }`}
          >
            {videoPreview ? (
              <div className="w-full h-full absolute inset-0 flex items-center justify-center group/preview">
                <video 
                  src={videoPreview} 
                  className="w-full h-full object-cover opacity-60 group-hover/preview:opacity-80 transition-opacity" 
                  muted 
                  loop 
                  onMouseOver={(e) => e.currentTarget.play()} 
                  onMouseOut={(e) => e.currentTarget.pause()}
                />
                
                {/* Remove Button Overlay */}
                <div className="absolute top-4 right-4 z-20">
                  <button 
                    onClick={removeVideo}
                    className="bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-xl transition-all hover:scale-110 active:scale-90 flex items-center gap-2 group/remove"
                    title={lang === 'ar' ? 'حذف الفيديو' : 'Remove Video'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    <span className="max-w-0 overflow-hidden group-hover/remove:max-w-xs transition-all duration-300 text-xs font-bold whitespace-nowrap">
                      {lang === 'ar' ? 'حذف الفيديو' : 'Remove Video'}
                    </span>
                  </button>
                </div>

                {/* Metadata Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent text-white text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-xs font-black truncate max-w-[200px]">{videoName}</span>
                  </div>
                  <p className="text-[10px] text-stone-300 font-medium">{lang === 'ar' ? 'مرر الماوس للمعاينة' : 'Hover to preview'}</p>
                </div>

                {/* Play Icon Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/preview:opacity-0 transition-opacity">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                </div>
                <p className="text-stone-800 font-bold text-sm">{t.uploadVideo}</p>
                <p className="text-[10px] text-stone-400 mt-1">{t.videoHint}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-sm font-black text-stone-400 uppercase tracking-widest block">{t.externalVideoLabel}</label>
        <div className="relative group">
          <input 
            type="url" 
            value={formData.externalVideoUrl}
            onChange={e => updateField('externalVideoUrl', e.target.value)}
            className="w-full bg-stone-50 border border-stone-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-orange-100 transition-all font-medium" 
            placeholder={t.externalVideoPlaceholder} 
          />
        </div>
      </div>
    </div>
  );

  const Step5 = () => (
    <div className="space-y-12 animate-fade-in">
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-stone-800">{t.wizard.step5}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-4 p-8 bg-stone-50 rounded-3xl cursor-pointer hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group">
            <input 
              type="checkbox" 
              checked={formData.allowComments}
              onChange={e => updateField('allowComments', e.target.checked)}
              className="w-6 h-6 accent-orange-600 rounded-lg" 
            />
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <span className="block font-black text-stone-800 group-hover:text-orange-900">{t.wizard.allowComments}</span>
              <span className="text-xs text-stone-400">{lang === 'ar' ? 'اسمح للمجتمع بمشاركة تجاربهم.' : 'Allow the community to share their experiences.'}</span>
            </div>
          </label>
          <label className="flex items-center gap-4 p-8 bg-stone-50 rounded-3xl cursor-pointer hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-all group">
            <input 
              type="checkbox" 
              checked={formData.isFeatured}
              onChange={e => updateField('isFeatured', e.target.checked)}
              className="w-6 h-6 accent-orange-600 rounded-lg" 
            />
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <span className="block font-black text-stone-800 group-hover:text-orange-900">{t.wizard.featuredRecipe}</span>
              <span className="text-xs text-stone-400">{lang === 'ar' ? 'ضع وصفتك في الواجهة الرئيسية.' : 'Place your recipe on the main homepage.'}</span>
            </div>
          </label>
        </div>
      </div>

      <div className="p-10 bg-orange-50/50 rounded-[3rem] border-2 border-dashed border-orange-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
          <h4 className="text-2xl font-black text-orange-900 mb-2">{t.wizard.preview}</h4>
          <p className="text-stone-500 font-medium leading-relaxed max-w-md">{lang === 'ar' ? 'اضغط للمعاينة النهائية والتأكد من تنسيق الخطوات والصور بشكل لائق.' : 'Click for final preview to ensure steps and images are formatted correctly.'}</p>
        </div>
        <button className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-black shadow-xl shadow-orange-100/50 hover:bg-orange-600 hover:text-white transition-all active:scale-95 whitespace-nowrap">
          {t.wizard.preview}
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in bg-white p-8 md:p-20 rounded-[4.5rem] border border-stone-100 shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-orange-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-stone-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-0"></div>

      <div className="flex justify-between items-start mb-20 relative z-10">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-stone-900 font-serif-ar leading-tight">{t.publishRecipeTitle}</h2>
          <div className="flex items-center gap-2 mt-4">
             <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
             <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px]">{(t.wizard as any)[`step${currentStep}`]}</p>
          </div>
        </div>
        <button onClick={onCancel} className="text-stone-300 hover:text-stone-900 transition-all p-4 hover:bg-stone-50 rounded-3xl border border-transparent hover:border-stone-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="relative z-10 min-h-[500px]">
        {renderProgress()}

        <form onSubmit={e => e.preventDefault()} className="mt-12">
          {currentStep === 1 && <Step1 />}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}
          {currentStep === 4 && <Step4 />}
          {currentStep === 5 && <Step5 />}
        </form>
      </div>

      <div className="mt-20 pt-12 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex gap-4 w-full md:w-auto order-2 md:order-1">
          {currentStep > 1 && (
            <button 
              onClick={handlePrev}
              className="flex-1 md:flex-none px-10 py-5 bg-stone-100 text-stone-500 rounded-[2rem] font-black hover:bg-stone-200 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              {t.wizard.prev}
            </button>
          )}
          <button 
            onClick={() => onSubmit(formData)} 
            className="flex-1 md:flex-none px-10 py-5 bg-stone-900 text-white/60 rounded-[2rem] font-black hover:bg-stone-800 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg>
            {t.saveDraft}
          </button>
        </div>

        {currentStep < totalSteps ? (
          <button 
            onClick={handleNext}
            className="w-full md:w-auto px-16 py-6 bg-orange-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 order-1 md:order-2"
          >
            {t.wizard.next}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-7 w-7 ${lang === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        ) : (
          <button 
            onClick={() => onSubmit(formData)}
            className="w-full md:w-auto px-16 py-6 bg-orange-600 text-white rounded-[2.5rem] font-black text-xl shadow-2xl shadow-orange-200 hover:bg-orange-700 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 order-1 md:order-2"
          >
            {t.wizard.publish}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AddRecipeForm;
