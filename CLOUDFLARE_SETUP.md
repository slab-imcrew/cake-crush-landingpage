# ☁️ Cloudflare Pages Setup - Hướng dẫn

## 🚨 Vấn đề hiện tại
- Cloudflare Pages đang upload toàn bộ folder làm static assets
- Kết quả: "Asset too large" error (node_modules quá lớn)

## ✅ Giải pháp

### Cách 1: GitHub Pages (Đơn giản - Recommended)
Sử dụng GitHub Pages built-in thay vì Cloudflare Pages:

```
https://slab-imcrew.github.io/cake-crush-landingpage/
```

**Cấu hình:**
1. Vào: https://github.com/slab-imcrew/cake-crush-landingpage/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save → Done! (Chờ 1-2 phút)

✅ **Ưu điểm:** Đơn giản, miễn phí, không cần config
❌ **Nhược điểm:** URL dài, backend form sẽ lưu vào localStorage

---

### Cách 2: Cloudflare Pages (Professional)

**Bước 1: Xóa Node.js Backend từ deployment**
- Backend (server.js) không chạy được trên Cloudflare Pages
- Chỉ deploy static files (HTML/CSS/JS)

**Bước 2: Cấu hình Cloudflare Pages Dashboard**

Vào: https://dash.cloudflare.com → Pages → cake-crush-landingpage

Đặt lại:
```
Build Command: (để trống)
Build Output Directory: .
```

**Bước 3: Exclude files khỏi deployment**
- Tạo file `_headers` để Cloudflare biết không upload backend files:

```
_headers file (đã tạo sẵn)
```

**Bước 4: Deploy Backend riêng**

Backend (server.js) cần deploy tới:
- Railway.app (Recommended - Free tier)
- Render.com (Free)
- Vercel (Free với serverless functions)

---

## 🔧 Cấu hình cho Cloudflare Pages

Nếu bạn cứ dùng Cloudflare Pages, cần:

1. **Tạo file `_cloudflare_pages.json`:**
```json
{
  "build": {
    "cwd": ".",
    "command": "echo 'Static site'",
    "destination": "."
  },
  "env": {
    "NODE_VERSION": "18.0.0"
  }
}
```

2. **Update .gitignore (đã có sẵn):**
```
node_modules/
server.js
package.json
```

3. **Chỉ commit static files:**
- index.html ✅
- admin.html ✅
- css/ ✅
- js/ ✅
- Không commit: server.js ❌, package.json ❌, node_modules ❌

---

## 📋 **QUICK FIX - Chọn 1 trong 3:**

### 🥇 **Option 1: GitHub Pages (NHANH NHẤT)**
```bash
https://slab-imcrew.github.io/cake-crush-landingpage/
```
→ Vào GitHub Settings → Pages → Deploy from main branch

### 🥈 **Option 2: Cloudflare Pages (Professional)**
→ Cần deploy backend tới Railway/Render/Vercel

### 🥉 **Option 3: Vercel + Backend**
→ Deploy frontend → Vercel
→ Deploy backend → Vercel Serverless Functions

---

## 📞 Tôi sẽ giúp bạn setup nếu bạn chọn Option nào!

Báo lại chọn cách nào 👇
