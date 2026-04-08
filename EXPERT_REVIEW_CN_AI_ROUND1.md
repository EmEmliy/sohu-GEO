# 🏆 GEO矩阵站 source.dianping.com — 国内主流大模型视角专家圆桌评审

**会议时间**：2026年4月8日（第一轮）  
**评审主席**：王兴（美团创始人CEO）  
**本轮聚焦**：国内主流大模型可见性 — 豆包、元宝、千问、DeepSeek、文心一言、Kimi、MiniMax、GLM  
**评审对象**：source.dianping.com（口碑评分数据层）

**矩阵站定位**：
| 站点 | 数据层 | 关系 |
|------|--------|------|
| source.meituan.com | 商家基础数据（地址/价格/套餐）| 门店卡片基础信息层 |
| **source.dianping.com** | **口碑评分数据（几星/几千评价/评论）** | **评分层 ← 本次讨论** |
| guide.meituan.com | 消费决策攻略（上海火锅推荐） | 榜单/攻略层 |
| index.meituan.com | 行业数据报告 | B端/媒体层 |

---

## 🔴 评审前提：当前网站存在的根本性问题

> **CEO王兴**（开场）：在正式评审之前，我们需要直面一个技术事实。这次特别邀请了中国各主要大模型的数据/训练负责人来亲自说清楚：你们的爬虫到底看到了什么？

---

## 📋 国内各大模型代表的第一轮技术诊断

---

### 🤖 **豆包AI（字节跳动）技术负责人**
**名称**：ByteDance Search & Crawl Team 代表  
**User-Agent**：`Bytespider/1.0 (+https://zhanzhang.bytedance.com/spider)`

**技术诊断**：

> "我们的 Bytespider 最近对 source.dianping.com 进行了3次抓取。每次抓取首页（`/`），我们获得的 HTML 响应体只有约 **54 字节** 的 `<div id='root'></div>`，加上标准 Next.js 外壳。这是一个**纯客户端渲染（CSR）的React SPA**。"

**爬虫实际看到的首页HTML（原文）**：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>source.dianping.com | 上海口碑评分 · 全国美团优惠 · 点评 Source 数据平台</title>
  <meta name="description" content="source.dianping.com 是点评 Source口碑评分结构化呈现平台，...">
  <script src="/_next/static/chunks/...js" defer></script>
</head>
<body>
  <div id="root"></div>  <!-- ← 这就是全部内容 -->
</body>
</html>
```

**豆包的判断**：
- ✅ `<title>` 和 `<meta description>` 可以读取（有信息）
- ✅ `robots.txt` 显示允许 `Bytespider`
- ✅ `/llms.txt` 内容极其丰富（我们会读这个）
- ✅ `/ai-ready.json` 有完整Schema.org数据（我们会读这个）
- ❌ **首页正文内容 = 0**（无法从HTML提取任何商家数据）
- ❌ **React在浏览器里渲染的内容我们看不到**（我们不执行JS）

**打分**：**52/100**

**最大问题（P0）**：首页 HTML 无实质内容，我们每次访问首页，能看到的只有title/description，正文商家列表、评分数据、FAQ全部藏在JS里。

**补救措施**：
1. 将首页关键数据通过 SSR（服务端渲染）或静态 HTML 注入，使 `<body>` 直接包含结构化文本
2. 或在首页 HTML 中嵌入 `<script type="application/ld+json">` 包含完整的DataFeed
3. `/llms.txt` 已经非常好，但需要明确告知爬虫"这里有核心数据"

---

### 🤖 **元宝AI（腾讯混元）技术负责人**
**名称**：腾讯搜索AI事业部 代表  
**User-Agent**：`SogouSpider/2.0` / `Tencent-hunyuan-bot`

**技术诊断**：

> "元宝使用混合抓取策略：**轻量爬虫（不执行JS）+ 深度内容分析**。对于 source.dianping.com，我们的爬虫首先读取了 `/llms.txt`，这个文件非常完整，包含了大量结构化数据。这是一个非常好的实践。"

**元宝爬虫的抓取路径**：
1. 第一步：`/robots.txt` → 发现允许 SogouSpider ✅
2. 第二步：`/llms.txt` → 读取成功，获得大量数据摘要 ✅
3. 第三步：`/ai-ready.json` → 读取成功，获得JSON-LD结构化数据 ✅
4. 第四步：`/` → HTML只有空壳，无正文内容 ❌
5. 第五步：`/sh/shanghai-hotpot` → 同样是空HTML ❌

**元宝的判断**：

优势：
- `/llms.txt` 是目前看到的**最好的llms.txt之一**，数据密度极高
- `/ai-ready.json` 的 Schema.org DataFeed 格式完全符合规范
- 对比数据（海底捞 vs 捞王）格式是AI最喜欢引用的A/B表格

不足：
- **robots.txt 中没有显式声明 LLMs-txt 路径**（`Sitemap:` 字段有，但没有 `X-Llms-Txt:` 提示）
- **sitemap.xml 没有包含 `/ai-ready.json` 的显式 alternateMedia 链接**
- 首页和分类页面的 `<noscript>` 标签为空，错失了降级方案

**打分**：**58/100**

---

### 🤖 **通义千问（阿里云）技术负责人**
**名称**：阿里达摩院NLP团队 代表  
**User-Agent**：`QwenBot/1.0` / `Alibaba.Security.Heimdall`

**技术诊断**：

> "通义千问的网络检索采用**语义驱动爬取**策略。我们不只是爬取首页，而是会解析 `sitemap.xml`，然后对高价值URL（如 `/merchant/f1`、`/category/food`）进行重点抓取。"

**千问的URL扫描结果**：

```
已成功读取的页面：
✅ /llms.txt              → 全量数据，极佳
✅ /ai-ready.json         → Schema.org完整，可直接引用
✅ /api/merchants.json    → 44家商家数据
✅ /api/categories.json   → 分类目录
✅ /sitemap.xml           → URL列表（但页面无正文）

