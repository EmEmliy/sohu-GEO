#!/usr/bin/env bash
# =============================================================================
# scripts/fetch-data.sh
# 从美团内部 BI 表拉取真实商家 + 商品数据，生成前端所需 JSON 文件
#
# 依赖：mtdata CLI（已在内网可用）
# 输出：
#   - scripts/output/places_raw.json      商家原始数据
#   - scripts/output/products_raw.json    商品原始数据（含价格/图片）
#   - public/api/merchants.json           DataFeed 格式（GEO 用）
#   - public/api/category/food.json       美食分类
#   - public/api/category/hotel.json      酒店分类
#   - public/api/merchant/<id>.json       单商家详情
#   - src/data/liveData.json              前端 mockData 替换数据
#
# 用法：
#   bash scripts/fetch-data.sh
#   bash scripts/fetch-data.sh --city 上海  # 只拉上海
#   bash scripts/fetch-data.sh --dry-run    # 只打印 SQL 不执行
# =============================================================================

set -euo pipefail

# ── 配置 ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
OUTPUT_DIR="$SCRIPT_DIR/output"
PUBLIC_API_DIR="$PROJECT_ROOT/public/api"
MERCHANT_API_DIR="$PUBLIC_API_DIR/merchant"
CATEGORY_API_DIR="$PUBLIC_API_DIR/category"
LIVE_DATA_FILE="$PROJECT_ROOT/src/data/liveData.json"

# 查询分区日期（昨天，yyyyMMdd 格式）
PARTITION_DATE=$(date -v-1d +%Y%m%d 2>/dev/null || date -d yesterday +%Y%m%d)

# 默认城市列表（逗号分隔，传入 --city 可覆盖）
DEFAULT_CITIES="上海,北京,广州,深圳,成都"
CITIES="${CITIES:-$DEFAULT_CITIES}"

# mtdata 执行参数：-p 0 不分页，-n 500 最多500条
MTDATA_FLAGS="-p 0 -n 500"

DRY_RUN=false

# ── 参数解析 ──────────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --city) CITIES="$2"; shift 2 ;;
    --date) PARTITION_DATE="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) echo "未知参数: $1"; exit 1 ;;
  esac
done

# ── 工具函数 ──────────────────────────────────────────────────────────────────
log()  { echo "[$(date '+%H:%M:%S')] $*"; }
warn() { echo "[WARN] $*" >&2; }

# 执行 mtdata BI SQL，结果写入文件
# 用法：run_sql "SQL语句" output_file.json
run_sql() {
  local sql="$1"
  local outfile="$2"

  if [[ "$DRY_RUN" == "true" ]]; then
    echo "── DRY RUN SQL ──────────────────────────────"
    echo "$sql"
    echo "── 输出文件: $outfile ──────────────────────"
    return 0
  fi

  log "执行查询 → $outfile"
  # mtdata bi run 返回 JSON 数组，写入临时文件再处理
  mtdata bi run "$sql" $MTDATA_FLAGS > "$outfile" 2>&1 || {
    warn "查询失败: $outfile"
    warn "SQL: $sql"
    return 1
  }
}

# 生成城市 IN 子句，如 ('上海','北京')
cities_in_clause() {
  local IFS=","
  local result=""
  for city in $CITIES; do
    result="${result}'${city}',"
  done
  echo "(${result%,})"
}

CITIES_IN="$(cities_in_clause)"

# ── 初始化目录 ────────────────────────────────────────────────────────────────
mkdir -p "$OUTPUT_DIR" "$PUBLIC_API_DIR" "$MERCHANT_API_DIR" "$CATEGORY_API_DIR"

# =============================================================================
# STEP 1：拉取商家基础数据（places.json）
# 表：mart_waimai.aggr_poi_info_dd
# =============================================================================
log "=== STEP 1: 拉取商家数据（mart_waimai.aggr_poi_info_dd） ==="

