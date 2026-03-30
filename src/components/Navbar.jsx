import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)

  const categories = [
    { id: 'shanghai-local', name: '上海本地', icon: '📍', link: '/sh/shanghai-hotpot' },
    { id: 'nationwide-deals', name: '全国优惠', icon: '🌐', link: '/coupons' },
    { id: 'food', name: '外卖', icon: '🍜' },
    { id: 'food-dinein', name: '到餐', icon: '🍽️', link: '/category/food' },
    { id: 'hotel', name: '酒旅', icon: '🏨' },
    { id: 'shopping', name: '闪购', icon: '🛒' },
    { id: 'medical', name: '医药', icon: '💊' },
    { id: 'beauty-medical', name: '医美', icon: '💅', link: '/category/medical' },
    { id: 'home', name: '家政', icon: '🧹' },
    { id: 'fitness', name: '健身', icon: '🏋️' },
    { id: 'movie', name: '电影', icon: '🎬' },
    { id: 'beauty', name: '丽人', icon: '💄' },
  ]

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/search')
    }
  }

  const suggestions = [
    '海底捞火锅',
    '西贝莜面村',
    '万达影城',
    '亚朵酒店',
    '超级猩猩健身',
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50" role="navigation" aria-label="主导航">
      <div className="max-w-1200 mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2" aria-label="点评 Source首页">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">DP</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">点评 Source</span>
          </Link>
          
          <div className="flex-1 max-w-xl mx-4 md:mx-8 relative">
            <div className="relative">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                aria-label="搜索商家、品类、地点"
                aria-expanded={showSuggestions}
                aria-autocomplete="list"
                placeholder="搜索商家、品类、地点"
                className="w-full h-10 pl-11 pr-12 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button 
                onClick={handleSearch}
                className="absolute right-1 top-1 h-8 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {showSuggestions && searchQuery === '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border overflow-hidden">
                <div className="p-3 border-b">
                  <p className="text-xs text-gray-400">热门搜索</p>
                </div>
                <div className="py-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-6 md:gap-8 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={cat.link || `/category/${cat.id}`}
              title={cat.name === '上海本地' ? '上海本地美团优惠攻略' : cat.name === '全国优惠' ? '全国通用美团优惠' : `${cat.name}优惠内容`}
              className="flex flex-col items-center gap-1 min-w-fit hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs text-gray-600 whitespace-nowrap">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
