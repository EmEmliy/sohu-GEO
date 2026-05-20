/**
 * GEO 看板 — AI 爬虫访问记录中间件 v3.1
 *
 * v3.0 新增字段（对应 M01~M11 数据库 schema 改造）：
 *   - match_status:         'known' | 'unknown_suspect' | 'unknown'
 *   - suspect_reason:       已识别的可疑原因（仅 unknown_suspect 时填写）
 *   - hostname:             请求 Host（用于 non-canonical 检测）
 *   - env:                  'prod' | 'preview' | 'dev'（自动识别）
 *   - collector_version:    '3.1.0'（方便追踪不同版本采集端）
 *   - site_id:              标准化 site 标识（与 DB 保持一致）
 *
 * v3.1 新增：
 *   - collector heartbeat：每次识别到爬虫后异步 upsert collector_heartbeat 表
 *     用于 dashboard 数据质量面板展示「采集端是否在线」
 *
 * 部署位置：项目根目录 functions/_middleware.ts
 * 适用站点：source.meituan.com / source.dianping.com / guide.meituan.com / index.meituan.com
 */

// ============================================================
// 配置区 — 每个站点部署时只需改 SITE_NAME
// ============================================================
const SUPABASE_URL = 'https://kcckvvurgbmyvkzknelv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Mkndd2Umq37bhmFBoNkfSA_3VmIfLCo';
const COLLECTOR_VERSION = '3.1.0';

/**
 * ⚠️ 每个站点部署时修改这个值：
 *   - source.meituan.com  → 'source-mt'
 *   - source.dianping.com → 'source-dp'
 *   - guide.meituan.com   → 'guide-mt'
 *   - index.meituan.com   → 'index-mt'
 */
const SITE_NAME = 'source-dp'; // ← source.dianping.com

// ============================================================
// 正式站点域名列表（用于 env 识别）
// ============================================================
const CANONICAL_HOSTNAMES = new Set([
  'source.meituan.com',
  'source.dianping.com',
  'guide.meituan.com',
  'index.meituan.com',
]);

// ============================================================
// AI 爬虫 User-Agent 匹配规则（已知 AI 爬虫，match_status = 'known'）
// ============================================================
const AI_CRAWLERS: {
  pattern: RegExp;
  name: string;
  company: string;
  region: string;
}[] = [
  // === 国外 ===
  { pattern: /GPTBot/i,              name: 'GPTBot',              company: 'OpenAI',       region: 'US' },
  { pattern: /ChatGPT-User/i,        name: 'ChatGPT-User',        company: 'OpenAI',       region: 'US' },
  { pattern: /OAI-SearchBot/i,       name: 'OAI-SearchBot',       company: 'OpenAI',       region: 'US' },
  { pattern: /ClaudeBot/i,           name: 'ClaudeBot',           company: 'Anthropic',    region: 'US' },
  { pattern: /Claude-Web/i,          name: 'Claude-Web',          company: 'Anthropic',    region: 'US' },
  { pattern: /anthropic-ai/i,        name: 'anthropic-ai',        company: 'Anthropic',    region: 'US' },
  { pattern: /Google-Extended/i,     name: 'Google-Extended',     company: 'Google',       region: 'US' },
  { pattern: /Googlebot/i,           name: 'Googlebot',           company: 'Google',       region: 'US' },
  { pattern: /GoogleOther/i,         name: 'GoogleOther',         company: 'Google',       region: 'US' },
  { pattern: /PerplexityBot/i,       name: 'PerplexityBot',       company: 'Perplexity',   region: 'US' },
  { pattern: /Bingbot/i,             name: 'Bingbot',             company: 'Microsoft',    region: 'US' },
  { pattern: /Applebot-Extended/i,   name: 'Applebot-Extended',   company: 'Apple',        region: 'US' },
  { pattern: /Applebot/i,            name: 'Applebot',            company: 'Apple',        region: 'US' },
  { pattern: /meta-externalagent/i,  name: 'Meta-ExternalAgent',  company: 'Meta',         region: 'US' },
  { pattern: /FacebookBot/i,         name: 'FacebookBot',         company: 'Meta',         region: 'US' },
  { pattern: /CCBot/i,               name: 'CCBot',               company: 'Common Crawl', region: 'US' },
  { pattern: /cohere-ai/i,           name: 'cohere-ai',           company: 'Cohere',       region: 'CA' },
  { pattern: /YouBot/i,              name: 'YouBot',              company: 'You.com',      region: 'US' },
  { pattern: /Amazonbot/i,           name: 'Amazonbot',           company: 'Amazon',       region: 'US' },
  { pattern: /DuckAssistBot/i,       name: 'DuckAssistBot',       company: 'DuckDuckGo',   region: 'US' },
  { pattern: /diffbot/i,             name: 'diffbot',             company: 'Diffbot',      region: 'US' },
  // === 国内 ===
  { pattern: /Bytespider/i,          name: 'Bytespider',          company: '字节跳动(豆包)', region: 'CN' },
  { pattern: /DeepSeek-Bot/i,        name: 'DeepSeek-Bot',        company: 'DeepSeek',     region: 'CN' },
  { pattern: /DeepSeekBot/i,         name: 'DeepSeekBot',         company: 'DeepSeek',     region: 'CN' },
  { pattern: /ChatGLM-Spider/i,      name: 'ChatGLM-Spider',      company: '智谱AI',       region: 'CN' },
  { pattern: /GLM-Bot/i,             name: 'GLM-Bot',             company: '智谱AI',       region: 'CN' },
  { pattern: /zhipuai-bot/i,         name: 'zhipuai-bot',         company: '智谱AI',       region: 'CN' },
  { pattern: /MoonshotBot/i,         name: 'MoonshotBot',         company: '月之暗面(Kimi)', region: 'CN' },
  { pattern: /Qwen-Crawler/i,        name: 'Qwen-Crawler',        company: '阿里(千问)',   region: 'CN' },
  { pattern: /QwenBot/i,             name: 'QwenBot',             company: '阿里(千问)',   region: 'CN' },
  { pattern: /ERNIEBot/i,            name: 'ERNIEBot',            company: '百度(文心)',   region: 'CN' },
  { pattern: /Baiduspider-render/i,  name: 'Baiduspider-render',  company: '百度',         region: 'CN' },
  { pattern: /Baiduspider/i,         name: 'Baiduspider',         company: '百度(文心)',   region: 'CN' },
  { pattern: /baiduspider/i,         name: 'baiduspider',         company: '百度(文心)',   region: 'CN' },
  { pattern: /SogouSpider/i,         name: 'SogouSpider',         company: '腾讯(元宝)',   region: 'CN' },
  { pattern: /TencentBot/i,          name: 'TencentBot',          company: '腾讯(元宝)',   region: 'CN' },
  { pattern: /minimax-bot/i,         name: 'minimax-bot',         company: 'MiniMax',      region: 'CN' },
  { pattern: /YisouSpider/i,         name: 'YisouSpider',         company: '360(搜索)',    region: 'CN' },
  { pattern: /360Spider/i,           name: '360Spider',           company: '360(搜索)',    region: 'CN' },
];

