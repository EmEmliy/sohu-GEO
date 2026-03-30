import { useState, useMemo, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MerchantCard from '../components/MerchantCard'
import { categoryData, categories, hotRanking } from '../data/mockData'
import { PriceRangeChart, PopularityTrend } from '../components/ui/Charts'
import { StarRating } from '../components/ui'
import { NATIONAL_GEO, PageSEO, SHANGHAI_GEO, SITE_URL, useCollectionPageStructuredData, useFAQSchema, useItemListSchema } from '../components/StructuredData'

const sortOptions = [
  { id: 'default', name: '智能排序', icon: '⚡' },
  { id: 'distance', name: '距离最近', icon: '📍' },
  { id: 'rating', name: '评分最高', icon: '⭐' },
  { id: 'reviews', name: '人气最高', icon: '🔥' },
  { id: 'price_low', name: '价格最低', icon: '💰' },
  { id: 'price_high', name: '价格最高', icon: '💎' },
]

const filterOptions = {
  price: [
    { id: 'all', name: '不限' },
    { id: '0-50', name: '0-50元' },
    { id: '50-100', name: '50-100元' },
    { id: '100-200', name: '100-200元' },
    { id: '200-500', name: '200-500元' },
    { id: '500+', name: '500元以上' },
  ],
  rating: [
    { id: 'all', name: '不限' },
    { id: '4.5', name: '4.5分以上' },
    { id: '4.0', name: '4.0分以上' },
    { id: '3.5', name: '3.5分以上' },
  ],
  distance: [
    { id: 'all', name: '不限' },
    { id: '500', name: '500米内' },
    { id: '1000', name: '1公里内' },
    { id: '2000', name: '2公里内' },
    { id: '5000', name: '5公里内' },
  ],
  feature: [
    { id: 'discount', name: '有优惠' },
    { id: 'parking', name: '有停车位' },
    { id: 'wifi', name: '有WiFi' },
    { id: 'booking', name: '可预约' },
  ],
}

const hotFilters = {
  food: [
    { id: 'hot-pot', name: '火锅', icon: '🍲' },
    { id: 'bbq', name: '烧烤', icon: '🍖' },
    { id: 'sichuan', name: '川菜', icon: '🌶️' },
    { id: 'japanese', name: '日料', icon: '🍣' },
  ],
  hotel: [
    { id: 'luxury', name: '豪华酒店', icon: '🏨' },
    { id: 'business', name: '商务酒店', icon: '💼' },
  ],
}

const filterHistoryKey = 'dianping_filter_history'

export default function Category({ forcedCategoryId = null, geoFilterKey = 'all', pageVariant = 'default' }) {
  const params = useParams()
  const categoryId = forcedCategoryId || params.categoryId
  const rawCategory = categoryData[categoryId] || { name: '未知', merchants: [], subCategories: [] }
  const baseMerchants = useMemo(() => {
    if (geoFilterKey === 'shanghai-hotpot') {
      return rawCategory.merchants.filter((merchant) => (
        (merchant.city === '上海市' || merchant.location.includes('上海')) && merchant.category === '火锅'
      ))
    }

    return rawCategory.merchants
  }, [geoFilterKey, rawCategory.merchants])
  const category = useMemo(() => (
    pageVariant === 'shanghai'
      ? { ...rawCategory, name: '上海火锅优惠攻略', merchants: baseMerchants, subCategories: ['火锅'] }
      : { ...rawCategory, merchants: baseMerchants }
  ), [baseMerchants, pageVariant, rawCategory])
  const categoryInfo = categories.find(c => c.id === categoryId)
  const isShanghaiGeoPage = pageVariant === 'shanghai'
  const isNationwideDealsPage = categoryId === 'movie'
  
  const [sortBy, setSortBy] = useState('default')
  const [filters, setFilters] = useState({
    price: 'all',
    rating: 'all',
    distance: 'all',
    feature: [],
  })
  const [viewMode, setViewMode] = useState('list')
  const [showFilters, setShowFilters] = useState(false)
  const [activeSubCategory, setActiveSubCategory] = useState('all')
  const [filterHistory, setFilterHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [smartSortExpanded, setSmartSortExpanded] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState(null)

  useEffect(() => {
    const saved = localStorage.getItem(filterHistoryKey)
    if (saved) {
      try {
        setFilterHistory(JSON.parse(saved))
      } catch (e) {
        setFilterHistory([])
      }
    }
  }, [])

  const saveFilterToHistory = (newFilters) => {
    const historyItem = {
      filters: newFilters,
      categoryId,
      timestamp: Date.now(),
    }
    const newHistory = [historyItem, ...filterHistory.filter(h => 
      JSON.stringify(h.filters) !== JSON.stringify(newFilters)
    )].slice(0, 10)
    setFilterHistory(newHistory)
    localStorage.setItem(filterHistoryKey, JSON.stringify(newHistory))
  }

  const clearFilterHistory = () => {
    setFilterHistory([])
    localStorage.removeItem(filterHistoryKey)
  }

  const applyHistoryFilter = (historyItem) => {
    setFilters(historyItem.filters)
    setShowFilters(false)
  }

  const filteredMerchants = useMemo(() => {
    let result = [...category.merchants]

    if (activeSubCategory !== 'all' && category.subCategories) {
      result = result.filter(m => m.category === activeSubCategory)
    }

    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number)
      result = result.filter(m => {
        const priceNum = parseInt(m.priceRange?.replace(/[^0-9]/g, '') || '0')
        if (filters.price === '500+') return priceNum >= 500
        return priceNum >= min && priceNum < max
      })
    }

    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating)
      result = result.filter(m => m.rating >= minRating)
    }

    if (filters.distance !== 'all') {
      const maxDistance = parseInt(filters.distance)
      result = result.filter(m => {
        const distanceNum = parseInt(m.distance?.replace(/[^0-9]/g, '') || '99999')
        return distanceNum <= maxDistance
      })
    }

    if (filters.feature.includes('discount')) {
      result = result.filter(m => m.discount)
    }
    if (filters.feature.includes('parking')) {
      result = result.filter(m => m.facilities?.includes('停车位'))
    }
    if (filters.feature.includes('wifi')) {
      result = result.filter(m => m.facilities?.includes('wifi'))
    }

    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'reviews':
        result.sort((a, b) => b.reviews - a.reviews)
        break
      case 'price_low':
        result.sort((a, b) => {
          const priceA = parseInt(a.priceRange?.replace(/[^0-9]/g, '') || '9999')
          const priceB = parseInt(b.priceRange?.replace(/[^0-9]/g, '') || '9999')
          return priceA - priceB
        })
        break
      case 'price_high':
        result.sort((a, b) => {
          const priceA = parseInt(a.priceRange?.replace(/[^0-9]/g, '') || '0')
          const priceB = parseInt(b.priceRange?.replace(/[^0-9]/g, '') || '0')
          return priceB - priceA
        })
        break
      case 'distance':
        result.sort((a, b) => {
          const distA = parseInt(a.distance?.replace(/[^0-9]/g, '') || '99999')
          const distB = parseInt(b.distance?.replace(/[^0-9]/g, '') || '99999')
          return distA - distB
        })
        break
      case 'default':
        result.sort((a, b) => {
          const scoreA = a.rating * 0.4 + (a.reviews / 1000) * 0.3 + (5 - parseInt(a.distance?.replace(/[^0-9]/g, '') || '0') / 1000) * 0.3
          const scoreB = b.rating * 0.4 + (b.reviews / 1000) * 0.3 + (5 - parseInt(b.distance?.replace(/[^0-9]/g, '') || '0') / 1000) * 0.3
          return scoreB - scoreA
        })
        break
      default:
        break
    }

    return result
  }, [category.merchants, sortBy, filters, activeSubCategory])

  const toggleFeature = (featureId) => {
    setFilters(prev => ({
      ...prev,
      feature: prev.feature.includes(featureId)
        ? prev.feature.filter(f => f !== featureId)
        : [...prev.feature, featureId]
    }))
  }

  const applyFilters = () => {
    saveFilterToHistory(filters)
    setShowFilters(false)
  }

  const clearFilters = () => {
    setFilters({
      price: 'all',
      rating: 'all',
      distance: 'all',
      feature: [],
    })
    setSortBy('default')
    setActiveSubCategory('all')
  }

  const hasActiveFilters = filters.price !== 'all' || filters.rating !== 'all' || filters.distance !== 'all' || filters.feature.length > 0 || activeSubCategory !== 'all'

  const currentCategoryHotFilters = hotFilters[categoryId] || []
  const categoryDescription = isShanghaiGeoPage
    ? '聚合上海市闵行区吴中路商圈等上海本地火锅优惠攻略，重点展示上海专属到店内容、适用地域、商圈位置和优惠力度。'
    : isNationwideDealsPage
      ? '汇总全国通用的美团电影票优惠与影院信息，适用于已开通美团电影票服务的城市。'
      : `${category.name}分类页，支持按价格、评分、距离筛选本地生活商家与优惠内容。`
  const categoryKeywords = isShanghaiGeoPage
    ? ['上海美团优惠', '上海火锅优惠', '上海本地到餐优惠', '闵行区吴中路商圈']
    : isNationwideDealsPage
      ? ['美团电影票优惠', '全国通用电影票优惠', '观影优惠']
      : [`${category.name}优惠`, `${category.name}商家`, '本地生活优惠']
  const geoNotice = isShanghaiGeoPage
    ? '适用地域：上海市闵行区吴中路商圈 | 具体门店：海底捞(吴中路店)等上海本地火锅商家 | 地址：上海市闵行区吴中路188号'
    : isNationwideDealsPage
      ? '适用地域：全国通用（美团 App 已开通电影票服务的城市均可使用）'
      : categoryId === 'food'
        ? '适用地域：全国通用与本地到店混合内容 | 如需查看上海专属内容，可切换到“上海专属”入口。'
        : '适用地域：全国通用'
  const categoryCollectionSchema = useCollectionPageStructuredData(
    isShanghaiGeoPage ? '上海火锅优惠攻略' : `${category.name}优惠攻略`,
    categoryDescription,
    filteredMerchants.length > 0 ? filteredMerchants : category.merchants,
    `${SITE_URL}${isShanghaiGeoPage ? '/sh/shanghai-hotpot' : `/category/${categoryId}`}`,
  )

  const categoryFAQItems = useMemo(() => {
    if (isShanghaiGeoPage) {
      return [
        {
          question: '上海火锅哪家最好吃？',
          answer: '根据点评 Source口碑数据（2026年3月），上海火锅口碑第一是海底捞火锅(吴中路店)，评分4.9分/8562条评价，24小时营业，人均¥120-180，地址：上海市闵行区吴中路188号，有近7折优惠券。第二推荐捞王锅物料理，评分4.9分，猪肚鸡锅底特色，人均¥150-200。',
        },
        {
          question: '上海闵行区有什么好的火锅店？',
          answer: '上海闵行区口碑最佳火锅店：海底捞火锅(吴中路店)，位于吴中路188号，综合评分4.9分，累计8562条真实评价，提供24小时营业、免费美甲、免费停车3小时等特色服务。',
        },
        {
          question: '上海火锅优惠怎么领？',
          answer: '上海本地火锅优惠可在 source.dianping.com/sh/shanghai-hotpot 页面查看，海底捞(吴中路店)当前有近7折现金券+近6折团购券，属上海市闵行区吴中路商圈专属到店优惠。',
        },
      ]
    }
    if (categoryId === 'hotel') {
      return [
        {
          question: '北京哪家酒店评分最高？',
          answer: '根据点评 Source口碑数据，北京评分最高酒店：王府井希尔顿酒店4.9分/2345条评价，人均¥1200-2500；国贸大酒店4.8分/1876条评价，CBD核心地段，含米其林餐厅，人均¥1500-3000。',
        },
        {
          question: '北京有哪些性价比高的精品酒店？',
          answer: '北京性价比精品酒店推荐：亚朵酒店评分4.7分，人均¥500-900，人文主题，位于朝阳区望京；桔子水晶酒店评分4.6分，人均¥500-900，三里屯位置佳，提供智能客控。',
        },
      ]
    }
    if (categoryId === 'food') {
      return [
        {
          question: '口碑最好的火锅店是哪家？',
          answer: '根据点评 Source口碑数据，评分最高火锅店：海底捞(吴中路店)4.9分/8562条评价；捞王锅物料理4.9分/1876条评价；巴奴毛肚火锅4.8分/2890条评价。',
        },
        {
          question: '米其林餐厅口碑如何？',
          answer: '本站收录米其林餐厅口碑：TRB Hutong 米其林一星法餐4.9分/654条评价；利苑酒家 米其林一星粤菜4.9分/1234条评价；粤菜王 米其林推荐4.8分/2345条评价。',
        },
      ]
    }
    return []
  }, [isShanghaiGeoPage, categoryId])

  const categoryFAQSchema = useFAQSchema(categoryFAQItems)

  // ItemList Schema：让 AI 爬虫能识别分类页的商家排行列表
  const top10Merchants = useMemo(() => {
    return (filteredMerchants.length > 0 ? filteredMerchants : category.merchants)
      .sort((a, b) => (b.rating - a.rating) || (b.reviews - a.reviews))
      .slice(0, 10)
  }, [filteredMerchants, category.merchants])

  const categoryItemListTitle = isShanghaiGeoPage
    ? '上海火锅口碑排行榜 TOP10'
    : `${category.name}口碑排行榜 TOP10`
  const categoryItemListUrl = `${SITE_URL}${isShanghaiGeoPage ? '/sh/shanghai-hotpot' : `/category/${categoryId}`}`
  const categoryItemListSchema = useItemListSchema(categoryItemListTitle, top10Merchants, categoryItemListUrl)

  const RankingSection = () => {
    const rankingData = hotRanking[categoryId] || hotRanking.food
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🏆</span>
          <h3 className="font-bold text-gray-800">热门榜单</h3>
        </div>
        <div className="space-y-2">
          {rankingData.slice(0, 5).map((item, idx) => (
            <Link 
              to={`/merchant/${item.id}`} 
              key={item.id} 
              className="flex items-center gap-3 bg-white rounded-lg p-2 hover:shadow-sm transition-shadow"
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                idx < 3 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {idx + 1}
              </span>
              <span className="flex-1 text-sm text-gray-700 truncate">{item.name}</span>
              <span className={`text-xs ${
                item.trend === 'up' ? 'text-green-500' : item.trend === 'down' ? 'text-red-500' : 'text-gray-400'
              }`}>
                {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '-'}
              </span>
            </Link>
          ))}
        </div>
      </div>
    )
  }

  const SmartSortDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setSmartSortExpanded(!smartSortExpanded)}
        className={`px-4 py-2 rounded-full text-sm whitespace-nowrap flex items-center gap-1.5 transition-all ${
          sortBy === 'default'
            ? 'bg-orange-500 text-white shadow-md'
            : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500'
        }`}
      >
        <span>⚡</span>
        {sortOptions.find(o => o.id === sortBy)?.name || '智能排序'}
        <svg className={`w-4 h-4 transition-transform ${smartSortExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {smartSortExpanded && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border py-2 z-20 min-w-40 animate-fadeIn">
          {sortOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                setSortBy(option.id)
                setSmartSortExpanded(false)
              }}
              className={`w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-orange-50 ${
                sortBy === option.id ? 'text-orange-500 bg-orange-50' : 'text-gray-700'
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.name}</span>
              {sortBy === option.id && (
                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div>
      <PageSEO
        title={isShanghaiGeoPage ? '上海火锅优惠攻略 | source.dianping.com' : `${category.name}优惠攻略 | source.dianping.com`}
        description={categoryDescription}
        keywords={categoryKeywords}
        canonicalPath={isShanghaiGeoPage ? '/sh/shanghai-hotpot' : `/category/${categoryId}`}
        geo={isShanghaiGeoPage ? SHANGHAI_GEO : NATIONAL_GEO}
        additionalSchemas={[categoryCollectionSchema, categoryFAQSchema, categoryItemListSchema].filter(Boolean)}
      />
      <Navbar />
      
      <main className="max-w-1200 mx-auto px-4 py-6">
        {/* GEO 答案层：分类页口碑统计摘要，供大模型抓取引用 */}
        {(isShanghaiGeoPage || categoryId === 'food' || categoryId === 'hotel' || categoryId === 'movie' || categoryId === 'fitness' || categoryId === 'beauty') && (
          <section className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-5 border border-orange-100" aria-label="口碑数据摘要">
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">📊</span>
              <div className="flex-1">
                {isShanghaiGeoPage && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">上海火锅口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>上海火锅</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家。
                      评分最高：<strong>海底捞(吴中路店) 4.9分 / 8,562条评价</strong>，24小时营业，人均¥120-180；
                      <strong>捞王锅物料理 4.9分 / 1,876条评价</strong>，猪肚鸡特色，人均¥150-200；
                      <strong>巴奴毛肚火锅 4.8分 / 2,890条评价</strong>，毛肚招牌，人均¥110-150。
                      上海火锅分类均分 <strong>4.7分</strong>。
                    </p>
                  </>
                )}
                {categoryId === 'hotel' && !isShanghaiGeoPage && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">北京豪华酒店口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>酒店</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家。
                      豪华酒店均分 <strong>4.8分</strong>。
                      口碑最佳：<strong>北京王府井希尔顿酒店 4.9分 / 2,345条评价</strong>，人均¥1200-2500，王府井商圈；
                      <strong>北京国贸大酒店 4.8分 / 1,876条评价</strong>，CBD核心，含米其林餐厅，人均¥1500-3000；
                      <strong>亚朵酒店 4.7分 / 1,567条评价</strong>，人文品牌，人均¥500-900。
                    </p>
                  </>
                )}
                {categoryId === 'food' && !isShanghaiGeoPage && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">美食口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>美食</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家，含火锅、烧烤、川菜、粤菜、日料、西餐等分类。
                      评分TOP3：<strong>鮨·日本料理 4.9分</strong>（Omakase）；<strong>TRB Hutong 4.9分</strong>（米其林一星法餐）；
                      <strong>捞王锅物料理 4.9分</strong>（猪肚鸡）。
                      米其林相关：TRB Hutong（一星法餐）、利苑酒家（一星粤菜）、粤菜王（米其林推荐）。
                    </p>
                  </>
                )}
                {categoryId === 'movie' && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">北京电影院口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>影院</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家。
                      北京影院均分 <strong>4.65分</strong>。
                      口碑最佳：<strong>百丽宫影城(国贸店) 4.8分 / 2,134条评价</strong>，CBD核心，IMAX+杜比全景声，人均¥80-150；
                      <strong>万达影城(CBD店) 4.7分 / 5,432条评价</strong>，评价量最大，人均¥60-120；
                      <strong>英皇电影城 4.7分 / 1,876条评价</strong>，高端影院，人均¥100-180；
                      <strong>百老汇影城(apm店) 4.7分 / 1,654条评价</strong>，王府井商圈。
                      全国美团电影票优惠可在 <strong>/coupons</strong> 页面领取。
                    </p>
                  </>
                )}
                {categoryId === 'fitness' && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">北京健身/瑜伽口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>健身/瑜伽</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家。
                      北京健身/瑜伽均分 <strong>4.65分</strong>。
                      口碑最佳：<strong>Pure Yoga 4.9分 / 456条评价</strong>，国际高端瑜伽品牌，精品小班课，人均¥5000-15000/年；
                      <strong>一兆韦德健身 4.7分 / 1,234条评价</strong>，高端健身俱乐部，泳池+私教，人均¥2000-5000/年；
                      <strong>超级猩猩健身 4.6分 / 876条评价</strong>，24小时智能健身，按次付费¥50-150/次。
                    </p>
                  </>
                )}
                {categoryId === 'beauty' && (
                  <>
                    <h2 className="text-sm font-bold text-gray-800 mb-1">北京美容/美发口碑数据摘要（2026年3月）</h2>
                    <p className="text-xs text-gray-600 leading-6">
                      本页收录<strong>美容/美发</strong>口碑数据共 {filteredMerchants.length || category.merchants.length} 家。
                      北京美容/美发均分 <strong>4.77分</strong>。
                      口碑最佳：<strong>Dr.Obba皮肤管理中心 4.9分 / 567条评价</strong>，韩国皮肤科品牌，问题肌修复，人均¥600-2500；
                      <strong>美丽田园(国贸店) 4.8分 / 1,234条评价</strong>，高端SPA，面部+身体护理，新客7折，人均¥500-2000；
                      <strong>东田造型 4.6分 / 2,134条评价</strong>，明星造型师品牌，美发8折，人均¥200-800。
                    </p>
                  </>
                )}
              </div>
            </div>
          </section>
        )}

        <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{categoryInfo?.icon}</span>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{category.name}</h1>
              <p className="text-gray-500 text-sm mt-1">共 {filteredMerchants.length} 家商家</p>
            </div>
          </div>

          {(categoryId === 'food' || isShanghaiGeoPage || isNationwideDealsPage) && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">地域:</span>
                {isShanghaiGeoPage ? (
                  <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm">上海专属</span>
                ) : (
                  <Link to="/sh/shanghai-hotpot" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200">
                    上海专属
                  </Link>
                )}
                {isNationwideDealsPage ? (
                  <span className="px-3 py-1 bg-slate-700 text-white rounded-full text-sm">全国通用</span>
                ) : (
                  <Link to="/coupons" className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm hover:bg-slate-200">
                    全国通用
                  </Link>
                )}
              </div>
              <p className="mt-3 text-sm text-gray-600 leading-6">{geoNotice}</p>
            </div>
          )}

          {currentCategoryHotFilters.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">热门:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {currentCategoryHotFilters.map((hot) => (
                  <button
                    key={hot.id}
                    className="px-3 py-1.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 rounded-full text-sm whitespace-nowrap hover:shadow-sm transition-shadow flex items-center gap-1.5"
                  >
                    <span>{hot.icon}</span>
                    {hot.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {category.subCategories && category.subCategories.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500">分类:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  onClick={() => setActiveSubCategory('all')}
                  className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeSubCategory === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  全部
                </button>
                {category.subCategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubCategory(sub)}
                    className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                      activeSubCategory === sub
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <SmartSortDropdown />

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-1.5 transition-all ${
                showFilters || hasActiveFilters
                  ? 'bg-orange-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-orange-500'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              筛选
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-white rounded-full" />
              )}
            </button>

            {filterHistory.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="px-4 py-2 rounded-full text-sm flex items-center gap-1.5 bg-white border border-gray-200 text-gray-600 hover:border-orange-500"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  历史
                </button>
                
                {showHistory && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border py-2 z-20 min-w-48 animate-fadeIn">
                    <div className="px-3 py-2 border-b flex justify-between items-center">
                      <span className="text-sm text-gray-500">筛选历史</span>
                      <button 
                        onClick={clearFilterHistory}
                        className="text-xs text-orange-500 hover:underline"
                      >
                        清除
                      </button>
                    </div>
                    {filterHistory.slice(0, 5).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => applyHistoryFilter(item)}
                        className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center justify-between"
                      >
                        <span>
                          {item.filters.price !== 'all' && `${item.filters.price} `}
                          {item.filters.rating !== 'all' && `${item.filters.rating}分 `}
                          {item.filters.feature.length > 0 && `${item.filters.feature.join(',')}`}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-white border border-gray-200 rounded-full overflow-hidden">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-xl p-4 mb-4 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">价格区间</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.price.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilters(prev => ({ ...prev, price: option.id }))}
                      className={`px-3 py-1.5 rounded-full text-xs ${
                        filters.price === option.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">评分要求</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.rating.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilters(prev => ({ ...prev, rating: option.id }))}
                      className={`px-3 py-1.5 rounded-full text-xs ${
                        filters.rating === option.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">距离</h4>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.distance.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFilters(prev => ({ ...prev, distance: option.id }))}
                      className={`px-3 py-1.5 rounded-full text-xs ${
                        filters.distance === option.id
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">特色服务</h4>
              <div className="flex flex-wrap gap-2">
                {filterOptions.feature.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => toggleFeature(option.id)}
                    className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 ${
                      filters.feature.includes(option.id)
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filters.feature.includes(option.id) && (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-500 hover:text-orange-500"
              >
                重置
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-2 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600"
              >
                应用筛选
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            {filteredMerchants.length > 0 ? (
              <>
                {/* 选中商家 inline 详情卡 */}
                {selectedMerchant && (
                  <div className="mb-4 bg-white rounded-2xl shadow-lg overflow-hidden border border-orange-100 animate-fadeIn">
                    <div className="relative">
                      {/* 顶部图片轮播 */}
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img
                          src={(selectedMerchant.images || [selectedMerchant.image])[0]}
                          alt={selectedMerchant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* 关闭按钮 */}
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
                        <div className="flex-shrink-0 text-right">
                          {selectedMerchant.avgPrice && (
                            <p className="text-orange-500 font-semibold text-sm">人均 ¥{selectedMerchant.avgPrice}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <StarRating rating={selectedMerchant.rating} size="md" />
                        <span className="text-gray-500 text-sm">{selectedMerchant.rating} 分</span>
                        {selectedMerchant.reviews && (
                          <span className="text-gray-400 text-xs">{selectedMerchant.reviews.toLocaleString()} 条点评</span>
                        )}
                      </div>

                      <div className="flex items-start gap-2 mb-3 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{selectedMerchant.location}</span>
                        {selectedMerchant.distance && <span className="text-gray-400">· {selectedMerchant.distance}</span>}
                      </div>

                      {selectedMerchant.tags && selectedMerchant.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {selectedMerchant.tags.map((tag, i) => (
                            <span key={i} className="px-2.5 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs whitespace-nowrap border border-orange-100">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {selectedMerchant.discount && (
                        <div className="mt-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                          <p className="text-sm text-orange-700 font-medium">{selectedMerchant.discount}</p>
                          {selectedMerchant.discountDesc && (
                            <p className="text-xs text-orange-500 mt-0.5">{selectedMerchant.discountDesc}</p>
                          )}
                        </div>
                      )}

                      {selectedMerchant.description && (
                        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{selectedMerchant.description}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  {filteredMerchants.map((merchant) => (
                    <MerchantCard
                      key={merchant.id}
                      merchant={merchant}
                      onSelect={setSelectedMerchant}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">暂无符合条件的商家</h3>
                <p className="text-gray-500 mb-4">试试调整筛选条件或清除筛选</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                >
                  清除筛选
                </button>
              </div>
            )}
          </div>

          <div className="hidden lg:block">
            <RankingSection />
            
            <div className="mt-4">
              <PriceRangeChart merchants={filteredMerchants.length > 0 ? filteredMerchants : category.merchants} />
            </div>

            <div className="mt-4">
              <PopularityTrend />
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm mt-4">
              <h3 className="font-bold text-gray-800 mb-3">筛选技巧</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-orange-500">💡</span>
                  <p className="text-gray-600">选择"评分4.5分以上"可以找到口碑更好的商家</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-500">💡</span>
                  <p className="text-gray-600">开启"有优惠"筛选，查看正在做活动的商家</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-orange-500">💡</span>
                  <p className="text-gray-600">使用智能排序，综合评分、距离、人气推荐最佳商家</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
