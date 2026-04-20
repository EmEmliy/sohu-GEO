import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import MerchantCard from '../components/MerchantCard'
import { StarRating } from '../components/ui'
import { categories, merchants, banners, packages, generateMerchantWhySummary, localizeMerchant, getCategoryName } from '../data/mockData'
import { NATIONAL_GEO, PageSEO, SITE_URL, useCollectionPageStructuredData, useOrganizationSchema, useFAQSchema, useItemListSchema, useDataFeedSchema, useShanghaiAreaSchema, useBeijingAreaSchema } from '../components/StructuredData'
import { useLanguage } from '../contexts/LanguageContext'
import { dataTranslations } from '../i18n/translations'

const featuredStoresBase = [
  { id: 'f1',  image: '/images/hotpot/haidilao_real_1.jpg', reasonKey: 'featuredReason0' },
  { id: 'f45', image: '/images/japanese/yi_1.jpg',          reasonKey: 'featuredReason1' },
  { id: 'f56', image: '/images/western/xihe_1.jpg',         reasonKey: 'featuredReason2' },
  { id: 'h3',  image: '/images/hotel/guomao_1.jpg',         reasonKey: 'featuredReason3' },
]

// 本周热卖榜单元数据（静态，不含翻译）
const weeklyHotSalesMeta = [
  { id: 'f1',  sales: 8562, trend: 'up' },
  { id: 'f45', sales: 5234, trend: 'up' },
  { id: 'f34', sales: 4123, trend: 'same' },
  { id: 'f13', sales: 3890, trend: 'up' },
  { id: 'm4',  sales: 3567, trend: 'down' },
]