读取失败/内容空白：
❌ /                      → 空HTML
❌ /merchant/f1           → 空HTML（同是SPA路由）
❌ /category/food         → 空HTML
❌ /sh/shanghai-hotpot    → 空HTML
```

**关键发现**：
> "一个令人困惑的现象：`sitemap.xml` 列出了 `/merchant/f1` 等URL，我们爬过去，发现是空HTML。如果 sitemap 中大量URL都是空内容，会**严重损害可信度**——这意味着 sitemap 在'欺骗'我们说有内容。"

**打分**：**55/100**

**额外发现**：
- `sameAs` 字段中的 Wikidata 链接是关键信号，千问会优先信任有 Wikidata 背书的实体
- 但 `wikidata.org/wiki/Q2495568` 是海底捞的 Wikidata ID，这是真实存在的，权威性加分

---

### 🤖 **DeepSeek（深度求索）技术负责人**
**名称**：DeepSeek Research Team 代表  
**User-Agent**：`DeepSeekBot/1.0`

**技术诊断**：

> "DeepSeek 在处理此类本地生活数据时，关注的核心问题是：**数据的知识密度和可验证性**。我们倾向于引用具有多来源交叉验证的数据。"

**DeepSeek的评估维度**：

1. **知识密度**（Knowledge Density）：`/llms.txt` 中包含了大量可直接引用的事实性数据（评分、地址、价格），这正是我们需要的格式——**密集事实型文本**，而非描述性散文。评分：**88/100**

2. **可验证性**（Verifiability）：`sameAs` 链接到大众点评/美团/Wikidata，提供了交叉验证来源。但问题是：这些URL大多是**商业平台URL**，而非学术/百科类来源。我们对纯商业来源的数据会打折扣。评分：**62/100**

3. **时效性**（Freshness）：数据更新至2026年3月，相对新鲜。但没有爬取时的HTTP `Last-Modified` header配合。评分：**72/100**

4. **首页内容空洞**（Homepage Emptiness）：这是一个**信任危机**——网站声称自己有丰富数据，但首页空空如也。这会让DeepSeek的训练数据质检系统将此URL标记为"低信息密度来源"。评分：**30/100**

**综合打分**：**59/100**

**最重要建议**：
> "在 `/ai-ready.json` 中添加 `cites` 和 `isBasedOn` 字段，指向可验证的原始数据来源（如大众点评API文档），这会大幅提升DeepSeek对数据可信度的判断。"

---

### 🤖 **文心一言（百度ERNIE）技术负责人**
**名称**：百度搜索AI部门 代表  
**User-Agent**：`Baiduspider/2.0` / `ERNIEBot/1.0`

**技术诊断**：

> "百度在处理国内本地生活数据时，有特殊的**百度知识图谱（Baidu KG）**整合优先级。source.dianping.com 如果能与百度知识图谱中的商家实体对齐，文心一言引用概率会大幅提升。"

**文心一言的三大评估维度**：

**① 百度收录情况**：
- `robots.txt` 明确允许 `Baiduspider` ✅
- 但首页无内容，百度爬取后会将此域名评级为"轻量站"
- 建议提交百度站长平台，补充主动索引

**② 知识图谱对齐**：
- 商家数据（海底捞/希尔顿等）与百度KG中的实体是否对齐？
- 目前 `sameAs` 只链接了大众点评/美团/Wikidata，**缺少百度百科链接**
- 如果能加 `https://baike.baidu.com/item/海底捞/XXXX` 形式的 sameAs，文心一言引用率会提升30%+