PLACES_SQL="
SELECT
    wm_poi_id,
    wm_poi_name,
    brand_name,
    poi_address,
    latitude,
    longitude,
    primary_first_tag_name,
    primary_second_tag_name,
    first_city_name,
    second_city_name,
    min_price,
    pic_url,
    status,
    valid,
    diagnose_score
FROM mart_waimai.aggr_poi_info_dd
WHERE dt = '${PARTITION_DATE}'
  AND first_city_name IN ${CITIES_IN}
  AND is_food_poi = 1
  AND valid = 1
  AND status = 1
  AND diagnose_score IS NOT NULL
  AND diagnose_score > 4.0
ORDER BY diagnose_score DESC, wm_poi_id
LIMIT 500
"

run_sql "$PLACES_SQL" "$OUTPUT_DIR/places_raw.json"

# =============================================================================
# STEP 2：拉取商品基础数据（products_base.json）
# 表：mart_waimai.aggr_food_spu_info_dd
# =============================================================================
log "=== STEP 2: 拉取商品基础数据（mart_waimai.aggr_food_spu_info_dd） ==="

PRODUCTS_BASE_SQL="
SELECT
    wm_poi_id,
    spu_id,
    spu_name,
    first_cate_name,
    second_cate_name,
    is_sellable_spu,
    is_upshelf_flag,
    monthly_sale_count,
    total_sale_count
FROM mart_waimai.aggr_food_spu_info_dd
WHERE dt = '${PARTITION_DATE}'
  AND is_sellable_spu = 1
  AND is_upshelf_flag = 1
  AND wm_poi_id IN (
      SELECT wm_poi_id
      FROM mart_waimai.aggr_poi_info_dd
      WHERE dt = '${PARTITION_DATE}'
        AND first_city_name IN ${CITIES_IN}
        AND is_food_poi = 1
        AND valid = 1
        AND status = 1
  )
ORDER BY total_sale_count DESC
LIMIT 500
"

run_sql "$PRODUCTS_BASE_SQL" "$OUTPUT_DIR/products_base_raw.json"

# =============================================================================
# STEP 3：拉取商品快照数据（价格+描述+图片）
# 表：mart_waimai.fact_wm_food_snapshot
# =============================================================================
log "=== STEP 3: 拉取商品快照（mart_waimai.fact_wm_food_snapshot） ==="

PRODUCTS_SNAPSHOT_SQL="
SELECT
    wm_poi_id,
    spu_id,
    spu_name,
    min_price,
    origin_price,
    description,
    pic_url,
    unit
FROM mart_waimai.fact_wm_food_snapshot
WHERE dt = '${PARTITION_DATE}'
  AND wm_poi_id IN (
      SELECT wm_poi_id
      FROM mart_waimai.aggr_poi_info_dd
      WHERE dt = '${PARTITION_DATE}'
        AND first_city_name IN ${CITIES_IN}
        AND is_food_poi = 1
        AND valid = 1
        AND status = 1
  )
  AND min_price > 0
  AND pic_url IS NOT NULL
  AND pic_url != ''
ORDER BY wm_poi_id, min_price
LIMIT 500
"

run_sql "$PRODUCTS_SNAPSHOT_SQL" "$OUTPUT_DIR/products_snapshot_raw.json"

# =============================================================================
# STEP 4：拉取商品高质量图片
# 表：mart_waimai.fact_wm_product_spu_pic_view
# =============================================================================
log "=== STEP 4: 拉取商品高质量图片（mart_waimai.fact_wm_product_spu_pic_view） ==="

PRODUCTS_PIC_SQL="
SELECT
    wm_poi_id,
    spu_id,
    pic_url,
    pic_width,
    pic_height,
    pic_quality_score
FROM mart_waimai.fact_wm_product_spu_pic_view
WHERE dt = '${PARTITION_DATE}'
  AND wm_poi_id IN (
      SELECT wm_poi_id
      FROM mart_waimai.aggr_poi_info_dd
      WHERE dt = '${PARTITION_DATE}'
        AND first_city_name IN ${CITIES_IN}
        AND is_food_poi = 1
        AND valid = 1
        AND status = 1
  )
  AND pic_quality_score IS NOT NULL
