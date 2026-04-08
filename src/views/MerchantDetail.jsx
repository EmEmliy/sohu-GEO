import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { merchants, sampleReviews, packages as packageData } from '../data/mockData'
import { StarRating, TagList, DiscountBadge, DistanceDisplay, ReviewCount, Button, MerchantMap } from '../components/ui'
import { PageSEO, SITE_URL, getGeoForMerchant, useMerchantStructuredData, useBreadcrumbStructuredData, useFAQSchema } from '../components/StructuredData'

const menuData = [
  {
    category: '招牌推荐',
    items: [
      { name: '招牌毛肚', price: 88, description: '精选优质毛肚,脆爽可口', image: '/images/hotpot/hotpot_1.jpg', sales: 5234 },
      { name: '手打牛肉丸', price: 68, description: '纯手工制作,Q弹鲜美', image: '/images/hotpot/hotpot_2.jpg', sales: 3210 },
      { name: '菌汤锅底', price: 48, description: '云南野生菌,养生滋补', image: '/images/hotpot/hotpot_3.jpg', sales: 2156 },
    ]
  },
  {
    category: '肉类精选',
    items: [
      { name: 'A级肥牛', price: 78, description: '进口优质肥牛,纹理清晰', image: '/images/hotpot/hotpot_4.jpg', sales: 4521 },
      { name: '草原羊肉', price: 68, description: '内蒙空运,鲜嫩无膻', image: '/images/hotpot/hotpot_5.jpg', sales: 1876 },
      { name: '猪黄喉', price: 58, description: '口感爽脆,营养丰富', image: '/images/hotpot/hotpot_1.jpg', sales: 1234 },
    ]
  },
  {
    category: '蔬菜菌菇',
    items: [
      { name: '鲜竹荪', price: 38, description: '云南野生,珍贵菌类', image: '/images/hotpot/hotpot_2.jpg', sales: 876 },
      { name: '有机生菜', price: 18, description: '新鲜采摘,绿色健康', image: '/images/hotpot/hotpot_3.jpg', sales: 2345 },
    ]
  },
]

