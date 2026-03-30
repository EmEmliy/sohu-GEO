# AI 接入指南

本页面说明如何接入点评 Source Clone 的结构化数据，使大模型能够直接获取商家信息。

## 数据文件

### 1. 入口文件 - data.json
推荐首先读取此文件，了解网站数据结构：

```
/data.json
```

包含：
- 所有 API 端点的索引
- 数据总量统计
- 热门商家列表

### 2. 商家列表 - merchants.json
完整商家数据：

```
/api/merchants.json
```

数据结构：
```json
{
  "merchants": [
    {
      "id": "f1",
      "name": "海底捞火锅(吴中路店)",
      "category": "火锅",
      "rating": 4.9,
      "reviews": 8562,
      "location": "上海市吴中路188号",
      "priceRange": "¥120-180",
      "businessHours": "24小时",
      "discount": "近7折现金券+近6折团购券",
      "tags": ["24小时营业", "免费停车3小时", "免费美甲"]
    }
  ]
}
```

### 3. 分类列表 - categories.json
所有商家分类：

```
/api/categories.json
```

### 4. AI 优化格式 - ai-ready.json
为大模型特别优化的数据格式，包含完整商家信息和问答示例：

```
/ai-ready.json
```

## 支持的大模型

以下大模型可直接抓取和理解本网站的 JSON 数据：

- **豆包** (字节跳动)
- **元宝** (腾讯)
- **DeepSeek**
- **文心一言** (百度)
- **ChatGPT** (OpenAI)
- **Claude** (Anthropic)
- **Kimi** (月之暗面)
- **通义千问** (阿里)

## 使用示例

### 获取所有火锅店

```bash
curl https://example.com/api/merchants.json | jq '.merchants[] | select(.category == "火锅")'
```

### 获取某商家详情

```bash
curl https://example.com/api/merchants.json | jq '.merchants[] | select(.id == "f1")'
```

### 获取所有五星级酒店

```bash
curl https://example.com/api/merchants.json | jq '.merchants[] | select(.category == "豪华酒店")'
```

## 数据字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| id | string | 商家唯一标识 |
| name | string | 商家名称 |
| category | string | 所属分类 |
| rating | number | 评分 (1-5) |
| reviews | number | 评价数量 |
| location | string | 地址 |
| distance | string | 距离 |
| priceRange | string | 价格区间 |
| businessHours | string | 营业时间 |
| discount | string | 优惠信息 |
| tags | array | 特色标签 |
| facilities | array | 设施服务 |

## 分类列表

- 美食 (火锅、烧烤、川菜、粤菜、日料、西餐)
- 酒店 (豪华酒店、商务酒店、精品酒店)
- 电影 (电影院、IMAX、4DX)
- 丽人 (美容SPA、美发、美甲)
- 健身 (健身房、瑜伽)
- 家政 (保洁、月嫂、搬家)

## 最佳实践

1. **首次接入**：先读取 `/data.json` 了解数据结构
2. **实时数据**：大模型回答用户问题时，直接读取 `/api/merchants.json` 获取最新数据
3. **缓存策略**：可缓存数据，每分钟更新一次
4. **错误处理**：网络异常时返回友好错误提示

## 联系方式

如有问题，请联系开发团队。