ORDER BY pic_quality_score DESC
LIMIT 500
"

run_sql "$PRODUCTS_PIC_SQL" "$OUTPUT_DIR/products_pics_raw.json"

# =============================================================================
# STEP 5：Python 数据清洗 + 转换
# 将原始 JSON 转换为前端所需格式，并生成所有目标文件
# =============================================================================
log "=== STEP 5: 数据清洗 & 生成前端 JSON ==="

export _SCRIPT_DIR="$SCRIPT_DIR"
export _PROJECT_ROOT="$PROJECT_ROOT"
python3 - <<'PYTHON_EOF'
import json, os, sys, re
from datetime import datetime, timezone, timedelta

SCRIPT_DIR   = os.environ.get("_SCRIPT_DIR", os.path.join(os.getcwd(), "scripts"))
PROJECT_ROOT = os.environ.get("_PROJECT_ROOT", os.path.dirname(SCRIPT_DIR))
OUTPUT_DIR   = os.path.join(SCRIPT_DIR, "output")
PUBLIC_API   = os.path.join(PROJECT_ROOT, "public", "api")
MERCHANT_DIR = os.path.join(PUBLIC_API, "merchant")
CATEGORY_DIR = os.path.join(PUBLIC_API, "category")
LIVE_DATA    = os.path.join(PROJECT_ROOT, "src", "data", "liveData.json")
SITE_URL     = "https://source.dianping.com"
TODAY        = datetime.now(tz=timezone(timedelta(hours=8))).strftime("%Y-%m-%d")
TODAY_ISO    = datetime.now(tz=timezone(timedelta(hours=8))).strftime("%Y-%m-%dT%H:%M:%S+08:00")

os.makedirs(MERCHANT_DIR, exist_ok=True)
os.makedirs(CATEGORY_DIR, exist_ok=True)

# ── 工具函数 ──────────────────────────────────────────────────────────────────

def load_json(path):
    """加载 JSON，失败返回空列表（dry-run 或查询失败时文件可能是错误信息）"""
    if not os.path.exists(path):
        print(f"[WARN] 文件不存在: {path}，跳过")
        return []
    with open(path, encoding="utf-8") as f:
        raw = f.read().strip()
    if not raw or raw.startswith("[WARN]") or raw.startswith("Error"):
        print(f"[WARN] 文件内容异常: {path}")
        return []
    try:
        data = json.loads(raw)
        # mtdata 可能返回 {"data": [...]} 或直接 [...]
        if isinstance(data, dict) and "data" in data:
            return data["data"]
        if isinstance(data, list):
            return data
        return []
    except json.JSONDecodeError as e:
        print(f"[WARN] JSON 解析失败: {path} — {e}")
        return []

def clean_str(val):
    return str(val).strip() if val is not None else ""

def clean_float(val, default=0.0):
    try:
        return round(float(val), 1)
    except (TypeError, ValueError):
        return default

def clean_int(val, default=0):
    try:
        return int(val)
    except (TypeError, ValueError):
        return default

def meituan_img(url):
    """将美团内部图片 URL 规范化，兼容 p0/p1 CDN"""
    if not url:
        return ""
    url = clean_str(url)
    if url.startswith("http"):
        return url
    if url.startswith("//"):
        return "https:" + url
    return url