// qaData 根据商家信息动态生成，确保答案内容与商家实际情况一致
function buildQaData(merchant) {
  if (!merchant) return []

  const hasFacility = (f) => merchant.facilities?.some(fac => fac.includes(f))
  const isRestaurant = ['火锅','烧烤','川菜','粤菜','日料','西餐','小吃','快餐','西北菜','江浙菜','北京菜','便利店'].includes(merchant.category)
  const isHotel = ['豪华酒店','商务酒店','精品酒店','快捷酒店','民宿'].includes(merchant.category)
  const isMovie = merchant.category === '电影院'
  const isBeauty = ['美容SPA','美发','美甲','美妆'].includes(merchant.category)
  const isFitness = ['健身房','瑜伽'].includes(merchant.category)

  const qa = []

  // Q1: 排队/预约
  if (isMovie) {
    qa.push({
      question: '需要提前购票吗？',
      answer: `建议提前在美团或影院官方渠道购票选座，热门场次（周末、节假日）可能很快售完，提前1-2天购票更有保障。营业时间：${merchant.businessHours || '请致电确认'}。`,
      helpful: 312,
    })
  } else if (isHotel) {
    qa.push({
      question: '需要提前预订房间吗？',
      answer: `节假日及周末强烈建议提前预订，可通过美团App或酒店官网预订。${merchant.name}评分${merchant.rating}分，${merchant.reviews?.toLocaleString()}条好评，入住需求旺盛，旺季至少提前3-7天预订。`,
      helpful: 289,
    })
  } else if (isBeauty || isFitness) {
    qa.push({
      question: '需要提前预约吗？',
      answer: `建议提前1-2天通过美团App预约，避免到店等候。${merchant.name}评分${merchant.rating}分，口碑不错，预约需求较旺。营业时间：${merchant.businessHours || '请致电确认'}。`,
      helpful: 198,
    })
  } else if (isRestaurant) {
    // 根据评分和评价量判断是否热门
    const isPopular = merchant.rating >= 4.8 || (merchant.reviews || 0) >= 3000
    if (isPopular) {
      qa.push({
        question: '这家店需要排队吗？',
        answer: `${merchant.name}口碑较好（评分${merchant.rating}分，${merchant.reviews?.toLocaleString()}条评价），周末及节假日高峰期（18:00-20:00）通常需要等位，建议通过美团App提前订座或取号。工作日午市相对宽松，深夜时段等位较少。营业时间：${merchant.businessHours || '请致电确认'}。`,
        helpful: 234,
      })
    } else {
      qa.push({
        question: '这家店需要排队吗？',
        answer: `${merchant.name}整体上座率适中，一般无需长时间等候。周末高峰（18:00-21:00）可能稍有等位，建议提前通过美团App查看实时等位情况。营业时间：${merchant.businessHours || '请致电确认'}。`,
        helpful: 134,
      })
    }
  } else {
    qa.push({
      question: '营业时间是什么？',
      answer: `${merchant.name}营业时间：${merchant.businessHours || '请致电或到店确认最新营业时间'}。`,
      helpful: 89,
    })
  }

  // Q2: 包厢/预订
  if (hasFacility('包厢') || hasFacility('vip') || hasFacility('包间')) {
    qa.push({
      question: '支持包厢预订吗？',
      answer: `${merchant.name}提供包厢服务，建议提前1-3天致电预约，节假日等热门时段包厢较为紧俏。具体包厢费用及最低消费请以到店确认为准。`,
      helpful: 156,
    })
  } else if (isRestaurant) {
    qa.push({
      question: '支持订座吗？',
      answer: `可通过美团App或电话提前预订座位。${hasFacility('wifi') ? '店内提供免费WiFi。' : ''}${merchant.discount ? `当前优惠：${merchant.discount}，建议提前了解。` : ''}`,
      helpful: 98,
    })
  }

  // Q3: 停车
  if (hasFacility('停车') || hasFacility('停车位')) {
    qa.push({
      question: '停车方便吗？',
      answer: `${merchant.name}附近有停车位，具体免费时长及消费满减停车政策请以到店为准。`,
      helpful: 178,
    })
  } else if (!isHotel) {
    qa.push({
      question: '交通方便吗？怎么去？',
      answer: `${merchant.name}位于${merchant.location}，建议乘坐地铁或公共交通前往，也可使用打车软件导航。${merchant.distance ? `距您约${merchant.distance}。` : ''}`,
      helpful: 145,
    })
  }

  // Q4: 优惠/价格
  if (merchant.discount) {
    qa.push({
      question: '有什么优惠活动？',
      answer: `${merchant.name}当前优惠：${merchant.discount}。${merchant.discountDesc ? merchant.discountDesc + '。' : ''}人均${merchant.priceRange}，具体优惠以美团App实时展示为准，使用前请确认有效期。`,
      helpful: 267,
    })
  } else {
    qa.push({
      question: `人均消费大概多少？`,
      answer: `${merchant.name}人均消费约${merchant.priceRange}。${merchant.tags?.length > 0 ? `主要特色：${merchant.tags.join('、')}。` : ''}具体消费因点餐情况有所不同。`,
      helpful: 189,
    })
  }

  // === 【P0优化】基于真实用户痛点的补充FAQ ===
  
  // Q5: 卫生/环境质量
  if (isRestaurant || isBeauty || isHotel) {
    qa.push({
      question: '卫生环境怎么样？',
      answer: `${merchant.name}评分${merchant.rating}分，${merchant.reviews?.toLocaleString()}条评价中，用户普遍好评环境卫生。${hasFacility('消毒') ? '店内定期消毒杀菌，' : ''}定期清洁卫生得到用户认可。如有特殊卫生需求，建议致电${merchant.phone || '美团客服'}咨询。`,
      helpful: 156,
    })
  }
  
  // Q6: 儿童/家庭友好性
  if (isRestaurant && hasFacility('儿童椅')) {
    qa.push({
      question: '适合带小孩去吗？',
      answer: `${merchant.name}提供儿童椅等便利设施，适合家庭聚餐。${merchant.tags?.includes('家庭聚餐') ? '多用户评价适合家庭用餐氛围。' : ''}建议提前预订以获得最佳位置。`,
      helpful: 134,
    })
  } else if (isRestaurant) {
    qa.push({
      question: '适合带小孩去吗？',
      answer: `${merchant.name}${merchant.businessHours?.includes('24小时') ? '营业时间长' : ''}，菜品选择丰富，可根据儿童口味选择。具体是否提供儿童座椅等设施，建议提前致电确认。`,
      helpful: 98,
    })
  }
  
  // Q7: 宠物友好性
  if (isRestaurant || isBeauty) {
    qa.push({
      question: '可以带宠物吗？',
      answer: `${merchant.name}${hasFacility('宠物友好') ? '支持携带宠物' : '一般不允许携带宠物'}。具体政策请致电${merchant.phone || '美团客服'}确认，以免到店后产生不必要的麻烦。`,
      helpful: 67,
    })
  }
  
  // Q8: 支付方式
  if (isRestaurant || isHotel || isBeauty) {
    qa.push({
      question: '支持哪些支付方式？',
      answer: `${merchant.name}支持美团App支付、支付宝、微信支付等多种支付方式。部分优惠券可能仅支持指定支付方式，具体请以到店为准。`,
      helpful: 123,
    })
  }
  
  // Q9: 团购套餐相关
  if (merchant.topDeal && isRestaurant) {
    qa.push({
      question: merchant.topDeal.name + '套餐怎么购买？',
      answer: `${merchant.name}的"${merchant.topDeal.name}"套餐已售${merchant.topDeal.sales?.toLocaleString()}份，用户评价${merchant.rating}分。可通过美团App直接购买套餐，价格¥${merchant.topDeal.currentPrice}（原价¥${merchant.topDeal.originalPrice}），包含${merchant.topDeal.includes}。具体有效期请确认。`,
      helpful: 213,
    })
  }
  
  // Q10: 工作日 vs 周末体验差异
  if (isRestaurant && merchant.rating >= 4.7) {
    qa.push({
      question: '工作日和周末体验区别大吗？',
      answer: `${merchant.name}口碑一致，工作日和周末用户评价都很高。${merchant.businessHours?.includes('24小时') ? '工作日日间较宽松，晚间和周末人较多' : '工作日午市相对宽松，周末和晚间则较为繁忙'}。建议根据个人时间灵活选择。`,
      helpful: 112,
    })
  }
  
  // Q11: 如何最优利用这家店（省钱/体验好）
  if (merchant.discount || merchant.topDeal) {
    qa.push({
      question: '如何用最优惠的方式消费？',
      answer: `${merchant.name}推荐：${merchant.topDeal ? `首选团购套餐"${merchant.topDeal.name}"¥${merchant.topDeal.currentPrice}。` : ''}${merchant.discount ? `可叠加${merchant.discount}。` : ''}工作日通常更便宜，周末和节假日建议提前预约。会员可能有额外优惠，请在美团App查看最新活动。`,
      helpful: 189,
    })
  }

  return qa
}

