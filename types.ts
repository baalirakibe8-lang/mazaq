
export type Category = 'حلويات' | 'أطباق رئيسية' | 'سريعة' | 'صحية' | 'مقبلات';

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  followers?: number;
  isVerified?: boolean;
  coverImage?: string;
}

export interface Video {
  id: string;
  chefId: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  duration: string;
  date: string;
}

export interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export interface Step {
  instruction: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  prepTime: number; // minutes
  cookTime: number; // minutes
  servings: number;
  difficulty: 'سهل' | 'متوسط' | 'صعب';
  ingredients: Ingredient[];
  steps: Step[];
  featured?: boolean;
  rating: number;
  reviews: number;
  tags: string[];
  nutrition: Nutrition;
  author: Author;
  videoId?: string;
  externalVideoUrl?: string;
  allowComments?: boolean;
  isDraft?: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  format: 'PDF' | 'ePub';
  type: 'E-Book' | 'Course';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  image: string;
}