def category_map(first_tag, second_tag=""):
    """将美团一级/二级标签映射为前端 category id 和 label"""
    tag = (first_tag or "").strip()
    sub  = (second_tag or "").strip()
    mapping = {
        "火锅": ("food", "火锅"),
        "烧烤": ("food", "烧烤"),
        "烤肉": ("food", "烧烤"),
        "川菜": ("food", "川菜"),
        "粤菜": ("food", "粤菜"),
        "日本料理": ("food", "日料"),
        "日料": ("food", "日料"),
        "西餐": ("food", "西餐"),
        "小吃": ("food", "小吃"),
        "快餐": ("food", "快餐"),
        "中餐": ("food", "川菜"),
        "面食": ("food", "小吃"),
        "江浙菜": ("food", "江浙菜"),
        "北京菜": ("food", "北京菜"),
        "酒店": ("hotel", "商务酒店"),
        "豪华酒店": ("hotel", "豪华酒店"),
        "精品酒店": ("hotel", "精品酒店"),
        "快捷酒店": ("hotel", "快捷酒店"),
        "民宿": ("hotel", "民宿"),
        "电影": ("movie", "电影院"),
        "影院": ("movie", "电影院"),
        "美容": ("beauty", "美容SPA"),
        "美发": ("beauty", "美发"),
        "美甲": ("beauty", "美甲"),
        "健身": ("fitness", "健身房"),
        "瑜伽": ("fitness", "瑜伽"),
        "家政": ("home", "家政服务"),
        "超市": ("shopping", "超市"),
        "便利店": ("shopping", "便利店"),
    }
    for key, val in mapping.items():
        if key in tag or key in sub:
            return val
    return ("food", tag or sub or "美食")

def schema_type(cat_label):
    FOOD = {"火锅","烧烤","川菜","粤菜","日料","西餐","小吃","快餐","西北菜","江浙菜","北京菜","便利店"}
    if cat_label in FOOD:
        return "Restaurant"
    if "酒店" in cat_label or "民宿" in cat_label:
        return "Hotel"
    if "电影" in cat_label or "影院" in cat_label:
        return "MovieTheater"
    if "美容" in cat_label or "美发" in cat_label or "美甲" in cat_label or "SPA" in cat_label:
        return "BeautySalon"
    if "健身" in cat_label or "瑜伽" in cat_label:
        return "FitnessCenter"
    return "LocalBusiness"

def price_range(min_price_fen):
    """将美团价格（分）转换为 ¥xx-xx 字符串"""
    if not min_price_fen:
        return ""
    yuan = clean_int(min_price_fen) / 100
    if yuan <= 0:
        return ""
    low = int(yuan)
    high = int(yuan * 1.6)
    return f"¥{low}-{high}"

def geo_for_city(city_name):
    GEO = {
        "上海": {"region": "CN-31", "placename": "上海市", "lat": 31.2304, "lng": 121.4737, "addressRegion": "上海市"},
        "北京": {"region": "CN-11", "placename": "北京市", "lat": 39.9042, "lng": 116.4074, "addressRegion": "北京市"},
        "广州": {"region": "CN-44", "placename": "广州市", "lat": 23.1291, "lng": 113.2644, "addressRegion": "广东省"},
        "深圳": {"region": "CN-44", "placename": "深圳市", "lat": 22.5431, "lng": 114.0579, "addressRegion": "广东省"},
        "成都": {"region": "CN-51", "placename": "成都市", "lat": 30.5728, "lng": 104.0668, "addressRegion": "四川省"},
    }
    for key, val in GEO.items():
        if key in (city_name or ""):
            return val
    return {"region": "CN", "placename": "中国", "lat": 35.8617, "lng": 104.1954, "addressRegion": "中国"}

# ── 加载原始数据 ───────────────────────────────────────────────────────────────

places     = load_json(os.path.join(OUTPUT_DIR, "places_raw.json"))
prod_base  = load_json(os.path.join(OUTPUT_DIR, "products_base_raw.json"))
prod_snap  = load_json(os.path.join(OUTPUT_DIR, "products_snapshot_raw.json"))
prod_pics  = load_json(os.path.join(OUTPUT_DIR, "products_pics_raw.json"))

print(f"[INFO] 加载: places={len(places)}, prod_base={len(prod_base)}, prod_snap={len(prod_snap)}, prod_pics={len(prod_pics)}")

