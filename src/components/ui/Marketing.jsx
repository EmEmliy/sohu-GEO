import { useState, useEffect } from 'react'

export function CountdownTimer({ targetDate, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date()
    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft()
      setTimeLeft(newTime)
      if (newTime.hours === 0 && newTime.minutes === 0 && newTime.seconds === 0) {
        clearInterval(timer)
        onComplete?.()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex items-center gap-1">
      {String(timeLeft.hours).padStart(2, '0').split('').map((digit, i) => (
        <span key={i} className="w-5 h-6 bg-orange-500 text-white rounded flex items-center justify-center text-sm font-bold">
          {digit}
        </span>
      ))}
      <span className="text-orange-500 font-bold">:</span>
      {String(timeLeft.minutes).padStart(2, '0').split('').map((digit, i) => (
        <span key={i} className="w-5 h-6 bg-orange-500 text-white rounded flex items-center justify-center text-sm font-bold">
          {digit}
        </span>
      ))}
      <span className="text-orange-500 font-bold">:</span>
      {String(timeLeft.seconds).padStart(2, '0').split('').map((digit, i) => (
        <span key={i} className="w-5 h-6 bg-orange-500 text-white rounded flex items-center justify-center text-sm font-bold">
          {digit}
        </span>
      ))}
    </div>
  )
}

export function GroupBuyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all active:scale-95"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      发起拼单
    </button>
  )
}

export function MembershipCard({ level = 'gold', points = 0 }) {
  const levels = {
    silver: { name: '白银会员', color: 'from-gray-400 to-gray-600', benefits: ['积分加倍', '专属客服'] },
    gold: { name: '黄金会员', color: 'from-yellow-400 to-orange-500', benefits: ['积分加倍', '专属客服', '免配送费'] },
    platinum: { name: '铂金会员', color: 'from-purple-400 to-purple-600', benefits: ['积分3倍', '专属客服', '免配送费', '优先客服'] },
    diamond: { name: '钻石会员', color: 'from-cyan-400 to-blue-500', benefits: ['积分5倍', '专属客服', '免配送费', '优先客服', '专属活动'] },
  }

  const currentLevel = levels[level]

  return (
    <div className={`bg-gradient-to-br ${currentLevel.color} rounded-xl p-4 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs opacity-80">点评 Source会员</p>
          <h3 className="text-lg font-bold">{currentLevel.name}</h3>
        </div>
        <span className="text-3xl">💎</span>
      </div>
      <div className="mb-3">
        <p className="text-xs opacity-80">当前积分</p>
        <p className="text-2xl font-bold">{points.toLocaleString()}</p>
      </div>
      <div className="space-y-1">
        {currentLevel.benefits.map((benefit, idx) => (
          <div key={idx} className="flex items-center gap-1 text-xs">
            <span>✓</span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CouponPopup({ coupons, onCollect, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!coupons?.length) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 animate-scaleIn" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h3 className="text-xl font-bold text-center mb-4">🎉 发现优惠券</h3>
        
        <div className="space-y-3 mb-4">
          {coupons.map((coupon, idx) => (
            <div key={idx} className="border-2 border-orange-500 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-orange-500">{coupon.value}</p>
                <p className="text-xs text-gray-500">{coupon.name}</p>
              </div>
              <button
                onClick={() => onCollect?.(coupon)}
                className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm"
              >
                领取
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500">
          扫码下载APP更多优惠
        </p>
      </div>
    </div>
  )
}

export function FlashSaleTag({ endTime, label = '限时特惠' }) {
  const targetDate = endTime ? new Date(endTime) : new Date(Date.now() + 3 * 60 * 60 * 1000)

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-sm">
      <span className="font-bold">⚡</span>
      <span>{label}</span>
      <CountdownTimer targetDate={targetDate} />
    </div>
  )
}
