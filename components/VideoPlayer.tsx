
import React from 'react';
import { Video, Author } from '../types';
import { translations } from '../translations';

// Fix: Added lang to VideoPlayerProps
interface VideoPlayerProps {
  video: Video;
  chef: Author;
  onClose: () => void;
  lang: 'ar' | 'en';
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, chef, onClose, lang }) => {
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 md:p-12 animate-fade-in">
      <button 
        onClick={onClose}
        className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} text-white/50 hover:text-white transition-colors z-10`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Video Canvas */}
        <div className="lg:col-span-7 relative aspect-[9/16] max-h-[85vh] mx-auto rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 group">
          <img src={video.thumbnail} className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" />
          <div className="relative h-full flex items-center justify-center bg-black/40">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-12 w-12 text-white ${lang === 'ar' ? 'translate-x-1' : '-translate-x-1 rotate-180'}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-12 inset-x-8 flex justify-between items-end">
             <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                  <img src={chef.avatar} className="w-12 h-12 rounded-full border-2 border-white shadow-lg" />
                  <span className="text-white font-bold">{chef.name}</span>
                  <button className="bg-orange-600 text-white px-4 py-1 rounded-lg text-xs font-bold">{t.follow}</button>
                </div>
                <h2 className="text-2xl font-black text-white font-serif-ar">{video.title}</h2>
             </div>
             <div className="flex flex-col gap-6 text-white items-center">
               <button className="flex flex-col items-center gap-1 group">
                 <div className="p-3 bg-white/10 rounded-full group-hover:bg-red-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" /></svg></div>
                 <span className="text-[10px] font-bold">12.5k</span>
               </button>
               <button className="flex flex-col items-center gap-1 group">
                 <div className="p-3 bg-white/10 rounded-full group-hover:bg-blue-500 transition-all"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" /></svg></div>
                 <span className="text-[10px] font-bold">428</span>
               </button>
             </div>
          </div>
        </div>

        {/* Video Side Info */}
        <div className={`lg:col-span-5 space-y-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div>
             <h3 className="text-orange-400 font-black uppercase tracking-widest text-sm mb-4">{lang === 'ar' ? 'وصف الفيديو' : 'Video Description'}</h3>
             <p className="text-stone-300 text-lg leading-relaxed italic">"{video.description}"</p>
          </div>
          
          <div className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
             <h4 className="text-white font-bold mb-6">{lang === 'ar' ? 'وصفات ذات صلة' : 'Related Recipes'}</h4>
             <div className="space-y-4">
               <div className={`flex items-center gap-4 cursor-pointer hover:bg-white/5 p-3 rounded-2xl transition-colors ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                 <div className="w-16 h-16 bg-stone-800 rounded-xl overflow-hidden"><img src={video.thumbnail} className="w-full h-full object-cover" /></div>
                 <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <h5 className="text-white font-bold text-sm">{video.title}</h5>
                    <p className="text-stone-500 text-xs">{lang === 'ar' ? 'وصفة مكتوبة بالتفصيل' : 'Written recipe details'}</p>
                 </div>
               </div>
             </div>
          </div>

          <button className="w-full bg-white text-stone-900 py-5 rounded-2xl font-black text-lg hover:bg-orange-600 hover:text-white transition-all shadow-2xl">
            {lang === 'ar' ? 'شاهد الوصفة المكتوبة' : 'View Written Recipe'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