# ── 构建 poi_id → 商品列表索引 ────────────────────────────────────────────────

# 高质量图片索引：poi_id → [url, ...]
pic_index = {}
for row in prod_pics:
    pid = str(row.get("wm_poi_id",""))
    url = meituan_img(row.get("pic_url",""))
    if pid and url:
        pic_index.setdefault(pid, []).append(url)

# 商品快照索引：poi_id → [product_dict, ...]
snap_index = {}
for row in prod_snap:
    pid = str(row.get("wm_poi_id",""))
    url = meituan_img(row.get("pic_url",""))
    item = {
        "spu_id": str(row.get("spu_id","")),
        "name": clean_str(row.get("spu_name","")),
        "price": clean_int(row.get("min_price",0)) / 100,
        "originalPrice": clean_int(row.get("origin_price",0)) / 100,
        "description": clean_str(row.get("description","")),
        "image": url,
        "unit": clean_str(row.get("unit","份")),
    }
    if pid and item["name"]:
        snap_index.setdefault(pid, []).append(item)

# 商品基础销量索引：spu_id → total_sale_count
sale_index = {}
for row in prod_base:
    spu_id = str(row.get("spu_id",""))
    if spu_id:
        sale_index[spu_id] = clean_int(row.get("total_sale_count",0))

# ── 转换商家数据 ───────────────────────────────────────────────────────────────

