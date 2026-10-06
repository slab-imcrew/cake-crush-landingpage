# 🚂 Railway.app Backend Setup

## 📋 Yêu cầu
- GitHub account (đã có)
- Railway account (free)

## 🚀 Bước 1: Tạo Railway Account

1. Vào: https://railway.app
2. Sign up với GitHub
3. Authorize Railway
4. Create new project

## 🔧 Bước 2: Deploy từ GitHub

1. Vào Railway dashboard
2. Klik **+ New Project**
3. Chọn **Deploy from GitHub repo**
4. Tìm & select: `cake-crush-landingpage`
5. Railway tự detect Node.js
6. Chờ deploy (1-2 phút)

## ✅ Bước 3: Lấy Backend URL

Sau khi deploy thành công:
1. Vào Railway project
2. Chọn service `cake-crush-landingpage`
3. Tab **Settings**
4. Tìm **Domain** → Copy URL
5. Sẽ như: `https://cake-crush-landingpage-production-xxxx.railway.app`

## 🔗 Bước 4: Update Frontend API Endpoint

Chỉnh `js/main.js` - thay base URL:

```javascript
// Từ:
fetch("/api/submit", ...)

// Thành:
fetch("https://YOUR-RAILWAY-URL/api/submit", ...)
```

Hoặc tốt hơn - lưu base URL vào `js/data.js`:

```javascript
window.CC_CONFIG = {
  API_BASE: "https://your-railway-url",
  // ... rest config
}
```

Rồi dùng:
```javascript
fetch(window.CC_CONFIG.API_BASE + "/api/submit", ...)
```

## 📱 Bước 5: Test Form

1. Vào: https://slab-imcrew.github.io/cake-crush-landingpage/
2. Điền form → Submit
3. Kiểm tra Railway logs (nên thấy POST request)
4. Vào admin.html → kiểm tra form submissions

---

## 🆘 Troubleshooting

**Error: Cannot reach backend**
- Kiểm tra Railway URL có đúng không
- Railway service có running không?

**Form không submit**
- Check browser console (F12 → Console)
- Xem error message gì

**Admin dashboard trống**
- Check Railway database (SQLite hoạt động không)
- Railway có write permission không?

---

## 💾 Giữ Database

SQLite database (`cake-crush.db`) sẽ bị xóa khi Railway restart.

Giải pháp: Dùng PostgreSQL miễn phí trên Railway:
1. Railway project → Add service
2. Add PostgreSQL
3. Update `server.js` dùng PostgreSQL

---

**Báo lại khi hoàn thành từng bước! 🚀**
