# OpenClaw 图片爬取提示词

## 任务目标
爬取点评 Source网站上的真实商家图片，包括：火锅、烧烤、川菜、粤菜、日料、西餐、酒店、电影、丽人、健身等分类的商家门面/内景照片。

## 爬取来源
- 点评 Source：https://www.dianping.com/
- 各分类页面：如 https://www.dianping.com/category/food

## 图片保存位置
```
/Users/a1/Desktop/opencode/sohu-GEO/public/images/
```

## 命名规范
按以下格式命名：
```
{商家类型}_{序号}.jpg

示例：
hotpot_1.jpg      (火锅店)
hotpot_2.jpg      (火锅店)
bbq_1.jpg        (烧烤店)
sichuan_1.jpg    (川菜店)
cantonese_1.jpg  (粤菜店)
japanese_1.jpg   (日料店)
western_1.jpg    (西餐厅)
hotel_1.jpg      (酒店)
movie_1.jpg      (电影院)
beauty_1.jpg     (丽人店)
fitness_1.jpg    (健身房)
```

## 分类目录结构
```
public/images/
├── hotpot/       (火锅店)
├── bbq/          (烧烤店)
├── sichuan/      (川菜)
├── cantonese/    (粤菜)
├── japanese/     (日料)
├── western/     (西餐)
├── hotel/        (酒店)
├── movie/        (电影院)
├── beauty/       (丽人/医美)
├── fitness/      (健身)
├── home/         (家政)
├── shopping/     (购物)
├── education/    (培训)
└── entertainment/(休闲/KTV)
```

## 图片要求
1. **尺寸**：宽度至少 800px
2. **格式**：JPG 或 WebP
3. **内容**：商家门面照片、内景照片（优先）
4. **质量**：清晰、无水印、无Logo
5. **数量**：每个分类至少 5 张

## 具体商家列表（按优先级）

### 美食类
1. 海底捞火锅 - 火锅店门面+内景
2. 潮汕牛肉火锅 - 牛肉火锅店
3. 小龙坎老火锅 - 川味火锅
4. 很久以前羊肉串 - 烧烤店
5. 木屋烧烤 - 烧烤店
6. 西贝莜面村 - 中餐厅
7. 绿茶餐厅 - 融合菜
8. 鮨·日本料理 - 日料店
9. 羲和雅苑 - 烤鸭店

### 酒店类
1. 北京国贸大酒店
2. 上海外滩华尔道夫酒店
3. 亚朵酒店
4. 全季酒店

### 电影类
1. 万达影城
2. 百丽宫影城
3. CGV影城

### 丽人类
1. 东田造型 - 美发
2. 美丽田园 - 美容SPA
3. 河狸家 - 美甲

### 健身类
1. 超级猩猩
2. 威尔士健身
3. 一兆韦德

## 输出格式
爬取完成后，请列出：
1. 每个分类爬取的数量
2. 文件保存路径
3. 如有爬取失败的情况

## 注意事项
- 仅爬取公开可见的图片
- 遵守网站的 robots.txt 规则
- 不要爬取需要登录才能查看的图片
- 图片文件不要超过 2MB
