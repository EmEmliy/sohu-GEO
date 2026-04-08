import { Link } from 'react-router-dom'
import { StarRating, PriceDisplay, TagList, DiscountTag } from './ui'

export default function RecommendationList({ merchants, title = '猜你喜欢' }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <Link to="/category/food" className="text-orange-500 text-sm hover:underline flex items-center gap-1">
          查看更多
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {merchants.slice(0, 8).map((merchant) => (
          <Link
            key={merchant.id}
            to={`/merchant/${merchant.id}`}
            className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={merchant.images?.[0] || merchant.image}
                alt={`${merchant.name} ${merchant.category || ''} 口碑评分${merchant.rating || ''}分 人均${merchant.priceRange || ''}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {merchant.discount && (
                <div className="absolute top-2 left-2">
                  <DiscountTag discount={merchant.discount} />
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-800 truncate mb-1 group-hover:text-orange-600 transition-colors">
                {merchant.name}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={merchant.rating} size="sm" />
                <span className="text-gray-400 text-xs">({merchant.reviews})</span>
              </div>
              <p className="text-gray-500 text-xs truncate mb-2">{merchant.location}</p>
              <div className="flex items-center justify-between">
                <PriceDisplay priceRange={merchant.priceRange} size="sm" />
                {merchant.distance && (
                  <span className="text-gray-400 text-xs">{merchant.distance}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
