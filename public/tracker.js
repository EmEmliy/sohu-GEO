/**
 * GEO 看板 — 人类访问埋点脚本
 * 
 * 作用：记录真实用户（非爬虫）的 PV/UV 数据
 * 部署：在各站点的 <head> 或页面底部引入此脚本
 * 
 * 使用方式（二选一）：
 * 1. 直接内联：<script>...粘贴代码...</script>
 * 2. 外部引用：<script src="https://看板域名/tracker.js"></script>
 */
(function() {
  'use strict';

  var SUPABASE_URL = 'https://kcckvvurgbmyvkzknelv.supabase.co';
  var SUPABASE_ANON_KEY = 'sb_publishable_Mkndd2Umq37bhmFBoNkfSA_3VmIfLCo';

  // 自动识别站点
  var hostname = window.location.hostname;
  var SITE_MAP = {
    'source.dianping.com': 'source-dp'
  };
  var site = SITE_MAP[hostname] || hostname;

  // 简易 session ID（同一浏览器会话内唯一）
  var sessionId = sessionStorage.getItem('_geo_sid');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('_geo_sid', sessionId);
  }

  // 发送 PV 数据
  var data = {
    site: site,
    page_path: window.location.pathname + window.location.search,
    referrer: document.referrer || '',
    session_id: sessionId,
    user_agent: navigator.userAgent.substring(0, 500),
    screen_width: window.screen.width,
    country: '',  // 前端无法获取，留空
    visited_at: new Date().toISOString()
  };

  fetch(SUPABASE_URL + '/rest/v1/page_views', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify(data)
  }).catch(function() {});
})();
