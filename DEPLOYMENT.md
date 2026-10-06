# 🚀 Hướng dẫn Deploy Đầy đủ

## 📱 Frontend: GitHub Pages ✅ (Hoàn thành)

**Live URL:** https://slab-imcrew.github.io/cake-crush-landingpage/

- Auto-deploy mỗi khi push lên `main` branch
- Không cần config thêm

---

## 🔌 Backend: Railway.app (TODO)

### 📋 Chuẩn bị

1. **GitHub Account** ✅ (slab-imcrew)
2. **Railway Account** (New - Free $5/tháng)
   - Vào: https://railway.app
   - Sign up with GitHub

### 🚀 Deploy Backend

**Bước 1: Connect GitHub**
1. Railway Dashboard → New Project
2. Deploy from GitHub repo
3. Select: `slab-imcrew/cake-crush-landingpage`
4. Railway tự detect Node.js

**Bước 2: Environment Variables**
Railway sẽ tự setup, nhưng nếu cần, thêm:
```
NODE_ENV=production
PORT=3000
```

**Bước 3: Chờ Deploy**
- Railway sẽ: `npm install` + `npm start`
- Chờ 2-3 phút
- Sẽ có URL tự động

**Bước 4: Lấy Backend URL**
```
Settings → Domains → Copy URL
Ví dụ: https://cake-crush-api-production-xxxx.railway.app
```

### 🔗 Connect Frontend ↔️ Backend

**Update `js/data.js`:**

```javascript
window.CC_CONFIG = {
  // ...
  API_BASE: "https://cake-crush-api-production-xxxx.railway.app",
  // ...
}
```

Rồi:
```bash
git add js/data.js
git commit -m "Connect to Railway backend"
git push origin main
```

GitHub Pages tự update trong 1-2 phút ✅

### ✅ Test

1. Vào: https://slab-imcrew.github.io/cake-crush-landingpage/
2. Điền form → Submit
3. Nên thấy QR code
4. Vào Admin: `https://slab-imcrew.github.io/cake-crush-landingpage/admin.html`
   - Password: `1988`
   - Nên thấy submission trong list

---

## 🔐 Security Notes

### Bảo vệ Admin Password
Hiện tại admin password là `1988` (hardcoded).

**Nên thay thành:**
1. Update `server.js` - thay mật khẩu
2. Hoặc dùng environment variable:
```javascript
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1988";
```

Railway dashboard → Variables → Add:
```
ADMIN_PASSWORD = your-strong-password
```

### Database Persistence
SQLite database tạm thời (bị xóa khi restart).

**Long-term:** Dùng PostgreSQL:
1. Railway → Add service → PostgreSQL
2. Sẽ tự inject CONNECTION_URL
3. Update `server.js` dùng PostgreSQL

---

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│   GitHub Pages (Frontend)                │
│   https://slab-imcrew.github.io/...     │
│   - HTML/CSS/JS                         │
│   - Admin dashboard                     │
└──────────────┬──────────────────────────┘
               │ API calls
               ↓
┌─────────────────────────────────────────┐
│   Railway (Backend)                     │
│   https://cake-crush-api-xxx.railway.app│
│   - Form submission API                 │
│   - QR code generation                  │
│   - Admin data endpoint                 │
│   - SQLite database                     │
└─────────────────────────────────────────┘
```

---

## 🎯 Checklist

- [ ] GitHub Pages deployed ✅
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] API_BASE URL updated in data.js
- [ ] Frontend pushed to GitHub
- [ ] Form submission tested
- [ ] Admin dashboard working
- [ ] QR code generation working

---

## 🆘 Troubleshooting

**Backend không hoạt động:**
- Check Railway logs: Dashboard → Service → Logs
- Kiểm tra error gì
- Check `server.js` syntax

**Form không submit:**
- Open browser DevTools (F12)
- Check Console tab có error không?
- Check API_BASE URL có đúng không?

**Admin dashboard không show data:**
- Check Railway database có hoạt động không
- Kiểm tra admin password đúng không

**CORS error:**
- Update `server.js` CORS settings
- Thêm GitHub Pages URL vào whitelist

---

## 📞 Support

Tất cả files cần thiết đã có sẵn:
- `server.js` - Backend code
- `railway-setup.md` - Railway guide
- `SETUP.md` - Local development

Báo lại khi hoàn thành! 🚀
