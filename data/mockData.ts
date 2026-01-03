
import { Recipe, Product, BlogPost, Author, Video, Ingredient, Step } from '../types';

export const CHEFS: Author[] = [
  {
    id: 'chef-hisham',
    name: 'شيف هشام',
    avatar: 'https://i.pravatar.cc/150?u=hisham',
    coverImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200',
    bio: 'خبير في المطبخ الخليجي والتراثي، صاحب خبرة 15 عاماً في فنون الطهي الشعبي.',
    followers: 12500,
    isVerified: true
  },
  {
    id: 'chef-sara',
    name: 'سارة أحمد',
    avatar: 'https://i.pravatar.cc/150?u=sara',
    coverImage: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?auto=format&fit=crop&q=80&w=1200',
    bio: 'متخصصة في الحلويات الغربية والباتيسيري الفرنسي. أحب تبسيط الوصفات المعقدة.',
    followers: 8900,
    isVerified: true
  },
  {
    id: 'chef-layla',
    name: 'الشيف ليلى',
    avatar: 'https://i.pravatar.cc/150?u=layla',
    coverImage: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80&w=1200',
    bio: 'أؤمن أن الأكل الصحي لا يعني الحرمان. أقدم لكم وصفات غنية وبمكونات طبيعية.',
    followers: 21000,
    isVerified: true
  },
  {
    id: 'chef-marco',
    name: 'شيف ماركو',
    avatar: 'https://i.pravatar.cc/150?u=marco',
    coverImage: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&q=80&w=1200',
    bio: 'مختص في المطبخ الإيطالي الكلاسيكي والمعجنات. السر دائماً في جودة زيت الزيتون.',
    followers: 15400,
    isVerified: true
  }
];

export const VIDEOS: Video[] = [
  {
    id: 'v1',
    chefId: 'chef-hisham',
    title: 'سر تتبيلة المندي الأصلية',
    description: 'في هذا الفيديو أكشف لكم السر الذي يخفيه أصحاب المطاعم عن بهارات المندي.',
    thumbnail: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=400',
    videoUrl: '#',
    views: 45000,
    duration: '03:45',
    date: '2023-11-20'
  },
  {
    id: 'v2',
    chefId: 'chef-sara',
    title: 'تزيين الكيك كالمحترفين',
    description: 'تعلمي 3 حركات بسيطة تجعل كيكتك تبدو وكأنها من أشهر المخابز العالمية.',
    thumbnail: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
    videoUrl: '#',
    views: 12000,
    duration: '05:12',
    date: '2023-12-05'
  },
  {
    id: 'v3',
    chefId: 'chef-marco',
    title: 'عجينة البيتزا الإيطالية',
    description: 'كيف تحصل على عجينة هشة ومقرمشة في فرن البيت العادي.',
    thumbnail: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400',
    videoUrl: '#',
    views: 33000,
    duration: '08:20',
    date: '2024-01-10'
  }
];