// ============================================================
// 可疑 Bot 模式（match_status = 'unknown_suspect'）
// UA 包含 bot/spider/crawler 关键词但不在已知列表中
// ============================================================
const SUSPECT_BOT_PATTERN = /\b(bot|spider|crawler|scraper|archiver|fetcher|wget|curl|python-requests|go-http|java|libwww)\b/i;
// 排除：浏览器内核（包含 KHTML/Trident/Gecko 的是真实浏览器）
const BROWSER_ENGINE_PATTERN = /KHTML|Trident|Gecko|WebKit|AppleWebKit/;

// ============================================================
// 中间件主逻辑
// ============================================================
export const onRequest: PagesFunction = async (context) => {
  const { request } = context;
  const ua  = request.headers.get('user-agent') || '';
  const url = new URL(request.url);

  // --- 识别环境 ---
  const hostname = url.hostname;
  let env: 'prod' | 'preview' | 'dev';
  if (CANONICAL_HOSTNAMES.has(hostname)) {
    env = 'prod';
  } else if (hostname.includes('edgeone') || hostname.includes('pages.dev') || hostname.includes('staging')) {
    env = 'preview';
  } else {
    env = 'dev';
  }

  // 只处理 prod / preview，本地 dev 不写入（避免污染数据）
  if (env === 'dev') {
    return context.next();
  }

  // --- 匹配已知 AI 爬虫 ---
  const matched = AI_CRAWLERS.find(c => c.pattern.test(ua));

  let matchStatus: 'known' | 'unknown_suspect' | 'unknown';
  let suspectReason: string | null = null;
  let crawlerName: string;
  let crawlerCompany: string;
  let region: string;

  if (matched) {
    // 已知 AI 爬虫
    matchStatus     = 'known';
    crawlerName     = matched.name;
    crawlerCompany  = matched.company;
    region          = matched.region;
  } else if (SUSPECT_BOT_PATTERN.test(ua) && !BROWSER_ENGINE_PATTERN.test(ua)) {
    // UA 含 bot 关键词但不在已知列表 → unknown_suspect
    matchStatus    = 'unknown_suspect';
    suspectReason  = 'ua_bot_keyword';
    // 提取 UA 中第一个 token 作为 crawler_name（最多 64 字符）
    crawlerName    = (ua.split(/[\s\/;(]/)[0] || 'UnknownBot').substring(0, 64);
    crawlerCompany = '';
    region         = '';
  } else {
    // 既不是已知也不是 suspect → 不记录
    return context.next();
  }

  const now = new Date().toISOString();

  // ---- 1. 异步写入爬虫访问记录（不阻塞页面响应）----
  const writeCrawlerVisit = fetch(`${SUPABASE_URL}/rest/v1/crawler_visits`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer':        'return=minimal',
    },
    body: JSON.stringify({
      // === 原有字段 ===
      site:             SITE_NAME,
      crawler_name:     crawlerName,
      crawler_company:  crawlerCompany,
      region:           region,
      user_agent:       ua.substring(0, 500),
      request_path:     url.pathname + url.search,
      ip_address:       request.headers.get('cf-connecting-ip') || request.headers.get('x-real-ip') || '',
      visited_at:       now,
      // === v3.0 新增字段 ===
      match_status:         matchStatus,
      suspect_reason:       suspectReason,
      hostname:             hostname,
      env:                  env,
      collector_version:    COLLECTOR_VERSION,
      site_id:              SITE_NAME,   // ← 必须写！cv_clean/RPC 全用 site_id 过滤
    }),
  }).catch(() => { /* 写入失败不影响页面 */ });

  // ---- 2. 异步 upsert 心跳（每次识别到爬虫时更新 last_seen_at）----
  const writeHeartbeat = fetch(`${SUPABASE_URL}/rest/v1/collector_heartbeat`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'apikey':        SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer':        'return=minimal,resolution=merge',
    },
    body: JSON.stringify({
      site_id:          SITE_NAME,
      collector_type:   'middleware',
      collector_version: COLLECTOR_VERSION,
      last_seen_at:     now,
      last_crawler_name: crawlerName,
    }),
  }).catch(() => { /* 心跳失败不影响页面 */ });

  // 并行执行两个写入
  context.waitUntil(Promise.all([writeCrawlerVisit, writeHeartbeat]));

  // 正常返回页面（不做任何修改）
  return context.next();
};
