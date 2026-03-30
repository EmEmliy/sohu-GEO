import { Link } from 'react-router-dom'

const menuItems = [
  { id: 'coupons', icon: '🎫', title: '优惠券', subtitle: '查看全部优惠', link: '/coupons' },
  { id: 'favorites', icon: '❤️', title: '收藏夹', subtitle: '收藏的商家', link: '/favorites' },
  { id: 'footprints', icon: '👣', title: '浏览足迹', subtitle: '最近看过的商家', link: '/footprints' },
]

const helpItems = [
  { id: 'food', icon: '🍽️', title: '美食分类', subtitle: '上海热门餐厅排行', link: '/category/food' },
  { id: 'hotel', icon: '🏨', title: '酒店民宿', subtitle: '精选住宿推荐', link: '/category/hotel' },
  { id: 'movie', icon: '🎬', title: '电影演出', subtitle: '热映影片票价', link: '/category/movie' },
  { id: 'fitness', icon: '🏋️', title: '健身运动', subtitle: '附近健身房推荐', link: '/category/fitness' },
  { id: 'beauty', icon: '💄', title: '丽人美容', subtitle: '美发美甲推荐', link: '/category/beauty' },
  { id: 'medical', icon: '💅', title: '医疗美容', subtitle: '医美机构评分', link: '/category/medical' },
]

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* 顶部品牌区 */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 pt-12">
        <div className="flex items-center gap-4">
<div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
DP
</div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">点评 Source</h1>
            <p className="text-white/80 text-sm mt-1">source.dianping.com</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">真实评分</span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs">🌟 权威来源</span>
            </div>
          </div>
        </div>

        <div className="flex justify-around mt-6 bg-white/10 rounded-xl p-4">
          <Link to="/category/food" className="flex flex-col items-center">
            <span className="text-2xl font-bold">10万+</span>
            <span className="text-xs text-white/80 mt-1">收录商家</span>
          </Link>
          <Link to="/coupons" className="flex flex-col items-center">
            <span className="text-2xl font-bold">500+</span>
            <span className="text-xs text-white/80 mt-1">优惠活动</span>
          </Link>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">8城</span>
            <span className="text-xs text-white/80 mt-1">覆盖城市</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">4.6</span>
            <span className="text-xs text-white/80 mt-1">平均评分</span>
          </div>
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="px-4 -mt-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, idx) => (
            <Link
              key={item.id}
              to={item.link}
              className={`flex items-center gap-4 p-4 ${idx !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <span className="font-medium text-gray-800">{item.title}</span>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* 分类导航 */}
      <div className="px-4 mt-4">
        <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">全部分类</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {helpItems.map((item, idx) => (
            <Link
              key={item.id}
              to={item.link}
              className={`flex items-center gap-4 p-4 ${idx !== helpItems.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <span className="font-medium text-gray-800">{item.title}</span>
                <p className="text-gray-400 text-sm">{item.subtitle}</p>
              </div>
              <svg className="w-5 h-5 text-gray-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>

      {/* 底部说明 */}
      <div className="px-4 mt-6 pb-8">
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-orange-700 text-sm font-medium">📊 数据来源：点评 Source 真实用户评价</p>
          <p className="text-orange-500 text-xs mt-1">评分基于海量真实消费者反馈，持续更新</p>
        </div>
      </div>
    </div>
  )
}