export const RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'مندي الدجاج الأصلي',
    description: 'طريقة عمل مندي الدجاج بالبيت بنكهة المطاعم والتدخين الرائع. سر النكهة يكمن في البهارات الطازجة.',
    image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 20,
    cookTime: 60,
    servings: 4,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'دجاجة كاملة مقطعة', amount: '1', unit: 'حبة' },
      { name: 'أرز بسمتي', amount: '3', unit: 'كوب' },
      { name: 'بصل مفروم', amount: '2', unit: 'حبة' },
      { name: 'بهارات مندي', amount: '2', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'تبلي الدجاج بالملح والبهارات والمطيبات جيداً.' },
      { instruction: 'في قدر واسع، قلبي البصل حتى يذبل ثم أضيفي الأرز والماء.' },
      { instruction: 'ضعي الدجاج فوق الأرز باستخدام شبك أو قصدير مثقب.' }
    ],
    featured: true,
    rating: 4.9,
    reviews: 128,
    tags: ['تراثي', 'أرز', 'خليجي'],
    nutrition: { calories: 540, protein: 35, carbs: 45, fat: 22 },
    author: CHEFS[0],
    externalVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'كيكة الشوكولاتة الفاخرة',
    description: 'كيكة هشة وغنية بصوص الشوكولاتة الكريمي، مثالية للمناسبات العائلية والسهرات.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    category: 'حلويات',
    prepTime: 15,
    cookTime: 40,
    servings: 8,
    difficulty: 'سهل',
    ingredients: [
      { name: 'دقيق', amount: '2', unit: 'كوب' },
      { name: 'كاكاو خام', amount: '0.5', unit: 'كوب' },
      { name: 'بيض', amount: '3', unit: 'حبة' },
      { name: 'حليب', amount: '1', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'سخني الفرن على حرارة 180 درجة مئوية قبل البدء.' },
      { instruction: 'اخفقي البيض مع السكر والفانيليا حتى يتضاعف حجمه.' },
      { instruction: 'أضيفي المكونات السائلة ثم الجافة تدريجياً مع التقليب الهادئ.' }
    ],
    featured: true,
    rating: 4.7,
    reviews: 85,
    tags: ['حلويات', 'شوكولاتة', 'مناسبات'],
    nutrition: { calories: 320, protein: 6, carbs: 40, fat: 15 },
    author: CHEFS[1]
  },
  {
    id: '3',
    title: 'مقلوبة الباذنجان واللحم',
    description: 'الطبق الفلسطيني الأشهر، طبقات من الباذنجان المقلي واللحم الطري والأرز المتبل، تقلب لتكشف عن لوحة فنية شهية.',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 40,
    cookTime: 90,
    servings: 6,
    difficulty: 'صعب',
    ingredients: [
      { name: 'لحم غنم مقطع', amount: '1', unit: 'كيلو' },
      { name: 'باذنجان كبير', amount: '2', unit: 'حبة' },
      { name: 'أرز بسمتي', amount: '3', unit: 'كوب' },
      { name: 'بهارات مشكلة', amount: '1', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'اسلقي اللحم مع المطيبات حتى ينضج تماماً.' },
      { instruction: 'قطعي الباذنجان لدوائر واقليه حتى يصبح ذهبياً.' },
      { instruction: 'في قدر عميق، صفي الباذنجان ثم اللحم ثم الأرز.' },
      { instruction: 'أضيفي مرق اللحم المصفى واتركيه يطهى على نار هادئة.' }
    ],
    rating: 4.8,
    reviews: 210,
    tags: ['فلسطيني', 'باذنجان', 'تراثي'],
    nutrition: { calories: 650, protein: 42, carbs: 55, fat: 28 },
    author: CHEFS[0]
  },
  {
    id: '4',
    title: 'بيتزا نابوليتانا الأصلية',
    description: 'بيتزا رقيقة من المنتصف مع أطراف مرتفعة وهشة، مغطاة بصلصة الطماطم الإيطالية وجبنة الموزاريلا الطازجة والريحان.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 120,
    cookTime: 10,
    servings: 2,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'دقيق إيطالي 00', amount: '500', unit: 'غرام' },
      { name: 'خميرة طازجة', amount: '10', unit: 'غرام' },
      { name: 'طماطم معلبة نوع San Marzano', amount: '1', unit: 'علبة' },
      { name: 'موزاريلا بافلو', amount: '200', unit: 'غرام' }
    ],
    steps: [
      { instruction: 'اعجني الدقيق والماء والملح والخميرة جيداً واتركيها تتخمر 24 ساعة.' },
      { instruction: 'افردي العجينة يدوياً للحفاظ على الهواء في الأطراف.' },
      { instruction: 'وزعي الصلصة والجبن والريحان وقليل من زيت الزيتون.' },
      { instruction: 'اخبزيها في فرن شديد الحرارة لمدة دقيقتين.' }
    ],
    rating: 4.9,
    reviews: 320,
    tags: ['إيطالي', 'عالمي', 'معجنات'],
    nutrition: { calories: 480, protein: 18, carbs: 62, fat: 14 },
    author: CHEFS[3],
    videoId: 'v3'
  },
  {
    id: '5',
    title: 'سلطة الكينوا بالأفوكادو',
    description: 'وجبة خفيفة، صحية، ومليئة بالبروتينات النباتية والألياف. مثالية لمن يتبعون حمية غذائية أو يبحثون عن نشاط دائم.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    category: 'صحية',
    prepTime: 15,
    cookTime: 15,
    servings: 2,
    difficulty: 'سهل',
    ingredients: [
      { name: 'كينوا بيضاء', amount: '1', unit: 'كوب' },
      { name: 'أفوكادو ناضج', amount: '1', unit: 'حبة' },
      { name: 'طماطم كرزية', amount: '1', unit: 'كوب' },
      { name: 'عصير ليمون', amount: '2', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'اغسلي الكينوا واسلقيها في ماء مملح لـ 15 دقيقة.' },
      { instruction: 'قطعي الأفوكادو والطماطم لمكعبات صغيرة.' },
      { instruction: 'اخلطي الكينوا الباردة مع الخضروات وأضيفي زيت الزيتون والليمون.' }
    ],
    rating: 4.5,
    reviews: 94,
    tags: ['صحي', 'دايت', 'نباتي'],
    nutrition: { calories: 350, protein: 12, carbs: 45, fat: 18 },
    author: CHEFS[2]
  },
  {
    id: '6',
    title: 'ستيك اللحم بصوص المشروم',
    description: 'قطعة لحم تندرلوين مشوية بدقة مع صوص الكريمة والمشروم الطازج. طبق كلاسيكي للمناسبات الخاصة.',
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'لحم بقري تندرلوين', amount: '250', unit: 'غرام' },
      { name: 'مشروم طازج', amount: '100', unit: 'غرام' },
      { name: 'كريمة طبخ', amount: '1', unit: 'كوب' },
      { name: 'زبدة', amount: '2', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'تبلي اللحم بالملح والفلفل الأسود فقط.' },
      { instruction: 'اشوي اللحم في مقلاة ساخنة جداً مع الزبدة والروزماري.' },
      { instruction: 'في نفس المقلاة، شوحي المشروم وأضيفي الكريمة حتى تثقل.' }
    ],
    rating: 4.8,
    reviews: 142,
    tags: ['لحوم', 'فاخر', 'فرنسي'],
    nutrition: { calories: 720, protein: 45, carbs: 10, fat: 58 },
    author: CHEFS[3]
  },
  {
    id: '7',
    title: 'فلافل منزلية مقرمشة',
    description: 'تعلمي سر الفلافل الذهبية المقرمشة من الخارج والطرية من الداخل باستخدام الحمص الطازج والأعشاب فواحة الرائحة.',
    image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&q=80&w=800',
    category: 'مقبلات',
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'حمص منقوع', amount: '500', unit: 'غرام' },
      { name: 'بقدونس وكزبرة', amount: '1', unit: 'حزمة' },
      { name: 'ثوم وبصل', amount: '1', unit: 'حبة' },
      { name: 'بيكربونات الصودا', amount: '1', unit: 'ملعقة صغيرة' }
    ],
    steps: [
      { instruction: 'اطحني الحمص المنقوع مع الأعشاب والثوم في محضرة الطعام.' },
      { instruction: 'أضيفي البهارات واتركي العجينة ترتاح قليلاً.' },
      { instruction: 'أضيفي الصودا قبل القلي مباشرة وشكلي الأقراص.' },
      { instruction: 'اقليها في زيت غزير وحار جداً.' }
    ],
    rating: 4.7,
    reviews: 256,
    tags: ['شعبي', 'نباتي', 'مقلي'],
    nutrition: { calories: 380, protein: 18, carbs: 40, fat: 12 },
    author: CHEFS[0]
  },
  {
    id: '8',
    title: 'تشيز كيك اللوتس البارد',
    description: 'حلوى باردة لا تقاوم، طبقة من بسكويت اللوتس المقرمش تليها كريمة الجبن الغنية مغطاة بزبدة اللوتس الذائبة.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    category: 'حلويات',
    prepTime: 30,
    cookTime: 0,
    servings: 10,
    difficulty: 'سهل',
    ingredients: [
      { name: 'بسكويت لوتس', amount: '250', unit: 'غرام' },
      { name: 'زبدة ذائبة', amount: '100', unit: 'غرام' },
      { name: 'جبن كريمي', amount: '400', unit: 'غرام' },
      { name: 'كريمة خفق', amount: '1', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'اطحني البسكويت واخلطيه بالزبدة واضغطيه في القالب.' },
      { instruction: 'اخفقي الجبن مع الكريمة والسكر البودرة.' },
      { instruction: 'صبي الخليط فوق القاعدة واتركيه يبرد لـ 6 ساعات.' },
      { instruction: 'ذوبي زبدة اللوتس وزيني بها الوجه.' }
    ],
    rating: 5.0,
    reviews: 412,
    tags: ['حلويات', 'لوتس', 'بارد'],
    nutrition: { calories: 450, protein: 6, carbs: 42, fat: 32 },
    author: CHEFS[1]
  },
  {
    id: '9',
    title: 'تورتيلا الدجاج السريعة',
    description: 'وجبة عشاء مثالية في أقل من 20 دقيقة، شرائح دجاج متبلة مع فلفل ملون وجبنة ذائبة داخل خبز التورتيلا.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
    category: 'سريعة',
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: 'سهل',
    ingredients: [
      { name: 'صدور دجاج شرائح', amount: '2', unit: 'حبة' },
      { name: 'خبز تورتيلا', amount: '4', unit: 'رغيف' },
      { name: 'فلفل رومي ألوان', amount: '2', unit: 'حبة' },
      { name: 'جبن شيدر مبشور', amount: '1', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'شوحي الدجاج مع البهارات والفلفل حتى ينضج.' },
      { instruction: 'ضعي الخليط داخل التورتيلا مع الجبن.' },
      { instruction: 'حمري الخبز في مقلاة جافة من الجانبين حتى يذوب الجبن.' }
    ],
    rating: 4.4,
    reviews: 118,
    tags: ['سريع', 'دجاج', 'عشاء'],
    nutrition: { calories: 420, protein: 32, carbs: 28, fat: 18 },
    author: CHEFS[2]
  },
  {
    id: '10',
    title: 'شوربة العدس التقليدية',
    description: 'رفيق الشتاء الدافئ، شوربة عدس أصفر غنية بالنكهات والبهارات الدافئة، تقدم مع الخبز المحمص والليمون.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    category: 'صحية',
    prepTime: 10,
    cookTime: 25,
    servings: 4,
    difficulty: 'سهل',
    ingredients: [
      { name: 'عدس أصفر', amount: '1', unit: 'كوب' },
      { name: 'جزر وبصل وبطاطس', amount: '1', unit: 'حبة لكل نوع' },
      { name: 'كمون وكركم', amount: '1', unit: 'ملعقة صغيرة' },
      { name: 'ماء أو مرق', amount: '1.5', unit: 'لتر' }
    ],
    steps: [
      { instruction: 'ضعي العدس والخضروات والماء في قدر واتركيها تغلي.' },
      { instruction: 'عندما تنضج الخضروات، اخلطي الشوربة بالخلاط اليدوي.' },
      { instruction: 'أضيفي البهارات وقليل من السمن وقدميها ساخنة.' }
    ],
    rating: 4.8,
    reviews: 302,
    tags: ['شتاء', 'صحي', 'شوربات'],
    nutrition: { calories: 210, protein: 14, carbs: 32, fat: 5 },
    author: CHEFS[0]
  },
  {
    id: '11',
    title: 'المنسف الأردني بالجميد',
    description: 'سيد الموائد الأردنية، لحم غنم مطهو في لبن الجميد الكركي، يقدم على خبز الشراك والأرز المزين بالمكسرات.',
    image: 'https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 40,
    cookTime: 150,
    servings: 8,
    difficulty: 'صعب',
    ingredients: [
      { name: 'لحم غنم بلدي بالعظم', amount: '2', unit: 'كيلو' },
      { name: 'جميد كركي أصلي', amount: '1', unit: 'حبة كبيرة' },
      { name: 'أرز بلدي أو مصري', amount: '4', unit: 'كوب' },
      { name: 'خبز شراك', amount: '2', unit: 'رغيف' }
    ],
    steps: [
      { instruction: 'اسلقي اللحم نصف نضجة مع المطيبات.' },
      { instruction: 'ذوبي الجميد واخلطيه جيداً ثم أضيفيه للحم وأكملي النضج.' },
      { instruction: 'اطبخي الأرز بالسمن البلدي والكركم.' },
      { instruction: 'في سدر واسع، ضعي الشراك ثم الأرز ثم اللحم وزيني بالمكسرات.' }
    ],
    rating: 5.0,
    reviews: 520,
    tags: ['أردني', 'تراثي', 'منسف'],
    nutrition: { calories: 880, protein: 55, carbs: 75, fat: 42 },
    author: CHEFS[0]
  },
  {
    id: '12',
    title: 'كنافة نابلسية خشنة',
    description: 'تربعت على عرش الحلويات العربية، كنافة محشوة بجبن العكاوي المطاطي تسقى بالقطر الساخن.',
    image: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?auto=format&fit=crop&q=80&w=800',
    category: 'حلويات',
    prepTime: 20,
    cookTime: 20,
    servings: 6,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'عجينة كنافة خشنة', amount: '500', unit: 'غرام' },
      { name: 'سمن بلدي', amount: '1', unit: 'كوب' },
      { name: 'جبن عكاوي محلى', amount: '400', unit: 'غرام' },
      { name: 'فستق حلبي للتزيين', amount: '0.5', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'افركي الكنافة بالسمن المذاب جيداً في صينية.' },
      { instruction: 'وزعي الجبن فوق الكنافة بالتساوي.' },
      { instruction: 'ضعيها على نار هادئة مع التحريك المستمر للصينية.' },
      { instruction: 'اقلبي الكنافة واسقيها بالقطر الساخن فوراً.' }
    ],
    rating: 4.9,
    reviews: 284,
    tags: ['حلويات', 'شرقي', 'تراثي'],
    nutrition: { calories: 520, protein: 12, carbs: 58, fat: 34 },
    author: CHEFS[0]
  },
  {
    id: '13',
    title: 'باستا الكاربونارا الإيطالية',
    description: 'الطريقة التقليدية لباستا الكاربونارا بدون كريمة، تعتمد على حرارة المعكرونة لطهي خليط البيض والجبن.',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'سباغيتي', amount: '250', unit: 'غرام' },
      { name: 'لحم مقدد (Guanciale)', amount: '100', unit: 'غرام' },
      { name: 'بيض طازج', amount: '3', unit: 'حبة' },
      { name: 'جبن بيكورينو رومانو', amount: '50', unit: 'غرام' }
    ],
    steps: [
      { instruction: 'اسلقي المعكرونة في ماء مملح واتركي كوباً من ماء السلق.' },
      { instruction: 'اقلي اللحم في مقلاة حتى يقرمش.' },
      { instruction: 'اخلطي البيض مع الجبن والفلفل الأسود.' },
      { instruction: 'ارفعي المقلاة عن النار وأضيفي الباستا وخليط البيض مع التقليب المستمر.' }
    ],
    rating: 4.6,
    reviews: 82,
    tags: ['إيطالي', 'عالمي', 'باستا'],
    nutrition: { calories: 580, protein: 24, carbs: 68, fat: 26 },
    author: CHEFS[3]
  },
  {
    id: '14',
    title: 'سلطة السيزر بالدجاج المشوي',
    description: 'أشهر أنواع السلطات العالمية، خس طازج مع صوص السيزر الكريمي المنزلي وقطع الدجاج المشوية والخبز المحمص.',
    image: 'https://images.unsplash.com/photo-1550317138-10000687ad32?auto=format&fit=crop&q=80&w=800',
    category: 'صحية',
    prepTime: 15,
    cookTime: 10,
    servings: 2,
    difficulty: 'سهل',
    ingredients: [
      { name: 'خس روماني', amount: '1', unit: 'حبة كبيرة' },
      { name: 'صدر دجاج مشوي', amount: '1', unit: 'حبة' },
      { name: 'خبز محمص (كروتون)', amount: '1', unit: 'كوب' },
      { name: 'جبن بارميزان مبشور', amount: '0.25', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'حضري الصوص بخلط المايونيز والثوم والليمون والخردل.' },
      { instruction: 'قطعي الخس لقطع كبيرة وضعيه في وعاء.' },
      { instruction: 'أضيفي الدجاج المشوي والخبز والجبن وقلبي مع الصوص.' }
    ],
    rating: 4.5,
    reviews: 156,
    tags: ['سلطة', 'صحي', 'دجاج'],
    nutrition: { calories: 380, protein: 28, carbs: 12, fat: 24 },
    author: CHEFS[2]
  },
  {
    id: '15',
    title: 'برجر تكساس المدخن',
    description: 'برجر لحم مشوي على الطريقة الأمريكية مع صوص الباربيكيو المدخن وحلقات البصل المقرمشة.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    category: 'سريعة',
    prepTime: 20,
    cookTime: 10,
    servings: 1,
    difficulty: 'سهل',
    ingredients: [
      { name: 'لحم بقري مفروم', amount: '200', unit: 'غرام' },
      { name: 'خبز بريوش برجر', amount: '1', unit: 'حبة' },
      { name: 'صوص باربيكيو', amount: '2', unit: 'ملعقة كبيرة' },
      { name: 'حلقات بصل مقلية', amount: '4', unit: 'حبة' }
    ],
    steps: [
      { instruction: 'شكلي اللحم على شكل قرص دائري واشوه على الجريل.' },
      { instruction: 'حمري الخبز بالزبدة قليلاً.' },
      { instruction: 'ضعي اللحم فوق الخبز وأضف الصوص والجبن وحلقات البصل.' }
    ],
    rating: 4.7,
    reviews: 198,
    tags: ['سريع', 'لحوم', 'أمريكي'],
    nutrition: { calories: 820, protein: 40, carbs: 48, fat: 52 },
    author: CHEFS[3]
  },
  {
    id: '16',
    title: 'كبسة الدجاج السعودية',
    description: 'الطبق الوطني السعودي، أرز بسمتي طويل الحبة مطبوخ مع الدجاج والبهارات العربية العطرية والليمون الأسود.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b11adca35c?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 25,
    cookTime: 50,
    servings: 5,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'دجاج مقطع', amount: '1', unit: 'كيلو' },
      { name: 'أرز بسمتي', amount: '4', unit: 'كوب' },
      { name: 'بصل مفروم', amount: '2', unit: 'حبة' },
      { name: 'بهارات كبسة', amount: '2', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'شوحي البصل والثوم ثم أضيفي الدجاج والبهارات.' },
      { instruction: 'أضيفي الماء والصلصة واتركي الدجاج حتى ينضج.' },
      { instruction: 'ارفعي الدجاج لتحميره في الفرن وأضيفي الأرز للمرق.' },
      { instruction: 'قدميه ساخناً مع المكسرات والدقوس الحار.' }
    ],
    rating: 4.9,
    reviews: 432,
    tags: ['سعودي', 'خليجي', 'تراثي'],
    nutrition: { calories: 580, protein: 34, carbs: 65, fat: 18 },
    author: CHEFS[0]
  },
  {
    id: '17',
    title: 'ورق عنب بالزيت (يالنجي)',
    description: 'أشهر أنواع المقبلات الشامية، ورق عنب محشو بخلطة الأرز والخضروات الفواحة، مطهو بزيت الزيتون ودبس الرمان.',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&q=80&w=800',
    category: 'مقبلات',
    prepTime: 60,
    cookTime: 120,
    servings: 10,
    difficulty: 'صعب',
    ingredients: [
      { name: 'ورق عنب طازج', amount: '500', unit: 'غرام' },
      { name: 'أرز مصري', amount: '2', unit: 'كوب' },
      { name: 'بقدونس وطماطم ونعناع', amount: '1', unit: 'حزمة لكل نوع' },
      { name: 'دبس رمان', amount: '0.5', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'حضري الحشوة بخلط الأرز مع الخضروات المفرومة والبهارات.' },
      { instruction: 'لفي ورق العنب بإتقان وبشكل متراص.' },
      { instruction: 'رصي شرائح البطاطس في قعر القدر ثم ورق العنب.' },
      { instruction: 'أضيفي المرق (زيت، ليمون، دبس رمان) واطهيه على نار هادئة جداً.' }
    ],
    rating: 4.8,
    reviews: 212,
    tags: ['مقبلات', 'شامي', 'نباتي'],
    nutrition: { calories: 340, protein: 4, carbs: 48, fat: 16 },
    author: CHEFS[2]
  },
  {
    id: '18',
    title: 'تيراميسو إيطالي أصلي',
    description: 'حلوى باردة غنية بنكهة القهوة والكاكاو وجبن الماسكاربوني الكريمي. لا تحتاج لفرن وهي المفضلة لمحبي القهوة.',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    category: 'حلويات',
    prepTime: 30,
    cookTime: 0,
    servings: 6,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'بسكويت ليدي فينجرز', amount: '24', unit: 'حبة' },
      { name: 'جبن ماسكاربوني', amount: '500', unit: 'غرام' },
      { name: 'قهوة اسبريسو باردة', amount: '1', unit: 'كوب' },
      { name: 'كاكاو خام بودرة', amount: '2', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'اخفقي الجبن مع السكر والكريمة حتى يثقل القوام.' },
      { instruction: 'اغمسي البسكويت في القهوة بسرعة ورصيه في القالب.' },
      { instruction: 'ضعي طبقة من الكريمة ثم طبقة بسكويت أخرى.' },
      { instruction: 'رشي الكاكاو على الوجه واتركيه في الثلاجة 12 ساعة.' }
    ],
    rating: 4.7,
    reviews: 165,
    tags: ['إيطالي', 'حلويات', 'بارد'],
    nutrition: { calories: 420, protein: 8, carbs: 35, fat: 28 },
    author: CHEFS[3]
  },
  {
    id: '19',
    title: 'تاكو اللحم المكسيكي',
    description: 'تورتيلا الذرة الطازجة محشوة بلحم متبل ببهارات التاكو الحارة، مغطاة بالصلصة الخضراء والكريمة الحامضة.',
    image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&q=80&w=800',
    category: 'سريعة',
    prepTime: 15,
    cookTime: 15,
    servings: 3,
    difficulty: 'سهل',
    ingredients: [
      { name: 'خبز تورتيلا ذرة', amount: '6', unit: 'رغيف' },
      { name: 'لحم مفروم', amount: '500', unit: 'غرام' },
      { name: 'خس وبصل مفروم', amount: '1', unit: 'كوب' },
      { name: 'صلصة تاكو', amount: '0.5', unit: 'كوب' }
    ],
    steps: [
      { instruction: 'شوحي اللحم مع البهارات المكسيكية حتى يجف.' },
      { instruction: 'سخني التورتيلا قليلاً في مقلاة جافة.' },
      { instruction: 'احشي التورتيلا باللحم والخضروات والصلصة.' }
    ],
    rating: 4.5,
    reviews: 84,
    tags: ['مكسيكي', 'سريع', 'حار'],
    nutrition: { calories: 450, protein: 28, carbs: 32, fat: 22 },
    author: CHEFS[2]
  },
  {
    id: '20',
    title: 'برياني الدجاج الهندي الأصلي',
    description: 'أرز بسمتي معتق مطهو بطريقة التبخير (دم) مع الدجاج المتبل بالزبادي والزعفران والبصل المقلي المقرمش.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=800',
    category: 'أطباق رئيسية',
    prepTime: 40,
    cookTime: 60,
    servings: 6,
    difficulty: 'صعب',
    ingredients: [
      { name: 'أرز بسمتي معتق', amount: '3', unit: 'كوب' },
      { name: 'دجاج منزوع الجلد', amount: '1', unit: 'كيلو' },
      { name: 'زبادي', amount: '1', unit: 'كوب' },
      { name: 'زعفران وماء ورد', amount: '1', unit: 'رشة' }
    ],
    steps: [
      { instruction: 'تبلي الدجاج بالزبادي والبهارات الهندية لـ 3 ساعات.' },
      { instruction: 'اسلقي الأرز نصف نضجة مع المطيبات.' },
      { instruction: 'ضعي طبقة دجاج ثم طبقة أرز ثم بصل مقلي ونعناع.' },
      { instruction: 'غطي القدر بإحكام واتركه يتبخر على نار هادئة جداً.' }
    ],
    rating: 5.0,
    reviews: 382,
    tags: ['هندي', 'عالمي', 'أرز'],
    nutrition: { calories: 680, protein: 42, carbs: 70, fat: 22 },
    author: CHEFS[2]
  },
  {
    id: '21',
    title: 'سلمون مشوي بالليمون والزبدة',
    description: 'شريحة سلمون طرية مشوية مع تتبيلة الثوم والليمون، تقدم مع خضروات سوتيه لوجبة متكاملة وصحية.',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    category: 'صحية',
    prepTime: 10,
    cookTime: 12,
    servings: 1,
    difficulty: 'سهل',
    ingredients: [
      { name: 'شريحة سلمون طازج', amount: '200', unit: 'غرام' },
      { name: 'ثوم مفروم', amount: '1', unit: 'ملعقة صغيرة' },
      { name: 'زبدة باردة', amount: '1', unit: 'ملعقة كبيرة' },
      { name: 'عصير ليمون', amount: '1', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'تبلي السلمون بالملح والفلفل والثوم.' },
      { instruction: 'اشوي السلمون في مقلاة ساخنة من جهة الجلد أولاً.' },
      { instruction: 'أضيفي الزبدة والليمون في النهاية واسقي بها الشريحة.' }
    ],
    rating: 4.9,
    reviews: 145,
    tags: ['بحريات', 'صحي', 'أوميغا3'],
    nutrition: { calories: 420, protein: 38, carbs: 2, fat: 28 },
    author: CHEFS[2]
  },
  {
    id: '22',
    title: 'فطيرة التفاح الكلاسيكية',
    description: 'قاعدة مقرمشة ومملحة قليلاً محشوة بقطع التفاح المكرمل مع القرفة والسكر البني. رائحة المخبوزات التي تملأ البيت بالدفء.',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&q=80&w=800',
    category: 'حلويات',
    prepTime: 30,
    cookTime: 45,
    servings: 8,
    difficulty: 'متوسط',
    ingredients: [
      { name: 'دقيق حلويات', amount: '2.5', unit: 'كوب' },
      { name: 'زبدة باردة جداً', amount: '200', unit: 'غرام' },
      { name: 'تفاح أخضر', amount: '6', unit: 'حبة' },
      { name: 'قرفة بودرة', amount: '1', unit: 'ملعقة كبيرة' }
    ],
    steps: [
      { instruction: 'حضري العجينة بفرك الزبدة بالدقيق واتركيها ترتاح بالثلاجة.' },
      { instruction: 'قطعي التفاح وشوحيه مع السكر والقرفة والزبدة.' },
      { instruction: 'افردي نصف العجينة في القالب وضعي الحشوة ثم غطيها بالنصف الآخر.' },
      { instruction: 'اخبزيها حتى تصبح ذهبية اللون وقدميها مع الآيس كريم.' }
    ],
    rating: 4.6,
    reviews: 74,
    tags: ['حلويات', 'مخبوزات', 'أمريكي'],
    nutrition: { calories: 380, protein: 4, carbs: 55, fat: 16 },
    author: CHEFS[1]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'كتاب أسرار المطبخ العربي',
    price: 49,
    description: 'أكثر من 100 وصفة تراثية بلمسة عصرية من الشيف هشام.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    format: 'PDF',
    type: 'E-Book'
  },
  {
    id: 'p2',
    name: 'دليل الحلويات الرمضانية',
    price: 29,
    description: 'دليل شامل لتحضير ألذ الحلويات الرمضانية بلمسة شيف سارة.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    format: 'PDF',
    type: 'E-Book'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: '5 نصائح لجعل الكيك يرتفع بشكل مثالي',
    excerpt: 'تعرفي على الأخطاء الشائعة التي تمنع الكيك من الانتفاخ وكيفية الحصول على قوام إسفنجي.',
    date: '2023-10-25',
    author: 'سارة أحمد',
    image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'b2',
    title: 'دليلك لاختيار أفضل أنواع قدور الطبخ',
    excerpt: 'بين الجرانيت والتيفال والاستانلس ستيل، ما هو الأفضل لكل نوع من أنواع الطعام؟',
    date: '2023-11-12',
    author: 'شيف هشام',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=800'
  }
];