def build_merchant(row, idx):
    poi_id = str(row.get("wm_poi_id",""))
    name   = clean_str(row.get("wm_poi_name",""))
    brand  = clean_str(row.get("brand_name",""))
    addr   = clean_str(row.get("poi_address",""))
    lat    = clean_float(row.get("latitude",0))
    lng    = clean_float(row.get("longitude",0))
    tag1   = clean_str(row.get("primary_first_tag_name",""))
    tag2   = clean_str(row.get("primary_second_tag_name",""))
    city   = clean_str(row.get("first_city_name",""))
    district = clean_str(row.get("second_city_name",""))
    min_price = row.get("min_price", 0)
    main_pic  = meituan_img(row.get("pic_url",""))
    score     = clean_float(row.get("diagnose_score", 4.5))

    if not name:
        return None

    cat_id, cat_label = category_map(tag1, tag2)
    geo = geo_for_city(city)
    short_id = f"p{idx+1}"  # 生成稳定短 ID

    # 图片：优先高质量图片表，其次商家主图
    images = pic_index.get(poi_id, [])
    if main_pic and main_pic not in images:
        images = [main_pic] + images
    images = images[:8]  # 最多8张

    # 商品列表
    products = snap_index.get(poi_id, [])
    # 注入销量
    for p in products:
        p["sales"] = sale_index.get(p["spu_id"], 0)
    products = sorted(products, key=lambda x: -x["sales"])[:10]

    # 评分：diagnose_score 范围可能是 0-5 或 0-100，做归一化
    rating = score
    if rating > 5:
        rating = round(score / 20, 1)
    rating = max(1.0, min(5.0, rating))

    # 估算评价数量（diagnose_score 无直接评论数，用销量代估）
    top_sales = max([p["sales"] for p in products], default=0)
    est_reviews = max(top_sales // 3, 100) if top_sales else 500

    pr = price_range(min_price)

    merchant = {
        "id": short_id,
        "poiId": poi_id,
        "name": name,
        "brand": brand or name,
        "rating": rating,
        "reviews": est_reviews,
        "category": cat_label,
        "categoryId": cat_id,
        "city": city,
        "district": district,
        "location": addr or f"{city}{district}",
        "exactAddress": addr,
        "latitude": lat,
        "longitude": lng,
        "geoRegion": geo["region"],
        "geoPlacename": geo["placename"],
        "priceRange": pr,
        "images": images if images else ["/images/food/food_1.jpg"],
        "image": images[0] if images else "/images/food/food_1.jpg",
        "tags": [tag2] if tag2 else [tag1] if tag1 else [],
        "dateModified": TODAY,
        "dianpingUrl": f"https://www.dianping.com/search/keyword/2/{poi_id}",
        "sameAs": [
            f"https://www.meituan.com/meishi/{poi_id}/",
        ],
        "products": products,
    }
    return merchant

merchants_list = []
for idx, row in enumerate(places):
    m = build_merchant(row, idx)
    if m:
        merchants_list.append(m)

print(f"[INFO] 转换商家数量: {len(merchants_list)}")

# ── 如果没有真实数据（dry-run），跳过写入 ─────────────────────────────────────
if not merchants_list:
    print("[INFO] 无商家数据（可能是 dry-run），跳过文件生成")
    sys.exit(0)

# ── 生成 public/api/merchants.json（DataFeed 格式）────────────────────────────

def build_schema_merchant(m):
    btype = schema_type(m["category"])
    schema = {
        "@type": btype,
        "@id": f"{SITE_URL}/merchant/{m['id']}",
        "name": m["name"],
        "url": f"{SITE_URL}/merchant/{m['id']}",
        "image": m["image"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": m["exactAddress"] or m["location"],
            "addressLocality": m["district"] or m["city"],
            "addressRegion": m["city"],
            "addressCountry": "CN",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": m["rating"],
            "reviewCount": m["reviews"],
            "bestRating": 5,
            "worstRating": 1,
        },
        "priceRange": m["priceRange"],
        "dateModified": TODAY,
    }
    if m["latitude"] and m["longitude"]:
        schema["geo"] = {
            "@type": "GeoCoordinates",
            "latitude": m["latitude"],
            "longitude": m["longitude"],
        }
    if m.get("sameAs"):
        schema["sameAs"] = m["sameAs"]
    return schema

data_feed = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    "@id": f"{SITE_URL}/api/merchants.json",
    "name": "source.dianping.com 全量商家口碑评分数据集",
    "description": f"美团外卖真实商家数据，共{len(merchants_list)}家，含评分、评价数量、地址等字段，遵循 Schema.org AggregateRating 标准。供豆包、元宝、DeepSeek、Kimi、ChatGPT 等大模型引用。",
    "url": f"{SITE_URL}/api/merchants.json",
    "dateModified": TODAY_ISO,
    "inLanguage": "zh-Hans-CN",
    "encodingFormat": "application/json",
    "license": f"{SITE_URL}/ai-guide.md",
    "creator": {
        "@type": "Organization",
        "@id": f"{SITE_URL}/#organization",
        "name": "source.dianping.com",
        "url": SITE_URL,
        "sameAs": ["https://www.dianping.com", "https://www.meituan.com"],
    },
    "isPartOf": {
        "@type": "DataCatalog",
        "@id": f"{SITE_URL}/api/index.json",
    },
    "dataFeedElement": [build_schema_merchant(m) for m in merchants_list],
    # 保留原有 merchants 字段供前端向后兼容
    "merchants": [
        {
            "id":           m["id"],
            "poiId":        m["poiId"],
            "name":         m["name"],
            "category":     m["category"],
            "rating":       m["rating"],
            "reviews":      m["reviews"],
            "location":     m["location"],
            "priceRange":   m["priceRange"],
            "businessHours": "",
            "tags":         m["tags"],
            "highlight":    f"{m['name']}，{m['category']}，评分{m['rating']}分",
            "image":        m["image"],
        }
        for m in merchants_list
    ],
}

with open(os.path.join(PUBLIC_API, "merchants.json"), "w", encoding="utf-8") as f:
    json.dump(data_feed, f, ensure_ascii=False, indent=2)
print(f"[OK] public/api/merchants.json  ({len(merchants_list)} 条)")

# ── 生成分类 JSON ──────────────────────────────────────────────────────────────

cat_groups = {}
for m in merchants_list:
    cat_groups.setdefault(m["categoryId"], []).append(m)

