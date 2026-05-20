'use client';

import Script from 'next/script';

export default function ReviewsPage() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': '热门点评',
    'url': 'https://source.dianping.com/reviews',
    'description': '大众点评用户的真实评价集合',
    'isPartOf': {
      '@type': 'WebSite',
      'name': '点评信源',
      'url': 'https://source.dianping.com',
    },
  };

  return (
    <>
      <Script
        id="reviews-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">热门点评</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">某火锅餐厅</h3>
                <p className="text-sm text-gray-600">5.0 ⭐⭐⭐⭐⭐ (1250条评价)</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "环境超级舒适，火锅底料浓郁，服务态度太好了。虽然人均有点高，但确实值得！推荐朋友都来试试。"
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">环境好</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">服务周到</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">口味地道</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">某日料店</h3>
                <p className="text-sm text-gray-600">4.8 ⭐⭐⭐⭐ (890条评价)</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              "食材都很新鲜，师傅的手艺一流。装修高档，整体体验超棒。强烈推荐他们的午餐套餐，性价比超高！"
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">食材新鲜</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">手艺精湛</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">性价比高</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">📈 评价数据分析</h3>
          <p className="text-gray-700 mb-4">
            点评信源的数据来自 <a href="https://index.meituan.com" className="text-blue-600 hover:underline">美团指数</a> 
            追踪的热门品类中用户的真实评价。结合 <a href="https://guide.meituan.com" className="text-blue-600 hover:underline">美团攻略</a> 
            提供的场景化建议，可以做出更好的消费决策。
          </p>
        </div>
      </div>
    </>
  );
}
