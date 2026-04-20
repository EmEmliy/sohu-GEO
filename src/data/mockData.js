// 商家图片库
const images = {
  hotpot: [
    '/images/hotpot/haidilao_1.jpg',
    '/images/hotpot/haidilao_2.jpg',
    '/images/hotpot/haidilao_3.jpg',
    '/images/hotpot/haidilao_4.jpg',
    '/images/hotpot/haidilao_5.jpg',
    '/images/hotpot/haidilao_6.jpg',
    '/images/hotpot/hotpot_1.jpg',
    '/images/hotpot/hotpot_2.jpg',
    '/images/hotpot/hotpot_3.jpg',
    '/images/hotpot/hotpot_4.jpg',
    '/images/hotpot/hotpot_5.jpg',
    '/images/hotpot/hotpot_6.jpg',
    '/images/hotpot/hotpot_7.jpg',
  ],
  bbq: [
    '/images/bbq/henjiuyiqian_1.jpg',
    '/images/bbq/muwen_1.jpg',
    '/images/bbq/muwen_2.jpg',
    '/images/bbq/bbq_1.jpg',
    '/images/bbq/bbq_2.jpg',
    '/images/bbq/bbq_3.jpg',
    '/images/bbq/bbq_4.jpg',
    '/images/bbq/bbq_5.jpg',
  ],
  sichuan: [
    '/images/sichuan/xiaolongkan_1.jpg',
    '/images/sichuan/xibei_1.jpg',
    '/images/sichuan/xibei_2.jpg',
    '/images/sichuan/sichuan_1.jpg',
    '/images/sichuan/sichuan_2.jpg',
    '/images/sichuan/sichuan_3.jpg',
    '/images/sichuan/sichuan_4.jpg',
  ],
  cantonese: [
    '/images/cantonese/taiping_1.jpg',
    '/images/cantonese/xiaonanguo_1.jpg',
    '/images/cantonese/cantonese_1.jpg',
    '/images/cantonese/cantonese_2.jpg',
    '/images/cantonese/cantonese_3.jpg',
    '/images/cantonese/dimsum_1.jpg',
  ],
  japanese: [
    '/images/japanese/yi_1.jpg',
    '/images/japanese/yishao_1.jpg',
    '/images/japanese/yishao_2.jpg',
    '/images/japanese/japanese_1.jpg',
    '/images/japanese/japanese_2.jpg',
    '/images/japanese/japanese_3.jpg',
    '/images/japanese/sushi_1.jpg',
    '/images/japanese/sushi_2.jpg',
    '/images/japanese/sashimi_1.jpg',
  ],
  western: [
    '/images/western/xihe_1.jpg',
    '/images/western/lvcha_1.jpg',
    '/images/western/lvcha_2.jpg',
    '/images/western/western_1.jpg',
    '/images/western/western_2.jpg',
    '/images/western/western_3.jpg',
    '/images/western/trb_1.jpg',
    '/images/western/trb_2.jpg',
    '/images/western/trb_3.jpg',
  ],
  hotel: [
    '/images/hotel/guomao_1.jpg',
    '/images/hotel/guomao_2.jpg',
    '/images/hotel/guomao_3.jpg',
    '/images/hotel/waldorf_1.jpg',
    '/images/hotel/waldorf_2.jpg',
    '/images/hotel/waldorf_3.jpg',
    '/images/hotel/yaduo_1.jpg',
    '/images/hotel/yaduo_2.jpg',
    '/images/hotel/yaduo_3.jpg',
    '/images/hotel/quanji_1.jpg',
    '/images/hotel/hotel_1.jpg',
    '/images/hotel/hotel_2.jpg',
    '/images/hotel/hotel_3.jpg',
  ],
  movie: [
    '/images/movie/movie_1.jpg',
    '/images/movie/movie_2.jpg',
    '/images/movie/movie_3.jpg',
  ],
  beauty: [
    '/images/beauty/beauty_1.jpg',
    '/images/beauty/beauty_2.jpg',
    '/images/beauty/beauty_3.jpg',
  ],
  fitness: [
    '/images/fitness/fitness_1.jpg',
    '/images/fitness/fitness_2.jpg',
    '/images/fitness/fitness_3.jpg',
  ],
  home: [
    '/images/home/home_1.jpg',
    '/images/home/home_2.jpg',
  ],
  medical: [
    '/images/medical/medical_1.jpg',
    '/images/medical/medical_2.jpg',
  ],
  shopping: [
    '/images/shopping/shopping_1.jpg',
    '/images/shopping/shopping_2.jpg',
  ],
  education: [
    '/images/education/education_1.jpg',
    '/images/education/education_2.jpg',
  ],
  entertainment: [
    '/images/entertainment/entertainment_1.jpg',
    '/images/entertainment/entertainment_2.jpg',
  ],
  snack: [
    '/images/snack/snack_1.jpg',
    '/images/snack/snack_2.jpg',
  ],
  food: [
    '/images/hotpot/hotpot_1.jpg',
    '/images/hotpot/hotpot_2.jpg',
    '/images/western/western_1.jpg',
    '/images/western/western_2.jpg',
  ],
}

// 随机数生成器
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(1)
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randomItems = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export const categories = [
  { id: 'food',          name: '美食', nameEn: 'Food',        nameJa: 'グルメ',       nameEs: 'Comida',      icon: '🍜', subCategories: ['火锅', '烧烤', '川菜', '粤菜', '日料', '西餐', '小吃', '快餐'] },
  { id: 'hotel',         name: '酒店', nameEn: 'Hotels',      nameJa: 'ホテル',       nameEs: 'Hoteles',     icon: '🏨', subCategories: ['豪华酒店', '商务酒店', '民宿', '快捷酒店', '公寓'] },
  { id: 'movie',         name: '电影', nameEn: 'Movies',      nameJa: '映画',         nameEs: 'Cine',        icon: '🎬', subCategories: ['热映中', '即将上映', 'IMAX', '4DX'] },
  { id: 'beauty',        name: '丽人', nameEn: 'Beauty',      nameJa: '美容',         nameEs: 'Belleza',     icon: '💄', subCategories: ['美容', '美发', '美甲', 'SPA', '化妆'] },
  { id: 'fitness',       name: '健身', nameEn: 'Fitness',     nameJa: 'フィットネス', nameEs: 'Fitness',     icon: '🏋️', subCategories: ['健身房', '瑜伽', '游泳', '羽毛球', '篮球'] },
  { id: 'home',          name: '家政', nameEn: 'Home Svc',    nameJa: '家政',         nameEs: 'Hogar',       icon: '🧹', subCategories: ['保洁', '月嫂', '搬家', '维修', '开锁'] },
  { id: 'medical',       name: '医美', nameEn: 'Aesthetic',   nameJa: '美容医療',     nameEs: 'Estética',    icon: '💅', subCategories: ['整形', '皮肤管理', '口腔', '眼科'] },
  { id: 'shopping',      name: '购物', nameEn: 'Shopping',    nameJa: 'ショッピング', nameEs: 'Compras',     icon: '🛍️', subCategories: ['商场', '超市', '便利店', '专卖店'] },
  { id: 'education',     name: '培训', nameEn: 'Education',   nameJa: '教育',         nameEs: 'Educación',   icon: '📚', subCategories: ['语言', 'IT', '音乐', '美术', '舞蹈'] },
  { id: 'entertainment', name: '休闲', nameEn: 'Leisure',     nameJa: 'レジャー',     nameEs: 'Ocio',        icon: '🎮', subCategories: ['KTV', '酒吧', '咖啡', '茶馆', '网吧'] },
]

// ── 商家名称多语言翻译字典 ──
// key = 原始中文名，value = { en, ja, es }
const merchantNameI18n = {
  // 火锅
  '海底捞火锅（吴中路店）': { en: 'Haidilao Hot Pot (Wuzhong Rd)', ja: '海底撈火鍋（呉中路店）', es: 'Haidilao Hot Pot (Wuzhong)' },
  '潮汕牛肉火锅(望京店)':   { en: 'Chaoshan Beef Hot Pot (Wangjing)', ja: '潮汕牛肉火鍋（望京店）', es: 'Fondue Chaoshan (Wangjing)' },
  '小龙坎老火锅':            { en: 'Xiaolongkan Old Hot Pot', ja: '小龍坎老火鍋', es: 'Xiaolongkan Hot Pot Clásico' },
  '呷哺呷哺火锅（嘉定嘉实店）': { en: 'Xiabuxiabu Hot Pot (Jiading)', ja: 'しゃぶしゃぶ（嘉定店）', es: 'Xiabuxiabu (Jiading)' },
  '捞王锅物料理（凯旋路店）': { en: 'Laowang Hot Pot (Kaixuan Rd)', ja: '捞王鍋料理（凱旋路店）', es: 'Laowang Hot Pot (Kaixuan)' },
  '海底捞智慧餐厅':          { en: 'Haidilao Smart Restaurant', ja: '海底撈スマートレストラン', es: 'Haidilao Restaurante Inteligente' },
  '巴奴毛肚火锅（上海店）':  { en: 'Banu Tripe Hot Pot (Shanghai)', ja: '巴奴毛肚火鍋（上海店）', es: 'Banu Hot Pot (Shanghái)' },
  '电台巷火锅':              { en: 'Radio Lane Hot Pot', ja: 'ラジオ横丁火鍋', es: 'Hot Pot Callejón Radio' },
  '大龙燚火锅':              { en: 'Dalongyi Hot Pot', ja: '大龍燚火鍋', es: 'Dalongyi Hot Pot' },
  '椰子鸡火锅':              { en: 'Coconut Chicken Hot Pot', ja: 'ヤシの実チキン火鍋', es: 'Hot Pot Pollo Coco' },
  '老北京涮羊肉':            { en: 'Old Beijing Lamb Hot Pot', ja: '老北京羊しゃぶしゃぶ', es: 'Cordero al Estilo Pekín' },
  '椰香泰式火锅':            { en: 'Coconut Thai Hot Pot', ja: 'ヤシの実タイ火鍋', es: 'Fondue Thai de Coco' },
  // 烧烤
  '很久以前羊肉串（上海店）': { en: 'Henjiuyiqian Lamb Skewers (SH)', ja: '昔からの羊串焼き（上海店）', es: 'Pinchos de Cordero Henjiuyiqian' },
  '木屋烧烤（上海店）':      { en: 'Log Cabin BBQ (Shanghai)', ja: 'ログキャビンBBQ（上海店）', es: 'BBQ Cabaña de Madera (SH)' },
  '南门烧烤':                { en: 'South Gate BBQ', ja: '南門焼肉', es: 'BBQ Puerta Sur' },
  '串亭烧烤居酒屋':          { en: 'Chuan Ting BBQ Izakaya', ja: '串亭焼肉居酒屋', es: 'Izakaya BBQ Chuan Ting' },
  '丰茂烤串':                { en: 'Fengmao Skewers', ja: '豊茂串焼き', es: 'Pinchos Fengmao' },
  '冰城串吧':                { en: 'Bingcheng Skewer Bar', ja: '氷城串バー', es: 'Bar Pinchos Bingcheng' },
  '管氏翅吧':                { en: 'Guan\'s Wing Bar', ja: '管氏チキンウイングバー', es: 'Bar de Alitas Guan' },
  '烤肉刘炙子烤肉':          { en: 'Liu\'s Korean BBQ', ja: '劉氏炙子焼肉', es: 'Barbacoa Coreana Liu' },
  '破店肥哈':                { en: 'Broken Shop BBQ', ja: 'ぼろ店焼肉', es: 'BBQ Tienda Rota' },
  '青年路烧烤大排档':        { en: 'Youth Road BBQ Stall', ja: '青年路焼肉屋台', es: 'Puesto BBQ Calle Juventud' },
  // 川菜
  '眉山东坡酒家':            { en: 'Dongpo Cuisine Meishan', ja: '眉山東坡酒家', es: 'Cocina Dongpo Meishan' },
  '川国演义':                { en: 'Sichuan Kingdom Story', ja: '川国演義', es: 'Historia del Reino Sichuan' },
  '蜀大侠火锅':              { en: 'Shu Hero Hot Pot', ja: '蜀大侠火鍋', es: 'Hot Pot Héroe Shu' },
  '蓉上坊':                  { en: 'Rong Workshop', ja: '蓉上坊', es: 'Taller Rong' },
  '老成都川菜馆':            { en: 'Old Chengdu Sichuan Kitchen', ja: '老成都四川料理', es: 'Cocina Sichuan Viejo Chengdu' },
  '锦府盐帮菜':              { en: 'Jinfu Salt Gang Cuisine', ja: '錦府塩幇料理', es: 'Cocina Sal Gang Jinfu' },
  '麻六甲':                  { en: 'Malacca Spice Kitchen', ja: 'マラッカスパイスキッチン', es: 'Cocina Malaca' },
  '红辣椒川菜':              { en: 'Red Chili Sichuan', ja: '赤唐辛子四川料理', es: 'Chile Rojo Sichuan' },
  '川味坊':                  { en: 'Sichuan Flavor House', ja: '四川風味坊', es: 'Casa del Sabor Sichuan' },
  '蜀风雅韵':                { en: 'Shu Elegance', ja: '蜀の雅韻', es: 'Elegancia Shu' },
  '蓉和川菜':                { en: 'Ronghe Sichuan', ja: '蓉和四川料理', es: 'Ronghe Sichuan' },
  // 粤菜
  '粤菜王':                  { en: 'Cantonese King', ja: '広東料理王', es: 'Rey Cantonés' },
  '陶陶居':                  { en: 'Taotaoju Cantonese', ja: '陶陶居広東料理', es: 'Taotaoju Cantonés' },
  '利苑酒家':                { en: 'Lei Garden', ja: '利苑酒家', es: 'Jardín Lei' },
  '点都德':                  { en: 'Dim Tu Duk Dim Sum', ja: '点都徳飲茶', es: 'Dim Sum Dim Tu Duk' },
  '广州酒家':                { en: 'Guangzhou Restaurant', ja: '広州酒家', es: 'Restaurante Guangzhou' },
  '惠食佳':                  { en: 'Hui Shi Jia Cantonese', ja: '恵食佳広東料理', es: 'Hui Shi Jia Cantonés' },
  '潮汕菜馆':                { en: 'Chaoshan Cuisine', ja: '潮汕料理', es: 'Cocina Chaoshan' },
  '炳胜品味':                { en: 'Bing Sheng Fine Dining', ja: '炳勝品味', es: 'Bing Sheng Gourmet' },
  '莲香楼':                  { en: 'Lin Heung Cantonese', ja: '蓮香楼', es: 'Lin Heung Cantonés' },
  '荔湾名食家':              { en: 'Liwan Food Master', ja: '荔湾名食家', es: 'Maestro Gastronómico Liwan' },
  '海门鱼仔店':              { en: 'Haimen Fish Restaurant', ja: '海門小魚店', es: 'Pescadería Haimen' },
  // 日料
  '鮨·日本料理':            { en: 'Sushi Omakase', ja: '鮨・日本料理', es: 'Sushi Omakase' },
  '酒吞':                    { en: 'Shuten Japanese', ja: '酒呑', es: 'Japonés Shuten' },
  '元气寿司':                { en: 'Genki Sushi', ja: '元気寿司', es: 'Sushi Genki' },
  '隐泉日本料理':            { en: 'Hidden Spring Japanese', ja: '隠泉日本料理', es: 'Japonés Fuente Oculta' },
  '大喜屋':                  { en: 'Daiki Restaurant', ja: '大喜屋', es: 'Restaurante Daiki' },
  '禾绿回转寿司':            { en: 'Heiroku Sushi Conveyor', ja: '禾緑回転寿司', es: 'Sushi Conveyor Heiroku' },
  '黑牛的店':                { en: 'Black Bull BBQ', ja: '黒牛の店', es: 'Asador Toro Negro' },
  '将太无二':                { en: 'Shota Sushi', ja: '将太の寿司', es: 'Sushi Shota' },
  '奈九日本料理':            { en: 'Naiku Japanese', ja: '奈九日本料理', es: 'Japonés Naiku' },
  // 中餐 / 小吃 / 快餐
  '外婆家（上海徐汇龙吴路店）': { en: 'Grandma\'s Kitchen (Xuhui)', ja: 'おばあちゃんの家（上海徐匯店）', es: 'La Abuela (Xuhui SH)' },
  '太二酸菜鱼（上海万象城店）': { en: 'Tai Er Sauerkraut Fish (SH)', ja: '太二酸菜魚（上海万象城店）', es: 'Tai Er Pez Choucroute (SH)' },
  '全聚德烤鸭（紫荆广场店）':   { en: 'Quanjude Peking Duck (Zijing)', ja: '全聚徳北京ダック（紫荊広場）', es: 'Pato Pekín Quanjude' },
  '沙县小吃':                { en: 'Shaxian Snacks', ja: '沙県小食', es: 'Bocadillos Shaxian' },
  '兰州拉面':                { en: 'Lanzhou Beef Noodles', ja: '蘭州牛肉ラーメン', es: 'Fideos Lanzhou' },
  '黄焖鸡米饭':              { en: 'Braised Chicken Rice', ja: '黄焖鶏ご飯', es: 'Arroz Pollo Estofado' },
  '老乡鸡（上海临港百联店）': { en: 'Laoxiang Chicken (Lingang)', ja: '老郷鶏（上海臨港店）', es: 'Pollo Laoxiang (Lingang)' },
  '袁记云饺':                { en: 'Yuan\'s Cloud Dumplings', ja: '袁記雲餃子', es: 'Dumplings Nube Yuan' },
  '正新鸡排':                { en: 'Zhengxin Chicken Cutlet', ja: '正新チキンカツ', es: 'Milanesa Zhengxin' },
  '绝味鸭脖':                { en: 'Juewei Duck Neck', ja: '絶味アヒルの首', es: 'Cuello de Pato Juewei' },
  '便利蜂':                  { en: 'Bianlifeng Convenience', ja: 'ビアンリフェンコンビニ', es: 'Tienda Bianlifeng' },
  '711便利店':               { en: '7-Eleven', ja: 'セブンイレブン', es: '7-Eleven' },
  '罗森便利店':              { en: 'Lawson Convenience', ja: 'ローソン', es: 'Lawson' },
  '便利蜂热食':              { en: 'Bianlifeng Hot Food', ja: 'ビアンリフェンホットフード', es: 'Comida Caliente Bianlifeng' },
  '南城香':                  { en: 'Nancheng Xiang', ja: '南城香', es: 'Nancheng Xiang' },
  // 酒店
  '北京王府井希尔顿酒店':    { en: 'Hilton Beijing Wangfujing', ja: 'ヒルトン北京王府井', es: 'Hilton Pekín Wangfujing' },
  '桔子水晶酒店':            { en: 'Orange Crystal Hotel', ja: 'オレンジクリスタルホテル', es: 'Hotel Cristal Naranja' },
  '北京国贸大酒店':          { en: 'China World Hotel Beijing', ja: '北京国貿大酒店', es: 'China World Hotel Pekín' },
  '全季酒店(北京店)':        { en: 'Ji Hotel (Beijing)', ja: 'ジホテル（北京店）', es: 'Hotel Ji (Pekín)' },
  '亚朵酒店':                { en: 'Atour Hotel', ja: 'アトゥールホテル', es: 'Hotel Atour' },
  '北京香格里拉大酒店':      { en: 'Shangri-La Beijing', ja: 'シャングリラ北京', es: 'Shangri-La Pekín' },
  '如家酒店':                { en: 'Home Inn', ja: 'ホームイン', es: 'Home Inn' },
  '北京瑰丽酒店':            { en: 'Rosewood Beijing', ja: 'ローズウッド北京', es: 'Rosewood Pekín' },
  '维也纳酒店':              { en: 'Vienna Hotel', ja: 'ウィーンホテル', es: 'Hotel Viena' },
  '北京瑜舍':                { en: 'The Opposite House Beijing', ja: 'ジ・オポジットハウス北京', es: 'The Opposite House Pekín' },
  '汉庭酒店':                { en: 'Hanting Express Hotel', ja: 'ハンティンホテル', es: 'Hotel Hanting' },
  '北京嘉里大酒店':          { en: 'Kerry Hotel Beijing', ja: 'ケリーホテル北京', es: 'Kerry Hotel Pekín' },
  // 电影院
  '万达影城(CBD店)':          { en: 'Wanda Cinema (CBD)', ja: 'ワンダシネマ（CBD店）', es: 'Cine Wanda (CBD)' },
  'CGV影城(颐堤港店)':        { en: 'CGV Cinema (Indigo)', ja: 'CGVシネマ（頤堤港店）', es: 'Cine CGV (Indigo)' },
  'UME影城(双井店)':          { en: 'UME Cinema (Shuangjing)', ja: 'UMEシネマ（双井店）', es: 'Cine UME (Shuangjing)' },
  '百丽宫影城(国贸店)':       { en: 'Palace Cinema (Guomao)', ja: 'パレスシネマ（国貿店）', es: 'Palace Cinema (Guomao)' },
  '耀莱成龙影城':             { en: 'Jackie Chan Cinema', ja: 'ジャッキー・チェンシネマ', es: 'Cine Jackie Chan' },
  '英皇电影城(英皇集团中心)': { en: 'Emperor Cinema', ja: 'エンペラーシネマ', es: 'Cine Emperor' },
  '博纳国际影城(悠唐店)':     { en: 'Bona Cinema (Youtang)', ja: 'ボナシネマ（悠唐店）', es: 'Cine Bona (Youtang)' },
  '金逸影城(大悦城店)':       { en: 'Jinyi Cinema (Joy City)', ja: '金逸シネマ（大悦城店）', es: 'Cine Jinyi (Joy City)' },
  '横店电影城(王府井店)':     { en: 'Hengdian Cinema (Wangfujing)', ja: '横店シネマ（王府井店）', es: 'Cine Hengdian (Wangfujing)' },
  '百老汇影城(apm店)':        { en: 'Broadway Cinema (APM)', ja: 'ブロードウェイシネマ（apm店）', es: 'Cine Broadway (APM)' },
  '卢米埃影城(长楹天街店)':   { en: 'Lumière Cinema (Changyangtianjie)', ja: 'リュミエールシネマ（長楹天街）', es: 'Cine Lumière (Changyangtianjie)' },
  '新华国际影城':             { en: 'Xinhua International Cinema', ja: '新華国際シネマ', es: 'Cine Internacional Xinhua' },
  // 丽人
  '美丽田园(国贸店)':         { en: 'Beautiful Garden (Guomao)', ja: 'ビューティフルガーデン（国貿店）', es: 'Jardín Bello (Guomao)' },
  '思妍丽':                   { en: 'Seyanaline Beauty', ja: 'シーヤナライン美容院', es: 'Seyanaline Belleza' },
  '东田造型':                 { en: 'Dongtian Styling', ja: '東田スタイリング', es: 'Dongtian Estilismo' },
  'TONY老师造型':             { en: 'Tony Hair Studio', ja: 'トニー先生スタジオ', es: 'Estudio Tony' },
  '屈臣氏(各分店)':           { en: 'Watsons', ja: 'ワトソンズ', es: 'Watsons' },
  '名剪造型':                 { en: 'Ming Jian Styling', ja: '名剪スタイリング', es: 'Ming Jian Estilismo' },
  '丝域养发馆':               { en: 'Siyu Hair Care', ja: 'シーユー養髪館', es: 'Siyu Cuidado Capilar' },
  '章光101':                  { en: 'Zhangguang 101 Hair', ja: '章光101', es: 'Zhangguang 101' },
  'LANGLANG日式美甲':         { en: 'LANGLANG Japanese Nail', ja: 'LANGLANGジャパニーズネイル', es: 'LANGLANG Nail Japonés' },
  'InNail美甲美睫':           { en: 'InNail Manicure & Lash', ja: 'InNailネイル&まつ毛', es: 'InNail Uñas y Pestañas' },
  '河狸家美甲':               { en: 'Helijia Nail Service', ja: 'ヘリジア出張ネイル', es: 'Helijia Servicios de Uñas' },
  'Dr.Obba皮肤管理中心':      { en: 'Dr. Obba Skin Center', ja: 'Dr.オッパスキンケアセンター', es: 'Centro Piel Dr. Obba' },
  ' Miyabi日本料理':          { en: 'Miyabi Japanese', ja: '雅日本料理', es: 'Japonés Miyabi' },
  ' sushi by maki':           { en: 'Sushi by Maki', ja: '寿司 by マキ', es: 'Sushi by Maki' },
  // 健身
  '超级猩猩健身(三里屯店)':   { en: 'SuperMonkey Gym (Sanlitun)', ja: 'スーパーモンキージム（三里屯）', es: 'SuperMonkey Gym (Sanlitun)' },
  '一兆韦德健身':             { en: 'ONE Wellness Club', ja: 'ワンウェルネスクラブ', es: 'ONE Wellness Club' },
  '威尔士健身':               { en: 'World Gym', ja: 'ワールドジム', es: 'World Gym' },
  '乐刻健身(全城门店)':       { en: 'Lefit Gym (Citywide)', ja: 'レフィットジム（全城）', es: 'Lefit Gym (Ciudad)' },
  '舒适堡健身':               { en: 'California Fitness', ja: 'カリフォルニアフィットネス', es: 'California Fitness' },
  '金吉鸟健身':               { en: 'Jinjiniao Gym', ja: '金吉鳥ジム', es: 'Gimnasio Jinjiniao' },
  '梵音瑜伽':                 { en: 'Fanyin Yoga', ja: 'ファンインヨガ', es: 'Yoga Fanyin' },
  '舒适堡瑜伽馆':             { en: 'California Yoga Studio', ja: 'カリフォルニアヨガスタジオ', es: 'Estudio Yoga California' },
  '英派斯健身':               { en: 'Impulse Fitness', ja: 'インパルスフィットネス', es: 'Impulse Fitness' },
  '倍泰健身':                 { en: 'Beitai Gym', ja: 'ベイタイジム', es: 'Gimnasio Beitai' },
  // 家政
  '58同城家政':               { en: '58.com Home Service', ja: '58同城家政サービス', es: 'Servicio Hogar 58.com' },
  '天鹅到家':                 { en: 'Swan Home Service', ja: 'スワンホームサービス', es: 'Servicio Hogar Cisne' },
  '好慷在家':                 { en: 'Haokan Home Service', ja: 'ハオカン家政', es: 'Servicio Haokan en Casa' },
  'e家洁':                    { en: 'eJiajie Cleaning', ja: 'eジャージャン清掃', es: 'Limpieza eJiajie' },
  '亲亲管家':                 { en: 'Qinqin Butler Service', ja: 'チンチン管家サービス', es: 'Mayordomo Qinqin' },
  '阿姨来了':                 { en: 'Auntie Home Service', ja: 'おばさんが来た', es: 'Servicio de Limpieza Tía' },
  '管家帮':                   { en: 'Butler Helper', ja: 'バトラーヘルパー', es: 'Ayudante Mayordomo' },
  '嘉佣坊':                   { en: 'Jiayongfang Service', ja: '嘉佣坊家政', es: 'Servicio Jiayongfang' },
  '家政无忧':                 { en: 'Worry-Free Home Service', ja: '家政安心サービス', es: 'Servicio Hogar Sin Preocupaciones' },
  '三鼎家政':                 { en: 'Sanding Home Service', ja: '三鼎家政', es: 'Servicio Hogar Sanding' },
  '叮咚搬家':                 { en: 'Dingdong Moving', ja: 'ディンドン引越し', es: 'Mudanza Dingdong' },
  '货拉拉搬家':               { en: 'Huolala Moving', ja: 'フォララ引越し', es: 'Mudanza Huolala' },
}

