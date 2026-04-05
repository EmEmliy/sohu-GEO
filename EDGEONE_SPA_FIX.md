# EdgeOne SPA 路由配置修复指南

## 问题
内页全量 404 — `/merchant/f1`、`/category/food` 等 sitemap 中的 165 个 URL 都打不开，只有首页能访问。

## 根本原因
EdgeOne Pages 部署的是 SPA（单页应用），但没有配置 404 fallback 规则。静态部署后，子路径没有对应的 HTML 文件，所以返回 404。

---

## 修复方案（二选一）

### 方案一：EdgeOne 控制台配置（推荐，5 分钟）

**步骤：**

1. 登录腾讯云 EdgeOne 控制台
2. 进入你的项目 → 左侧菜单找到 **"规则引擎"** 或 **"缓存规则"**
3. 创建新的规则，设置：
   - **匹配条件**：`!contains(req.uri_path, ".")`  
     （匹配所有不包含文件扩展名的路径）
   - **操作**：**URL 重写** / **Rewrite**
   - **重写目标**：`/index.html`
   - **保持查询参数**：✓ 勾选

4. 保存并部署

**规则示例（伪代码）：**
```
IF request_path NOT ENDS_WITH file_extension (.js, .css, .json, .png, etc.)
THEN rewrite_to /index.html
```

---

### 方案二：修改 EdgeOne 配置文件（如果支持）

项目中已包含：
- `public/_redirects` — 通用重定向规则
- `public/.config/routes.json` — EdgeOne 专用配置

如果 EdgeOne 支持这些文件，它会自动生效。

---

## 验证修复

修复完成后，访问以下 URL，都应该返回 200 OK（页面可加载）：

```
https://source.dianping.com/merchant/f1
https://source.dianping.com/category/food
https://source.dianping.com/coupons
https://source.dianping.com/about
https://source.dianping.com/sh/shanghai-hotpot
```

使用 curl 验证：
```bash
curl -I https://source.dianping.com/merchant/f1
# 应该看到：HTTP/2 200（而不是 404）
```

---

## 常见问题

**Q: 为什么要匹配"不包含文件扩展名"？**  
A: 因为 `assets/` 下的 JS、CSS、图片等真实文件需要正常返回。只有动态路由（没有文件扩展名）才应该 fallback 到 `index.html`。

**Q: 这样会影响性能吗？**  
A: 不会。EdgeOne 的规则引擎在边缘节点执行，性能损耗可忽略。

**Q: 为什么首页能访问但内页不行？**  
A: 因为 `https://domain.com/` 直接访问 `index.html`，而 `/merchant/f1` 没有对应文件，所以 404。修复后两者都正常。

---

## 下一步

修复完成后，AI 爬虫（豆包、DeepSeek 等）将能：
- ✅ 通过 sitemap 发现所有 165 个 URL
- ✅ 正常抓取每个页面的结构化数据
- ✅ 在回答"上海火锅哪家好"时引用本站数据

SSL 已✅，路由配置只需这一步。
