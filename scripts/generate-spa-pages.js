#!/usr/bin/env node

/**
 * Generate HTML files for SPA routes to fix EdgeOne Pages 404 issue
 * 为所有SPA路由生成HTML文件副本，解决EdgeOne Pages的404问题
 */

import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '../dist');
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

// 要跳过的路径（已有真实文件的）
const SKIP_PATHS = [
  '/',
  '/api',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
  '/data.json',
  '/llms.txt',
  '/ai-guide.md',
  '/sw.js'
];

async function extractUrlsFromSitemap() {
  try {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xml);
    
    const urls = result.urlset.url.map(item => {
      const loc = item.loc[0];
      // 提取路径部分，去掉域名
      const urlObj = new URL(loc);
      return urlObj.pathname;
    });

    return urls.filter(url => !SKIP_PATHS.includes(url));
  } catch (error) {
    console.error('❌ Failed to parse sitemap:', error.message);
    return [];
  }
}

function createDirectoryForPath(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function generateSpaPages() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ dist directory not found: ${DIST_DIR}`);
    process.exit(1);
  }

  if (!fs.existsSync(INDEX_HTML)) {
    console.error(`❌ index.html not found: ${INDEX_HTML}`);
    process.exit(1);
  }

  const indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');
  const urls = await extractUrlsFromSitemap();

  if (urls.length === 0) {
    console.warn('⚠️  No URLs found in sitemap or all were skipped');
    return;
  }

  console.log(`🔄 Generating HTML files for ${urls.length} SPA routes...`);

  let successCount = 0;
  let errorCount = 0;

  urls.forEach(urlPath => {
    try {
      // 移除末尾的斜杠来创建文件
      const cleanPath = urlPath.endsWith('/') ? urlPath.slice(0, -1) : urlPath;
      
      // 为每个路由创建 index.html
      // 例如 /merchant/f1 -> dist/merchant/f1/index.html
      const filePath = path.join(DIST_DIR, cleanPath, 'index.html');
      
      createDirectoryForPath(filePath);
      fs.writeFileSync(filePath, indexContent, 'utf-8');
      
      successCount++;
      console.log(`  ✓ ${cleanPath}/index.html`);
    } catch (error) {
      errorCount++;
      console.error(`  ✗ Failed to create ${urlPath}: ${error.message}`);
    }
  });

  console.log(`\n📊 Result: ${successCount} created, ${errorCount} failed`);

  if (errorCount === 0) {
    console.log('\n✅ All SPA routes generated successfully!');
    console.log('   EdgeOne Pages should now serve all routes without 404 errors.');
  }
}

// Run
generateSpaPages().catch(error => {
  console.error('❌ Generation failed:', error);
  process.exit(1);
});
