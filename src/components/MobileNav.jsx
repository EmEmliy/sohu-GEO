import { useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function MobileNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  useEffect(() => {
    const handleGestureStart = (e) => {
      touchStartX.current = e.touches[0].clientX
    }
    const handleGestureEnd = (e) => {
      touchEndX.current = e.changedTouches[0].clientX
      const diff = touchStartX.current - touchEndX.current
      if (Math.abs(diff) > 100 && diff > 0) {
        navigate('/category/food')
      }
    }
    document.addEventListener('touchstart', handleGestureStart, { passive: true })
    document.addEventListener('touchend', handleGestureEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', handleGestureStart)
      document.removeEventListener('touchend', handleGestureEnd)
    }
  }, [navigate])

  const navItems = [
    {
      id: 'home',
      path: '/',
      label: '首页',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: 'discovery',
      path: '/category/food',
      label: '发现',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      id: 'coupons',
      path: '/coupons',
      label: '优惠',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      id: 'search',
      path: '/search',
      label: '搜索',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ]

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:hidden safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path)
            return (
              <Link
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all active:scale-90 ${
                  isActive ? 'text-orange-500' : 'text-gray-500'
                }`}
              >
                <span className={isActive ? 'text-orange-500' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span className="text-xs mt-0.5">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
      <div className="h-14 md:hidden" />
    </>
  )
}