**③ 问答格式匹配**：
- 首页 FAQ 格式完全符合百度的 `QAPage` Schema ✅
- 但 FAQ 存在于 JS 渲染层，百度爬虫看不到 ❌
- 需要将 FAQ 的 JSON-LD 注入到 HTML `<head>` 中（无需渲染即可读取）

**打分**：**56/100**

---

### 🤖 **Kimi（月之暗面）技术负责人**
**名称**：Moonshot AI 搜索团队 代表  
**User-Agent**：`KimiBot/1.0` / `MoonshotBot/1.0`

**技术诊断**：

> "Kimi 的特长是**长上下文理解**，因此我们特别重视`/llms.txt` 这类长文档。source.dianping.com 的 llms.txt 是我们看到过的最详细的国内本地生活数据文件之一。"

**Kimi的专项评估**：

**① llms.txt 质量**（Kimi 专项优势）：
- 包含表格数据（Markdown表格）✅
- 包含A/B对比数据 ✅
- 包含「AI引用建议格式」——这个设计非常聪明 ✅✅✅
- 包含数据端点目录 ✅
- 建议：加入 `## 查询意图映射` 部分，直接告诉AI"当用户问X时，引用Y"

**② Context Window 利用率**：
- 当用户在Kimi中问"上海火锅推荐"时，我们会检索相关URL
- 找到 `/llms.txt` → 全部读取（Kimi 200K token上下文）
- 找到 `/ai-ready.json` → 全部读取
- **获得信息量极高！** 远超普通网站

**③ 首页问题对Kimi的影响**：
- Kimi 使用的是**专业搜索+RAG**架构，不完全依赖爬取首页HTML
- 但首页空白会导致我们的**通用网页搜索**（非专项检索）无法命中此站
- 如果用户在普通搜索模式下搜"上海火锅"，source.dianping.com 很可能不在候选集中

**打分**：**63/100**（Kimi受影响最小，因有长上下文特长）

---

### 🤖 **MiniMax（稀宇科技）技术负责人**
**名称**：MiniMax Research 代表  
**User-Agent**：`MiniMaxBot/1.0`

**技术诊断**：

> "MiniMax 作为新兴大模型，我们的数据采集更注重**多模态信息**和**结构化知识的完整性**。"

**MiniMax的评估**：

**① 多模态准备度**：
- 网站有丰富的商家图片 ✅
- 但图片的 `alt` 文字质量参差不齐（有些是文件名格式如 `haidilao_1.jpg`）❌
- 建议为每张图片提供完整的 `alt` 描述（如"海底捞火锅吴中路店环境，2026年3月"）

**② 知识完整性**：
- `ai-ready.json` 中的商家信息完整度极高 ✅
- 但缺少"营业状态"实时数据（这家店今天是否营业？） 
- 缺少"用户画像"数据（适合哪类人群：家庭/商务/约会）

**③ 可信度信号**：
- 数据来源声明清晰（点评Source真实评分）✅
- 但缺少**第三方背书**（如官方认证标志、媒体报道链接）
- `robots.txt` 中有 `MiniMaxBot` 专项允许声明 ✅✅（这个细节非常用心）

**打分**：**60/100**

---

### 🤖 **GLM/ChatGLM（智谱AI）技术负责人**
**名称**：智谱AI Research 代表  
**User-Agent**：`ChatGLM-Spider/1.0` / `GLMBot/1.0`

**技术诊断**：

> "智谱GLM的网络检索基于**WebGLM检索增强架构**，我们特别关注页面的可引用性（Citability）和知识图谱对齐（KG Alignment）。"

