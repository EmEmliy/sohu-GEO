import { useState, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { StarRating, TagList, DiscountBadge, DistanceDisplay, ReviewCount } from './ui'

const LazyImage = memo(function LazyImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <img
      src={error ? '/images/food/food_1.jpg' : src}
      alt={alt}
      loading="lazy"
      className={`${className} ${loaded ? '' : 'bg-gray-100'}`}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
    />
  )
})

function MerchantCard({ merchant, variant = 'default', onSelect }) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = merchant.images?.filter(Boolean) || [merchant.image].filter(Boolean)
  const hasMultipleImages = images.length > 1

  const handleFavorite = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorited(prev => !prev)
  }, [])

  const handlePrevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleNextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const handleCardClick = (e) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(merchant)
    }
  }

  // GEO 摘要文本：供 AI 爬虫直接引用的一句话实体描述
  const geoSummary = [
    merchant.name,
    merchant.category,
    merchant.rating ? `评分${merchant.rating}分` : '',
    merchant.reviews ? `${merchant.reviews.toLocaleString()}条评价` : '',
    merchant.priceRange ? `人均${merchant.priceRange}` : '',
    merchant.location || '',
  ].filter(Boolean).join('，')

  if (variant === 'compact') {
    return (
      <Link
        to={`/merchant/${merchant.id}`}
        className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        aria-label={geoSummary}
      >
        <div className="flex">
          <div className="w-20 h-20 flex-shrink-0">
            <LazyImage
              src={images[0]}
              alt={`${merchant.name} - ${merchant.category} 口碑评分${merchant.rating}分`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-2 min-w-0">
            <h3 className="font-medium text-gray-800 text-sm truncate">{merchant.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={merchant.rating} size="sm" />
            </div>
            <p className="text-gray-500 text-xs truncate mt-0.5">{merchant.category}</p>
          </div>
        </div>
      </Link>
    )
  }

  const cardContent = (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-sm active:shadow-md transition-all duration-200 active:scale-[0.98]"
      aria-label={geoSummary}
      itemScope
      itemType={
        ['火锅','烧烤','川菜','粤菜','日料','西餐','小吃','快餐','西北菜','江浙菜','北京菜','便利店'].includes(merchant.category)
          ? 'https://schema.org/Restaurant'
          : ['豪华酒店','商务酒店','精品酒店','快捷酒店','民宿'].includes(merchant.category)
          ? 'https://schema.org/Hotel'
          : ['电影院'].includes(merchant.category)
          ? 'https://schema.org/MovieTheater'
          : ['美容SPA','美发','美甲','美妆'].includes(merchant.category)
          ? 'https://schema.org/BeautySalon'
          : ['健身房','瑜伽'].includes(merchant.category)
          ? 'https://schema.org/FitnessCenter'
          : 'https://schema.org/LocalBusiness'
      }
    >
      {/* GEO 隐藏摘要：AI 爬虫可直接读取的结构化一句话 */}
      <meta itemProp="name" content={merchant.name} />
      {merchant.rating && <meta itemProp="ratingValue" content={String(merchant.rating)} />}
      {merchant.location && <meta itemProp="address" content={merchant.location} />}
      {/* 图片区 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <LazyImage
          src={images[currentImageIndex]}
          alt={`${merchant.name} - ${merchant.category} 口碑评分${merchant.rating}分，${merchant.location || ''}`}
          className="w-full h-full object-cover"
        />

        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center"
            >
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1 h-1 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                />
              ))}
            </div>
          </>
        )}

        <button
          onClick={handleFavorite}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
        >
          <svg
            className={`w-4 h-4 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`}
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {merchant.discount && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 px-2 py-1.5">
            <span className="text-white text-xs font-medium truncate block">{merchant.discount}</span>
          </div>
        )}
      </div>

      {/* 信息区 */}
      <div className="p-2.5">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2 mb-1">
          {merchant.name}
        </h3>

        <div className="flex items-center gap-1 mb-1">
          <StarRating rating={merchant.rating} size="sm" />
          <ReviewCount count={merchant.reviews} size="sm" />
        </div>

        <p className="text-gray-400 text-xs truncate mb-1.5">
          {merchant.location}
          {merchant.distance && <span className="ml-1">· {merchant.distance}</span>}
        </p>

        {merchant.tags && merchant.tags.length > 0 && (
          <TagList tags={merchant.tags} max={2} size="sm" />
        )}
      </div>
    </div>
  )

  if (onSelect) {
    return (
      <div onClick={handleCardClick} className="cursor-pointer">
        {cardContent}
      </div>
    )
  }

  return (
    <Link to={`/merchant/${merchant.id}`} className="block">
      {cardContent}
    </Link>
  )
}

export default memo(MerchantCard)