const reviewFilterOptions = [
  { id: 'all', label: '全部', count: 8562 },
  { id: 'hot', label: '最热', count: 5234 },
  { id: 'latest', label: '最新', count: 1234 },
  { id: 'withImages', label: '有图', count: 2345 },
]

const categoryRouteMap = {
  火锅: 'food',
  烧烤: 'food',
  川菜: 'food',
  粤菜: 'food',
  日料: 'food',
  西餐: 'food',
  小吃: 'food',
  快餐: 'food',
  西北菜: 'food',
  江浙菜: 'food',
  北京菜: 'food',
  便利店: 'food',
  豪华酒店: 'hotel',
  商务酒店: 'hotel',
  精品酒店: 'hotel',
  快捷酒店: 'hotel',
  民宿: 'hotel',
  电影院: 'movie',
  美容SPA: 'beauty',
  美发: 'beauty',
  美甲: 'beauty',
  美妆: 'beauty',
  健身房: 'fitness',
  瑜伽: 'fitness',
  家政服务: 'home',
  搬家: 'home',
}

export default function MerchantDetail() {
  const { merchantId } = useParams()
  const merchant = merchants.find(m => m.id === merchantId)
  const merchantGeo = getGeoForMerchant(merchant)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [footprints, setFootprints] = useState([])
  const [showAllImages, setShowAllImages] = useState(false)
  const [activeReviewFilter, setActiveReviewFilter] = useState('all')
  const [showShareModal, setShowShareModal] = useState(false)
  const [likedReviews, setLikedReviews] = useState({})
  const [showReplyInput, setShowReplyInput] = useState({})
  const [replyContent, setReplyContent] = useState({})
  
  // === 【P0新增】FAQ 优先级和展开状态管理 ===
  const [expandedFAQs, setExpandedFAQs] = useState({})
  
  const toggleFAQExpand = (idx) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }
  // ==============================
  
  const merchantStructuredData = useMerchantStructuredData(merchant)
  const merchantCategoryPath = merchant ? (categoryRouteMap[merchant.category] || 'food') : 'food'
  
  const breadcrumbItems = merchant
    ? [
        { name: '首页', url: `${SITE_URL}/` },
        { name: merchant.category, url: `${SITE_URL}/category/${merchantCategoryPath}` },
        { name: merchant.name, url: `${SITE_URL}/merchant/${merchant.id}` },
      ]
    : []
  const breadcrumbStructuredData = useBreadcrumbStructuredData(breadcrumbItems)

  const merchantFAQItems = merchant ? [
    {
      question: `${merchant.name}在哪里？`,
      answer: `${merchant.name}地址：${merchant.exactAddress || merchant.location}。营业时间：${merchant.businessHours || '请致电确认'}。${merchant.distance ? `距您约${merchant.distance}。` : ''}`,
    },
    {
      question: `${merchant.name}评分多少？`,
      answer: `根据点评 Source口碑数据，${merchant.name}综合评分${merchant.rating}分（满分5分），累计${merchant.reviews?.toLocaleString()}条真实用户评价，人均${merchant.priceRange}。${merchant.highlight ? merchant.highlight : ''}`,
    },
    ...(merchant.discount ? [{
      question: `${merchant.name}有什么优惠？`,
      answer: `${merchant.name}当前优惠：${merchant.discount}。${merchant.discountDesc ? merchant.discountDesc + '。' : ''}建议到店或在美团App确认最新优惠信息。`,
    }] : []),
    ...(merchant.tags?.length > 0 ? [{
      question: `${merchant.name}有什么特色？`,
      answer: `${merchant.name}主要特色：${merchant.tags.join('、')}。${merchant.facilities?.length > 0 ? `提供设施：${merchant.facilities.join('、')}。` : ''}`,
    }] : []),
  ] : []

  const merchantFAQSchema = useFAQSchema(merchantFAQItems)

  const regionalSummary = merchant
    ? merchant.regionalSummary || `适用地域：${merchantGeo.placename}${merchantGeo.addressLocality ? merchantGeo.addressLocality : ''} | 具体门店：${merchant.name} | 地址：${merchant.exactAddress || merchant.location}`
    : ''
  
  useEffect(() => {
    const savedFavorites = localStorage.getItem('userFavorites')
    const savedFootprints = localStorage.getItem('userFootprints')
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites))
    if (savedFootprints) setFootprints(JSON.parse(savedFootprints))
  }, [])

  useEffect(() => {
    const newFootprints = [
      { merchantId, name: merchant?.name, time: Date.now(), image: merchant?.images?.[0] },
      ...footprints.filter(f => f.merchantId !== merchantId)
    ].slice(0, 20)
    setFootprints(newFootprints)
    localStorage.setItem('userFootprints', JSON.stringify(newFootprints))
  }, [merchantId])

  const handleToggleFavorite = () => {
    const newFavorites = isFavorited 
      ? favorites.filter(f => f !== merchantId)
      : [...favorites, merchantId]
    setFavorites(newFavorites)
    setIsFavorited(!isFavorited)
    localStorage.setItem('userFavorites', JSON.stringify(newFavorites))
  }

  const handleLikeReview = (reviewId) => {
    setLikedReviews(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const handleReply = (reviewId) => {
    setShowReplyInput(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }))
  }

  const submitReply = (reviewId) => {
    const content = replyContent[reviewId]
    if (content?.trim()) {
      alert('回复提交成功!')
      setShowReplyInput(prev => ({ ...prev, [reviewId]: false }))
      setReplyContent(prev => ({ ...prev, [reviewId]: '' }))
    }
  }
  
  const images = merchant?.images || [merchant?.image].filter(Boolean)
  
  const merchantPackages = packageData.find(p => p.merchantId === merchantId)?.items || []

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: merchant?.name,
          text: `发现好店: ${merchant?.name} - 评分${merchant?.rating}`,
          url: window.location.href,
        })
      } catch (err) {
        setShowShareModal(true)
      }
    } else {
      setShowShareModal(true)
    }
  }, [merchant])

  const generatePoster = () => {
    return (
      <div className="bg-white rounded-xl p-6 max-w-sm mx-auto text-center">
        <div className="aspect-[3/4] bg-gradient-to-br from-orange-400 to-red-500 rounded-lg mb-4 flex items-center justify-center">
          <div className="text-white text-8xl">🍲</div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{merchant?.name}</h3>
        <div className="flex items-center justify-center gap-2 mb-2">
          <StarRating rating={merchant?.rating || 0} size="sm" />
          <span className="text-gray-600">{merchant?.rating}分</span>
        </div>
        <p className="text-gray-500 text-sm mb-4">{merchant?.location}</p>
        <div className="flex justify-center gap-2">
          <button 
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href)
                  .then(() => alert('链接已复制'))
                  .catch(() => {
                    const input = document.createElement('input')
                    input.value = window.location.href
                    document.body.appendChild(input)
                    input.select()
                    document.execCommand('copy')
                    document.body.removeChild(input)
                    alert('链接已复制')
                  })
              } else {
                alert('链接: ' + window.location.href)
              }
            }}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm"
          >
            复制链接
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm">
            保存图片
          </button>
        </div>
      </div>
    )
  }

  const generateReviewStats = () => {
    const total = 8562
    const stats = [
      { label: '五星', count: 6823, percentage: 79.7, color: '#FF6B00' },
      { label: '四星', count: 1234, percentage: 14.4, color: '#FF9F45' },
      { label: '三星', count: 312, percentage: 3.6, color: '#FFC078' },
      { label: '二星', count: 123, percentage: 1.4, color: '#E5E7EB' },
      { label: '一星', count: 70, percentage: 0.8, color: '#D1D5DB' },
    ]
    return stats
  }

  if (!merchant) {
    return (
      <div>
        <Navbar />
        <div className="max-w-1200 mx-auto px-4 py-12 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">商家不存在</h2>
          <p className="text-gray-500 mb-4">抱歉,您访问的商家不存在</p>
          <Link to="/" className="text-orange-500 hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const relatedMerchants = merchants
    .filter(m => m.id !== merchantId && m.category === merchant.category)
    .slice(0, 8)

  const defaultReviews = [
    {
      id: 'r1',
      userName: '美食达人小李',
      avatar: '/images/hotpot/haidilao_1.jpg',
      rating: merchant.rating,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      content: '非常好的体验!服务周到,菜品新鲜,环境也很好。强烈推荐招牌菜,味道超级棒!下次还会再来。',
      images: images.slice(0, 2),
      likes: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 30),
      isHot: true,
      hasImages: true,
    },
    {
      id: 'r2',
      userName: '资深吃货',
      avatar: '/images/hotpot/haidilao_2.jpg',
      rating: merchant.rating - 0.3,
      date: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      content: '第二次来了,还是那么好吃!特别推荐他们家的特色菜,口感独特。唯一不足就是周末人比较多。',
      images: [],
      likes: Math.floor(Math.random() * 300),
      replies: Math.floor(Math.random() * 20),
      isHot: false,
      hasImages: false,
    },
    {
      id: 'r3',
      userName: '周末小聚',
      avatar: '/images/hotpot/haidilao_3.jpg',
      rating: merchant.rating - 0.1,
      date: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      content: '和朋友聚会首选!服务态度超级好,还免费做了美甲。菜品份量足,价格也很实惠。',
      images: [images[0]],
      likes: Math.floor(Math.random() * 200),
      replies: Math.floor(Math.random() * 15),
      isHot: true,
      hasImages: true,
    },
  ]

  const filteredReviews = defaultReviews.filter(review => {
    if (activeReviewFilter === 'all') return true
    if (activeReviewFilter === 'hot') return review.isHot
    if (activeReviewFilter === 'latest') return true
    if (activeReviewFilter === 'withImages') return review.hasImages
    return true
  })

  return (
    <div>
      <PageSEO
        title={`${merchant.name} | ${merchantGeo.placename}优惠攻略 | source.dianping.com`}
        description={`${regionalSummary} | ${merchant.discount || merchant.highlight || `${merchant.category}商家详情`}`}
        keywords={[merchant.name, merchant.category, merchantGeo.placename, merchant.discount || '本地优惠']}
        canonicalPath={`/merchant/${merchant.id}`}
        geo={merchantGeo}
        additionalSchemas={[merchantStructuredData, breadcrumbStructuredData, merchantFAQSchema].filter(Boolean)}
      />
      <Navbar />
      
      <main className="max-w-1200 mx-auto px-4 py-6">
        {/* GEO 答案层：商家核心口碑摘要，speakable 锚点，供 AI 引用 */}
        <section className="geo-answer-layer bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-4 mb-5 border border-orange-100 merchant-summary" aria-label="口碑数据摘要">
          <div className="flex items-start gap-3">
            <span className="text-xl flex-shrink-0">📊</span>
            <div>
              <h2 className="text-sm font-bold text-gray-800 mb-1">
                {merchant.name} — 点评 Source口碑数据摘要（2026年3月）
              </h2>
              <p className="text-xs text-gray-600 leading-6">
                根据点评 Source口碑数据，<strong>{merchant.name}</strong> 综合评分
                <strong> {merchant.rating}分</strong>，累计
                <strong> {merchant.reviews?.toLocaleString()}条</strong>真实用户评价，
                人均 <strong>{merchant.priceRange}</strong>，
                分类：<strong>{merchant.category}</strong>
                {merchant.businessHours && `，营业时间：${merchant.businessHours}`}。
                {merchant.highlight && ` ${merchant.highlight}。`}
                {merchant.discount && ` 当前优惠：${merchant.discount}。`}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                  ⭐ {merchant.rating}分
                </span>
                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                  💬 {merchant.reviews?.toLocaleString()}条评价
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs rounded-full">
                  💰 {merchant.priceRange}/人
                </span>
                {merchant.discount && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                    🎫 {merchant.discount}
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* 同类对比区块：A vs B 格式，提升 AI 引用率 */}
          {relatedMerchants.length > 0 && (
            <div className="mt-3 pt-3 border-t border-orange-100">
              <h3 className="text-xs font-bold text-gray-700 mb-2">🔄 同类商家对比（{merchant.category}）</h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/60 rounded-lg p-2 border border-orange-50">
                  <div className="font-semibold text-gray-800">{merchant.name}</div>
                  <div className="text-orange-600 font-bold">⭐ {merchant.rating}分</div>
                  <div className="text-gray-500">{merchant.reviews?.toLocaleString()}条评价</div>
                  <div className="text-gray-500">人均{merchant.priceRange}</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-gray-100">
                  <div className="font-semibold text-gray-800">{relatedMerchants[0]?.name}</div>
                  <div className="text-gray-600 font-bold">⭐ {relatedMerchants[0]?.rating}分</div>
                  <div className="text-gray-500">{relatedMerchants[0]?.reviews?.toLocaleString()}条评价</div>
                  <div className="text-gray-500">人均{relatedMerchants[0]?.priceRange}</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                💡 {merchant.rating > (relatedMerchants[0]?.rating || 0) 
                  ? `${merchant.name}评分更高，口碑优势明显` 
                  : merchant.rating === (relatedMerchants[0]?.rating || 0)
                    ? '两家评分持平，各有特色'
                    : `${relatedMerchants[0]?.name}评分略高，建议对比选择`}。
              </p>
            </div>
          )}
        </section>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <img
                src={images[currentImageIndex]}
                alt={`${merchant.name} ${merchant.category || ''} 口碑评分${merchant.rating || ''}分 ${merchant.location || ''} 实拍环境图（第${currentImageIndex + 1}张）`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setShowAllImages(true)}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              <button
                onClick={handleToggleFavorite}
                className="absolute top-3 right-3 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
              >
                <svg
                  className={`w-5 h-5 ${isFavorited ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                  fill={isFavorited ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">{merchant.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <StarRating rating={merchant.rating} size="lg" showNumber />
                <ReviewCount count={merchant.reviews} size="md" />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{merchant.category}</span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">{merchant.priceRange}/人</span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">{merchant.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{merchant.businessHours}</span>
                </div>
                {merchant.distance && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <DistanceDisplay distance={merchant.distance} size="md" />
                  </div>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <p className="text-sm text-orange-700 leading-6">{regionalSummary}</p>
              </div>

              <div className="mt-4">
                <MerchantMap
  location={merchant.location}
  name={merchant.name}
  latitude={merchant.latitude}
  longitude={merchant.longitude}
/>
              </div>
              
              {merchant.tags && merchant.tags.length > 0 && (
                <div className="mb-4">
                  <TagList tags={merchant.tags} max={4} />
                </div>
              )}
              
              {merchant.facilities && merchant.facilities.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {merchant.facilities.map((facility, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {facility}
                    </span>
                  ))}
                </div>
              )}
              
              {merchant.discount && (
                <div className="mt-4">
                  <DiscountBadge 
                    discount={merchant.discount} 
                    discountDesc={merchant.discountDesc}
                    discountEndTime={merchant.discountEndTime}
                  />
                </div>
              )}

              {/* 热门套餐参考（纯展示，价格供参考） */}
              {merchant.topDeal && (
                <div className="mt-4 rounded-xl overflow-hidden" style={{ border: '1px solid #FFD6B8' }}>
                  <div className="flex items-center gap-2 px-3 py-1.5" style={{ background: 'linear-gradient(90deg, #FF8C00, #FFB347)' }}>
                    <span className="text-white text-xs font-bold">📋 热门套餐参考</span>
                    {merchant.topDeal.tag && (
                      <span className="bg-white/30 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">{merchant.topDeal.tag}</span>
                    )}
                    <span className="ml-auto text-white/90 text-xs">已售 {merchant.topDeal.sales?.toLocaleString()}+</span>
                  </div>
                  <div className="p-3 bg-orange-50">
                    <p className="text-sm font-semibold text-gray-800 mb-1">{merchant.topDeal.name}</p>
                    {merchant.topDeal.includes && (
                      <p className="text-xs text-gray-500 mb-2">含：{merchant.topDeal.includes}</p>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-orange-500">¥{merchant.topDeal.currentPrice}</span>
                      <span className="text-sm text-gray-400 line-through">¥{merchant.topDeal.originalPrice}</span>
                      <span className="text-sm font-bold text-green-600">{merchant.topDeal.discount}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">价格供参考，以美团App实时显示为准</p>
                  </div>
                </div>
              )}

              {/* 代金券列表 */}
              {merchant.coupons && merchant.coupons.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {merchant.coupons.map((coupon, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{ background: '#FFF0E6', color: '#FF5A00', border: '1px dashed #FF8C40' }}
                    >
                      <span>券</span>
                      <span>{coupon.name}</span>
                    </div>
                  ))}
                </div>
              )}

              {merchant.highlight && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-orange-700 font-medium">{merchant.highlight}</p>
                </div>
              )}

              {/* 推荐理由 */}
              {merchant.recommendReasons && merchant.recommendReasons.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-800 mb-2">🌟 为什么推荐这里</h3>
                  <div className="space-y-1.5">
                    {merchant.recommendReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-orange-400 mt-0.5 flex-shrink-0">✓</span>
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 到店小贴士 */}
              {merchant.tips && merchant.tips.length > 0 && (
                <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <h3 className="text-xs font-bold text-amber-700 mb-2">💡 到店小贴士</h3>
                  <div className="space-y-1">
                    {merchant.tips.map((tip, idx) => (
                      <p key={idx} className="text-xs text-amber-700 leading-5">· {tip}</p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="border-t p-4 flex gap-3">
            <Button variant="ghost" onClick={handleShare} className="ml-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              分享
            </Button>
          </div>
        </div>

        {merchantPackages.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
            <div className="p-4 border-b flex items-center gap-2">
              <h2 className="text-lg font-bold text-gray-800">参考套餐</h2>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">
                {merchantPackages.length}个套餐
              </span>
              <span className="ml-auto text-xs text-gray-400">价格供参考，请到美团App确认最新优惠</span>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {merchantPackages.slice(0, 4).map((pkg) => (
                  <div 
                    key={pkg.id} 
                    className="border rounded-xl p-3"
                  >
                    {pkg.tag && (
                      <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded mb-2">
                        {pkg.tag}
                      </span>
                    )}
                    <h4 className="font-medium text-gray-800 text-sm mb-1 truncate">{pkg.name}</h4>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold text-orange-500">¥{pkg.currentPrice}</span>
                      <span className="text-xs text-gray-400 line-through">¥{pkg.originalPrice}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">已售 {pkg.sales}+</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b">
            <h2 className="text-lg font-bold text-gray-800">评价概况</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500">{merchant.rating}</div>
                <div className="text-sm text-gray-500 mt-1">综合评分</div>
                <StarRating rating={merchant.rating} size="sm" />
              </div>
              <div className="flex-1 space-y-2">
                {generateReviewStats().map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-8">{stat.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full"
                        style={{ width: `${stat.percentage}%`, backgroundColor: stat.color }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10">{stat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">用户评价</h2>
            <Link to="#" className="text-orange-500 text-sm hover:underline">查看全部评价</Link>
          </div>
          <div className="border-b">
            <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
              {reviewFilterOptions.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveReviewFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeReviewFilter === filter.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          <div className="divide-y">
            {filteredReviews.map((review) => (
              <div key={review.id} className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={review.avatar}
                    alt={review.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-800">{review.userName}</span>
                      {review.isHot && (
                        <span className="px-1.5 py-0.5 bg-red-100 text-red-500 text-xs rounded">热</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-xs mt-0.5">{review.date}</p>
                    <div className="mt-1">
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-gray-600 mt-2">{review.content}</p>
                    {review.images.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {review.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt="评价图片"
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-3">
                      <button 
                        onClick={() => handleLikeReview(review.id)}
                        className={`flex items-center gap-1 text-sm transition-colors ${
                          likedReviews[review.id] ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'
                        }`}
                      >
                        <svg className="w-4 h-4" fill={likedReviews[review.id] ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                        {review.likes + (likedReviews[review.id] ? 1 : 0)}
                      </button>
                      <button 
                        onClick={() => handleReply(review.id)}
                        className="flex items-center gap-1 text-gray-400 hover:text-orange-500 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {review.replies}
                      </button>
                    </div>
                    {showReplyInput[review.id] && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <textarea
                          value={replyContent[review.id] || ''}
                          onChange={(e) => setReplyContent(prev => ({ ...prev, [review.id]: e.target.value }))}
                          placeholder="写下你的回复..."
                          className="w-full p-2 border rounded-lg text-sm resize-none"
                          rows={2}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          <button 
                            onClick={() => handleReply(review.id)}
                            className="px-3 py-1 text-gray-500 text-sm"
                          >
                            取消
                          </button>
                          <button 
                            onClick={() => submitReply(review.id)}
                            className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm"
                          >
                            提交回复
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === 【P0新增】改进的 FAQ 展示 === */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-800">常见问题</h2>
              <p className="text-xs text-gray-400 mt-0.5">共 {buildQaData(merchant).length} 个常见问题</p>
            </div>
            {buildQaData(merchant).length > 5 && (
              <span className="text-xs bg-orange-50 text-orange-600 px-2 py-1 rounded-full">Top 5 热门</span>
            )}
          </div>
          <div className="divide-y">
            {buildQaData(merchant).map((qa, idx) => {
              // 标记前5个为热门
              const isHot = idx < 5
              const isExpanded = expandedFAQs[idx] ?? isHot
              
              return (
                <div
                  key={idx}
                  className="transition-colors hover:bg-orange-50"
                >
                  <button
                    onClick={() => toggleFAQExpand(idx)}
                    className="w-full p-4 flex items-start justify-between gap-3 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {isHot && (
                          <span className="inline-block px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] rounded-full font-bold flex-shrink-0">
                            热门
                          </span>
                        )}
                        <span className="font-medium text-gray-800 text-sm leading-tight">
                          {qa.question}
                        </span>
                      </div>
                      {isExpanded && (
                        <p className="text-gray-500 text-xs mt-2 leading-5 line-clamp-2">
                          {qa.answer}
                        </p>
                      )}
                    </div>
                    <span
                      className="text-xl text-gray-400 flex-shrink-0 transition-transform"
                      style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                    >
                      ⌄
                    </span>
                  </button>
                  
                  {/* Accordion 展开内容 */}
                  {isExpanded && (
                    <div className="px-4 pb-4 bg-orange-50/30 border-t animate-fadeIn">
                      <div className="flex items-start gap-2 mb-3">
                        <span className="text-blue-500 font-bold text-sm flex-shrink-0">A</span>
                        <span className="text-gray-600 text-sm leading-6">{qa.answer}</span>
                      </div>
                      <button className="text-gray-400 text-xs hover:text-orange-500 transition-colors">
                        👍 {qa.helpful}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className="p-4 border-t">
            <button className="w-full py-2 text-orange-500 text-sm hover:bg-orange-50 rounded-lg transition-colors">
              我要提问
            </button>
          </div>
        </div>
        {/* ========================= */}

        {relatedMerchants.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">相似商家</h2>
              <Link to={`/category/${merchantCategoryPath}`} className="text-orange-500 text-sm hover:underline">
                查看更多
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedMerchants.map((m) => (
                <Link
                  key={m.id}
                  to={`/merchant/${m.id}`}
                  className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={m.images?.[0] || m.image}
                      alt={`${m.name} ${m.category || ''} 口碑评分${m.rating || ''}分`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 text-sm truncate">{m.name}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={m.rating} size="sm" />
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{m.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>


      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 animate-scaleIn" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-4">
              <h3 className="font-bold text-gray-800 text-lg">分享到</h3>
            </div>
            <div className="flex justify-center gap-6 mb-6">
              <button className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.03-.406-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">微信</span>
              </button>
              <button className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.585 11.692h4.328s2.432.016 2.432-2.4c0-2.106-2.38-2.18-2.38-2.18s-1.374-.03-2.432-.03c-1.145 0-2.38.156-2.38 2.18 0 2.416 2.38 2.43 2.38 2.43h-3.948v4.368h2.272v-2.368h2.28s.096-.002.096 2.368v2.368h2.208v-4.384h-2.208v-.014z"/>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">微博</span>
              </button>
              <button 
                onClick={() => {
                  if (navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href)
                      .then(() => alert('链接已复制'))
                      .catch(() => alert('链接: ' + window.location.href))
                  } else {
                    alert('链接: ' + window.location.href)
                  }
                  setShowShareModal(false)
                }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">复制</span>
              </button>
            </div>
            <button 
              onClick={() => setShowShareModal(false)}
              className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
            >
              取消
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
