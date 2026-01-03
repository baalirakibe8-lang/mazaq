
import React from 'react';
import { Video } from '../types';

// Fix: Added lang to VideoCardProps
interface VideoCardProps {
  video: Video;
  chefName?: string;
  onClick: (id: string) => void;
  lang: 'ar' | 'en';
}

const VideoCard: React.FC<VideoCardProps> = ({ video, chefName, onClick, lang }) => {
  return (
    <div 
      onClick={() => onClick(video.id)}
      className="group relative rounded-[2rem] overflow-hidden bg-stone-200 aspect-[9/16] cursor-pointer shadow-lg hover:shadow-2xl transition-all"
    >
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
      
      {/* Overlay Info */}
      <div className={`absolute inset-x-0 bottom-0 p-6 text-white ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold">
            {video.duration}
          </div>
          <div className="flex items-center gap-1.5 bg-orange-600/90 px-3 py-1 rounded-full text-[10px] font-bold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {video.views >= 1000 ? `${(video.views / 1000).toFixed(1)}k` : video.views}
          </div>
        </div>
        
        <h3 className="text-lg font-bold mb-1 line-clamp-2 leading-tight font-serif-ar">{video.title}</h3>
        {chefName && <p className="text-white/60 text-xs font-medium">{lang === 'ar' ? 'بواسطة' : 'By'} {chefName}</p>}
      </div>

      {/* Play Icon */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 scale-75 group-hover:scale-100 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 text-white ${lang === 'ar' ? 'translate-x-1' : '-translate-x-1 rotate-180'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