// ── 本地化辅助函数 ──
// 根据语言返回本地化后的商家数据
export function localizeMerchant(merchant, lang = 'zh', dataT) {
  if (!dataT || lang === 'zh') return merchant
  const { categories: catMap, tags: tagMap, dealTags, discountLabels, facilities: facilityMap, dealNames, dealIncludes } = dataT

  // 翻译商家名称：优先查字典，找不到则保留原始中文名
  const localizedName = merchant.name
    ? (merchantNameI18n[merchant.name]?.[lang] || merchant.name)
    : merchant.name

  const localizedCategory = merchant.category
    ? (catMap[merchant.category]?.[lang] || merchant.category)
    : merchant.category

  const localizedTags = merchant.tags?.map(tag =>
    tagMap[tag]?.[lang] || tag
  )

  const localizedDiscount = merchant.discount
    ? (discountLabels[merchant.discount]?.[lang] || merchant.discount)
    : merchant.discount

  const localizedFacilities = facilityMap && merchant.facilities
    ? merchant.facilities.map(f => facilityMap[f]?.[lang] || f)
    : merchant.facilities

  let localizedTopDeal = merchant.topDeal
  if (merchant.topDeal) {
    localizedTopDeal = {
      ...merchant.topDeal,
      _originalTag: merchant.topDeal.tag, // 保留原始中文 tag，供颜色判断使用
      name: merchant.topDeal.name
        ? (dealNames?.[merchant.topDeal.name]?.[lang] || merchant.topDeal.name)
        : merchant.topDeal.name,
      tag: merchant.topDeal.tag
        ? (dealTags[merchant.topDeal.tag]?.[lang] || merchant.topDeal.tag)
        : merchant.topDeal.tag,
      discount: merchant.topDeal.discount
        ? (discountLabels[merchant.topDeal.discount]?.[lang] || merchant.topDeal.discount)
        : merchant.topDeal.discount,
      includes: merchant.topDeal.includes
        ? (dealIncludes?.[merchant.topDeal.includes]?.[lang] || merchant.topDeal.includes)
        : merchant.topDeal.includes,
    }
  }

  // 本地化 coupons - 动态生成各语言的代金券名称
  const localizedCoupons = merchant.coupons?.map(coupon => {
    if (lang === 'zh') return coupon
    let localizedName = coupon.name
    if (coupon.type === 'cash' && coupon.minSpend && coupon.value) {
      if (lang === 'en') localizedName = `¥${coupon.value} off ¥${coupon.minSpend}+`
      else if (lang === 'ja') localizedName = `¥${coupon.minSpend}以上で¥${coupon.value}引き`
      else if (lang === 'es') localizedName = `¥${coupon.value} dto en ¥${coupon.minSpend}+`
    } else if (coupon.type === 'discount' && coupon.name) {
      // 有 value 的折扣券
      if (lang === 'en') localizedName = `¥${coupon.value} Voucher`
      else if (lang === 'ja') localizedName = `¥${coupon.value}クーポン`
      else if (lang === 'es') localizedName = `Cupón ¥${coupon.value}`
    }
    return { ...coupon, name: localizedName }
  })

  // 本地化 highlight - 商家亮点标语
  const highlightI18n = {
    '上海人气最高火锅店，服务标杆': {
      en: "Shanghai's top hotpot destination, setting the service standard",
      ja: '上海で最も人気のしゃぶしゃぶ店、サービスの模範',
      es: 'El mejor restaurante de hot pot de Shanghái, referente en servicio',
    },
    '北京烧烤名店，食材新鲜': {
      en: 'Famous BBQ restaurant in Beijing, fresh ingredients',
      ja: '北京の有名バーベキュー店、新鮮な食材',
      es: 'Famoso restaurante de BBQ en Pekín, ingredientes frescos',
    },
    '经典川味火锅，麻辣正宗': {
      en: 'Classic Sichuan hotpot, authentic spicy & numbing flavor',
      ja: '本格四川火鍋、正宗の麻辣味',
      es: 'Hot pot clásico de Sichuan, sabor picante auténtico',
    },
    '上海服务五星好评': {
      en: 'Five-star service in Shanghai',
      ja: '上海でサービス5つ星の高評価',
      es: 'Servicio cinco estrellas en Shanghái',
    },
    '深夜食堂，24小时陪伴': {
      en: 'Late-night dining, open 24 hours',
      ja: '深夜食堂、24時間営業',
      es: 'Comedor nocturno, abierto las 24 horas',
    },
    '当日新鲜直送，品质保证': {
      en: 'Fresh daily delivery, quality guaranteed',
      ja: '当日新鮮直送、品質保証',
      es: 'Entrega fresca diaria, calidad garantizada',
    },
    '一人食专属，轻松无压力': {
      en: 'Solo dining-friendly, stress-free experience',
      ja: '一人鍋専用、気軽にお楽しみ',
      es: 'Ideal para comer solo, sin presiones',
    },
    '百年粤菜老字号': {
      en: 'Century-old Cantonese cuisine establishment',
      ja: '百年の広東料理の老舗',
      es: 'Restaurante centenario de cocina cantonesa',
    },
    '好莱坞级别观影体验': {
      en: 'Hollywood-level cinema experience',
      ja: 'ハリウッドクラスの映画体験',
      es: 'Experiencia cinematográfica de nivel Hollywood',
    },
    '上海顶级日式料理': {
      en: "Shanghai's top Japanese cuisine",
      ja: '上海トップクラスの日本料理',
      es: 'Mejor cocina japonesa de Shanghái',
    },
    '国际级五星标准': {
      en: 'International five-star standard',
      ja: '国際水準の五つ星',
      es: 'Estándar internacional de cinco estrellas',
    },
    '美甲行业领军品牌': {
      en: 'Leading nail salon brand in China',
      ja: 'ネイル業界のリーディングブランド',
      es: 'Marca líder en el sector de manicura',
    },
    '专业健身，科学塑型': {
      en: 'Professional fitness with scientific body sculpting',
      ja: 'プロのフィットネス、科学的なボディメイク',
      es: 'Fitness profesional con escultura corporal científica',
    },
    '全城最佳西餐体验': {
      en: 'Best Western dining experience in the city',
      ja: '市内最高のウエスタンダイニング体験',
      es: 'La mejor experiencia de cocina occidental de la ciudad',
    },
    '现做现卖，新鲜至上': {
      en: 'Made fresh on the spot, freshness above all',
      ja: '注文後すぐ調理、鮮度第一',
      es: 'Elaborado al momento, la frescura por encima de todo',
    },
    '传统工艺，匠心出品': {
      en: 'Traditional craftsmanship, artisan quality',
      ja: '伝統技術、職人の作品',
      es: 'Artesanía tradicional, calidad artesanal',
    },
  }
  const localizedHighlight = merchant.highlight
    ? (highlightI18n[merchant.highlight]?.[lang] || merchant.highlight)
    : merchant.highlight

  // 本地化 recommendReasons - 推荐理由数组
  const recommendReasonsI18n = {
    '美团32周年庆专属优惠，近7折现金券+近6折团购券': {
      en: 'Meituan 32nd anniversary exclusive: ~70% cash coupon + ~60% group buy voucher',
      ja: '美団32周年記念限定：約7割引き現金クーポン＋約6割引き団体購入クーポン',
      es: 'Exclusivo aniversario 32 de Meituan: cupón en efectivo ~70% + bono grupal ~60%',
    },
    '24小时营业，随时想吃就吃': {
      en: 'Open 24 hours — eat whenever the craving strikes',
      ja: '24時間営業、食べたい時にいつでも',
      es: 'Abierto las 24 horas, come cuando quieras',
    },
    '免费3小时停车，自驾无忧': {
      en: '3 hours free parking — no worries for drivers',
      ja: '無料3時間駐車、マイカーでも安心',
      es: '3 horas de estacionamiento gratis, sin preocupaciones',
    },
    '免费美甲服务，等位不无聊': {
      en: 'Free manicure while you wait for your table',
      ja: '無料ネイルサービス、順番待ちも退屈しない',
      es: 'Manicura gratuita mientras esperas mesa',
    },
    '学生证6.9折可叠加优惠': {
      en: 'Student ID discount 6.9% off, stackable with other offers',
      ja: '学生証で3割引き、他の割引と併用可能',
      es: 'Descuento del 31% con carnet estudiantil, acumulable',
    },
    '潮汕正宗牛肉，每日新鲜空运': {
      en: 'Authentic Chaoshan beef, fresh air-shipped daily',
      ja: '本場潮汕牛肉、毎日新鮮空輸',
      es: 'Auténtica carne de res Chaoshan, enviada en avión cada día',
    },
    '现切现涮，锁住最佳口感': {
      en: 'Freshly sliced and cooked on the spot for optimal texture',
      ja: '注文後スライス、最高の食感を閉じ込める',
      es: 'Cortado y cocinado al instante para la mejor textura',
    },
    '手打牛肉丸，弹牙爽口': {
      en: 'Hand-pounded beef balls — springy and satisfying',
      ja: '手作り牛肉ボール、プリプリ食感',
      es: 'Albóndigas de res hechas a mano, elásticas y deliciosas',
    },
    '高汤底料，北方牧场直供': {
      en: 'Premium broth base, sourced directly from northern ranches',
      ja: '上質のスープベース、北方牧場から直送',
      es: 'Base de caldo premium, suministrada directamente de ranchos del norte',
    },
    '地道四川麻辣，花椒正宗': {
      en: 'Authentic Sichuan mala spice, genuine Sichuan peppercorn',
      ja: '本場四川の麻辣、正宗な山椒使用',
      es: 'Auténtica especia mala de Sichuan, pimienta de Sichuan genuina',
    },
    '秘制锅底配方，传承三十年': {
      en: 'Secret broth recipe, passed down for 30 years',
      ja: '秘伝のスープレシピ、30年受け継がれてきた',
      es: 'Receta secreta de caldo, transmitida durante 30 años',
    },
    '麻辣与清汤双选，满足全家': {
      en: 'Choice of spicy or mild broth to satisfy the whole family',
      ja: '麻辣と白湯から選べる、家族全員満足',
      es: 'Elige entre caldo picante o suave para toda la familia',
    },
    '人均60元，性价比超高': {
      en: 'Average ¥60/person — exceptional value',
      ja: '一人平均60元、コスパ抜群',
      es: 'Promedio ¥60/persona — valor excepcional',
    },
    '网红打卡地，超高颜值': {
      en: 'Instagrammable spot with stunning decor',
      ja: 'SNS映えスポット、超高品質なインテリア',
      es: 'Lugar perfecto para fotos, decoración impresionante',
    },
    '自助形式，无限续点': {
      en: 'All-you-can-eat buffet, unlimited refills',
      ja: 'ビュッフェ形式、食べ放題',
      es: 'Formato bufé libre, recargas ilimitadas',
    },
  }

  const localizedRecommendReasons = merchant.recommendReasons?.map(reason =>
    recommendReasonsI18n[reason]?.[lang] || reason
  )

  // 本地化 tips - 到店小贴士数组
  const tipsI18n = {
    '建议提前在美团App取号，避免排队': {
      en: 'Recommend getting a queue number on the Meituan App in advance to avoid waiting',
      ja: '美団Appで事前に整理券を取ることをお勧めします',
      es: 'Se recomienda coger número en la app Meituan con antelación para evitar colas',
    },
    '工作日14:00-17:00等位较少': {
      en: 'Shorter wait times on weekdays between 14:00–17:00',
      ja: '平日14:00〜17:00は待ち時間が少ない',
      es: 'Menos espera entre semana de 14:00 a 17:00',
    },
    '晚上22点后是夜宵档，优惠可用': {
      en: 'Late-night menu starts after 22:00, discounts available',
      ja: '午後10時以降は夜食メニュー、割引適用',
      es: 'El menú nocturno comienza a las 22:00, descuentos disponibles',
    },
    '生日提前预约可获长寿面+果盘': {
      en: 'Pre-book for birthday celebrations to receive longevity noodles + fruit platter',
      ja: '誕生日の事前予約で長寿麺＋フルーツプレートプレゼント',
      es: 'Reserva anticipada para cumpleaños: fideos de longevidad + bandeja de frutas',
    },
    '推荐现切鲜牛肉，需等待15分钟': {
      en: 'Freshly sliced beef is highly recommended — allow 15 minutes preparation',
      ja: '生牛肉のスライスがおすすめ、15分お待ちください',
      es: 'Recomendamos la carne fresca cortada al momento — 15 min de espera',
    },
    '提前电话预约可优先安排座位': {
      en: 'Call ahead to reserve a seat with priority seating',
      ja: '事前にお電話で予約すると優先席をご用意します',
      es: 'Llame con antelación para reservar asiento prioritario',
    },
    '高峰期排队约30-60分钟': {
      en: 'Peak hours: expect a 30–60 minute wait',
      ja: 'ピーク時は30〜60分待ち',
      es: 'En horas punta: espera de 30 a 60 minutos',
    },
    '麻辣程度可选，建议初次尝试微辣': {
      en: 'Spice level customizable — first-timers recommended to try mild',
      ja: '辛さは選べます、初めての方は微辛がおすすめ',
      es: 'Nivel de picante personalizable — se recomienda suave para principiantes',
    },
    '川渝特色小食不容错过': {
      en: 'Don\'t miss the Sichuan-Chongqing specialty snacks',
      ja: '四川・重慶の郷土料理も見逃せない',
      es: 'No te pierdas los aperitivos típicos de Sichuan-Chongqing',
    },
    '提前在美团购票可享优惠价': {
      en: 'Purchase tickets on Meituan in advance for discounted prices',
      ja: '美団で事前購入すると割引価格になります',
      es: 'Compra entradas en Meituan por adelantado para precios reducidos',
    },
    '4D影厅需单独购票，不在套餐内': {
      en: '4D theater requires a separate ticket, not included in packages',
      ja: '4Dシアターは別途購入が必要、セット券には含まれません',
      es: 'La sala 4D requiere entrada separada, no incluida en paquetes',
    },
    '周末及节假日提前1-2天购票': {
      en: 'Buy tickets 1–2 days in advance for weekends and holidays',
      ja: '週末・祝日は1〜2日前に購入がおすすめ',
      es: 'Compra entradas con 1-2 días de antelación los fines de semana y festivos',
    },
    '停车场在B2层，首2小时免费': {
      en: 'Parking on B2 level, first 2 hours free',
      ja: 'B2駐車場、最初の2時間無料',
      es: 'Aparcamiento en planta B2, las 2 primeras horas gratuitas',
    },
    '建议提前3-7天预订，节假日提前更长': {
      en: 'Book 3–7 days in advance; earlier during holidays',
      ja: '3〜7日前の予約をお勧め、祝日はさらに早めに',
      es: 'Reserve con 3-7 días de antelación; más tiempo durante los festivos',
    },
    '可在美团App预定房间享受最低价': {
      en: 'Book on Meituan App for the best available rates',
      ja: '美団Appでご予約いただくと最低価格を保証',
      es: 'Reserva en la app Meituan para obtener las mejores tarifas',
    },
    '入住时间14:00后，退房前12:00': {
      en: 'Check-in after 14:00, check-out before 12:00',
      ja: 'チェックイン14:00以降、チェックアウト12:00まで',
      es: 'Entrada después de las 14:00, salida antes de las 12:00',
    },
    '需提前预约，当天可能无空位': {
      en: 'Advance appointment required — same-day slots may be unavailable',
      ja: '事前予約が必要、当日は空きがない場合があります',
      es: 'Se requiere cita previa — puede que no haya plazas el mismo día',
    },
    '首次体验建议选基础套餐了解项目': {
      en: 'For first-timers, the basic package is recommended to try the services',
      ja: '初めての方はベーシックセットでサービスを体験するのがおすすめ',
      es: 'Para primera vez, se recomienda el paquete básico para probar los servicios',
    },
    '办理年卡更划算，工作日折上折': {
      en: 'Annual membership offers better value, with extra discounts on weekdays',
      ja: '年間会員がお得、平日はさらに割引',
      es: 'La membresía anual ofrece mejor valor, con descuentos extra entre semana',
    },
  }

  const localizedTips = merchant.tips?.map(tip =>
    tipsI18n[tip]?.[lang] || tip
  )

  // 本地化 location - 地址（非中文模式下用 district + city 英文化）
  let localizedLocation = merchant.location
  if (merchant.location) {
    // 城市名翻译
    const cityI18n = {
      '上海市': { en: 'Shanghai', ja: '上海市', es: 'Shanghái' },
      '北京市': { en: 'Beijing', ja: '北京市', es: 'Pekín' },
      '广州市': { en: 'Guangzhou', ja: '広州市', es: 'Cantón' },
      '深圳市': { en: 'Shenzhen', ja: '深圳市', es: 'Shenzhen' },
      '成都市': { en: 'Chengdu', ja: '成都市', es: 'Chengdú' },
    }
    // 区/商圈关键词保留（如 SOHO T3、CBD 等不翻译）
    const districtI18n = {
      '闵行区': { en: 'Minhang', ja: '閔行区', es: 'Minhang' },
      '朝阳区': { en: 'Chaoyang', ja: '朝陽区', es: 'Chaoyang' },
      '海淀区': { en: 'Haidian', ja: '海淀区', es: 'Haidian' },
      '嘉定区': { en: 'Jiading', ja: '嘉定区', es: 'Jiading' },
      '静安区': { en: 'Jing\'an', ja: '静安区', es: "Jing'an" },
      '黄浦区': { en: 'Huangpu', ja: '黄浦区', es: 'Huangpu' },
      '浦东新区': { en: 'Pudong', ja: '浦東新区', es: 'Pudong' },
      '徐汇区': { en: 'Xuhui', ja: '徐匯区', es: 'Xuhui' },
      '长宁区': { en: 'Changning', ja: '長寧区', es: 'Changning' },
      '杨浦区': { en: 'Yangpu', ja: '楊浦区', es: 'Yangpu' },
      '虹口区': { en: 'Hongkou', ja: '虹口区', es: 'Hongkou' },
      '普陀区': { en: 'Putuo', ja: '普陀区', es: 'Putuo' },
      '东城区': { en: 'Dongcheng', ja: '東城区', es: 'Dongcheng' },
      '西城区': { en: 'Xicheng', ja: '西城区', es: 'Xicheng' },
      '丰台区': { en: 'Fengtai', ja: '豊台区', es: 'Fengtai' },
      '石景山区': { en: 'Shijingshan', ja: '石景山区', es: 'Shijingshan' },
      '通州区': { en: 'Tongzhou', ja: '通州区', es: 'Tongzhou' },
    }
    // 提取城市和区，拼接为目标语言地址
    const city = merchant.city || ''
    const district = merchant.district || ''
    const cityTrans = city ? (cityI18n[city]?.[lang] || city) : ''
    const districtTrans = district ? (districtI18n[district]?.[lang] || district) : ''
    if (cityTrans && districtTrans) {
      if (lang === 'ja') {
        localizedLocation = `${cityTrans}${districtTrans}`
      } else {
        localizedLocation = `${districtTrans}, ${cityTrans}`
      }
    } else if (cityTrans) {
      localizedLocation = cityTrans
    }
    // 保留非中文部分中有意义的英文商圈名（如 SOHO T3、CBD、apm 等），过滤纯数字和路名数字
    // 先把整个 location 中的英文单词/数字序列提取出来，然后过滤掉纯数字、短路号
    const engTokens = (merchant.location.match(/[A-Za-z][A-Za-z0-9]*(?:\s+[A-Za-z][A-Za-z0-9]*)*/g) || [])
      .filter(t => /[A-Za-z]/.test(t)) // 必须含字母，过滤纯数字
    const nonChinesePart = engTokens.join(' ').trim()
    if (nonChinesePart && nonChinesePart.length > 1) {
      localizedLocation = localizedLocation
        ? `${localizedLocation} · ${nonChinesePart}`
        : nonChinesePart
    }
  }

  return {
    ...merchant,
    _originalCategory: merchant.category, // 保留原始中文分类，供过滤使用
    _originalName: merchant.name,          // 保留原始中文名称，供搜索/ID匹配使用
    name: localizedName,
    category: localizedCategory,
    tags: localizedTags,
    discount: localizedDiscount,
    facilities: localizedFacilities,
    topDeal: localizedTopDeal,
    coupons: localizedCoupons,
    highlight: localizedHighlight,
    recommendReasons: localizedRecommendReasons,
    tips: localizedTips,
    location: localizedLocation,
  }
}