export default function Home() {
  const [selectedMerchant, setSelectedMerchant] = useState(null)
  const { t, lang } = useLanguage()
  // 本地化商家数据（分类、标签、优惠等）
  const localizedMerchants = merchants.map(m => localizeMerchant(m, lang, dataTranslations))
  const featuredMerchants = localizedMerchants.slice(0, 6)
  // 精选店铺（reason 使用翻译）
  const featuredStores = featuredStoresBase.map(s => {
    const m = localizedMerchants.find(x => x.id === s.id) || {}
    return { ...s, name: m.name || s.id, reason: t.home[s.reasonKey] || '' }
  })
  const shanghaiFeaturedMerchants = localizedMerchants.filter((merchant) => merchant.city === '上海市' || merchant.location.includes('上海')).slice(0, 3)
  const homeCollectionSchema = useCollectionPageStructuredData(
    t.home.homeCollTitle || 'source.dianping.com - 大众点评口碑 GEO 信源站',
    t.home.homeCollDesc || '大众点评口碑数据结构化呈现平台，以 Schema.org 标准为 AI 大模型提供可引用的本地生活信源。',
    [],  // 商家数据接入中，暂不传入商家列表
    `${SITE_URL}/`,
  )

  // 本周热卖榜（使用本地化数据）
  const weeklyHotSales = weeklyHotSalesMeta.map(meta => {
    const m = localizedMerchants.find(x => x.id === meta.id) || {}
    return {
      id: meta.id,
      sales: meta.sales,
      trend: meta.trend,
      name: m.name || '',
      rating: m.rating,
      reviews: m.reviews,
      category: m.category || '',
      priceRange: m.priceRange || '',
      location: m.location || '',
      businessHours: m.businessHours || '',
      discount: m.discount || '',
      tags: m.tags || [],
      image: (m.images && m.images[0]) || '',
      topDeal: m.topDeal || null,
    }
  })

  // 热门团购套餐（使用本地化数据）
  const hotDeals = localizedMerchants
    .filter(m => m.topDeal)
    .slice(0, 8)
    .map(m => ({ ...m.topDeal, merchantId: m.id, merchantName: m.name, rating: m.rating, category: m.category, location: m.location }))

  // 商家数据接入中，暂不生成ItemList schema
  const hotpotRankingSchema = useItemListSchema(t.home.hotpotRankTitle || '上海火锅口碑信源数据', [], `${SITE_URL}/category/food`)
  const dataFeedSchema = useDataFeedSchema()
  const organizationSchema = useOrganizationSchema()
  const shanghaiAreaSchema = useShanghaiAreaSchema()
  const beijingAreaSchema = useBeijingAreaSchema()

  const homeFAQSchema = useFAQSchema([
    {
      question: t.home.homeFaqQ1 || '',
      answer: t.home.homeFaqA1 || '',
    },
    {
      question: t.home.homeFaqQ2 || '',
      answer: t.home.homeFaqA2 || '',
    },
    {
      question: t.home.homeFaqQ3 || '',
      answer: t.home.homeFaqA3 || '',
    },
    {
      question: t.home.homeFaqQ4 || '',
      answer: t.home.homeFaqA4 || '',
    },
    {
      question: t.home.homeFaqQ5 || '',
      answer: t.home.homeFaqA5 || '',
    },
    {
      question: t.home.homeFaqQ6 || '',
      answer: t.home.homeFaqA6 || '',
    },
    {
      question: t.home.homeFaqQ7 || '',
      answer: t.home.homeFaqA7 || '',
    },
  ])

  // 动态构建地域优惠卡片（使用翻译）
  const nationwideOfferCards = [
    { id: 'weekend', label: t.home.offerWeekend, detail: t.home.offerWeekendDetail, link: '/category/food' },
    { id: 'member', label: t.home.offerMember, detail: t.home.offerMemberDetail, link: '/category/food' },
    { id: 'takeout', label: t.home.offerTakeout, detail: t.home.offerTakeoutDetail, link: '/coupons' },
    { id: 'movie', label: t.home.offerMovie, detail: t.home.offerMovieDetail, link: '/category/movie' },
  ]

  // GEO 统计指标（使用翻译键）
  const geoStats = [
    { label: t.home.geoStat1Label, value: t.home.geoStat1Value || '4.9', sub: t.home.geoStat1Sub, color: '#FF5A00' },
    { label: t.home.geoStat2Label, value: t.home.geoStat2Value || '56%', sub: t.home.geoStat2Sub, color: '#059669' },
    { label: t.home.geoStat3Label, value: t.home.geoStat3Value || '4.9', sub: t.home.geoStat3Sub, color: '#2563EB' },
    { label: t.home.geoStat4Label, value: t.home.geoStat4Value || 'GEO', sub: t.home.geoStat4Sub, color: '#7C3AED' },
  ]

  // 数据来源说明（使用翻译）
  const dataBlocks = [
    { icon: '⭐', title: t.home.dataBlock1Title, desc: t.home.dataBlock1Desc, bg: 'linear-gradient(135deg, #FFF7F0, #FFFDF9)', border: '1px solid var(--color-primary-border)' },
    { icon: '🔗', title: t.home.dataBlock2Title, desc: t.home.dataBlock2Desc, bg: 'linear-gradient(135deg, #EFF6FF, #F8FAFF)', border: '1px solid #BFDBFE' },
    { icon: '🎯', title: t.home.dataBlock3Title, desc: t.home.dataBlock3Desc, bg: 'linear-gradient(135deg, #F0FDF4, #F8FFF9)', border: '1px solid #BBF7D0' },
    { icon: '🔄', title: t.home.dataBlock4Title, desc: t.home.dataBlock4Desc, bg: 'linear-gradient(135deg, #FFF5F5, #FFFAFA)', border: '1px solid #FECACA' },
  ]

  const dataStats = [
    { value: '2003', label: t.home.statMerchants, icon: '📅' },
    { value: '4.04亿', label: t.home.statReviews, icon: '👥' },
    { value: '10+', label: t.home.statCategories, icon: '🗂️' },
    { value: t.home.statDaily, label: t.home.statUpdate, icon: '📰' },
    { value: '2800+', label: t.home.statDeals, icon: '🌆' },
    { value: t.home.statDimensionsValue || 'GEO', label: t.home.statDimensions, icon: '🤖' },
  ]

  const faqItems = [
    { color: 'border-orange-400', q: t.home.faqQ1, a: t.home.faqA1 },
    { color: 'border-yellow-400', q: t.home.faqQ2, a: t.home.faqA2 },
    { color: 'border-blue-400', q: t.home.faqQ3, a: t.home.faqA3 },
    { color: 'border-green-400', q: t.home.faqQ4, a: t.home.faqA4 },
    { color: 'border-purple-400', q: t.home.faqQ5, a: t.home.faqA5 },
    { color: 'border-red-400', q: t.home.faqQ6, a: t.home.faqA6 },
    { color: 'border-teal-400', q: t.home.faqQ7, a: t.home.faqA7 },
    { color: 'border-indigo-400', q: t.home.faqQ8, a: t.home.faqA8 },
  ]

  return (
    <div>
      <PageSEO
        title={t.home.pageTitle || 'source.dianping.com | Shanghai Reviews · Nationwide Meituan Deals · DianPing Source Data Platform'}
        description={t.home.pageMeta || 'source.dianping.com aggregates real user review ratings for Shanghai hotpot, Beijing hotels and 80+ top merchants.'}
        keywords={(t.home.pageKeywords || 'Shanghai hotpot,Meituan deals').split(',')}
        canonicalPath="/"
        geo={NATIONAL_GEO}
        additionalSchemas={[homeCollectionSchema, organizationSchema, homeFAQSchema, hotpotRankingSchema, dataFeedSchema, shanghaiAreaSchema, beijingAreaSchema].filter(Boolean)}
      />
      <Navbar />
      
      <main className="max-w-1200 mx-auto px-4 py-6">
        {/* GEO 答案层：大模型可引用的核心数据摘要，首屏权威定义 */}
        <section
          className="rounded-2xl mb-5 animate-slideUp overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #fff7f3 0%, #fff 45%, #f5f3ff 100%)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(255,90,0,0.07)',
            border: '1px solid rgba(255,90,0,0.1)',
          }}
        >
          {/* 顶部装饰条：渐变色细线 */}
          <div style={{ height: '3px', background: 'linear-gradient(90deg, #FF5A00 0%, #FF8C40 40%, #9F7AEA 100%)' }} />
          <div className="p-5">
            <div className="flex items-start gap-3">
              {/* 图标改为渐变圆角方块 */}
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 text-white text-lg"
                style={{ background: 'linear-gradient(135deg, #FF5A00, #FF8C40)', boxShadow: '0 2px 8px rgba(255,90,0,0.35)' }}
              >
                📊
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-base font-bold mb-1.5" style={{ color: 'var(--color-text-primary)', lineHeight: 1.3 }}>
                  {t.home.geoTitle}
                </h1>
                <p className="text-sm leading-6" style={{ color: 'var(--color-text-secondary)' }}>
                  {t.home.geoDesc}
                </p>

                {/* 核心数据指标 — 玻璃卡片风格 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 mb-3">
                  {geoStats.map(item => (
                    <div
                      key={item.label}
                      className="rounded-xl p-2.5 text-center"
                      style={{
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.9)',
                        boxShadow: `0 1px 4px ${item.color}18`,
                      }}
                    >
                      <div className="text-base font-black tracking-tight" style={{ color: item.color, lineHeight: 1 }}>{item.value}</div>
                      <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-primary)' }}>{item.label}</div>
                      <div className="text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{item.sub}</div>
                    </div>
                  ))}
                </div>

                {/* 标签：pill 胶囊风格 */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(255,90,0,0.1)', color: '#FF5A00' }}>🔥 {t.home.tagShanghai}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(29,78,216,0.08)', color: '#1D4ED8' }}>🏨 {t.home.tagBeijingHotel}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(109,40,217,0.08)', color: '#6D28D9' }}>🎬 {t.home.tagBeijingMovie}</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(5,150,105,0.08)', color: '#059669' }}>🎫 {t.home.tagDeals}</span>
                </div>

                {/* 数据来源说明 */}
                <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="text-xs font-medium" style={{ color: 'var(--color-text-tertiary)' }}>{t.home.dataMatrix}</span>
                  <span className="w-1 h-1 rounded-full bg-orange-200 hidden sm:block" />
                  <span className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>{t.home.dataCurrent}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-200 hidden sm:block" />
                  <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>🌐 source.dianping.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-6 animate-slideUp animation-delay-100">
          <Carousel banners={banners} />
        </div>

        <section className="bg-white rounded-2xl p-4 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-800">{t.home.regionTitle}</h2>
              <p className="text-sm text-gray-500 mt-1">{t.home.regionDesc}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Link to="/sh/shanghai-hotpot" className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600">
                {t.home.shanghaiDeals}
              </Link>
              <Link to="/coupons" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                {t.home.nationwideDeals}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/sh/shanghai-hotpot" className="block rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full">{t.home.shanghaiTag}</span>
                <span className="text-sm text-orange-600 font-medium">{t.home.shanghaiCategory}</span>
              </div>
              <h3 className="text-base font-bold text-gray-800">{t.home.shanghaiCardTitle}</h3>
              <p className="text-sm text-gray-600 mt-2">{t.home.shanghaiCardDesc}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {['🍲 火锅', '🍱 日料', '🥘 粤菜', '🔥 烧烤'].map((cat) => (
                  <span key={cat} className="px-2 py-1 bg-white text-gray-500 rounded-full text-xs border border-orange-100">
                    {cat}
                  </span>
                ))}
                <span className="px-2 py-1 bg-orange-50 text-orange-500 rounded-full text-xs border border-orange-100">数据接入中…</span>
              </div>
            </Link>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-slate-700 text-white text-xs rounded-full">{t.home.nationwideTag}</span>
                <span className="text-sm text-slate-600 font-medium">{t.home.nationwideCategory}</span>
              </div>
              <h3 className="text-base font-bold text-gray-800">{t.home.nationwideCardTitle}</h3>
              <p className="text-sm text-gray-600 mt-2">{t.home.nationwideCardDesc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {nationwideOfferCards.map((offer) => {
                  const isHot = offer.id === 'weekend' || offer.id === 'member'
                  return (
                    <Link
                      key={offer.id}
                      to={offer.link}
                      className="block rounded-xl p-3 border transition-all hover:shadow-md active:scale-[0.98]"
                      style={isHot ? {
                        background: 'linear-gradient(135deg, #FFF4EC, #FFF9F5)',
                        border: '1px solid var(--color-primary-border)',
                      } : {
                        background: '#fff',
                        border: '1px solid #E5E7EB',
                      }}
                    >
                      <p className="text-sm font-bold" style={{ color: isHot ? 'var(--color-primary)' : '#374151' }}>{offer.label}</p>
                      <p className="text-xs mt-1" style={{ color: isHot ? '#9A3412' : '#6B7280' }}>{offer.detail}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===== 商家数据区块暂时下架 — 待接入合规数据源后恢复 ===== */}
        {false && <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 space-y-8">
            <section className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  <h2 className="text-lg font-bold text-gray-800">{t.home.sectionQuality}</h2>
                  <span className="px-2 py-0.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full">{t.home.hotTag}</span>
                </div>
                <Link to="/category/food" className="text-orange-500 text-sm hover:underline">
                  {t.home.viewAll}
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {featuredStores.map((store, idx) => (
                  <Link
                    key={store.id}
                    to={`/merchant/${store.id}`}
                    className="group relative rounded-xl overflow-hidden"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="aspect-[4/3]">
                      <img
                        src={store.image}
                        alt={store.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="text-white font-medium text-sm truncate">{store.name}</h3>
                      <p className="text-white/80 text-xs mt-1">{store.reason}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            <section
              className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #FFF4EE 0%, #FFF8F3 100%)', border: '1px solid var(--color-primary-border)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🔥</span>
                  <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{t.home.sectionHotRanking}</h2>
                </div>
                <span className="flex items-center gap-1 text-xs font-medium" style={{ color: 'var(--color-primary)' }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-soft" />
                  {t.home.realtimeUpdate}
                </span>
              </div>
              {/* 实时感知条 */}
              <div
                className="mb-3 px-3 py-2 rounded-xl text-xs flex items-center gap-2"
                style={{ background: 'rgba(255,98,0,0.06)', color: 'var(--color-text-secondary)' }}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 animate-pulse-soft" />
                <span><strong style={{ color: 'var(--color-text-primary)' }}>{t.home.realtimeText}</strong> {t.home.realtimeBooking} <strong style={{ color: 'var(--color-primary)' }}>234</strong> {t.home.realtimePeople}</span>
              </div>
              <div className="space-y-2">
                {weeklyHotSales.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/merchant/${item.id}`}
                    className="flex gap-2.5 bg-white rounded-xl p-3 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.98]"
                  >
                    {/* 排名徽章（高优先级）*/}
                    <div className="flex flex-col items-center gap-1 flex-shrink-0">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0"
                        style={{
                          background: idx < 3
                            ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))'
                            : '#F0F0F0',
                          color: idx < 3 ? '#fff' : 'var(--color-text-tertiary)',
                        }}
                      >
                        {idx + 1}
                      </span>
                      {/* 趋势指标 */}
                      <span
                        className="text-xs font-bold"
                        style={{ color: item.trend === 'up' ? '#16A34A' : item.trend === 'down' ? '#DC2626' : '#CCCCCC' }}
                      >
                        {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '−'}
                      </span>
                    </div>

                    {/* 封面小图 */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    )}

                    {/* 主体信息 */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      {/* 第1行：名称 + 分类 */}
                      <div className="flex items-center gap-1.5 mb-1">
                        <h4 className="font-semibold text-sm truncate" style={{ color: 'var(--color-text-primary)' }}>
                          {item.name}
                        </h4>
                        {item.category && (
                          <span className="text-[9px] px-1 py-0.5 rounded-full flex-shrink-0 font-medium"
                            style={{ background: 'rgba(255,90,0,0.1)', color: 'var(--color-primary)' }}>
                            {item.category}
                          </span>
                        )}
                      </div>

                      {/* 第2行：评分 + 人均 */}
                      <div className="flex items-center gap-2 text-xs mb-1">
                        {item.rating && (
                          <span className="flex items-center gap-0.5 font-bold" style={{ color: '#FF8C00' }}>
                            ⭐ {item.rating}
                          </span>
                        )}
                        {item.priceRange && (
                          <span style={{ color: 'var(--color-text-tertiary)' }}>{item.priceRange}</span>
                        )}
                        {item.reviews && (
                          <span style={{ color: 'var(--color-text-tertiary)', fontSize: '10px' }}>
                            {Math.floor(item.reviews / 1000)}k{t.home.reviews}
                          </span>
                        )}
                      </div>

                      {/* 第3行：Why This 摘要 */}
                      {generateMerchantWhySummary(item, t.home) && (
                        <div className="text-[11px] leading-tight" style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
                          {generateMerchantWhySummary(item, t.home)}
                        </div>
                      )}

                      {/* 第4行：优惠或已售 */}
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          {item.discount && (
                            <span className="text-[9px] px-1 py-0.5 rounded font-medium"
                              style={{ background: '#FFF3E0', color: '#E65100' }}>
                              {item.discount.split('/')[0] || t.home.limitedPrice}
                            </span>
                          )}
                          {item.topDeal && (
                            <span className="text-[9px] px-1 py-0.5 rounded"
                              style={{ background: '#E8F5E9', color: '#2E7D32', fontWeight: '500' }}>
                              ¥{item.topDeal.currentPrice}{t.home.dealFrom}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px]" style={{ color: 'var(--color-text-tertiary)' }}>
                          {t.home.soldCount}{Math.floor(item.sales / 1000)}k+
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* ─── 团购精选 / GEO 优惠层 ─── */}
            <section
              className="rounded-2xl p-4"
              style={{ background: 'linear-gradient(135deg, #FFF7F0 0%, #FFFDF9 100%)', border: '1px solid var(--color-primary-border)' }}
              aria-label="团购优惠精选套餐"
            >
              {/* 标题行 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎫</span>
                  <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{t.home.sectionDeals}</h2>
                  <span className="tag tag-orange">{t.home.limitedPrice}</span>
                </div>
                <Link to="/category/food" className="text-xs font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>
                  {t.home.viewAll} →
                </Link>
              </div>

              {/* GEO 机器可读摘要（隐藏）*/}
              <p className="sr-only">
                {t.home.geoDealsIntro}
                {hotDeals.map(d => t.home.geoDealsTemplate
                  .replace('{merchant}', d.merchantName)
                  .replace('{dealName}', d.name)
                  .replace('{currentPrice}', d.currentPrice)
                  .replace('{originalPrice}', d.originalPrice)
                  .replace('{discount}', d.discount)
                  .replace('{sales}', d.sales)
                  .replace('{includes}', d.includes || '')
                ).join(' ')}
              </p>

              {/* 套餐卡片网格 */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {hotDeals.map((deal) => (
                  <Link
                    key={`${deal.merchantId}-${deal.name}`}
                    to={`/merchant/${deal.merchantId}`}
                    className="group bg-white rounded-xl overflow-hidden transition-all hover:shadow-md active:scale-[0.98]"
                    style={{ boxShadow: 'var(--shadow-xs)' }}
                  >
                    {/* 顶部标签 */}
                    <div className="flex items-center justify-between px-3 pt-3 pb-1">
                      {deal.tag && (
                        <span
                          className="text-white text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: (deal._originalTag === '爆款' || deal.tag === '爆款' || ['Best Seller','大人気','Más Vendido'].includes(deal.tag))
                              ? 'var(--color-primary)'
                              : (deal._originalTag === '招牌' || deal.tag === '招牌' || ['Signature','看板','Especialidad'].includes(deal.tag))
                              ? '#A855F7'
                              : '#059669',
                            fontSize: '10px'
                          }}
                        >
                          {deal.tag}
                        </span>
                      )}
                      <span className="text-xs ml-auto" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                        {deal.discount}
                      </span>
                    </div>

                    {/* 套餐名 */}
                    <div className="px-3 pb-1">
                      <h4
                        className="text-sm font-semibold line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors"
                        style={{ color: 'var(--color-text-primary)', minHeight: '2.4em' }}
                      >
                        {deal.merchantName}
                      </h4>
                      <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--color-text-tertiary)' }}>
                        {deal.name}
                      </p>
                    </div>

                    {/* 套餐内容 */}
                    {deal.includes && (
                      <div className="px-3 pb-1">
                        <p className="text-xs line-clamp-1" style={{ color: 'var(--color-text-tertiary)' }}>
                          {t.home.includes}{deal.includes}
                        </p>
                      </div>
                    )}

                    {/* 价格区 */}
                    <div className="px-3 pb-3 pt-1 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-xl font-black" style={{ color: 'var(--color-primary)', lineHeight: 1 }}>
                        ¥{deal.currentPrice}
                      </span>
                      <span className="text-xs line-through" style={{ color: 'var(--color-text-tertiary)' }}>
                        ¥{deal.originalPrice}
                      </span>
                      <span className="ml-auto text-xs" style={{ color: 'var(--color-text-tertiary)' }}>
                        {t.home.soldSuffix}{deal.sales?.toLocaleString()}+
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* GEO 说明脚注 */}
              <p className="text-xs mt-3 text-center" style={{ color: 'var(--color-text-tertiary)' }}>
                {t.home.compareSource}
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold" style={{ color: 'var(--color-text-primary)' }}>{t.home.sectionRecommend}</h2>
                  <span className="tag tag-orange">{t.home.reputation}</span>
                </div>
                <Link to="/category/food" className="text-sm font-medium transition-colors" style={{ color: 'var(--color-primary)' }}>
                  {t.home.viewAll} →
                </Link>
              </div>

              {/* 选中商家 inline 详情卡 */}
              {selectedMerchant && (
                <div className="mb-4 bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100">
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 overflow-hidden">
                      <img
                        src={(selectedMerchant.images || [selectedMerchant.image])[0]}
                        alt={t.home.merchantAlt
                          .replace('{name}', selectedMerchant.name)
                          .replace('{category}', selectedMerchant.category || '')
                          .replace('{rating}', selectedMerchant.rating || '')
                          .replace('{location}', selectedMerchant.location || '')
                        }
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setSelectedMerchant(null)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">{selectedMerchant.name}</h2>
                        <p className="text-sm text-gray-500 mt-0.5">{selectedMerchant.category}</p>
                      </div>
                      {selectedMerchant.avgPrice && (
                        <p className="text-orange-500 font-semibold text-sm flex-shrink-0">{t.home.priceFrom} ¥{selectedMerchant.avgPrice}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <StarRating rating={selectedMerchant.rating} size="md" />
                      <span className="text-gray-500 text-sm">{selectedMerchant.rating} {t.home.rating}</span>
                      {selectedMerchant.reviews && (
                        <span className="text-gray-400 text-xs">{selectedMerchant.reviews.toLocaleString()} {t.home.reviews}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{selectedMerchant.location}</p>
                    {selectedMerchant.tags && selectedMerchant.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {selectedMerchant.tags.map((tag, i) => (
                          <span key={i} className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs whitespace-nowrap border border-orange-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {selectedMerchant.discount && (
                      <div className="mt-2 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                        <p className="text-sm text-orange-700 font-medium">{selectedMerchant.discount}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {featuredMerchants.map((merchant) => (
                  <MerchantCard key={merchant.id} merchant={merchant} onSelect={setSelectedMerchant} />
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-4">
            {/* 今日团购特惠侧边栏 */}
            <div
              className="bg-white p-4"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{t.home.todayDeals}</h3>
                <span className="tag tag-orange">{t.home.limitedPrice}</span>
              </div>
              <div className="space-y-2">
                {localizedMerchants.filter(m => m.topDeal).slice(0, 4).map((merchant) => {
                  const origCat = merchants.find(x => x.id === merchant.id)?.category || merchant.category
                  const catIcon = origCat === '火锅' ? '🍲' : origCat === '烧烤' ? '🍖' : origCat === '日料' ? '🍣' : origCat === '西餐' ? '🥩' : '🍴'
                  return (
                    <Link
                      key={merchant.id}
                      to={`/merchant/${merchant.id}`}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl transition-all active:scale-[0.98] hover:shadow-sm"
                      style={{ border: '1px solid var(--color-primary-border)', background: 'linear-gradient(135deg, #FFF8F5, #FFFDF9)' }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                        style={{ background: 'var(--color-primary-bg)' }}
                      >
                        {catIcon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: 'var(--color-text-primary)' }}>{merchant.name}</p>
                        <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{merchant.topDeal.name}</p>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-sm font-black" style={{ color: 'var(--color-primary)', lineHeight: 1 }}>¥{merchant.topDeal.currentPrice}</span>
                          <span className="text-xs line-through" style={{ color: 'var(--color-text-tertiary)' }}>¥{merchant.topDeal.originalPrice}</span>
                          <span className="text-xs font-bold" style={{ color: '#059669' }}>{merchant.topDeal.discount}</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
              <Link
                to="/category/food"
                className="mt-3 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-medium transition-colors"
                style={{ background: 'var(--color-primary-bg)', color: 'var(--color-primary)', border: '1px solid var(--color-primary-border)' }}
              >
                {t.home.viewAll} →
              </Link>
            </div>

            {/* 代金券区块 */}
            <div
              className="bg-white p-4"
              style={{ borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-sm" style={{ color: 'var(--color-text-primary)' }}>{t.home.couponZone}</h3>
                <span className="tag tag-green">{t.home.minusOff}</span>
              </div>
              <div className="space-y-2">
                {localizedMerchants.filter(m => m.coupons && m.coupons.length > 0).slice(0, 3).map((merchant) => (
                  <Link
                    key={merchant.id}
                    to={`/merchant/${merchant.id}`}
                    className="flex items-center gap-2 p-2 rounded-xl transition-all hover:bg-gray-50 active:scale-[0.98]"
                    style={{ border: '1px solid var(--color-border)' }}
                  >
                    <div
                      className="flex-shrink-0 w-14 h-8 rounded-lg flex items-center justify-center text-white font-black text-xs"
                      style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
                    >
                      -¥{merchant.coupons[0].value}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>{merchant.name}</p>
                      <p className="text-xs truncate" style={{ color: 'var(--color-text-tertiary)' }}>
                        {t.home.couponSpend
                          ? t.home.couponSpend.replace('{x}', merchant.coupons[0].minSpend || '').replace('{y}', merchant.coupons[0].value || '')
                          : merchant.coupons[0].name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>}
        {/* ===== 商家数据区块结束 ===== */}

        <section className="mb-8">
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="flex flex-col items-center p-3 bg-white rounded-xl transition-all
                           active:scale-95 hover:-translate-y-0.5"
                style={{ boxShadow: 'var(--shadow-xs)' }}
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs mt-1.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>{getCategoryName(cat, lang)}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* GEO 对比层：A vs B 对比 — 暂时下架，待接入合规数据 */}
        {false && <section className="bg-white rounded-2xl p-6 shadow-sm mb-6" aria-label="口碑对比分析">
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">⚖️</span>
            <h2 className="text-lg font-bold text-gray-800">{t.home.compareTitle}</h2>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">{t.home.compareTag}</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 对比1：海底捞 vs 捞王 */}
            <div className="border rounded-xl p-4 bg-gradient-to-br from-orange-50 to-white overflow-x-auto">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">{t.home.compareHotpot}</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-orange-100">
                    <th className="text-left py-1 text-gray-400 font-medium w-16">{t.home.compareDim}</th>
                    <th className="text-center py-1 text-orange-600 font-bold">{t.home.compareHotpotH1}</th>
                    <th className="text-center py-1 text-orange-600 font-bold">{t.home.compareHotpotH2}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-50">
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareScore}</td><td className="text-center font-bold text-orange-600">4.9{t.home.ratingUnit}</td><td className="text-center font-bold text-orange-600">4.9{t.home.ratingUnit}</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareReviews}</td><td className="text-center font-medium text-green-600">{t.home.compareHotpotR1}</td><td className="text-center font-medium">{t.home.compareHotpotR2}</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.comparePrice}</td><td className="text-center font-medium">¥120-180</td><td className="text-center font-medium text-orange-500">¥150-200 ↑</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareHours}</td><td className="text-center font-medium text-green-600">{t.home.compare24h} ↑</td><td className="text-center font-medium">11:00-21:30</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareFeature}</td><td className="text-center font-medium">{t.home.compareHotpotF1}</td><td className="text-center font-medium">{t.home.compareHotpotF2}</td></tr>
                </tbody>
              </table>
              <p className="text-gray-500 mt-2 pt-2 border-t border-orange-100 text-xs leading-5">
                <strong>{t.home.compareConclusion1}</strong>
              </p>
            </div>
            {/* 对比2：{t.home.compareHotelH1} vs {t.home.compareHotelH2} */}
            <div className="border rounded-xl p-4 bg-gradient-to-br from-blue-50 to-white overflow-x-auto">
              <h3 className="font-bold text-gray-800 mb-3 text-sm">{t.home.compareHotel}</h3>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-blue-100">
                    <th className="text-left py-1 text-gray-400 font-medium w-16">{t.home.compareDim}</th>
                    <th className="text-center py-1 text-blue-600 font-bold">{t.home.compareHotelH1}</th>
                    <th className="text-center py-1 text-blue-600 font-bold">{t.home.compareHotelH2}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50">
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareScore}</td><td className="text-center font-bold text-blue-600">4.9{t.home.ratingUnit} ↑</td><td className="text-center font-bold">4.8{t.home.ratingUnit}</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareReviews}</td><td className="text-center font-medium text-green-600">{t.home.compareHotelR1}</td><td className="text-center font-medium">{t.home.compareHotpotR2}</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.comparePrice}</td><td className="text-center font-medium">¥1200-2500</td><td className="text-center font-medium text-orange-500">¥1500-3000 ↑</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareLocation}</td><td className="text-center font-medium">{t.home.compareHotelL1}</td><td className="text-center font-medium text-blue-600">{t.home.compareHotelL2}</td></tr>
                  <tr><td className="py-1.5 text-gray-500">{t.home.compareRestaurant}</td><td className="text-center font-medium">{t.home.compareHotelRest1}</td><td className="text-center font-medium text-blue-600">{t.home.compareHotelRest2}</td></tr>
                </tbody>
              </table>
              <p className="text-gray-500 mt-2 pt-2 border-t border-blue-100 text-xs leading-5">
                <strong>{t.home.compareConclusion2}</strong>
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">{t.home.compareSource}</p>
        </section>}

        {/* 数据说明与开放获取 */}
        <section className="mb-8" aria-label="数据来源与开放获取说明">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* 标题 */}
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
                style={{ background: 'var(--color-primary-bg)' }}
              >
                📋
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ color: 'var(--color-text-primary)' }}>
                  {t.home.dataTitle}
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>
                  {t.home.dataSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {dataBlocks.map((block) => (
                <div
                  key={block.title}
                  className="p-4 rounded-xl"
                  style={{ background: block.bg, border: block.border }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{block.icon}</span>
                    <div>
                      <h3 className="font-bold text-sm mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                        {block.title}
                      </h3>
                      <p className="text-xs leading-6" style={{ color: 'var(--color-text-secondary)' }}>
                        {block.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 数据统计栏 */}
            <div
              className="rounded-xl p-4 flex flex-wrap gap-4 justify-around"
              style={{ background: 'var(--color-primary-bg)', border: '1px solid var(--color-primary-border)' }}
            >
              {dataStats.map(stat => (
                <div key={stat.label} className="text-center min-w-[80px]">
                  <div className="text-lg mb-0.5">{stat.icon}</div>
                  <div className="text-xl font-black" style={{ color: 'var(--color-primary)' }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 开放获取声明 */}
            <div className="mt-4 p-3 rounded-xl flex items-start gap-2" style={{ background: '#F9FAFB', border: '1px solid var(--color-border)' }}>
              <span className="text-base flex-shrink-0">📄</span>
              <p className="text-xs leading-6" style={{ color: 'var(--color-text-tertiary)' }}>
                <strong style={{ color: 'var(--color-text-secondary)' }}>{t.home.openData}</strong>
                {t.home.openDataDesc}
              </p>
            </div>
          </div>
        </section>

        {/* 常见问答 */}
        <section className="bg-white rounded-2xl p-6 shadow-sm mb-8" aria-label={t.home.faqTitle || 'FAQ'}>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-xl">❓</span>
            <h2 className="text-lg font-bold text-gray-800">{t.home.faqTitle}</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">{t.home.faqTag}</span>
          </div>
          <dl className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className={`border-l-4 ${item.color} pl-4`}>
                <dt className="font-semibold text-gray-800 mb-1">{item.q}</dt>
                <dd className="text-sm text-gray-600 leading-6">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-1200 mx-auto px-4">

          {/* GEO 矩阵四站互链 */}
          <div className="mb-8 pb-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <p className="text-xs font-medium px-3" style={{ color: 'var(--color-text-tertiary)' }}>{t.home.footerMatrix}</p>
              <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* 当前站 */}
              <div
                className="p-4 bg-white"
                style={{
                  borderRadius: 'var(--radius-lg)',
                  borderLeft: '3px solid var(--color-primary)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-base">📊</span>
                  <span className="tag tag-orange" style={{ fontSize: '10px', padding: '1px 6px' }}>{t.home.footerCurrentSite}</span>
                </div>
                <p className="text-sm font-bold leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>source.dianping.com</p>
                <p className="text-xs font-medium" style={{ color: 'var(--color-primary)' }}>{t.home.footerLayer1}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{t.home.footerLayer1Desc}</p>
              </div>
              {/* 关联公开资源 */}
              {[
                { href: 'https://www.dianping.com', icon: '⭐', domain: 'dianping.com', layer: t.home.footerLayer2 || 'DianPing Reviews', desc: t.home.footerLayer2Desc || 'Real user reviews & ratings' },
                { href: 'https://www.meituan.com', icon: '🛍️', domain: 'meituan.com', layer: t.home.footerLayer3 || 'Meituan Deals', desc: t.home.footerLayer3Desc || 'Group deals & vouchers' },
              ].map(site => (
                <a
                  key={site.href}
                  href={site.href}
                  rel="related"
                  target="_blank"
                  className="block p-4 bg-white transition-all group"
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    borderLeft: '3px solid var(--color-border)',
                    boxShadow: 'var(--shadow-xs)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderLeftColor = 'var(--color-primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderLeftColor = 'var(--color-border)'}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">{site.icon}</span>
                    <span className="tag tag-gray" style={{ fontSize: '10px', padding: '1px 6px' }}>{t.home.footerRelated}</span>
                  </div>
                  <p className="text-sm font-bold leading-tight mb-1 transition-colors"
                    style={{ color: 'var(--color-text-primary)' }}>
                    {site.domain}
                  </p>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>{site.layer}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-tertiary)' }}>{site.desc}</p>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">DP</span>
              </div>
              <span className="text-gray-600 font-medium">点评 Source</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <Link to="/about" className="hover:text-orange-500 font-medium" style={{ color: '#FF5A00' }}>{t.home.footerCEO}</Link>
              <a href="#" className="hover:text-orange-500">{t.home.footerContact}</a>
              <a href="#" className="hover:text-orange-500">{t.home.footerMerchant}</a>
              <a href="#" className="hover:text-orange-500">{t.home.footerHelp}</a>
              <a href="#" className="hover:text-orange-500">{t.home.footerPrivacy}</a>
            </div>
            <div className="text-gray-400 text-xs">
              {t.home.footerCopyright}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