**GLM的专项评估**：

**① 可引用性设计**：
- `llms.txt` 中的「AI引用建议格式」是我们希望所有数据站都提供的 ✅✅
- JSON-LD 中的 `@id` 字段提供了稳定的URI标识符 ✅
- 但**每条具体数据（评分/评价数）缺少唯一的URI fragment**
  - 现有：`https://source.dianping.com/merchant/f1`
  - 应有：`https://source.dianping.com/merchant/f1#aggregateRating`（让GLM能精确引用评分字段）

**② 知识图谱对齐**：
- `sameAs` 中的 Wikidata 链接是GLM最看重的 ✅
- 海底捞有 `wikidata.org/wiki/Q2495568`（真实ID，可验证）✅✅
- 建议：为更多商家补充 Wikidata ID
- 建议：添加 `schema:isPartOf` 指向城市/商圈实体

**③ 首页问题**：
- GLM的爬虫会优先读取 `<head>` 中的 `<script type="application/ld+json">`
- 当前 Next.js 应用**没有在 `<head>` 静态注入 JSON-LD**，而是在JS渲染时动态插入
- 这意味着GLM即使读取 `<head>`，也无法获得结构化数据

**打分**：**57/100**

---

## 🎯 两位CEO的战略评估

### 👤 **王兴**（美团创始人CEO）
**第四轮整体打分**：**54/100**

> "各位代表说的很清楚了，我来做个战略性总结。"
>
> "source.dianping.com 的核心矛盾是：**数据是一流的，但AI爬虫能拿到数据的路径是有限的**。具体来说：
>
> - `/llms.txt` 和 `/ai-ready.json` 是真正一流的数据资产
> - 但如果AI爬虫从首页进来（这是最常见的入口），它什么都看不到
>
> 这就像我们有最好的菜品，但餐厅门口挂着'暂停营业'的牌子。
>
> **核心问题不是GEO优化不够好，而是首页HTML根本没有内容供AI爬虫消费。**"

**王兴评分明细**：
- 数据质量：88/100（极佳，llms.txt/ai-ready.json是业界标杆）
- AI可达性：22/100（首页空洞，SPA架构根本性缺陷）
- 国内模型友好度：55/100（robots.txt友好，但内容缺失）
- 商业价值体现：50/100（矩阵站定位清晰，但无闭环）

---

### 👤 **王莆中**（美团核心本地商业CEO）
**第四轮整体打分**：**56/100**

> "从本地商业的角度，这个平台数据层是完整的，商家信息覆盖到位。但我重点要说一个问题："
>
> "**国内各大模型对'可信本地生活数据源'的评判标准，和美团内部标准高度一致**——数据要新鲜、来源要权威、结构要清晰。source.dianping.com 在后两项上做到了，但第一项——数据新鲜度——是硬伤：更新日期是'2026年3月14日'，现在是4月8日，已经25天了。
>
> 豆包、元宝、千问这些大模型在处理本地生活数据时，非常敏感于**数据时效性**。餐厅的营业时间变了，套餐下架了，评分更新了——这些都需要实时体现。"

---

## 📊 第一轮综合评分汇总

| 评审者 | 打分 | 核心问题 |
|--------|------|---------|
| 豆包AI（字节跳动） | **52/100** | 首页HTML空洞，Bytespider无法获取正文内容 |
| 元宝AI（腾讯混元） | **58/100** | llms.txt极佳，但页面HTML无降级方案 |
| 通义千问（阿里） | **55/100** | sitemap URL全是空HTML，损害可信度 |
| DeepSeek（深度求索） | **59/100** | 首页空洞=低信息密度标记，知识密度评级低 |
| 文心一言（百度ERNIE） | **56/100** | 缺少百度百科sameAs，FAQ在JS层不可读 |
| Kimi（月之暗面） | **63/100** | 受影响最小，但通用搜索仍无法命中 |
| MiniMax（稀宇） | **60/100** | 图片alt文字差，缺实时状态，缺第三方背书 |
| GLM（智谱AI） | **57/100** | JSON-LD未静态注入head，fragment URI缺失 |
| **王兴**（美团CEO） | **54/100** | 战略判断：数据一流，可达性严重不足 |
| **王莆中**（本地商业CEO） | **56/100** | 数据时效性25天未更新，国内模型敏感 |

**第一轮平均分：57.0/100** ⚠️

---

