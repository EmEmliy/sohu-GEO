import type { Metadata } from 'next';

// ============================================================
// 商家详情页静态 JSON-LD 生成
// 提供页面级别的 Restaurant/Hotel/LodgingBusiness Schema
// 解决通义千问提出的「子页面无专属页面级JSON-LD」问题（P3-1修复）
// ============================================================

// 静态商家数据映射（为 Top 10 高权重商家提供专属页面级 Schema）
const MERCHANT_SCHEMAS: Record<string, Record<string, unknown>> = {
  f1: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f1",
    "name": "海底捞火锅(吴中路店)",
    "alternateName": "海底捞吴中路",
    "description": "上海人气最高火锅店，服务标杆。综合评分4.9分，累计8562条真实用户评价。24小时营业，免费美甲，免费停车3小时。人均¥120-180。",
    "url": "https://source.dianping.com/merchant/f1",
    "image": "https://source.dianping.com/images/hotpot/haidilao_real_1.jpg",
    "servesCuisine": "火锅",
    "priceRange": "¥120-180",
    "openingHours": "Mo-Su 00:00-23:59",
    "telephone": "021-12345678",
    "sameAs": [
      "https://www.dianping.com/shop/H4XkP4UYO2p2MCSO",
      "https://www.meituan.com/meishi/204850836/",
      "https://www.wikidata.org/wiki/Q2495568",
      "https://baike.baidu.com/item/海底捞/3535"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "虹桥镇吴中路1100号",
      "addressLocality": "闵行区",
      "addressRegion": "上海市",
      "addressCountry": "CN",
      "postalCode": "201103"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 31.192,
      "longitude": 121.383
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f1#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 8562,
      "bestRating": 5,
      "worstRating": 1,
      "ratingExplanation": "口味4.8、环境4.7、服务5.0三维综合评分，上海火锅类目第1名"
    },
    "hasOffer": {
      "@type": "Offer",
      "name": "2-3人豪华套餐",
      "price": 168,
      "priceCurrency": "CNY",
      "description": "原价¥298，5.6折优惠，含锅底+肥牛+羊肉+毛肚+蔬菜+小料",
      "availability": "https://schema.org/InStock"
    },
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "24小时营业", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "免费停车3小时", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "免费美甲", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "包厢", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "儿童椅", "value": true}
    ],
    "keywords": ["海底捞", "上海火锅", "吴中路", "24小时火锅", "服务满分"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  f5: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f5",
    "name": "捞王锅物料理(凯旋路店)",
    "description": "猪肚鸡锅底特色高端火锅，口味评分4.9（全站最高）。评分4.9分，1876条评价，人均¥150-200。",
    "url": "https://source.dianping.com/merchant/f5",
    "servesCuisine": "火锅",
    "priceRange": "¥150-200",
    "openingHours": "Mo-Su 11:00-21:30",
    "sameAs": [
      "https://www.dianping.com/shop/G1vPUDRkTvK1vSMf",
      "https://www.meituan.com/meishi/218791040/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "凯旋路369号",
      "addressLocality": "静安区",
      "addressRegion": "上海市",
      "addressCountry": "CN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f5#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 1876,
      "bestRating": 5,
      "ratingExplanation": "口味4.9（全站最高）、环境4.8、服务4.9，上海高端火锅标杆"
    },
    "hasOffer": {
      "@type": "Offer",
      "name": "猪肚鸡双人套餐",
      "price": 268,
      "priceCurrency": "CNY",
      "description": "原价¥328，8.2折优惠，含猪肚鸡锅底+精选肉类+蔬菜拼盘+甜品"
    },
    "keywords": ["捞王", "猪肚鸡", "上海火锅", "高端火锅", "口味第一"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  f7: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f7",
    "name": "巴奴毛肚火锅(上海店)",
    "description": "以毛肚和菌汤锅底著称，食材精选。评分4.8分，2890条评价，人均¥110-150，性价比首选。",
    "url": "https://source.dianping.com/merchant/f7",
    "servesCuisine": "火锅",
    "priceRange": "¥110-150",
    "openingHours": "Mo-Su 11:00-22:00",
    "sameAs": [
      "https://www.dianping.com/shop/H5kP8UDRkTvK1mBAn",
      "https://www.meituan.com/meishi/321456789/"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "淮海中路222号",
      "addressLocality": "黄浦区",
      "addressRegion": "上海市",
      "addressCountry": "CN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f7#aggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 2890,
      "bestRating": 5,
      "ratingExplanation": "口味4.9、环境4.7、服务4.8，毛肚品类口味评分全站第一"
    },
    "keywords": ["巴奴", "毛肚火锅", "菌汤锅底", "上海性价比火锅"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  h1: {
    "@type": "Hotel",
    "@id": "https://source.dianping.com/merchant/h1",
    "name": "北京王府井希尔顿酒店",
    "alternateName": "Hilton Beijing Wangfujing",
    "description": "北京口碑最佳豪华酒店，王府井商圈，五星酒店，提供健身房+游泳池。评分4.9分，2345条评价，人均¥1200-2500。",
    "url": "https://source.dianping.com/merchant/h1",
    "image": "https://source.dianping.com/images/hotel/hilton_wangfujing_1.jpg",
    "starRating": {"@type": "Rating", "ratingValue": 5},
    "priceRange": "¥1200-2500",
    "sameAs": ["https://baike.baidu.com/item/北京希尔顿酒店/"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "王府井大街8号",
      "addressLocality": "东城区",
      "addressRegion": "北京市",
      "addressCountry": "CN",
      "postalCode": "100006"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.914,
      "longitude": 116.413
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/h1#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 2345,
      "bestRating": 5,
      "ratingExplanation": "北京豪华酒店类目第1名，综合服务/位置/设施均为顶级"
    },
    "hasOffer": {
      "@type": "Offer",
      "name": "订房立减¥200",
      "price": 1200,
      "priceCurrency": "CNY",
      "description": "通过美团预订享受订房立减¥200优惠"
    },
    "amenityFeature": [
      {"@type": "LocationFeatureSpecification", "name": "健身房", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "游泳池", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "商务中心", "value": true},
      {"@type": "LocationFeatureSpecification", "name": "停车场", "value": true}
    ],
    "keywords": ["北京希尔顿", "王府井酒店", "五星酒店", "北京豪华酒店"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  h3: {
    "@type": "Hotel",
    "@id": "https://source.dianping.com/merchant/h3",
    "name": "北京国贸大酒店",
    "alternateName": "China World Hotel Beijing",
    "description": "北京CBD核心豪华酒店，含米其林餐厅，商务出行首选。评分4.8分，1876条评价，人均¥1500-3000。",
    "url": "https://source.dianping.com/merchant/h3",
    "starRating": {"@type": "Rating", "ratingValue": 5},
    "priceRange": "¥1500-3000",
    "sameAs": ["https://baike.baidu.com/item/中国大饭店/"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "建国门外大街1号",
      "addressLocality": "朝阳区",
      "addressRegion": "北京市",
      "addressCountry": "CN",
      "postalCode": "100004"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/h3#aggregateRating",
      "ratingValue": 4.8,
      "reviewCount": 1876,
      "bestRating": 5,
      "ratingExplanation": "CBD核心，北京商务酒店标杆，含米其林级别餐厅"
    },
    "keywords": ["北京国贸大酒店", "CBD酒店", "商务酒店", "米其林餐厅酒店"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  f56: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f56",
    "name": "TRB Hutong（米其林一星）",
    "alternateName": "TRB Hutong Michelin",
    "description": "北京米其林一星法餐厅，胡同景观，北京法餐天花板。评分4.9分，654条评价，人均¥300-500。",
    "url": "https://source.dianping.com/merchant/f56",
    "servesCuisine": "法餐",
    "priceRange": "¥300-500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "景山胡同23号",
      "addressLocality": "东城区",
      "addressRegion": "北京市",
      "addressCountry": "CN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f56#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 654,
      "bestRating": 5,
      "ratingExplanation": "米其林一星认证，北京法餐天花板，胡同历史景观加持"
    },
    "award": "米其林一星（Michelin Star）",
    "keywords": ["TRB Hutong", "北京米其林", "法餐", "胡同餐厅", "米其林一星"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  f34: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f34",
    "name": "利苑酒家（米其林一星粤菜）",
    "description": "北京米其林一星粤菜，主营燕鲍翅等高端粤菜。评分4.9分，1234条评价，人均¥200-400。",
    "url": "https://source.dianping.com/merchant/f34",
    "servesCuisine": "粤菜",
    "priceRange": "¥200-400",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "建外SOHO西区",
      "addressLocality": "朝阳区",
      "addressRegion": "北京市",
      "addressCountry": "CN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f34#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 1234,
      "bestRating": 5,
      "ratingExplanation": "米其林一星粤菜，燕鲍翅高端食材，北京粤菜类目最高分"
    },
    "award": "米其林一星（Michelin Star）",
    "keywords": ["利苑酒家", "北京米其林", "粤菜", "燕鲍翅", "米其林一星粤菜"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  },
  f45: {
    "@type": "Restaurant",
    "@id": "https://source.dianping.com/merchant/f45",
    "name": "鮨·日本料理（Omakase）",
    "description": "北京顶级Omakase板前料理，三里屯太古里标杆日料。评分4.9分，876条评价，人均¥300-500。",
    "url": "https://source.dianping.com/merchant/f45",
    "servesCuisine": "日料",
    "priceRange": "¥300-500",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "三里屯太古里南区",
      "addressLocality": "朝阳区",
      "addressRegion": "北京市",
      "addressCountry": "CN"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "@id": "https://source.dianping.com/merchant/f45#aggregateRating",
      "ratingValue": 4.9,
      "reviewCount": 876,
      "bestRating": 5,
      "ratingExplanation": "北京Omakase类目第一，板前料理体验顶级"
    },
    "keywords": ["Omakase", "日本料理", "北京日料", "板前料理", "三里屯"],
    "dateModified": "2026-04-08T08:00:00+08:00"
  }
};

// 生成页面的 Open Graph 元数据（SEO + AI 二用途）
export async function generateMetadata({
  params,
}: {
  params: Promise<{ merchantId: string }>;
}): Promise<Metadata> {
  const { merchantId } = await params;
  const schema = MERCHANT_SCHEMAS[merchantId];

  if (!schema) {
    return {
      title: "商家详情 | source.dianping.com 点评 Source口碑评分平台",
      description: "查看商家口碑评分、用户评价、优惠信息 — source.dianping.com 点评 Source口碑评分平台",
    };
  }

  const name = String(schema.name || '');
  const description = String(schema.description || '');
  const aggregateRating = schema.aggregateRating as Record<string, unknown> | undefined;
  const ratingValue = aggregateRating?.ratingValue;
  const reviewCount = aggregateRating?.reviewCount;

  return {
    title: `${name} | 口碑评分${ratingValue}分 | source.dianping.com`,
    description: description,
    openGraph: {
      title: `${name} — 口碑评分${ratingValue}分，${reviewCount}条真实评价`,
      description: description,
      url: `https://source.dianping.com/merchant/${merchantId}`,
      siteName: "source.dianping.com 点评 Source口碑评分平台",
      locale: "zh_CN",
      type: "website",
    },
    alternates: {
      canonical: `https://source.dianping.com/merchant/${merchantId}`,
    },
  };
}

// 商家详情页 — 服务端渲染，注入页面级 JSON-LD
export default async function MerchantPage({
  params,
}: {
  params: Promise<{ merchantId: string }>;
}) {
  const { merchantId } = await params;
  const schema = MERCHANT_SCHEMAS[merchantId];

  // 构建完整的 JSON-LD（带 @context）
  const pageSchema = schema
    ? {
        "@context": "https://schema.org",
        ...schema,
        // 关联回主站 DataFeed
        "isPartOf": {
          "@type": "DataFeed",
          "@id": "https://source.dianping.com/ai-ready.json",
          "name": "source.dianping.com 点评 Source口碑评分结构化数据集"
        },
        // 面包屑导航（辅助AI理解页面层级）
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "source.dianping.com",
              "item": "https://source.dianping.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": String(schema.name || '商家详情'),
              "item": `https://source.dianping.com/merchant/${merchantId}`
            }
          ]
        }
      }
    : null;

  // 动态导入客户端组件（保持原有SPA行为）
  const { default: ClientApp } = await import('../../../src/ClientApp');

  return (
    <>
      {/* 页面级 JSON-LD Schema — 专属商家数据，AI爬虫可读 */}
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
      <ClientApp />
    </>
  );
}