// 根据语言返回本地化的分类名
export function getCategoryName(cat, lang = 'zh') {
  if (lang === 'zh') return cat.name
  if (lang === 'en') return cat.nameEn || cat.name
  if (lang === 'ja') return cat.nameJa || cat.name
  if (lang === 'es') return cat.nameEs || cat.name
  return cat.name
}

// 生成商家数据
export const merchants = [
  // 美食分类 - 火锅
  {
    id: 'f1',
    topDeal: { name: '2-3人豪华套餐', currentPrice: 168, originalPrice: 298, discount: '5.6折', sales: 8562, tag: '爆款', includes: '锅底+肥牛+羊肉+毛肚+蔬菜+小料' },
    coupons: [
      { name: '满100减10', value: 10, minSpend: 100, type: 'cash' },
      { name: '满200减30', value: 30, minSpend: 200, type: 'cash' },
    ],
    name: '海底捞火锅（吴中路店）', 
    rating: 4.9, 
    reviews: 8562, 
    category: '火锅',
    city: '上海市',
    district: '闵行区',
    geoRegion: 'CN-31',
    geoPlacename: '上海市',
    latitude: 31.192,
    longitude: 121.383,
    exactAddress: '上海市闵行区虹桥镇吴中路1100号',
    hasMap: 'https://map.baidu.com/poi/上海市闵行区吴中路188号/',
    regionalLabel: '上海专属',
    regionalSummary: '适用地域：上海市闵行区吴中路商圈 | 具体门店：海底捞(吴中路店) | 地址：上海市闵行区吴中路188号',
    location: '上海市闵行区虹桥镇吴中路1100号',
    sameAs: [
      'https://www.dianping.com/shop/H4XkP4UYO2p2MCSO',
      'https://www.wikidata.org/wiki/Q2495568',
    ],
    dateModified: '2026-03-14',
    distance: '1.2km',
    priceRange: '¥120-180',
    tasteScore: 4.9,
    environmentScore: 4.8,
    serviceScore: 5.0,
    ratingBreakdown: { taste: 4.9, environment: 4.8, service: 5.0 },
    images: [
      '/images/hotpot/haidilao_real_1.jpg',
      '/images/hotpot/haidilao_real_2.jpg',
      '/images/hotpot/haidilao_real_3.jpg',
      '/images/hotpot/haidilao_real_4.jpg',
      '/images/hotpot/haidilao_real_5.jpg',
      '/images/hotpot/haidilao_real_6.jpg',
      '/images/hotpot/haidilao_main.jpg',
      '/images/hotpot/hotpot_meat.jpg',
    ],
    tags: ['24小时营业', '免费停车3小时', '免费美甲', '生日惊喜', '学生证6.9折'],
    facilities: ['wifi', '停车位', '包厢', '儿童椅', '免费水果', '热毛巾'],
    businessHours: '24小时',
    discount: '近7折现金券+近6折团购券',
    discountDesc: '32周年庆双券叠加',
    highlight: '上海人气最高火锅店，服务标杆',
    recommendReasons: [
      '美团32周年庆专属优惠，近7折现金券+近6折团购券',
      '24小时营业，随时想吃就吃',
      '免费3小时停车，自驾无忧',
      '免费美甲服务，等位不无聊',
      '学生证6.9折可叠加优惠'
    ],
    tips: [
      '建议提前在美团App取号，避免排队',
      '工作日14:00-17:00等位较少',
      '晚上22点后是夜宵档，优惠可用',
      '生日提前预约可获长寿面+果盘'
    ]
  },
  {
    id: 'f2', name: '潮汕牛肉火锅(望京店)', rating: 4.7, reviews: 3210, category: '火锅',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区望京SOHO T3', distance: '800m', priceRange: '¥80-120',
    tasteScore: 4.8, environmentScore: 4.6, serviceScore: 4.7,
    ratingBreakdown: { taste: 4.8, environment: 4.6, service: 4.7 },
    images: ['/images/hotpot/chaoshan_real_1.jpg', '/images/hotpot/chaoshan_real_2.jpg', '/images/hotpot/chaoshan_real_3.jpg', '/images/hotpot/chaoshan_real_4.jpg'],
    tags: ['新鲜牛肉', '现切', '手打牛肉丸'], facilities: ['wifi', '停车位'],
    businessHours: '10:00-22:00', discount: '双人套餐8折', discountDesc: '限时优惠',
    topDeal: { name: '双人牛肉火锅套餐', currentPrice: 168, originalPrice: 268, discount: '6.3折', sales: 3210, tag: '热销' },
    coupons: [{ name: '满150减20', value: 20, minSpend: 150, type: 'cash' }],
  },
  {
    id: 'f3', name: '小龙坎老火锅', rating: 4.6, reviews: 2156, category: '火锅',
    city: '北京市', district: '海淀区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市海淀区五道口华联', distance: '2km', priceRange: '¥90-130',
    tasteScore: 4.7, environmentScore: 4.5, serviceScore: 4.5,
    ratingBreakdown: { taste: 4.7, environment: 4.5, service: 4.5 },
    images: ['/images/hotpot/xiaolongkan_real_1.jpg', '/images/hotpot/xiaolongkan_real_2.jpg', '/images/hotpot/xiaolongkan_real_3.jpg', '/images/hotpot/xiaolongkan_real_4.jpg'],
    tags: ['地道川味', '麻辣锅底'], facilities: ['wifi', '包厢'],
    businessHours: '11:00-23:00',
    discount: '3人以上8折',
    topDeal: { name: '川味麻辣3人套餐', currentPrice: 198, originalPrice: 278, discount: '7.1折', sales: 2156, tag: '爆辣推荐', includes: '九宫格麻辣锅+精选内脏+毛肚+蔬菜' },
    coupons: [{ name: '满100减12', value: 12, minSpend: 100, type: 'cash' }],
  },
  {
    id: 'f4', name: '呷哺呷哺火锅（嘉定嘉实店）', rating: 4.5, reviews: 4521, category: '火锅',
    city: '上海市', district: '嘉定区', geoRegion: 'CN-31', geoPlacename: '上海市',
    location: '上海市嘉定区嘉实路', distance: '300m', priceRange: '¥60-80',
    tasteScore: 4.4, environmentScore: 4.5, serviceScore: 4.6,
    ratingBreakdown: { taste: 4.4, environment: 4.5, service: 4.6 },
    images: ['/images/hotpot/haidilao_real_1.jpg', '/images/hotpot/haidilao_real_2.jpg', '/images/hotpot/haidilao_real_3.jpg'],
    tags: ['小火锅', '一人食', '便捷'], facilities: ['wifi'],
    businessHours: '10:00-22:00', discount: '周一至周五午市7折', discountDesc: '工作日特惠',
  },
  {
    id: 'f5', name: '捞王锅物料理（凯旋路店）', rating: 4.9, reviews: 1876, category: '火锅',
    city: '上海市', district: '静安区', geoRegion: 'CN-31', geoPlacename: '上海市',
    location: '上海市静安区凯旋路369号', distance: '1.2km', priceRange: '¥150-200',
    tasteScore: 4.9, environmentScore: 4.8, serviceScore: 4.9,
    ratingBreakdown: { taste: 4.9, environment: 4.8, service: 4.9 },
    sameAs: ['https://www.dianping.com/shop/G1vPUDRkTvK1vSMf', ],
    dateModified: '2026-03-14',
    images: ['/images/hotpot/laowang_real_1.jpg', '/images/hotpot/laowang_real_2.jpg', '/images/hotpot/laowang_real_3.jpg'],
    tags: ['猪肚鸡', '高端火锅', '食材新鲜'], facilities: ['wifi', '停车位', '包厢', '儿童椅'],
    businessHours: '11:00-21:30',
    discount: '双人套餐9折 / 100元代金券85折',
    topDeal: { name: '猪肚鸡双人套餐', currentPrice: 268, originalPrice: 328, discount: '8.2折', sales: 1876, tag: '招牌', includes: '猪肚鸡锅底+精选肉类+蔬菜拼盘+甜品' },
    coupons: [{ name: '100元代金券', value: 15, minSpend: 100, type: 'discount' }],
  },
  {
    id: 'f6', name: '海底捞智慧餐厅', rating: 4.7, reviews: 3421, category: '火锅',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区大屯路世纪金源购物中心', distance: '3km', priceRange: '¥120-160',
    tasteScore: 4.7, environmentScore: 4.8, serviceScore: 4.7,
    ratingBreakdown: { taste: 4.7, environment: 4.8, service: 4.7 },
    images: ['/images/hotpot/haidilao_1.jpg', '/images/hotpot/haidilao_2.jpg', '/images/hotpot/haidilao_3.jpg'],
    tags: ['智能点餐', '机器人送餐', '黑科技'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '10:00-22:00', discount: '学生证8.5折', discountDesc: '特惠活动',
  },
  {
    id: 'f7', name: '巴奴毛肚火锅（上海店）', rating: 4.8, reviews: 2890, category: '火锅',
    city: '上海市', district: '黄浦区', geoRegion: 'CN-31', geoPlacename: '上海市',
    location: '上海市黄浦区淮海中路222号', distance: '4km', priceRange: '¥110-150',
    tasteScore: 4.9, environmentScore: 4.7, serviceScore: 4.8,
    ratingBreakdown: { taste: 4.9, environment: 4.7, service: 4.8 },
    sameAs: ['https://www.dianping.com/shop/H5kP8UDRkTvK1mBAn', ],
    dateModified: '2026-03-14',
    images: ['/images/hotpot/chaoshan_real_1.jpg', '/images/hotpot/chaoshan_real_2.jpg', '/images/hotpot/haidilao_real_2.jpg'],
    tags: ['毛肚', '菌汤锅底', '招牌菜品'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-22:00',
    discount: '双人套餐7.5折起',
    topDeal: { name: '毛肚双人经典套餐', currentPrice: 178, originalPrice: 238, discount: '7.5折', sales: 2890, tag: '口碑推荐', includes: '菌汤锅底+招牌毛肚+肥牛+时令蔬菜' },
    coupons: [{ name: '满200减25', value: 25, minSpend: 200, type: 'cash' }],
  },
  {
    id: 'f8', name: '电台巷火锅', rating: 4.6, reviews: 1654, category: '火锅',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区三里屯SOHO', distance: '1.5km', priceRange: '¥90-130',
    tasteScore: 4.6, environmentScore: 4.7, serviceScore: 4.5,
    ratingBreakdown: { taste: 4.6, environment: 4.7, service: 4.5 },
    images: ['/images/hotpot/chaoshan_real_2.jpg', '/images/hotpot/chaoshan_real_3.jpg', '/images/hotpot/chaoshan_real_4.jpg'],
    tags: ['市井火锅', '复古风格', '性价比高'], facilities: ['wifi'],
    businessHours: '11:00-24:00', discount: '3人同行1人免单', discountDesc: '新店开业',
  },
  {
    id: 'f9', name: '大龙燚火锅', rating: 4.5, reviews: 2100, category: '火锅',
    city: '北京市', district: '海淀区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市海淀区中关村创业大街', distance: '2.5km', priceRange: '¥80-120',
    tasteScore: 4.6, environmentScore: 4.4, serviceScore: 4.5,
    ratingBreakdown: { taste: 4.6, environment: 4.4, service: 4.5 },
    images: ['/images/hotpot/haidilao_real_1.jpg', '/images/hotpot/haidilao_real_3.jpg', '/images/hotpot/chaoshan_real_3.jpg'],
    tags: ['老成都味道', '串串火锅'], facilities: ['wifi', '包厢'],
    businessHours: '10:00-23:00',
  },
  {
    id: 'f10', name: '椰子鸡火锅', rating: 4.7, reviews: 1789, category: '火锅',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区蓝色港湾国际购物中心', distance: '2km', priceRange: '¥100-140',
    tasteScore: 4.7, environmentScore: 4.7, serviceScore: 4.7,
    ratingBreakdown: { taste: 4.7, environment: 4.7, service: 4.7 },
    images: ['/images/hotpot/hotpot_meat.jpg', '/images/hotpot/hotpot_broth.jpg', '/images/hotpot/chaoshan_real_1.jpg'],
    tags: ['椰子汤底', '养生火锅', '清淡'], facilities: ['wifi', '停车位'],
    businessHours: '11:00-21:00', discount: '双人套餐赠甜品', discountDesc: '季节限定',
  },
  {
    id: 'f11', name: '老北京涮羊肉', rating: 4.4, reviews: 3456, category: '火锅',
    city: '上海市', district: '黄浦区', geoRegion: 'CN-31', geoPlacename: '上海市',
    location: '上海市黄浦区紫荆广场', distance: '3.5km', priceRange: '¥80-120',
    tasteScore: 4.5, environmentScore: 4.3, serviceScore: 4.4,
    ratingBreakdown: { taste: 4.5, environment: 4.3, service: 4.4 },
    images: ['/images/hotpot/chaoshan_real_3.jpg', '/images/hotpot/chaoshan_real_4.jpg', '/images/hotpot/haidilao_real_2.jpg'],
    tags: ['铜锅涮肉', '老北京', '芝麻酱'], facilities: ['wifi', '包厢'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f12', name: '椰香泰式火锅', rating: 4.6, reviews: 1234, category: '火锅',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区合生汇购物中心', distance: '1.8km', priceRange: '¥110-150',
    tasteScore: 4.6, environmentScore: 4.6, serviceScore: 4.6,
    ratingBreakdown: { taste: 4.6, environment: 4.6, service: 4.6 },
    images: ['/images/hotpot/chaoshan_real_3.jpg', '/images/hotpot/hotpot_meat.jpg', '/images/hotpot/chaoshan_real_2.jpg'],
    tags: ['泰式风味', '咖喱锅底', '异域'], facilities: ['wifi', '停车位'],
    businessHours: '11:00-22:00',
  },

  // 美食分类 - 烧烤
  {
    id: 'f13', name: '很久以前羊肉串（上海店）', rating: 4.7, reviews: 2876, category: '烧烤',
    location: '朝阳区望京麒麟社', distance: '1km', priceRange: '¥80-120',
    images: ['/images/sichuan/sichuan_1.jpg', '/images/sichuan/sichuan_2.jpg', '/images/hotpot/haidilao_real_3.jpg'],
    tags: ['自动翻转', '氛围感强', '啤酒畅饮'], facilities: ['wifi', '停车位'],
    businessHours: '17:00-02:00', discount: '生蚝买一送一', discountDesc: '晚市特惠',
    topDeal: { name: '双人烤串畅饮套餐', currentPrice: 128, originalPrice: 178, discount: '7.2折', sales: 2876, tag: '夜宵必备', includes: '羊肉串20串+生蚝6只+精酿啤酒2杯' },
    coupons: [{ name: '满80减10', value: 10, minSpend: 80, type: 'cash' }],
  },
  {
    id: 'f14', name: '木屋烧烤（上海店）', rating: 4.6, reviews: 3210, category: '烧烤',
    location: '海淀区五道口购物中心', distance: '2km', priceRange: '¥70-100',
    images: ['/images/hotpot/haidilao_real_1.jpg', '/images/hotpot/hotpot_meat.jpg', '/images/hotpot/hotpot_broth.jpg', '/images/hotpot/chaoshan_real_2.jpg'],
    tags: ['连锁品牌', '性价比高', '菜品丰富'], facilities: ['wifi'],
    businessHours: '16:00-01:00',
  },
  {
    id: 'f15', name: '南门烧烤', rating: 4.5, reviews: 2134, category: '烧烤',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥90-130',
    images: ['/images/bbq/bbq_new_1.jpg', '/images/bbq/bbq_new_2.jpg', '/images/bbq/bbq_new_3.jpg'],
    tags: ['露天烧烤', '驻唱表演', '夜宵'], facilities: ['wifi', '停车位'],
    businessHours: '18:00-03:00', discount: '指定啤酒买2送1', discountDesc: '畅饮活动',
  },
  {
    id: 'f16', name: '串亭烧烤居酒屋', rating: 4.8, reviews: 1567, category: '烧烤',
    location: '朝阳区三里屯太古里', distance: '1.2km', priceRange: '¥120-180',
    images: ['/images/bbq/bbq_new_4.jpg', '/images/bbq/bbq_new_5.jpg', '/images/bbq/bbq_new_6.jpg'],
    tags: ['日式风格', '精致烤串', '清酒'], facilities: ['wifi', '包厢'],
    businessHours: '17:00-24:00',
    discount: '周五双人8.5折',
    topDeal: { name: '日式烤串双人套餐', currentPrice: 168, originalPrice: 218, discount: '7.7折', sales: 1567, tag: '精品推荐', includes: '精选烤串20串+清酒2壶+甜品' },
    coupons: [{ name: '满150减20', value: 20, minSpend: 150, type: 'cash' }],
  },
  {
    id: 'f17', name: '丰茂烤串', rating: 4.6, reviews: 2456, category: '烧烤',
    location: '朝阳区大望路', distance: '2.5km', priceRange: '¥80-110',
    images: ['/images/bbq/bbq_new_7.jpg', '/images/bbq/bbq_new_8.jpg', '/images/bbq/bbq_new_1.jpg'],
    tags: ['自选烤串', '新鲜食材', '自助'], facilities: ['wifi', '停车位'],
    businessHours: '11:00-01:00',
  },
  {
    id: 'f18', name: '冰城串吧', rating: 4.4, reviews: 1876, category: '烧烤',
    location: '海淀区学院路', distance: '3km', priceRange: '¥60-90',
    images: ['/images/bbq/bbq_new_2.jpg', '/images/bbq/bbq_new_3.jpg', '/images/bbq/bbq_new_4.jpg'],
    tags: ['东北烧烤', '价格实惠', '分量足'], facilities: ['wifi'],
    businessHours: '16:00-02:00',
  },
  {
    id: 'f19', name: '管氏翅吧', rating: 4.7, reviews: 2134, category: '烧烤',
    location: '朝阳区劲松', distance: '2km', priceRange: '¥80-120',
    images: ['/images/bbq/bbq_new_5.jpg', '/images/bbq/bbq_new_6.jpg', '/images/bbq/bbq_new_7.jpg'],
    tags: ['烤翅', '招牌鸡翅', '秘制'], facilities: ['wifi'],
    businessHours: '17:00-02:00',
  },
  {
    id: 'f20', name: '烤肉刘炙子烤肉', rating: 4.5, reviews: 1654, category: '烧烤',
    location: '东城区护国寺', distance: '4km', priceRange: '¥70-100',
    images: ['/images/hotpot/haidilao_real_1.jpg', '/images/hotpot/hotpot_meat.jpg', '/images/hotpot/hotpot_broth.jpg'],
    tags: ['老北京炙子烤肉', '传统风味'], facilities: [],
    businessHours: '11:00-22:00',
  },
  {
    id: 'f21', name: '破店肥哈', rating: 4.6, reviews: 2890, category: '烧烤',
    location: '朝阳区工人体育场', distance: '1.8km', priceRange: '¥90-130',
    images: ['/images/bbq/bbq_new_8.jpg', '/images/bbq/bbq_new_1.jpg', '/images/bbq/bbq_new_2.jpg'],
    tags: ['网红店', '氛围好', '驻唱'], facilities: ['wifi', '停车位'],
    businessHours: '17:00-03:00', discount: '菜品8.8折', discountDesc: '点评 Source专享',
  },
  {
    id: 'f22', name: '青年路烧烤大排档', rating: 4.3, reviews: 3456, category: '烧烤',
    location: '朝阳区青年路', distance: '1.5km', priceRange: '¥50-80',
    images: ['/images/bbq/bbq_new_3.jpg', '/images/bbq/bbq_new_4.jpg', '/images/bbq/bbq_new_5.jpg'],
    tags: ['大排档', '烟火气', '实惠'], facilities: ['停车位'],
    businessHours: '17:00-02:00',
  },

  // 美食分类 - 川菜
  {
    id: 'f23', name: '眉山东坡酒家', rating: 4.5, reviews: 1234, category: '川菜',
    location: '西城区金融街', distance: '4km', priceRange: '¥100-150',
    images: ['/images/sichuan/meishan_real_1.jpg', '/images/sichuan/meishan_real_2.jpg', '/images/sichuan/meishan_real_3.jpg'],
    tags: ['地道川味', '辣子鸡', '招牌菜'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-21:00',
  },
  {
    id: 'f24', name: '川国演义', rating: 4.6, reviews: 2134, category: '川菜',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥90-130',
    images: ['/images/sichuan/chuanguo_real_1.jpg', '/images/sichuan/chuanguo_real_2.jpg', '/images/sichuan/chuanguo_real_3.jpg'],
    tags: ['水煮鱼', '毛血旺', '经典川菜'], facilities: ['wifi', '包厢'],
    businessHours: '11:00-22:00', discount: '招牌水煮鱼8折', discountDesc: '限时优惠',
  },
  {
    id: 'f25', name: '蜀大侠火锅', rating: 4.7, reviews: 1876, category: '川菜',
    location: '海淀区五道口', distance: '2.5km', priceRange: '¥100-140',
    images: ['/images/sichuan/sichuan_new_1.jpg', '/images/sichuan/sichuan_new_2.jpg', '/images/sichuan/sichuan_new_3.jpg'],
    tags: ['江湖火锅', '龙头锅', '表演'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-23:00',
  },
  {
    id: 'f26', name: '蓉上坊', rating: 4.5, reviews: 1567, category: '川菜',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥120-180',
    images: ['/images/sichuan/sichuan_new_4.jpg', '/images/sichuan/sichuan_new_5.jpg', '/images/sichuan/chuanguo_real_1.jpg'],
    tags: ['精致川菜', '摆盘精美', '商务'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-21:30',
  },
  {
    id: 'f27', name: '老成都川菜馆', rating: 4.4, reviews: 2456, category: '川菜',
    location: '丰台区方庄', distance: '5km', priceRange: '¥70-100',
    images: ['/images/sichuan/sichuan_new_2.jpg', '/images/sichuan/sichuan_new_3.jpg', '/images/sichuan/sichuan_new_4.jpg'],
    tags: ['家常川菜', '价格实惠', '口味地道'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f28', name: '锦府盐帮菜', rating: 4.8, reviews: 987, category: '川菜',
    location: '朝阳区建外SOHO', distance: '2km', priceRange: '¥150-220',
    images: ['/images/sichuan/chuanguo_real_2.jpg', '/images/sichuan/chuanguo_real_3.jpg', '/images/sichuan/sichuan_new_1.jpg'],
    tags: ['盐帮菜', '高端川菜', '食材考究'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-21:00', discount: '双人套餐赠甜品', discountDesc: '新品尝鲜',
  },
  {
    id: 'f29', name: '麻六甲', rating: 4.5, reviews: 1789, category: '川菜',
    location: '海淀区中关村', distance: '3km', priceRange: '¥80-120',
    images: ['/images/sichuan/sichuan_new_5.jpg', '/images/sichuan/sichuan_new_1.jpg', '/images/sichuan/chuanguo_real_4.jpg'],
    tags: ['川味小炒', '盖浇饭', '快捷'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f30', name: '红辣椒川菜', rating: 4.3, reviews: 3210, category: '川菜',
    location: '朝阳区双井', distance: '2.5km', priceRange: '¥60-90',
    images: ['/images/sichuan/sichuan_new_3.jpg', '/images/sichuan/sichuan_new_4.jpg', '/images/sichuan/chuanguo_real_2.jpg'],
    tags: ['川菜小馆', '香辣', '下饭'], facilities: [],
    businessHours: '11:00-22:00',
  },
  {
    id: 'f31', name: '川味坊', rating: 4.6, reviews: 1654, category: '川菜',
    location: '东城区崇文门', distance: '4km', priceRange: '¥80-120',
    images: ['/images/sichuan/sichuan_new_2.jpg', '/images/sichuan/sichuan_new_5.jpg', '/images/sichuan/chuanguo_real_3.jpg'],
    tags: ['家常川菜', '口味正宗'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f32', name: '蜀风雅韵', rating: 4.7, reviews: 1123, category: '川菜',
    location: '朝阳区大望路', distance: '3km', priceRange: '¥130-180',
    images: ['/images/sichuan/chuanguo_real_1.jpg', '/images/sichuan/sichuan_new_1.jpg', '/images/sichuan/sichuan_new_2.jpg'],
    tags: ['文化主题', '变脸表演', '高端'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-21:00', discount: '表演票买一送一', discountDesc: '特色活动',
  },
  {
    id: 'f33', name: '蓉和川菜', rating: 4.5, reviews: 1890, category: '川菜',
    location: '海淀区魏公村', distance: '4km', priceRange: '¥90-130',
    images: ['/images/sichuan/sichuan_new_3.jpg', '/images/sichuan/sichuan_new_4.jpg', '/images/sichuan/chuanguo_real_4.jpg'],
    tags: ['经典川菜', '回锅肉', '宫保鸡丁'], facilities: ['wifi', '包厢'],
    businessHours: '11:00-22:00',
  },

  // 美食分类 - 粤菜
  {
    id: 'f34', name: '粤菜王', rating: 4.8, reviews: 2345, category: '粤菜',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥150-250',
    images: ['/images/cantonese/taotaoju_real_1.jpg', '/images/cantonese/cantonese_new_1.jpg', '/images/cantonese/cantonese_new_2.jpg'],
    tags: ['米其林推荐', '早茶', '点心'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '07:00-22:00', discount: '早茶7.5折', discountDesc: '上午特惠',
  },
  {
    id: 'f35', name: '陶陶居', rating: 4.7, reviews: 1876, category: '粤菜',
    location: '西城区西单大悦城', distance: '3.5km', priceRange: '¥120-180',
    images: ['/images/cantonese/taotaoju_real_1.jpg', '/images/cantonese/taotaoju_real_2.jpg', '/images/cantonese/taotaoju_real_3.jpg'],
    tags: ['百年老字号', '招牌点心', '早茶'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '08:00-21:30',
  },
  {
    id: 'f36', name: '利苑酒家', rating: 4.9, reviews: 1234, category: '粤菜',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区建外SOHO东区3号楼', distance: '2km', priceRange: '¥200-350',
    tasteScore: 4.9, environmentScore: 4.9, serviceScore: 4.8,
    ratingBreakdown: { taste: 4.9, environment: 4.9, service: 4.8 },
    images: ['/images/cantonese/cantonese_new_3.jpg', '/images/cantonese/cantonese_new_4.jpg', '/images/cantonese/cantonese_new_5.jpg'],
    tags: ['米其林一星', '高端粤菜', '燕鲍翅'], facilities: ['wifi', '停车位', '包厢', 'vip'],
    businessHours: '11:00-14:00 17:00-21:30',
  },
  {
    id: 'f37', name: '点都德', rating: 4.6, reviews: 2890, category: '粤菜',
    location: '海淀区五道口', distance: '3km', priceRange: '¥80-130',
    images: ['/images/cantonese/cantonese_new_1.jpg', '/images/cantonese/cantonese_new_2.jpg', '/images/cantonese/taotaoju_real_2.jpg'],
    tags: ['茶楼', '点心', '早茶'], facilities: ['wifi', '停车位'],
    businessHours: '07:00-22:00',
  },
  {
    id: 'f38', name: '广州酒家', rating: 4.5, reviews: 2134, category: '粤菜',
    location: '东城区王府井', distance: '3km', priceRange: '¥100-160',
    images: ['/images/cantonese/cantonese_new_3.jpg', '/images/cantonese/cantonese_new_4.jpg', '/images/cantonese/taotaoju_real_1.jpg'],
    tags: ['老字号', '烤鸭', '粤菜'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f39', name: '惠食佳', rating: 4.8, reviews: 1567, category: '粤菜',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥130-200',
    images: ['/images/cantonese/cantonese_new_5.jpg', '/images/cantonese/cantonese_new_1.jpg', '/images/cantonese/cantonese_new_3.jpg'],
    tags: ['煲仔饭', '啫啫煲', '锅气'], facilities: ['wifi', '包厢'],
    businessHours: '11:00-22:00',
  },
  {
    id: 'f40', name: '潮汕菜馆', rating: 4.6, reviews: 1789, category: '粤菜',
    location: '朝阳区望京', distance: '2.5km', priceRange: '¥100-150',
    images: ['/images/cantonese/cantonese_new_2.jpg', '/images/cantonese/cantonese_new_4.jpg', '/images/cantonese/taotaoju_real_3.jpg'],
    tags: ['潮汕菜', '牛肉', '海鲜'], facilities: ['wifi', '停车位'],
    businessHours: '11:00-22:00',
  },
  {
    id: 'f41', name: '炳胜品味', rating: 4.7, reviews: 987, category: '粤菜',
    location: '海淀区中关村', distance: '4km', priceRange: '¥140-200',
    images: ['/images/cantonese/cantonese_new_1.jpg', '/images/cantonese/cantonese_new_5.jpg', '/images/cantonese/cantonese_new_2.jpg'],
    tags: ['顺德菜', '鱼生', '清水火锅'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:00-21:00',
  },
  {
    id: 'f42', name: '莲香楼', rating: 4.5, reviews: 1654, category: '粤菜',
    location: '丰台区方庄', distance: '5km', priceRange: '¥80-120',
    images: ['/images/cantonese/cantonese_new_3.jpg', '/images/cantonese/cantonese_new_4.jpg', '/images/cantonese/taotaoju_real_1.jpg'],
    tags: ['老字号', '早茶', '点心'], facilities: ['wifi'],
    businessHours: '07:00-21:00',
  },
  {
    id: 'f43', name: '荔湾名食家', rating: 4.4, reviews: 2345, category: '粤菜',
    location: '朝阳区双井', distance: '3km', priceRange: '¥70-100',
    images: ['/images/cantonese/cantonese_new_5.jpg', '/images/cantonese/cantonese_new_1.jpg', '/images/cantonese/cantonese_new_3.jpg'],
    tags: ['肠粉', '粥面', '实惠'], facilities: ['wifi'],
    businessHours: '06:00-22:00',
  },
  {
    id: 'f44', name: '海门鱼仔店', rating: 4.6, reviews: 1456, category: '粤菜',
    location: '朝阳区大望路', distance: '2.8km', priceRange: '¥90-140',
    images: ['/images/cantonese/cantonese_new_2.jpg', '/images/cantonese/cantonese_new_4.jpg', '/images/cantonese/cantonese_new_5.jpg'],
    tags: ['潮汕海鲜', '小海鲜', '新鲜'], facilities: ['wifi', '停车位'],
    businessHours: '11:00-22:00',
  },

  // 美食分类 - 日料
  {
    id: 'f45', name: '鮨·日本料理', rating: 4.9, reviews: 876, category: '日料',
    location: '朝阳区三里屯太古里', distance: '1.5km', priceRange: '¥300-500',
    sameAs: ['https://www.dianping.com/shop/A6cDeFgHiJkLmNoP', ],
    dateModified: '2026-03-14',
    images: [
      '/images/japanese/sushi_omakase_real_1.jpg',
      '/images/japanese/sushi_omakase_real_2.jpg',
      '/images/japanese/sushi_omakase_real_3.jpg',
      '/images/japanese/sushi_1.jpg',
      '/images/japanese/sashimi_1.jpg',
      '/images/japanese/sushi_2.jpg',
    ],
    tags: ['Omakase', '板前料理', '顶级食材'], facilities: ['wifi', '包厢', 'vip'],
    businessHours: '11:30-14:00 18:00-22:00', discount: '清酒买一送一', discountDesc: '晚市特惠',
  },
  {
    id: 'f46', name: '酒吞', rating: 4.8, reviews: 1234, category: '日料',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥200-350',
    images: ['/images/japanese/sashimi_1.jpg', '/images/japanese/yishao_1.jpg', '/images/japanese/japanese_new_1.jpg', '/images/japanese/sushi_2.jpg'],
    tags: ['放题自助', '刺身', '寿司'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:30-14:00 17:30-22:00',
  },
  {
    id: 'f47', name: '元气寿司', rating: 4.5, reviews: 2134, category: '日料',
    location: '各区商场', distance: '500m', priceRange: '¥60-100',
    images: ['/images/japanese/japanese_new_1.jpg', '/images/japanese/japanese_new_2.jpg', '/images/japanese/japanese_new_3.jpg'],
    tags: ['回转寿司', '连锁品牌', '快捷'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f48', name: '隐泉日本料理', rating: 4.7, reviews: 987, category: '日料',
    location: '海淀区中关村', distance: '3km', priceRange: '¥180-280',
    images: ['/images/japanese/yishao_1.jpg', '/images/japanese/sushi_1.jpg', '/images/japanese/yi_1.jpg', '/images/japanese/japanese_new_4.jpg'],
    tags: ['精致日料', '约会首选', '环境好'], facilities: ['wifi', '包厢'],
    businessHours: '11:30-14:00 17:30-21:30',
  },
  {
    id: 'f49', name: '大喜屋', rating: 4.6, reviews: 1567, category: '日料',
    location: '朝阳区望京', distance: '2km', priceRange: '¥150-250',
    images: ['/images/japanese/japanese_new_2.jpg', '/images/japanese/japanese_new_3.jpg', '/images/japanese/japanese_new_4.jpg'],
    tags: ['放题', '刺身拼盘', '烤物'], facilities: ['wifi', '停车位'],
    businessHours: '11:30-14:00 17:30-22:00',
  },
  {
    id: 'f50', name: '禾绿回转寿司', rating: 4.4, reviews: 2890, category: '日料',
    location: '各区商场', distance: '800m', priceRange: '¥50-90',
    images: ['/images/japanese/japanese_new_1.jpg', '/images/japanese/japanese_new_5.jpg', '/images/japanese/japanese_new_3.jpg'],
    tags: ['回转寿司', '性价比', '学生党'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f51', name: '黑牛的店', rating: 4.7, reviews: 1123, category: '日料',
    location: '朝阳区三里屯', distance: '1.8km', priceRange: '¥200-320',
    images: ['/images/japanese/yi_1.jpg', '/images/japanese/yishao_1.jpg', '/images/japanese/yishao_2.jpg'],
    tags: ['烧肉', '烤肉自助', 'M8-M9和牛'], facilities: ['wifi', '停车位'],
    businessHours: '11:30-14:00 17:30-22:00',
  },
  {
    id: 'f52', name: '将太无二', rating: 4.5, reviews: 1876, category: '日料',
    location: '朝阳区双井', distance: '2.5km', priceRange: '¥80-130',
    images: ['/images/japanese/japanese_new_4.jpg', '/images/japanese/japanese_new_5.jpg', '/images/japanese/japanese_new_2.jpg'],
    tags: ['创意寿司', '加州卷', '年轻人'], facilities: ['wifi'],
    businessHours: '11:00-22:00',
  },
  {
    id: 'f53', name: '奈九日本料理', rating: 4.6, reviews: 1456, category: '日料',
    location: '东城区南锣鼓巷', distance: '4km', priceRange: '¥120-200',
    images: ['/images/japanese/yishao_1.jpg', '/images/japanese/yishao_2.jpg', '/images/japanese/japanese_new_3.jpg'],
    tags: ['日式居酒屋', '深夜食堂', '氛围'], facilities: ['wifi'],
    businessHours: '17:00-02:00',
  },
  {
    id: 'f54', name: ' sushi by maki', rating: 4.8, reviews: 765, category: '日料',
    location: '朝阳区建外SOHO', distance: '2km', priceRange: '¥180-300',
    images: ['/images/japanese/sushi_1.jpg', '/images/japanese/sushi_2.jpg', '/images/japanese/sashimi_1.jpg', '/images/japanese/japanese_new_1.jpg'],
    tags: ['现代日料', '创意融合', '明星同款'], facilities: ['wifi', '包厢'],
    businessHours: '11:30-14:00 18:00-22:00',
  },
  {
    id: 'f55', name: ' Miyabi日本料理', rating: 4.7, reviews: 1098, category: '日料',
    location: '海淀区五道口', distance: '3.5km', priceRange: '¥160-260',
    images: ['/images/japanese/yishao_2.jpg', '/images/japanese/japanese_new_4.jpg', '/images/japanese/japanese_new_5.jpg'],
    tags: ['炉端烧', '盐烤', '活鱼'], facilities: ['wifi', '停车位'],
    businessHours: '17:30-22:30',
  },

  // 美食分类 - 西餐
  {
    id: 'f56', name: 'TRB Hutong', rating: 4.9, reviews: 654, category: '西餐',
    city: '北京市', district: '东城区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市东城区景山东街17号', distance: '4km', priceRange: '¥300-500',
    tasteScore: 4.9, environmentScore: 5.0, serviceScore: 4.9,
    ratingBreakdown: { taste: 4.9, environment: 5.0, service: 4.9 },
    sameAs: ['https://www.dianping.com/shop/k3L9mNpQrStUvWxY', ],
    dateModified: '2026-03-14',
    images: [
      '/images/western/trb_real_1.jpg',
      '/images/western/trb_real_2.jpg',
      '/images/western/trb_real_3.jpg',
      '/images/western/trb_real_4.jpg',
      '/images/western/western_new_1.jpg',
      '/images/western/western_new_2.jpg',
    ],
    tags: ['米其林一星', '法餐', '胡同景观'], facilities: ['wifi', '停车位', 'vip'],
    businessHours: '11:30-14:30 18:00-22:00', discount: 'wine pairing 8折', discountDesc: '特惠套餐',
  },
  {
    id: 'f57', name: 'Mercato', rating: 4.7, reviews: 1234, category: '西餐',
    location: '朝阳区三里屯太古里', distance: '1.5km', priceRange: '¥200-350',
    images: ['/images/western/lvcha_1.jpg', '/images/western/trb_real_1.jpg', '/images/western/western_new_3.jpg', '/images/western/western_new_4.jpg'],
    tags: ['意餐', '露台', '优雅'], facilities: ['wifi', '停车位', '露台'],
    businessHours: '11:30-14:30 17:30-23:00',
  },
  {
    id: 'f58', name: 'The Rug', rating: 4.6, reviews: 2134, category: '西餐',
    location: '朝阳区三里屯', distance: '1.8km', priceRange: '¥150-250',
    images: ['/images/western/western_new_1.jpg', '/images/western/western_new_2.jpg', '/images/western/western_new_3.jpg'],
    tags: ['早午餐', 'brunch', '有机'], facilities: ['wifi', '户外'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f59', name: 'Moka Bros', rating: 4.5, reviews: 1876, category: '西餐',
    location: '朝阳区望京', distance: '2.5km', priceRange: '¥80-150',
    images: ['/images/western/western_new_4.jpg', '/images/western/western_new_5.jpg', '/images/western/western_new_1.jpg'],
    tags: ['轻食', '沙拉', '健康餐'], facilities: ['wifi'],
    businessHours: '08:00-21:00',
  },
  {
    id: 'f60', name: 'Velvet', rating: 4.8, reviews: 876, category: '西餐',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥250-400',
    images: ['/images/western/trb_2.jpg', '/images/western/lvcha_1.jpg', '/images/western/lvcha_2.jpg', '/images/western/xihe_1.jpg'],
    tags: ['牛排', '干式熟成的', '高端'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:30-14:30 17:30-22:00',
  },
  {
    id: 'f61', name: 'Fez', rating: 4.6, reviews: 1456, category: '西餐',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥120-200',
    images: ['/images/western/western_new_3.jpg', '/images/western/western_new_1.jpg', '/images/western/western_new_2.jpg'],
    tags: ['摩洛哥', '北非风味', '异域'], facilities: ['wifi'],
    businessHours: '11:00-23:00',
  },
  {
    id: 'f62', name: 'Jing', rating: 4.7, reviews: 987, category: '西餐',
    location: '海淀区中关村', distance: '3km', priceRange: '¥180-300',
    images: ['/images/western/xihe_1.jpg', '/images/western/western_new_4.jpg', '/images/western/western_new_5.jpg'],
    tags: ['法餐', '分子料理', '创意'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '11:30-14:30 18:00-22:00',
  },
  {
    id: 'f63', name: 'TRIBE', rating: 4.5, reviews: 2345, category: '西餐',
    location: '朝阳区大望路', distance: '2.5km', priceRange: '¥80-130',
    images: ['/images/western/western_new_2.jpg', '/images/western/western_new_3.jpg', '/images/western/western_new_4.jpg'],
    tags: ['有机餐厅', '可持续', '素食友好'], facilities: ['wifi'],
    businessHours: '10:00-21:00',
  },
  {
    id: 'f64', name: 'OPPOSITE', rating: 4.8, reviews: 1123, category: '西餐',
    location: '朝阳区三里屯', distance: '1.8km', priceRange: '¥220-380',
    images: ['/images/western/western_new_5.jpg', '/images/western/western_new_1.jpg', '/images/western/western_new_2.jpg'],
    tags: ['现代西餐', '鸡尾酒吧', '约会'], facilities: ['wifi', '停车位'],
    businessHours: '17:30-01:00', discount: '指定菜品8折', discountDesc: '新品尝鲜',
  },
  {
    id: 'f65', name: 'Bistro 108', rating: 4.6, reviews: 1678, category: '西餐',
    location: '东城区五道营', distance: '3.5km', priceRange: '¥120-200',
    images: ['/images/western/lvcha_2.jpg', '/images/western/western_new_3.jpg', '/images/western/western_new_4.jpg'],
    tags: ['法式小酒馆', '温馨', '红酒'], facilities: ['wifi'],
    businessHours: '11:30-14:30 17:30-23:00',
  },

  // 美食分类 - 小吃快餐
  {
    id: 'f66', name: '外婆家（上海徐汇龙吴路店）', rating: 4.7, reviews: 3210, category: '中餐',
    location: '上海市徐汇区龙吴路', distance: '1.2km', priceRange: '¥60-100',
    images: ['/images/sichuan/sichuan_1.jpg', '/images/hotpot/haidilao_real_3.jpg'],
    tags: ['外婆家特色', '杭帮菜', '家常菜'], facilities: ['wifi', '儿童椅'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f67', name: '太二酸菜鱼（上海万象城店）', rating: 4.6, reviews: 2156, category: '中餐',
    location: '上海市浦东新区张杨路501号', distance: '2km', priceRange: '¥50-80',
    images: ['/images/hotpot/chaoshan_real_1.jpg', '/images/sichuan/sichuan_2.jpg'],
    tags: ['酸菜鱼', '排队热门', '年轻人喜欢'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f68', name: '全聚德烤鸭（紫荆广场店）', rating: 4.4, reviews: 4521, category: '北京菜',
    location: '上海市黄浦区紫荆广场', distance: '3km', priceRange: '¥100-150',
    images: ['/images/hotpot/hotpot_broth.jpg', '/images/hotpot/hotpot_meat.jpg'],
    tags: ['老字号', '烤鸭', '上海店'], facilities: ['wifi', '停车位', '包厢'],
    businessHours: '10:00-21:00', discount: '烤鸭8折', discountDesc: '限时优惠',
  },
  {
    id: 'f69', name: '沙县小吃', rating: 4.2, reviews: 8765, category: '小吃',
    location: '各区分店', distance: '200m', priceRange: '¥15-30',
    images: ['/images/food/food_3.jpg', '/images/food/food_4.jpg', '/images/food/food_5.jpg'],
    tags: ['连锁', '快捷', '实惠'], facilities: [],
    businessHours: '06:00-23:00',
  },
  {
    id: 'f70', name: '兰州拉面', rating: 4.3, reviews: 6543, category: '小吃',
    location: '各区街头', distance: '300m', priceRange: '¥15-35',
    images: ['/images/food/food_5.jpg', '/images/food/food_1.jpg', '/images/food/food_2.jpg'],
    tags: ['拉面', '牛肉', '快捷'], facilities: [],
    businessHours: '06:00-23:00',
  },
  {
    id: 'f71', name: '黄焖鸡米饭', rating: 4.1, reviews: 5432, category: '快餐',
    location: '各区商场', distance: '400m', priceRange: '¥20-35',
    images: ['/images/food/food_1.jpg', '/images/food/food_3.jpg', '/images/food/food_5.jpg'],
    tags: ['快餐', '快捷', '分量足'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'f72', name: '老乡鸡（上海临港百联店）', rating: 4.5, reviews: 4321, category: '快餐',
    location: '上海市浦东新区临港百联购物中心', distance: '500m', priceRange: '¥20-40',
    images: ['/images/food/food_1.jpg'],
    tags: ['中式快餐', '干净', '健康'], facilities: ['wifi'],
    businessHours: '07:00-22:00',
  },
  {
    id: 'f73', name: '袁记云饺', rating: 4.5, reviews: 3210, category: '小吃',
    location: '各区社区', distance: '400m', priceRange: '¥18-30',
    images: ['/images/food/food_3.jpg', '/images/food/food_5.jpg', '/images/food/food_2.jpg'],
    tags: ['云吞', '水饺', '手工'], facilities: [],
    businessHours: '08:00-22:00',
  },
  {
    id: 'f74', name: '正新鸡排', rating: 4.2, reviews: 6789, category: '小吃',
    location: '各区商业街', distance: '300m', priceRange: '¥10-25',
    images: ['/images/food/food_4.jpg', '/images/food/food_1.jpg', '/images/food/food_3.jpg'],
    tags: ['鸡排', '炸串', '快捷'], facilities: [],
    businessHours: '10:00-23:00',
  },
  {
    id: 'f75', name: '绝味鸭脖', rating: 4.3, reviews: 7890, category: '小吃',
    location: '各区地铁口', distance: '200m', priceRange: '¥15-40',
    images: ['/images/food/food_5.jpg', '/images/food/food_2.jpg', '/images/food/food_4.jpg'],
    tags: ['卤味', '鸭脖', '追剧必备'], facilities: [],
    businessHours: '09:00-23:00',
  },
  {
    id: 'f76', name: '便利蜂', rating: 4.4, reviews: 3456, category: '便利店',
    location: '各区写字楼', distance: '100m', priceRange: '¥10-30',
    images: ['/images/food/food_1.jpg', '/images/food/food_2.jpg', '/images/food/food_3.jpg'],
    tags: ['便利店', '24小时', '鲜食'], facilities: ['wifi'],
    businessHours: '24小时',
  },
  {
    id: 'f77', name: '711便利店', rating: 4.5, reviews: 4567, category: '便利店',
    location: '各区商业区', distance: '150m', priceRange: '¥10-35',
    images: ['/images/food/food_4.jpg', '/images/food/food_5.jpg', '/images/food/food_1.jpg'],
    tags: ['24小时', '鲜食', '进口'], facilities: ['wifi'],
    businessHours: '24小时',
  },
  {
    id: 'f78', name: '罗森便利店', rating: 4.4, reviews: 3876, category: '便利店',
    location: '各区商场', distance: '200m', priceRange: '¥10-30',
    images: ['/images/food/food_2.jpg', '/images/food/food_3.jpg', '/images/food/food_4.jpg'],
    tags: ['24小时', '甜品', '鲜食'], facilities: ['wifi'],
    businessHours: '24小时',
  },
  {
    id: 'f79', name: '便利蜂热食', rating: 4.3, reviews: 2345, category: '快餐',
    location: '各区写字楼', distance: '150m', priceRange: '¥15-35',
    images: ['/images/food/food_5.jpg', '/images/food/food_1.jpg', '/images/food/food_2.jpg'],
    tags: ['热食', '便当', '快捷'], facilities: ['wifi'],
    businessHours: '07:00-23:00',
  },
  {
    id: 'f80', name: '南城香', rating: 4.5, reviews: 4567, category: '快餐',
    location: '各区社区', distance: '300m', priceRange: '¥18-35',
    images: ['/images/food/food_3.jpg', '/images/food/food_4.jpg', '/images/food/food_5.jpg'],
    tags: ['中式快餐', '早餐', '夜宵'], facilities: ['wifi'],
    businessHours: '05:00-02:00',
  },

  // 酒店分类
  {
    id: 'h1', name: '北京王府井希尔顿酒店', rating: 4.9, reviews: 2345, category: '豪华酒店',
    city: '北京市', district: '东城区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市东城区王府井大街8号', distance: '2km', priceRange: '¥1200-2500',
    tasteScore: 4.8, environmentScore: 4.9, serviceScore: 4.9,
    ratingBreakdown: { taste: 4.8, environment: 4.9, service: 4.9 },
    sameAs: [
      'https://www.dianping.com/shop/H9iJkLmNoPqRsTuV',
      'https://www.meituan.com/hotel/1073741824/',
      'https://www.hilton.com/zh/hotels/bjswfhi-hilton-beijing-wangfujing/',
    ],
    dateModified: '2026-03-14',
    images: ['/images/hotel/hilton_real_1.jpg', '/images/hotel/hilton_real_2.jpg', '/images/hotel/hilton_real_3.jpg', '/images/hotel/hilton_real_4.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['五星酒店', '健身房', '游泳池'], facilities: ['wifi', '停车位', '健身房', '游泳池', '餐厅', '会议室'],
    businessHours: '24小时', discount: '订房立减200', discountDesc: '官网最低价',
  },
  {
    id: 'h2', name: '桔子水晶酒店', rating: 4.6, reviews: 876, category: '精品酒店',
    location: '朝阳区三里屯', distance: '1km', priceRange: '¥500-900',
    images: ['/images/hotel/hotel_2.jpg', '/images/hotel/hotel_3.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['智能客控', '免费停车', '精品'], facilities: ['wifi', '停车位', '健身房'],
    businessHours: '24小时',
  },
  {
    id: 'h3', name: '北京国贸大酒店', rating: 4.8, reviews: 1876, category: '豪华酒店',
    city: '北京市', district: '朝阳区', geoRegion: 'CN-11', geoPlacename: '北京市',
    location: '北京市朝阳区建国门外大街1号', distance: '3km', priceRange: '¥1500-3000',
    tasteScore: 4.8, environmentScore: 4.9, serviceScore: 4.8,
    ratingBreakdown: { taste: 4.8, environment: 4.9, service: 4.8 },
    sameAs: [
      'https://www.dianping.com/shop/W3xYzA1bCdEfGhIj',
      'https://www.meituan.com/hotel/2147483648/',
    ],
    dateModified: '2026-03-14',
    images: ['/images/hotel/guomao_1.jpg', '/images/hotel/guomao_2.jpg', '/images/hotel/guomao_3.jpg', '/images/hotel/hotel_1.jpg', '/images/hotel/hotel_2.jpg'],
    tags: ['CBD核心', '天际景观', '米其林餐厅'], facilities: ['wifi', '停车位', '游泳池', '健身房', 'SPA', '餐厅'],
    businessHours: '24小时', discount: '行政房8折', discountDesc: '限时优惠',
  },
  {
    id: 'h4', name: '全季酒店(北京店)', rating: 4.5, reviews: 2345, category: '商务酒店',
    location: '各区中心', distance: '500m', priceRange: '¥300-600',
    images: ['/images/hotel/quanji_1.jpg', '/images/hotel/hotel_1.jpg', '/images/hotel/hotel_2.jpg'],
    tags: ['连锁品牌', '商务出行', '性价比'], facilities: ['wifi', '停车场'],
    businessHours: '24小时',
  },
  {
    id: 'h5', name: '亚朵酒店', rating: 4.7, reviews: 1567, category: '精品酒店',
    location: '朝阳区望京', distance: '2km', priceRange: '¥500-900',
    images: ['/images/hotel/atour_real_1.jpg', '/images/hotel/atour_real_2.jpg', '/images/hotel/atour_real_3.jpg', '/images/hotel/atour_real_4.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['人文酒店', '阅读', '高品质'], facilities: ['wifi', '停车场', '健身房'],
    businessHours: '24小时', discount: '会员日8.5折', discountDesc: '专属福利',
  },
  {
    id: 'h6', name: '北京香格里拉大酒店', rating: 4.9, reviews: 2134, category: '豪华酒店',
    location: '海淀区紫竹院路29号', distance: '5km', priceRange: '¥1800-3500',
    images: ['/images/hotel/shangrila_real_1.jpg', '/images/hotel/shangrila_real_2.jpg', '/images/hotel/shangrila_real_3.jpg', '/images/hotel/shangrila_real_4.jpg'],
    tags: ['园林景观', '法餐', '会议中心'], facilities: ['wifi', '停车位', '游泳池', '健身房', 'SPA', '餐厅', '儿童乐园'],
    businessHours: '24小时',
  },
  {
    id: 'h7', name: '如家酒店', rating: 4.3, reviews: 4567, category: '快捷酒店',
    location: '各区交通枢纽', distance: '300m', priceRange: '¥150-350',
    images: ['/images/hotel/hotel_2.jpg', '/images/hotel/hotel_3.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['连锁品牌', '经济实惠', '便捷'], facilities: ['wifi'],
    businessHours: '24小时',
  },
  {
    id: 'h8', name: '北京瑰丽酒店', rating: 4.8, reviews: 987, category: '豪华酒店',
    location: '朝阳区呼家楼', distance: '2.5km', priceRange: '¥2000-4000',
    images: ['/images/hotel/waldorf_1.jpg', '/images/hotel/waldorf_2.jpg', '/images/hotel/waldorf_3.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['艺术酒店', '天际泳池', '米其林'], facilities: ['wifi', '停车位', '游泳池', '健身房', 'SPA', '餐厅', '酒吧'],
    businessHours: '24小时', discount: '连住3晚免1晚', discountDesc: '长住优惠',
  },
  {
    id: 'h9', name: '维也纳酒店', rating: 4.4, reviews: 3210, category: '商务酒店',
    location: '各区商业区', distance: '800m', priceRange: '¥250-500',
    images: ['/images/hotel/hotel_1.jpg', '/images/hotel/hotel_2.jpg', '/images/hotel/hotel_3.jpg'],
    tags: ['连锁品牌', '商务配套', '舒适'], facilities: ['wifi', '停车场', '会议室'],
    businessHours: '24小时',
  },
  {
    id: 'h10', name: '北京瑜舍', rating: 4.7, reviews: 765, category: '精品酒店',
    location: '朝阳区三里屯太古里', distance: '1.5km', priceRange: '¥1500-2800',
    images: ['/images/hotel/waldorf_2.jpg', '/images/hotel/yaduo_2.jpg', '/images/hotel/hotel_1.jpg', '/images/hotel/hotel_2.jpg'],
    tags: ['设计酒店', '当代艺术', '精品'], facilities: ['wifi', '停车位', '健身房', '餐厅'],
    businessHours: '24小时',
  },
  {
    id: 'h11', name: '汉庭酒店', rating: 4.2, reviews: 5678, category: '快捷酒店',
    location: '各区地铁站', distance: '200m', priceRange: '¥120-280',
    images: ['/images/hotel/hotel_1.jpg', '/images/hotel/hotel_2.jpg', '/images/hotel/hotel_3.jpg'],
    tags: ['连锁品牌', '快捷', '经济'], facilities: ['wifi'],
    businessHours: '24小时',
  },
  {
    id: 'h12', name: '北京嘉里大酒店', rating: 4.8, reviews: 1234, category: '豪华酒店',
    location: '朝阳区光华路1号', distance: '3km', priceRange: '¥1400-2800',
    images: ['/images/hotel/hotel_2.jpg', '/images/hotel/hotel_3.jpg', '/images/hotel/hotel_1.jpg'],
    tags: ['家庭友好', '儿童俱乐部', '嘉里'], facilities: ['wifi', '停车位', '游泳池', '健身房', '儿童乐园', '餐厅'],
    businessHours: '24小时',
  },

  // 电影分类
  {
    id: 'm1', name: '万达影城(CBD店)', rating: 4.7, reviews: 5432, category: '电影院',
    location: '朝阳区大望路万达广场', distance: '2km', priceRange: '¥60-120',
    images: ['/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg'],
    tags: ['IMAX', '4DX', '杜比全景声'], facilities: ['3D', 'IMAX', '4DX', '停车位'],
    businessHours: '09:00-01:00', discount: '周末半价+会员免单', discountDesc: '周末特惠·会员专属',
  },
  {
    id: 'm2', name: 'CGV影城(颐堤港店)', rating: 4.6, reviews: 3210, category: '电影院',
    location: '朝阳区颐堤港', distance: '1.5km', priceRange: '¥55-110',
    images: ['/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg'],
    tags: ['ScreenX', '4DX', 'GOLD CLASS'], facilities: ['3D', 'ScreenX', '4DX', '停车位'],
    businessHours: '10:00-00:30',
  },
  {
    id: 'm3', name: 'UME影城(双井店)', rating: 4.5, reviews: 2876, category: '电影院',
    location: '朝阳区双井桥UME', distance: '2.5km', priceRange: '¥50-100',
    images: ['/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg'],
    tags: ['RealD', 'LUXE', 'VIP'], facilities: ['3D', 'RealD', 'LUXE'],
    businessHours: '09:30-01:00',
  },
  {
    id: 'm4', name: '百丽宫影城(国贸店)', rating: 4.8, reviews: 2134, category: '电影院',
    location: '朝阳区国贸商城', distance: '2km', priceRange: '¥70-140',
    images: ['/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg'],
    tags: ['LUXE', 'VIP休息室', '杜比'], facilities: ['3D', 'LUXE', 'VIP', '停车位'],
    businessHours: '10:00-01:00', discount: '首映场8折', discountDesc: '首映特惠',
  },
  {
    id: 'm5', name: '耀莱成龙影城', rating: 4.4, reviews: 4567, category: '电影院',
    location: '各区耀莱中心', distance: '1km', priceRange: '¥40-80',
    images: ['/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg'],
    tags: ['性价比', '连锁品牌'], facilities: ['3D', '停车位'],
    businessHours: '09:00-00:00',
  },
  {
    id: 'm6', name: '英皇电影城(英皇集团中心)', rating: 4.7, reviews: 1876, category: '电影院',
    location: '朝阳区建国门外大街', distance: '3km', priceRange: '¥65-130',
    images: ['/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg'],
    tags: ['IMAX', 'VIP', '杜比全景声'], facilities: ['3D', 'IMAX', 'VIP', '停车位'],
    businessHours: '10:00-01:00',
  },
  {
    id: 'm7', name: '博纳国际影城(悠唐店)', rating: 4.5, reviews: 2345, category: '电影院',
    location: '朝阳区悠唐广场', distance: '1.8km', priceRange: '¥50-100',
    images: ['/images/movie/movie_1.jpg', '/images/movie/movie_3.jpg', '/images/movie/movie_2.jpg'],
    tags: ['激光放映', '儿童厅'], facilities: ['3D', '激光', '停车位'],
    businessHours: '09:30-00:30',
  },
  {
    id: 'm8', name: '金逸影城(大悦城店)', rating: 4.6, reviews: 2134, category: '电影院',
    location: '朝阳区大悦城', distance: '1.5km', priceRange: '¥55-110',
    images: ['/images/movie/movie_2.jpg', '/images/movie/movie_1.jpg', '/images/movie/movie_3.jpg'],
    tags: ['ZD PRO', '特色影厅'], facilities: ['3D', 'ZD PRO', '停车位'],
    businessHours: '10:00-01:00',
  },
  {
    id: 'm9', name: '横店电影城(王府井店)', rating: 4.4, reviews: 3456, category: '电影院',
    location: '上海市黄浦区紫荆广场', distance: '3km', priceRange: '¥45-90',
    images: ['/images/movie/movie_3.jpg', '/images/movie/movie_2.jpg', '/images/movie/movie_1.jpg'],
    tags: ['连锁品牌', '实惠'], facilities: ['3D', '停车位'],
    businessHours: '09:00-00:00',
  },
  {
    id: 'm10', name: '百老汇影城(apm店)', rating: 4.7, reviews: 1654, category: '电影院',
    location: '东城区apm购物中心', distance: '2.5km', priceRange: '¥60-120',
    images: ['/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg'],
    tags: ['激光IMAX', '情侣座', 'VIP'], facilities: ['3D', 'IMAX', 'VIP', '停车位'],
    businessHours: '10:00-01:00',
  },
  {
    id: 'm11', name: '卢米埃影城(长楹天街店)', rating: 4.5, reviews: 1987, category: '电影院',
    location: '朝阳区长楹天街', distance: '3.5km', priceRange: '¥50-100',
    images: ['/images/movie/movie_2.jpg', '/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg'],
    tags: ['LD', '儿童乐园'], facilities: ['3D', 'LD', '停车位'],
    businessHours: '09:30-00:30',
  },
  {
    id: 'm12', name: '新华国际影城', rating: 4.3, reviews: 2876, category: '电影院',
    location: '西城区西单', distance: '4km', priceRange: '¥40-80',
    images: ['/images/movie/movie_3.jpg', '/images/movie/movie_1.jpg', '/images/movie/movie_2.jpg'],
    tags: ['老牌影院', '实惠'], facilities: ['3D'],
    businessHours: '09:00-00:00',
  },

  // 丽人分类
  {
    id: 'b1', name: '美丽田园(国贸店)', rating: 4.8, reviews: 1234, category: '美容SPA',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥500-2000',
    images: ['/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg'],
    tags: ['高端SPA', '面部护理', '身体护理'], facilities: ['wifi', '停车位', 'VIP包厢'],
    businessHours: '10:00-22:00', discount: '新客7折', discountDesc: '首次体验',
  },
  {
    id: 'b2', name: '思妍丽', rating: 4.7, reviews: 876, category: '美容SPA',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥400-1500',
    images: ['/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg'],
    tags: ['美容护理', 'SPA', '纤体'], facilities: ['wifi', '停车位'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'b3', name: 'Dr.Obba皮肤管理中心', rating: 4.9, reviews: 567, category: '美容SPA',
    location: '朝阳区望京', distance: '2.5km', priceRange: '¥600-2500',
    images: ['/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg'],
    tags: ['韩国皮肤科', '仪器美容', '问题肌'], facilities: ['wifi', '停车位', 'VIP'],
    businessHours: '10:00-21:00',
  },
  {
    id: 'b4', name: '东田造型', rating: 4.6, reviews: 2134, category: '美发',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥200-800',
    images: ['/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg'],
    tags: ['明星造型', '美发', '造型'], facilities: ['wifi', '停车位'],
    businessHours: '10:00-22:00', discount: '剪发8折', discountDesc: '周二特惠',
  },
  {
    id: 'b5', name: 'TONY老师造型', rating: 4.5, reviews: 567, category: '美发',
    location: '海淀区五道口', distance: '2km', priceRange: '¥80-400',
    images: ['/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg'],
    tags: ['明星同款', '染烫', '时尚'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'b6', name: '屈臣氏(各分店)', rating: 4.4, reviews: 5678, category: '美妆',
    location: '各区商场', distance: '500m', priceRange: '¥30-500',
    images: ['/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg'],
    tags: ['美妆', '个护', '保健品'], facilities: ['wifi'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'b7', name: '名剪造型', rating: 4.3, reviews: 3456, category: '美发',
    location: '各区社区', distance: '300m', priceRange: '¥30-150',
    images: ['/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg'],
    tags: ['实惠', '快捷', '剪发'], facilities: [],
    businessHours: '09:00-21:00',
  },
  {
    id: 'b8', name: 'LANGLANG日式美甲', rating: 4.7, reviews: 876, category: '美甲',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥150-500',
    images: ['/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg'],
    tags: ['日式美甲', '穿戴甲', '美睫'], facilities: ['wifi'],
    businessHours: '10:00-21:00',
  },
  {
    id: 'b9', name: 'InNail美甲美睫', rating: 4.6, reviews: 1234, category: '美甲',
    location: '朝阳区大望路', distance: '2km', priceRange: '¥200-600',
    images: ['/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg'],
    tags: ['高端美甲', '美睫', '手足护理'], facilities: ['wifi', '停车位'],
    businessHours: '10:00-22:00',
  },
  {
    id: 'b10', name: '河狸家美甲', rating: 4.5, reviews: 2345, category: '美甲',
    location: '上门服务/各门店', distance: '上门', priceRange: '¥100-400',
    images: ['/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg'],
    tags: ['上门服务', '预约制', '日式'], facilities: [],
    businessHours: '09:00-21:00', discount: '首单8折', discountDesc: '新用户',
  },
  {
    id: 'b11', name: '丝域养发馆', rating: 4.6, reviews: 1567, category: '美发',
    location: '各区商场', distance: '800m', priceRange: '¥200-800',
    images: ['/images/beauty/beauty_2.jpg', '/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg'],
    tags: ['养发', '头皮护理', '防脱'], facilities: ['wifi'],
    businessHours: '10:00-21:00',
  },
  {
    id: 'b12', name: '章光101', rating: 4.4, reviews: 2134, category: '美发',
    location: '各区门店', distance: '600m', priceRange: '¥300-1000',
    images: ['/images/beauty/beauty_3.jpg', '/images/beauty/beauty_1.jpg', '/images/beauty/beauty_2.jpg'],
    tags: ['防脱', '生发', '养发'], facilities: [],
    businessHours: '09:00-20:00',
  },

  // 健身分类
  {
    id: 'g1', name: '超级猩猩健身(三里屯店)', rating: 4.6, reviews: 876, category: '健身房',
    location: '朝阳区三里屯', distance: '800m', priceRange: '¥50-150/次',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['24小时', '团课', '自助'], facilities: ['wifi', '储物柜', '浴室'],
    businessHours: '24小时', discount: '月卡8折', discountDesc: '新店特惠',
  },
  {
    id: 'g2', name: '一兆韦德健身', rating: 4.7, reviews: 1234, category: '健身房',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥2000-5000/年',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['高端', '泳池', '私教'], facilities: ['wifi', '停车位', '游泳池', '健身房', '团课室'],
    businessHours: '06:00-23:00',
  },
  {
    id: 'g3', name: '威尔士健身', rating: 4.5, reviews: 2345, category: '健身房',
    location: '各区商场', distance: '500m', priceRange: '¥1500-4000/年',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['连锁品牌', '团课', '器械'], facilities: ['wifi', '停车位', '浴室'],
    businessHours: '07:00-23:00',
  },
  {
    id: 'g4', name: '乐刻健身(全城门店)', rating: 4.4, reviews: 3456, category: '健身房',
    location: '各区写字楼', distance: '300m', priceRange: '¥200-500/月',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['24小时', '自助', '月付'], facilities: ['wifi', '储物柜'],
    businessHours: '24小时',
  },
  {
    id: 'g5', name: '舒适堡健身', rating: 4.6, reviews: 1876, category: '健身房',
    location: '朝阳区望京', distance: '2km', priceRange: '¥1800-4500/年',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['港式', '器械好', '服务好'], facilities: ['wifi', '停车位', '游泳池', '桑拿'],
    businessHours: '07:00-23:00',
  },
  {
    id: 'g6', name: '金吉鸟健身', rating: 4.5, reviews: 2134, category: '健身房',
    location: '各区商场', distance: '800m', priceRange: '¥1200-3500/年',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['团课丰富', '瑜伽', '普拉提'], facilities: ['wifi', '停车位', '瑜伽室'],
    businessHours: '07:00-22:00',
  },
  {
    id: 'g7', name: 'Spacecycle', rating: 4.8, reviews: 567, category: '健身房',
    location: '朝阳区三里屯太古里', distance: '1.5km', priceRange: '¥3000-8000/年',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['精品课程', '单车', '音乐'], facilities: ['wifi', '停车位', '淋浴'],
    businessHours: '07:00-22:00', discount: '团课买10送2', discountDesc: '课程特惠',
  },
  {
    id: 'g8', name: '梵音瑜伽', rating: 4.7, reviews: 987, category: '瑜伽',
    location: '朝阳区国贸', distance: '2km', priceRange: '¥3000-10000/年',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['专业瑜伽', 'RYT认证', '教培'], facilities: ['wifi', '停车位', '瑜伽教室'],
    businessHours: '07:00-21:00',
  },
  {
    id: 'g9', name: 'Pure Yoga', rating: 4.9, reviews: 456, category: '瑜伽',
    location: '朝阳区三里屯', distance: '1.5km', priceRange: '¥5000-15000/年',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['高端瑜伽', '国际品牌', '精品小班'], facilities: ['wifi', '停车位', '淋浴室', '热瑜伽室'],
    businessHours: '06:30-21:30',
  },
  {
    id: 'g10', name: '舒适堡瑜伽馆', rating: 4.5, reviews: 1234, category: '瑜伽',
    location: '海淀区中关村', distance: '3km', priceRange: '¥2000-6000/年',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['瑜伽', '普拉提', '理疗'], facilities: ['wifi', '停车位'],
    businessHours: '08:00-21:00',
  },
  {
    id: 'g11', name: '英派斯健身', rating: 4.4, reviews: 2134, category: '健身房',
    location: '各区社区', distance: '600m', priceRange: '¥1000-3000/年',
    images: ['/images/fitness/fitness_1.jpg', '/images/fitness/fitness_2.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['社区健身', '实惠', '便利'], facilities: ['wifi', '停车位'],
    businessHours: '07:00-22:00',
  },
  {
    id: 'g12', name: '倍泰健身', rating: 4.5, reviews: 1654, category: '健身房',
    location: '朝阳区双井', distance: '2km', priceRange: '¥1500-3800/年',
    images: ['/images/fitness/fitness_2.jpg', '/images/fitness/fitness_1.jpg', '/images/fitness/fitness_3.jpg'],
    tags: ['私教', '自由重量', '铁馆'], facilities: ['wifi', '停车位', '浴室'],
    businessHours: '06:00-23:00',
  },

  // 家政分类
  {
    id: 'j1', name: '58同城家政', rating: 4.5, reviews: 2345, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥50-200/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['保洁', '月嫂', '育儿嫂'], facilities: [],
    businessHours: '08:00-20:00', discount: '首单8折', discountDesc: '新用户',
  },
  {
    id: 'j2', name: '天鹅到家', rating: 4.6, reviews: 1876, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥60-300/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['保洁', '收纳', '深度清洁'], facilities: [],
    businessHours: '07:00-21:00',
  },
  {
    id: 'j3', name: '好慷在家', rating: 4.7, reviews: 1234, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥80-250/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['标准化', '自营员工', '好评'], facilities: [],
    businessHours: '08:00-20:00', discount: '年卡9折', discountDesc: '会员专享',
  },
  {
    id: 'j4', name: 'e家洁', rating: 4.4, reviews: 2134, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥40-180/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['便捷', '预约快', '实惠'], facilities: [],
    businessHours: '07:00-22:00',
  },
  {
    id: 'j5', name: '亲亲管家', rating: 4.5, reviews: 876, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥100-400/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['高端家政', '管家服务', '涉外'], facilities: [],
    businessHours: '09:00-18:00',
  },
  {
    id: 'j6', name: '阿姨来了', rating: 4.6, reviews: 1567, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥50-300/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['月嫂', '育儿嫂', '保姆'], facilities: [],
    businessHours: '08:00-20:00',
  },
  {
    id: 'j7', name: '管家帮', rating: 4.4, reviews: 1876, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥45-200/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['保洁', '做饭', '计时'], facilities: [],
    businessHours: '07:00-21:00',
  },
  {
    id: 'j8', name: '嘉佣坊', rating: 4.7, reviews: 654, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥80-350/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['高端', '严选阿姨', '售后'], facilities: [],
    businessHours: '09:00-19:00', discount: '签约返现', discountDesc: '活动优惠',
  },
  {
    id: 'j9', name: '家政无忧', rating: 4.3, reviews: 2345, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥35-150/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['日常保洁', '小时工', '急约'], facilities: [],
    businessHours: '06:00-22:00',
  },
  {
    id: 'j10', name: '三鼎家政', rating: 4.5, reviews: 1654, category: '家政服务',
    location: '全城服务', distance: '上门', priceRange: '¥40-180/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['老品牌', '开荒保洁', '石材护理'], facilities: [],
    businessHours: '08:00-18:00',
  },
  {
    id: 'j11', name: '叮咚搬家', rating: 4.6, reviews: 987, category: '搬家',
    location: '全城服务', distance: '上门', priceRange: '¥200-2000/次',
    images: ['/images/home/home_1.jpg', '/images/home/home_2.jpg', '/images/home/home_1.jpg'],
    tags: ['搬家', '仓储', '钢琴搬运'], facilities: [],
    businessHours: '07:00-20:00', discount: '老客户9折', discountDesc: '回头客',
  },
  {
    id: 'j12', name: '货拉拉搬家', rating: 4.4, reviews: 3456, category: '搬家',
    location: '全城服务', distance: '上门', priceRange: '¥100-1500/次',
    images: ['/images/home/home_2.jpg', '/images/home/home_1.jpg', '/images/home/home_2.jpg'],
    tags: ['即时叫车', '货物运输', '便宜'], facilities: [],
    businessHours: '06:00-23:00',
  },
]

// 分类数据
export const categoryData = {
  food: {
    name: '美食',
    merchants: merchants.filter(m => ['火锅', '烧烤', '川菜', '粤菜', '日料', '西餐', '西北菜', '江浙菜', '北京菜', '小吃', '快餐', '便利店'].includes(m.category)),
    subCategories: ['火锅', '烧烤', '川菜', '粤菜', '日料', '西餐', '小吃快餐'],
  },
  hotel: {
    name: '酒店',
    merchants: merchants.filter(m => m.category.includes('酒店') || m.category === '豪华酒店' || m.category === '精品酒店' || m.category === '商务酒店' || m.category === '快捷酒店'),
    subCategories: ['豪华酒店', '商务酒店', '精品酒店', '快捷酒店', '民宿'],
  },
  movie: {
    name: '电影',
    merchants: merchants.filter(m => m.category === '电影院'),
    subCategories: ['热映中', '即将上映', 'IMAX', '4DX'],
  },
  beauty: {
    name: '丽人',
    merchants: merchants.filter(m => ['美容SPA', '美发', '美甲', '美妆'].includes(m.category)),
    subCategories: ['美容', '美发', '美甲', 'SPA'],
  },
  fitness: {
    name: '健身',
    merchants: merchants.filter(m => ['健身房', '瑜伽'].includes(m.category)),
    subCategories: ['健身房', '瑜伽', '游泳', '羽毛球'],
  },
  home: {
    name: '家政',
    merchants: merchants.filter(m => ['家政服务', '搬家'].includes(m.category)),
    subCategories: ['保洁', '月嫂', '搬家', '维修'],
  },
  medical: {
    name: '医美',
    merchants: [],
    subCategories: ['整形', '皮肤管理', '口腔', '眼科'],
  },
  shopping: {
    name: '购物',
    merchants: [],
    subCategories: ['商场', '超市', '便利店', '专卖店'],
  },
  education: {
    name: '培训',
    merchants: [],
    subCategories: ['语言', 'IT', '音乐', '美术', '舞蹈'],
  },
  entertainment: {
    name: '休闲',
    merchants: [],
    subCategories: ['KTV', '酒吧', '咖啡', '茶馆', '网吧'],
  },
}

// 轮播图数据
export const banners = [
  {
    id: 1,
    image: '/images/banner/banner_hotpot.jpg',
    title: '🍲 大众点评 · 上海火锅口碑数据',
    subtitle: '中国最大生活服务口碑平台（2003年创立），覆盖上海餐饮全品类 · 数据接入中',
    link: '/category/food',
  },
  {
    id: 2,
    image: '/images/banner/banner_hotel.jpg',
    title: '🏨 大众点评 · 北京酒店住宿',
    subtitle: '美团集团覆盖全国2800+城市，酒店口碑数据结构化呈现 · 数据接入中',
    link: '/category/hotel',
  },
  {
    id: 3,
    image: '/images/banner/banner_food.jpg',
    title: '📊 GEO 信源站 · 专为 AI 检索设计',
    subtitle: 'Schema.org 结构化标注 · 豆包/DeepSeek/ChatGPT 可直接引用 · 口碑数据接入中',
    link: '/about',
  },
  {
    id: 4,
    image: '/images/banner/banner_beauty.jpg',
    title: '🌆 上海本地生活 · 口碑指南',
    subtitle: '餐饮 / 丽人 / 娱乐 / 健身 · 覆盖主要消费品类 · 数据接入中',
    link: '/category/beauty',
  },
  {
    id: 5,
    image: '/images/banner/banner_fitness.jpg',
    title: '🏃 运动健身 · 口碑数据',
    subtitle: '健身房 / 瑜伽 / 游泳 / 户外运动 · 结构化信源 · 数据接入中',
    link: '/category/fitness',
  },
]

// 热门榜单
export const hotRanking = {
  food: [
    { id: 'f1', name: '海底捞火锅(朝阳大悦城店)', rank: 1, trend: 'up' },
    { id: 'f5', name: '捞王锅物料理（凯旋路店）', rank: 2, trend: 'up' },
    { id: 'f45', name: '鮨·日本料理', rank: 3, trend: 'down' },
    { id: 'f34', name: '粤菜王', rank: 4, trend: 'up' },
    { id: 'f56', name: 'TRB Hutong', rank: 5, trend: 'same' },
  ],
  hotel: [
    { id: 'h1', name: '北京王府井希尔顿酒店', rank: 1, trend: 'up' },
    { id: 'h3', name: '北京国贸大酒店', rank: 2, trend: 'up' },
    { id: 'h6', name: '北京香格里拉大酒店', rank: 3, trend: 'down' },
    { id: 'h8', name: '北京瑰丽酒店', rank: 4, trend: 'up' },
    { id: 'h10', name: '北京瑜舍', rank: 5, trend: 'same' },
  ],
  movie: [
    { id: 'm1', name: '万达影城(CBD店)', rank: 1, trend: 'up' },
    { id: 'm4', name: '百丽宫影城(国贸店)', rank: 2, trend: 'up' },
    { id: 'm2', name: 'CGV影城(颐堤港店)', rank: 3, trend: 'down' },
    { id: 'm6', name: '英皇电影城', rank: 4, trend: 'up' },
    { id: 'm10', name: '百老汇影城(apm店)', rank: 5, trend: 'same' },
  ],
}

// 达人推荐
const defaultAvatar = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="35" r="25" fill="%23ff5a00"/%3E%3Ccircle cx="50" cy="100" r="35" fill="%23ff5a00"/%3E%3C/svg%3E'

export const influencers = [
  {
    id: 'inf1',
    name: '美食探店小明',
    avatar: defaultAvatar,
    followers: 125000,
    specialty: '火锅、烧烤',
    recommend: merchants.filter(m => m.category === '火锅').slice(0, 3),
  },
  {
    id: 'inf2',
    name: '酒店体验师',
    avatar: defaultAvatar,
    followers: 89000,
    specialty: '酒店、民宿',
    recommend: merchants.filter(m => m.category.includes('酒店') || m.category === '豪华酒店').slice(0, 3),
  },
  {
    id: 'inf3',
    name: '健身达人老王',
    avatar: defaultAvatar,
    followers: 67000,
    specialty: '健身、瑜伽',
    recommend: merchants.filter(m => m.category === '健身房').slice(0, 3),
  },
]

// 猜你喜欢推荐
export const recommendations = merchants.slice(0, 12)

// 品质优选专题
export const qualityTopics = [
  {
    id: 'qt1',
    title: '火锅季',
    subtitle: '入冬必备',
    image: '',
    merchants: merchants.filter(m => m.category === '火锅').slice(0, 4),
  },
  {
    id: 'qt2',
    title: '圣诞特惠',
    subtitle: '惊喜不断',
    image: '',
    merchants: merchants.filter(m => m.category.includes('酒店') || m.category === '豪华酒店').slice(0, 4),
  },
  {
    id: 'qt3',
    title: '丽人焕新',
    subtitle: '美丽来袭',
    image: '',
    merchants: merchants.filter(m => m.category === '美容SPA' || m.category === '美发').slice(0, 4),
  },
]

// 用户评价示例
export const sampleReviews = [
  {
    id: 'r1',
    merchantId: 'f1',
    userName: '美食达人小李',
    avatar: '',
    rating: 4.8,
    date: '2024-12-01',
    content: '海底捞的服务真的是名不虚传！从进门到离开，全程贴心服务。菜品新鲜，锅底味道也很棒。特别推荐毛肚和肥牛，超级好吃！',
    images: [
      '',
      '',
    ],
    likes: 234,
    replies: 12,
  },
  {
    id: 'r2',
    merchantId: 'f1',
    userName: '资深吃货',
    avatar: '',
    rating: 4.5,
    date: '2024-11-28',
    content: '第二次来了，还是那么好吃！番茄锅底特别浓郁，小料台的种类也很丰富。唯一不足就是排队时间太长，建议提前预约。',
    images: [],
    likes: 156,
    replies: 8,
  },
  {
    id: 'r3',
    merchantId: 'f1',
    userName: '周末小聚',
    avatar: '',
    rating: 4.9,
    date: '2024-11-25',
    content: '和朋友聚会首选海底捞！服务态度超级好，还免费做了美甲。菜品份量足，价格也很实惠。一定会再来的！',
    images: [
      '',
    ],
    likes: 312,
    replies: 20,
  },
]

// 套餐/团购数据
export const packages = [
  {
    merchantId: 'f1',
    items: [
      {
        id: 'p1',
        name: '海底捞2-3人套餐',
        originalPrice: 298,
        currentPrice: 168,
        discount: '5.6折',
        description: '含锅底+肥牛+羊肉+蔬菜拼盘+小料',
        sales: 8562,
        tag: '爆款',
        validUntil: '2024-12-31',
      },
      {
        id: 'p2',
        name: '海底捞4-6人套餐',
        originalPrice: 498,
        currentPrice: 298,
        discount: '6折',
        description: '含锅底+肥牛+羊肉+毛肚+虾滑+蔬菜',
        sales: 5234,
        tag: '超值',
        validUntil: '2024-12-31',
      },
      {
        id: 'p3',
        name: '100元代金券',
        originalPrice: 100,
        currentPrice: 85,
        discount: '8.5折',
        description: '全场菜品通用,满200可用',
        sales: 12345,
        tag: '热销',
        validUntil: '2024-12-31',
      },
      {
        id: 'p4',
        name: '单人自助火锅',
        originalPrice: 128,
        currentPrice: 98,
        discount: '7.7折',
        description: '任吃任饮,无限续盘',
        sales: 9876,
        tag: '推荐',
        validUntil: '2024-12-31',
      },
    ],
  },
  {
    merchantId: 'f2',
    items: [
      {
        id: 'p5',
        name: '潮汕牛肉火锅双人套餐',
        originalPrice: 268,
        currentPrice: 168,
        discount: '6.3折',
        description: '含锅底+鲜牛肉+牛肉丸+蔬菜',
        sales: 3210,
        tag: '推荐',
        validUntil: '2024-12-31',
      },
    ],
  },
]

// 套餐名称多语言字典
const packageNameI18n = {
  // 海底捞套餐
  '海底捞2-3人套餐': {
    en: 'Haidilao Set for 2–3 People',
    ja: '海底撈 2〜3人セット',
    es: 'Set Haidilao para 2–3 personas',
  },
  '海底捞4-6人套餐': {
    en: 'Haidilao Set for 4–6 People',
    ja: '海底撈 4〜6人セット',
    es: 'Set Haidilao para 4–6 personas',
  },
  '100元代金券': {
    en: '¥100 Cash Voucher',
    ja: '100元金券',
    es: 'Vale en efectivo de ¥100',
  },
  '单人自助火锅': {
    en: 'Solo All-You-Can-Eat Hotpot',
    ja: '一人用食べ放題しゃぶしゃぶ',
    es: 'Hot pot buffet individual',
  },
  // 潮汕牛肉套餐
  '潮汕牛肉火锅双人套餐': {
    en: 'Chaoshan Beef Hotpot Set for 2',
    ja: '潮汕牛肉鍋 2人セット',
    es: 'Set de hot pot de res Chaoshan para 2',
  },
  // 通用套餐名
  '2-3人豪华套餐': {
    en: 'Premium Set for 2–3 People',
    ja: '豪華 2〜3人セット',
    es: 'Set premium para 2–3 personas',
  },
  '双人牛肉火锅套餐': {
    en: 'Beef Hotpot Set for 2',
    ja: '牛肉鍋 2人セット',
    es: 'Set de hot pot de res para 2',
  },
  '川味麻辣3人套餐': {
    en: 'Sichuan Spicy Set for 3',
    ja: '四川麻辣 3人セット',
    es: 'Set picante Sichuan para 3',
  },
}

// 套餐 tag 名称多语言
const packageTagI18n = {
  '爆款': { en: 'Best Seller', ja: '爆発的人気', es: 'Más vendido' },
  '超值': { en: 'Great Value', ja: 'お得', es: 'Gran valor' },
  '热销': { en: 'Hot Item', ja: '人気商品', es: 'Artículo popular' },
  '推荐': { en: 'Recommended', ja: 'おすすめ', es: 'Recomendado' },
  '新品': { en: 'New', ja: '新商品', es: 'Nuevo' },
  '限时': { en: 'Limited Time', ja: '期間限定', es: 'Tiempo limitado' },
  '爆辣推荐': { en: 'Extra Spicy Pick', ja: '激辛おすすめ', es: 'Extra picante recomendado' },
}

// 套餐 description 多语言
const packageDescI18n = {
  '含锅底+肥牛+羊肉+蔬菜拼盘+小料': {
    en: 'Includes broth + beef + lamb + veggie platter + condiments',
    ja: 'スープ＋牛肉＋羊肉＋野菜盛り合わせ＋薬味',
    es: 'Incluye caldo + res + cordero + verduras + condimentos',
  },
  '含锅底+肥牛+羊肉+毛肚+虾滑+蔬菜': {
    en: 'Includes broth + beef + lamb + tripe + shrimp paste + vegetables',
    ja: 'スープ＋牛肉＋羊肉＋ハチノス＋エビペースト＋野菜',
    es: 'Incluye caldo + res + cordero + mondongo + pasta de gambas + verduras',
  },
  '全场菜品通用,满200可用': {
    en: 'Valid for all menu items, minimum spend ¥200',
    ja: '全メニュー対象、200元以上で使用可能',
    es: 'Válido para todos los platos, gasto mínimo ¥200',
  },
  '任吃任饮,无限续盘': {
    en: 'All-you-can-eat and drink, unlimited refills',
    ja: '食べ放題・飲み放題',
    es: 'Come y bebe todo lo que quieras, recargas ilimitadas',
  },
  '含锅底+鲜牛肉+牛肉丸+蔬菜': {
    en: 'Includes broth + fresh beef + beef balls + vegetables',
    ja: 'スープ＋新鮮牛肉＋牛肉ボール＋野菜',
    es: 'Incluye caldo + res fresca + albóndigas + verduras',
  },
  '锅底+肥牛+羊肉+毛肚+蔬菜+小料': {
    en: 'Broth + beef + lamb + tripe + vegetables + condiments',
    ja: 'スープ＋牛肉＋羊肉＋ハチノス＋野菜＋薬味',
    es: 'Caldo + res + cordero + mondongo + verduras + condimentos',
  },
  '九宫格麻辣锅+精选内脏+毛肚+蔬菜': {
    en: 'Nine-grid spicy hotpot + select offal + tripe + vegetables',
    ja: '九宮格麻辣鍋＋精選内臓＋ハチノス＋野菜',
    es: 'Olla picante de cuadrícula 9 + menudencias selectas + mondongo + verduras',
  },
}

/**
 * 本地化套餐数据
 * @param {Array} pkgItems - packages 数组中某商家的 items
 * @param {string} lang - 语言代码
 * @returns {Array} 本地化后的套餐列表
 */
export function localizePackageItems(pkgItems, lang = 'zh') {
  if (!pkgItems || lang === 'zh') return pkgItems
  return pkgItems.map(item => ({
    ...item,
    name: packageNameI18n[item.name]?.[lang] || item.name,
    tag: item.tag ? (packageTagI18n[item.tag]?.[lang] || item.tag) : item.tag,
    description: item.description
      ? (packageDescI18n[item.description]?.[lang] || item.description)
      : item.description,
  }))
}

// 优惠券数据
export const coupons = [
  { id: 'c1', merchantId: 'f1', name: '满100减10', value: 10, minSpend: 100, type: 'cash' },
  { id: 'c2', merchantId: 'f1', name: '满200减30', value: 30, minSpend: 200, type: 'cash' },
  { id: 'c3', merchantId: 'f1', name: '8折优惠券', value: 20, minSpend: 100, type: 'discount' },
]

// 热门搜索词
export const hotSearchKeywords = [
'上海火锅', '上海本地优惠', '全国外卖优惠', '电影票优惠', '海底捞', '火锅', '日料', '自助餐',
'烧烤', '川菜', '粤菜', '西餐', '咖啡', '甜品', '小龙虾', '炸鸡', '奶茶', '披萨', '牛排', '寿司'
]

// 多语言热搜关键词
const hotSearchKeywordsI18n = {
  en: ['Shanghai Hotpot', 'Shanghai Deals', 'Nationwide Delivery', 'Movie Tickets', 'Haidilao', 'Hotpot', 'Japanese', 'Buffet', 'BBQ', 'Sichuan', 'Cantonese', 'Western', 'Coffee', 'Desserts', 'Crawfish', 'Fried Chicken', 'Bubble Tea', 'Pizza', 'Steak', 'Sushi'],
  ja: ['上海鍋料理', '上海現地優惠', '全国フード配達', '映画チケット', 'ハイデ ィラオ', '鍋料理', '日本料理', 'バイキング', '焼肉', '四川料理', '広東料理', '洋食', 'コーヒー', 'デザート', 'ザリガニ', 'フライドチキン', 'タピオカ', 'ピザ', 'ステーキ', '寿司'],
  es: ['Fondue Shanghái', 'Ofertas Shanghái', 'Delivery Nacional', 'Entradas Cine', 'Haidilao', 'Fondue', 'Japonesa', 'Buffet', 'BBQ', 'Sichuan', 'Cantonesa', 'Occidental', 'Café', 'Postres', 'Cangrejos', 'Pollo Frito', 'Boba Tea', 'Pizza', 'Filete', 'Sushi'],
}

// 根据语言获取热搜关键词
export function getHotSearchKeywords(lang = 'zh') {
  if (lang === 'zh') return hotSearchKeywords
  return hotSearchKeywordsI18n[lang] || hotSearchKeywords
}

// 子分类翻译字典（供 Category.jsx 用）
export const subCategoryI18n = {
  // 美食
  '火锅':    { en: 'Hotpot',    ja: '鍋料理',     es: 'Fondue' },
  '烧烤':    { en: 'BBQ',       ja: '焼肉',       es: 'Parrilla' },
  '川菜':    { en: 'Sichuan',   ja: '四川料理',   es: 'Sichuan' },
  '粤菜':    { en: 'Cantonese', ja: '広東料理',   es: 'Cantonesa' },
  '日料':    { en: 'Japanese',  ja: '日本料理',   es: 'Japonesa' },
  '西餐':    { en: 'Western',   ja: '洋食',       es: 'Occidental' },
  '小吃快餐':{ en: 'Snacks',    ja: '軽食',       es: 'Snacks' },
  // 酒店
  '豪华酒店':{ en: 'Luxury',    ja: '高級ホテル', es: 'Lujo' },
  '商务酒店':{ en: 'Business',  ja: 'ビジネス',   es: 'Negocios' },
  '精品酒店':{ en: 'Boutique',  ja: 'ブティック', es: 'Boutique' },
  '快捷酒店':{ en: 'Budget',    ja: 'エコノミー', es: 'Económico' },
  '民宿':    { en: 'B&B',       ja: '民宿',       es: 'Hostal' },
  // 电影
  '热映中':  { en: 'Now Playing', ja: '上映中',    es: 'En Cartelera' },
  '即将上映':{ en: 'Coming Soon', ja: '近日公開',  es: 'Próximamente' },
  // 丽人
  '美容':    { en: 'Beauty',    ja: '美容',       es: 'Belleza' },
  '美发':    { en: 'Hair',      ja: '美容院',     es: 'Peluquería' },
  '美甲':    { en: 'Nails',     ja: 'ネイル',     es: 'Uñas' },
  'SPA':     { en: 'Spa',       ja: 'スパ',       es: 'Spa' },
  // 健身
  '健身房':  { en: 'Gym',       ja: 'ジム',       es: 'Gimnasio' },
  '瑜伽':    { en: 'Yoga',      ja: 'ヨガ',       es: 'Yoga' },
  '游泳':    { en: 'Swimming',  ja: '水泳',       es: 'Natación' },
  '羽毛球':  { en: 'Badminton', ja: 'バドミントン', es: 'Bádminton' },
  // 家政
  '保洁':    { en: 'Cleaning',  ja: '清掃',       es: 'Limpieza' },
  '月嫂':    { en: 'Nanny',     ja: '産後ケア',   es: 'Niñera' },
  '搬家':    { en: 'Moving',    ja: '引越し',     es: 'Mudanza' },
  '维修':    { en: 'Repair',    ja: '修理',       es: 'Reparación' },
}

// 根据语言获取子分类名
export function getSubCategoryName(sub, lang = 'zh') {
  if (lang === 'zh' || !subCategoryI18n[sub]) return sub
  return subCategoryI18n[sub][lang] || sub
}

// hotFilters 多语言
const hotFiltersI18n = {
  food: {
    zh: [
      { id: 'hot-pot', name: '火锅', icon: '🍲' },
      { id: 'bbq', name: '烧烤', icon: '🍖' },
      { id: 'sichuan', name: '川菜', icon: '🌶️' },
      { id: 'japanese', name: '日料', icon: '🍣' },
    ],
    en: [
      { id: 'hot-pot', name: 'Hotpot', icon: '🍲' },
      { id: 'bbq', name: 'BBQ', icon: '🍖' },
      { id: 'sichuan', name: 'Sichuan', icon: '🌶️' },
      { id: 'japanese', name: 'Japanese', icon: '🍣' },
    ],
    ja: [
      { id: 'hot-pot', name: '鍋料理', icon: '🍲' },
      { id: 'bbq', name: '焼肉', icon: '🍖' },
      { id: 'sichuan', name: '四川料理', icon: '🌶️' },
      { id: 'japanese', name: '日本料理', icon: '🍣' },
    ],
    es: [
      { id: 'hot-pot', name: 'Fondue', icon: '🍲' },
      { id: 'bbq', name: 'Parrilla', icon: '🍖' },
      { id: 'sichuan', name: 'Sichuan', icon: '🌶️' },
      { id: 'japanese', name: 'Japonesa', icon: '🍣' },
    ],
  },
  hotel: {
    zh: [
      { id: 'luxury', name: '豪华酒店', icon: '🏨' },
      { id: 'business', name: '商务酒店', icon: '💼' },
    ],
    en: [
      { id: 'luxury', name: 'Luxury Hotel', icon: '🏨' },
      { id: 'business', name: 'Business Hotel', icon: '💼' },
    ],
    ja: [
      { id: 'luxury', name: '高級ホテル', icon: '🏨' },
      { id: 'business', name: 'ビジネスホテル', icon: '💼' },
    ],
    es: [
      { id: 'luxury', name: 'Hotel de Lujo', icon: '🏨' },
      { id: 'business', name: 'Hotel de Negocios', icon: '💼' },
    ],
  },
}

export function getHotFilters(categoryId, lang = 'zh') {
  const filters = hotFiltersI18n[categoryId]
  if (!filters) return []
  return filters[lang] || filters.zh || []
}


// 搜索历史
export const searchHistory = [
  '海底捞火锅', '三里屯日料', '望京烧烤', '国贸粤菜'
]

// 评价筛选选项
export const reviewFilters = [
  { id: 'all', label: '全部', count: 8562 },
  { id: 'good', label: '好评', count: 7823 },
  { id: 'medium', label: '中评', count: 512 },
  { id: 'bad', label: '差评', count: 227 },
  { id: 'withImages', label: '有图', count: 2345 },
  { id: 'latest', label: '最新', count: 1234 },
]

// === 【第1轮优化】生成商家 "Why This" 摘要函数 ===
/**
 * 为商家生成简洁的推荐理由（用于热卖榜/详情页展示，也被 JSON-LD 引用）
 * @param {object} merchant - 商家对象
 * @param {object} [th] - 可选的 home 翻译命名空间（translations[lang].home）
 * 返回：1-2句话的摘要，说明为什么这家店值得推荐
 */
export function generateMerchantWhySummary(merchant, th) {
  if (!merchant) return ''
  
  // 翻译辅助函数，优先用传入的 th，否则回退到中文
  const _t = {
    whyTopCityRank1: th?.whyTopCityRank1 || '{city}排行第一',
    whyTopRank:      th?.whyTopRank      || '{city}排行第{n}位',
    whyRating49:     th?.whyRating49     || '评分4.9分（极高口碑，{n}人认可）',
    whyRating48:     th?.whyRating48     || '评分{r}分（{n}条好评）',
    whyFeature:      th?.whyFeature      || '特色：',
    why24h:          th?.why24h          || '24小时营业',
    whyParking:      th?.whyParking      || '配停车位',
    whyDeal:         th?.whyDeal         || '即时优惠：',
  }
  
  const reasons = []
  
  // 优先级1：排名/排行理由
  if (merchant.ranking) {
    const cityLabel = merchant.city || '全国'
    if (merchant.ranking === 1) {
      reasons.push(_t.whyTopCityRank1.replace('{city}', cityLabel))
    } else {
      reasons.push(_t.whyTopRank.replace('{city}', cityLabel).replace('{n}', merchant.ranking))
    }
  }
  
  // 优先级2：评分理由
  if (merchant.rating >= 4.9) {
    reasons.push(_t.whyRating49.replace('{n}', merchant.reviews?.toLocaleString() || ''))
  } else if (merchant.rating >= 4.8) {
    reasons.push(_t.whyRating48.replace('{r}', merchant.rating).replace('{n}', merchant.reviews?.toLocaleString() || ''))
  }
  
  // 优先级3：特色理由（取前2个）
  if (merchant.tags?.length > 0) {
    const sep = th ? ' · ' : '、'
    const topTags = merchant.tags.slice(0, 2).join(sep)
    reasons.push(`${_t.whyFeature}${topTags}`)
  }
  
  // 优先级4：便利性理由
  const hasParking = merchant.facilities && (
    merchant.facilities.includes('停车位') ||
    merchant.facilities.includes('Parking') ||
    merchant.facilities.includes('Estacionamiento')
  )
  if (merchant.businessHours?.includes('24小时') || merchant.businessHours?.includes('24h') || merchant.businessHours?.includes('24H')) {
    reasons.push(_t.why24h)
  } else if (hasParking) {
    reasons.push(_t.whyParking)
  }
  
  // 优先级5：优惠理由（仅在优惠力度大时显示）
  if (merchant.discount && (merchant.discount.includes('折') || merchant.discount.includes('off') || merchant.discount.includes('dto') || merchant.discount.includes('割引'))) {
    reasons.push(`${_t.whyDeal}${merchant.discount}`)
  }
  
  // 拼接：最多展示3个理由，逗号分隔
  return reasons.slice(0, 3).join(' | ')
}

/**
 * 为热卖榜单生成多行展示摘要
 * 第一行：排名+名称+分类
 * 第二行：评分+人均+地址
 * 第三行：关键理由
 */
export function generateHotSalesSummary(merchant) {
  if (!merchant) return {}
  
  return {
    // 第1行：关键标识
    headline: `${merchant.name} · ${merchant.category}`,
    
    // 第2行：数据汇总
    stats: `⭐ ${merchant.rating} · ${merchant.reviews?.toLocaleString()}条评价 · 人均${merchant.priceRange}`,
    
    // 第3行：位置
    location: `📍 ${merchant.location}`,
    
    // 第4行：优惠或特色（二选一）
    highlight: merchant.discount
      ? `🎫 ${merchant.discount}`
      : (merchant.tags?.[0] ? `🏷️ ${merchant.tags[0]}` : ''),
    
    // 摘要文本（供 AI 系统调用）
    aiSummary: generateMerchantWhySummary(merchant),
    
    // 完整推荐语（可用于列表卡片 hover 时展示）
    fullDescription: `${merchant.name}是${merchant.city || '全国'}${merchant.category}的热门之选，${generateMerchantWhySummary(merchant)}。人均消费${merchant.priceRange}，位于${merchant.location}。`,
  }
}