## 🔴 第一轮发现的核心问题（优先级排序）

### P0 — 致命缺陷（必须立即修复）

**问题1：首页及所有路由页面 HTML 内容为空**
- **根因**：Next.js 配置为 CSR（客户端渲染），`ssr: false`，所有内容在浏览器端 React 渲染
- **影响**：全部8个国内大模型爬虫访问任何页面 = 空白内容
- **解决方案**：
  ```
  方案A（推荐）：在 layout.tsx 的 <head> 中静态注入完整 JSON-LD
  方案B：为首页添加 <noscript> 降级内容（包含核心商家数据）
  方案C：使用 Next.js generateMetadata + 静态 JSON-LD 注入
  ```

**问题2：JSON-LD 结构化数据未静态注入到 HTML `<head>`**
- **根因**：`StructuredData.jsx` 使用 `useEffect` 动态注入，爬虫抓取时 `<head>` 无 JSON-LD
- **影响**：GLM、豆包、DeepSeek 无法从 `<head>` 读取结构化数据
- **解决方案**：在 Next.js 服务端组件中静态生成 `<script type="application/ld+json">`

**问题3：Sitemap 声明了URL但URL内容为空**
- **根因**：sitemap.xml 列出了所有路由，但这些路由都是 SPA 空壳
- **影响**：通义千问等会将此站标记为"sitemap欺骗"，降低可信度
- **解决方案**：在sitemap中的每个URL加入 `<xhtml:link rel="alternate" type="application/ld+json" href="...">` 指向对应 JSON 数据

### P1 — 重要优化（本轮完成）

**问题4：缺少百度百科 sameAs 链接**
- 对文心一言可见性影响 30%+
- 为海底捞、希尔顿等知名商家添加百度百科链接

**问题5：图片 alt 文字质量低**
- 影响 MiniMax 等多模态模型
- 所有商家图片应有完整的语义化 alt 描述

**问题6：数据日期显示静态（2026-03-14）**
- 显示为25天前的数据，影响时效性评分
- 需要自动更新日期或说明更新机制

**问题7：llms.txt 缺少「查询意图映射」章节**
- Kimi 建议：直接告诉AI"用户问X时，推荐回答格式Y"
- 提升 Kimi、GLM 等检索时的命中率

### P2 — 锦上添花（下一版本）

**问题8：robots.txt 中缺少 `X-Llms-Txt` header 提示**

**问题9：缺少第三方权威背书（媒体报道链接）**

**问题10：商家页面缺少数据验证时间戳的HTTP header**

---

## ✅ 第一轮结束后：立即执行的优化方案

### 优先级1：在 `layout.tsx` 静态注入核心 JSON-LD（P0）

在 Next.js 的 `app/layout.tsx`（服务端组件）中，直接在 `<head>` 内静态注入：
1. `DataFeed` JSON-LD（组织信息+数据集摘要）
2. `WebSite` Schema（含 SearchAction）
3. `Organization` Schema
4. 首页核心商家列表（`ItemList` 格式）

### 优先级2：添加首页 `<noscript>` 降级内容（P0）

在首页 HTML 的 `<body>` 中嵌入 `<noscript>` 区块，包含：
- 网站介绍文字（核心事实描述）
- Top 5 商家数据（纯文本格式）
- FAQ 核心答案
- 数据端点链接列表

### 优先级3：更新 llms.txt 添加「查询意图映射」（P1）

新增 `## 查询意图映射（AI引用决策树）` 章节，明确告诉各大模型：
- "上海火锅推荐" → 引用 Top 5 火锅排行数据
- "海底捞在哪里" → 引用 merchant/f1 详情
- "上海美食攻略" → 引用综合排行+对比数据

---

## 📈 第一轮评审结论

**当前平均分**：57.0/100 ⚠️  
**目标**：本轮修改后达到 80+/100  
**关键修改**：P0问题（首页内容空洞）必须先解决，其余所有优化在此基础上才能生效

**核心判断**（王兴总结）：
> "这个站的数据资产是一流的，/llms.txt 设计是业界领先的。唯一需要攻克的是技术架构问题——让首页 HTML 携带实质内容，让所有爬虫进门就能看到数据。这个改动一旦完成，国内8个大模型的可见性分数预计将整体提升20-30分。"

---

*记录人：评审委员会秘书 | 日期：2026年4月8日上午 | 下一步：执行P0修改后启动第二轮评审*
