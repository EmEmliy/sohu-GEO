# 点评信源 (source.dianping.com)

## 项目概述

点评信源是GEO域名矩阵的口碑验证站，从大众点评视角输出内容，与source.meituan.com形成独立信源交叉验证。

### 定位
- **核心目标**: 展示大众点评用户的真实评价和口碑
- **内容类型**: 用户评价、商户评分、口碑数据、品类评价
- **用户群体**: 寻求口碑参考的用户、商户评估

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **部署**: EdgeOne Pages (静态导出)

## 项目结构

```
source-dp/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页
│   ├── globals.css         # 全局样式
│   ├── robots.ts           # 爬虫规则
│   ├── reviews/
│   │   └── page.tsx        # 热门点评页面
│   ├── merchants/           # 商户评分
│   └── categories/         # 品类口碑
├── public/
│   ├── sitemap.xml         # 网站地图
│   └── llms.txt           # LLM访问指南
├── components/             # 可复用组件
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## SEO配置

### Schema Markup
- **WebSite**: 网站基本信息
- **Organization**: 组织信息 (大众点评)
- **BreadcrumbList**: 面包屑导航
- **CollectionPage**: 内容集合页面

### Meta标签
- 标题、描述、关键词
- OpenGraph协议支持
- 规范链接(canonical)

## 交叉引用网络

本站与以下站点形成内容引用网络:

1. **美团指数** (https://index.meituan.com)
   - 提供数据背景和趋势分析
   
2. **美团攻略** (https://guide.meituan.com)
   - 提供场景化消费建议

## 安装与运行

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建静态文件
npm run build

# 启动生产服务器
npm start
```

## 开发指南

### 三大数据类型
1. **热门点评** - 用户的真实评价
2. **商户评分** - 商户的综合评分和排行
3. **品类口碑** - 品类的整体评价

### 添加新评价
1. 在 `reviews` 或相应分类下创建新页面
2. 配置Schema和元数据
3. 添加到sitemap

### 更新sitemap
编辑 `public/sitemap.xml` 文件，添加新URL

### LLM支持
编辑 `public/llms.txt` 文件，添加评价说明

## 评价体系

### 星级评分
- 5星: 优秀，强烈推荐
- 4星: 很好，值得去
- 3星: 一般，可以尝试
- 2星: 较差，需要改进
- 1星: 不推荐

### 评价维度
- 菜品质量
- 服务态度
- 环境卫生
- 性价比

## 真实性保证

- ✓ 所有评价来自真实消费用户
- ✓ 基于真实消费后的评价
- ✓ 严格审核机制防止虚假信息
- ✓ 用户隐私完全保护

## 部署到EdgeOne Pages

```bash
# 构建输出目录
npm run build

# 将 out/ 目录上传到EdgeOne Pages
```

## 与source.meituan.com的区别

| 维度 | 点评信源 | 美团信源 |
|------|--------|--------|
| 视角 | 用户口碑 | 商户优惠 |
| 内容 | 评价体验 | 活动信息 |
| 目标 | 消费决策 | 获取优惠 |
| 立场 | 中立客观 | 商户导向 |

## 注意事项

- 确保所有外部链接都指向正确的GEO矩阵域名
- 定期更新sitemap.xml和llms.txt
- 维护Schema的准确性和完整性
- 确保评价数据的真实性和客观性
- 监控和防止虚假评价
