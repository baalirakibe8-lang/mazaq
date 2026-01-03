
import React from 'react';
import { translations } from '../translations';

interface FooterProps {
  lang: 'ar' | 'en';
}

const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {t.brand[0]}
              </div>
              <span className="text-xl font-bold font-serif-ar text-white">{t.brand}</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              {lang === 'ar' 
                ? "منصة عربية متكاملة تهدف لإثراء المحتوى العربي بوصفات طبخ احترافية سهلة التنفيذ، لتجعل من الطبخ متعة يومية."
                : "A comprehensive platform aiming to enrich Arab content with professional cooking recipes that are easy to execute, making cooking a daily joy."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-white font-bold mb-6 border-stone-600 ${lang === 'ar' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'}`}>{lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">{lang === 'ar' ? 'أحدث الوصفات' : 'Latest Recipes'}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{lang === 'ar' ? 'نصائح المطبخ' : 'Kitchen Tips'}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{lang === 'ar' ? 'كتب الطبخ' : 'Cookbooks'}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className={`text-white font-bold mb-6 border-stone-600 ${lang === 'ar' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'}`}>{lang === 'ar' ? 'الأقسام' : 'Categories'}</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-orange-400 transition-colors">{t.categories.desserts}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{t.categories.main}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{t.categories.healthy}</a></li>
              <li><a href="#" className="hover:text-orange-400 transition-colors">{t.categories.fast}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className={`text-white font-bold mb-6 border-stone-600 ${lang === 'ar' ? 'border-r-4 pr-3' : 'border-l-4 pl-3'}`}>{lang === 'ar' ? 'نشرتنا البريدية' : 'Newsletter'}</h4>
            <p className="text-xs text-stone-500 mb-4">{lang === 'ar' ? 'اشترك ليصلك أحدث الوصفات والنصائح مباشرة إلى بريدك.' : 'Subscribe to get the latest recipes and tips directly in your inbox.'}</p>
            <div className={`flex ${lang === 'ar' ? '' : 'flex-row-reverse'}`}>
              <input 
                type="email" 
                placeholder={lang === 'ar' ? 'بريدك الإلكتروني' : 'Your Email'} 
                className={`bg-stone-800 border-none px-4 py-2 w-full text-sm focus:ring-1 focus:ring-orange-600 outline-none ${lang === 'ar' ? 'rounded-r-md' : 'rounded-l-md'}`}
              />
              <button className={`bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 transition-colors text-sm font-bold ${lang === 'ar' ? 'rounded-l-md' : 'rounded-r-md'}`}>
                {lang === 'ar' ? 'اشترك' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center text-xs text-stone-600">
          <p>{lang === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'} &copy; {new Date().getFullYear()} {t.brand}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