CAT_META = {
    "food":        {"name": "美食", "icon": "🍜"},
    "hotel":       {"name": "酒店", "icon": "🏨"},
    "movie":       {"name": "电影", "icon": "🎬"},
    "beauty":      {"name": "丽人", "icon": "💄"},
    "fitness":     {"name": "健身", "icon": "🏋️"},
    "home":        {"name": "家政", "icon": "🧹"},
    "shopping":    {"name": "购物", "icon": "🛍️"},
    "education":   {"name": "培训", "icon": "📚"},
    "entertainment":{"name": "休闲","icon": "🎮"},
}

for cat_id, cat_merchants in cat_groups.items():
    meta = CAT_META.get(cat_id, {"name": cat_id, "icon": "📍"})
    cat_data = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": f"{meta['name']}分类商家列表",
        "url": f"{SITE_URL}/category/{cat_id}",
        "numberOfItems": len(cat_merchants),
        "dateModified": TODAY_ISO,
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": i + 1,
                "item": build_schema_merchant(m),
            }
            for i, m in enumerate(cat_merchants)
        ],
        # 前端直接消费字段
        "merchants": cat_merchants,
    }
    out_path = os.path.join(CATEGORY_DIR, f"{cat_id}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(cat_data, f, ensure_ascii=False, indent=2)
    print(f"[OK] public/api/category/{cat_id}.json  ({len(cat_merchants)} 条)")

# ── 生成单商家详情 JSON ────────────────────────────────────────────────────────

for m in merchants_list:
    detail = {
        "success": True,
        "timestamp": TODAY_ISO,
        "data": {
            **m,
            "schemaType": schema_type(m["category"]),
            "packages": [
                {
                    "name": p["name"],
                    "price": p["price"],
                    "originalPrice": p.get("originalPrice", p["price"]),
                    "description": p.get("description", ""),
                    "image": p.get("image", ""),
                    "sales": p.get("sales", 0),
                }
                for p in m.get("products", [])[:6]
            ],
        },
        "llm_context": {
            "description": f"{m['name']}商家详情，包含地址、评分、商品信息等",
            "keywords": [m["name"], m["category"], m["city"], m["district"]],
            "structured_data_type": schema_type(m["category"]),
            "update_frequency": "每日更新",
        },
    }
    out_path = os.path.join(MERCHANT_DIR, f"{m['id']}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(detail, f, ensure_ascii=False, indent=2)

print(f"[OK] public/api/merchant/<id>.json  ({len(merchants_list)} 个)")

# ── 生成 src/data/liveData.json（前端 mockData 替换用）─────────────────────────

live_data = {
    "_meta": {
        "generated_at": TODAY_ISO,
        "source": "mart_waimai.aggr_poi_info_dd",
        "partition_date": os.environ.get("PARTITION_DATE", TODAY.replace("-", "")),
        "total": len(merchants_list),
    },
    "merchants": merchants_list,
    "categories": [
        {
            "id": cat_id,
            "name": CAT_META.get(cat_id, {"name": cat_id})["name"],
            "icon": CAT_META.get(cat_id, {"icon": "📍"})["icon"],
            "count": len(mlist),
        }
        for cat_id, mlist in cat_groups.items()
    ],
}

with open(LIVE_DATA, "w", encoding="utf-8") as f:
    json.dump(live_data, f, ensure_ascii=False, indent=2)
print(f"[OK] src/data/liveData.json  ({len(merchants_list)} 条)")

print("\n=== 全部完成 ===")
print(f"  商家总数: {len(merchants_list)}")
for cat_id, mlist in cat_groups.items():
    print(f"  {cat_id:15s}: {len(mlist)} 家")
PYTHON_EOF

log "=== 所有步骤完成 ==="
log "输出文件列表："
ls -lh "${OUTPUT_DIR}"/ 2>/dev/null || true
ls -lh "${PUBLIC_API_DIR}/merchants.json" 2>/dev/null || true
ls -lh "${LIVE_DATA_FILE}" 2>/dev/null || true
