# Cake Crush Landing Page - Setup

## 🚀 Cài đặt và chạy server

### 1. Cài đặt Node.js
Nếu chưa có, tải từ: https://nodejs.org/ (LTS version)

### 2. Cài đặt dependencies
```bash
cd D:\Dự\ án\Claude\ code\Cake\ Crush\landingpage
npm install
```

### 3. Chạy server
```bash
npm start
```

Server sẽ chạy tại: **http://localhost:3000**

### 4. Truy cập

- **Landing page**: http://localhost:3000
- **Admin dashboard**: http://localhost:3000/admin.html
  - Password: `1988`

---

## 📝 Tính năng

### Form Submission
- Form tự động lưu vào SQLite database (`cake-crush.db`)
- Sau khi submit, hiển thị QR code thanh toán
- QR code tự động sinh từ https://qr.sepay.vn/

### Admin Dashboard
- Xem tất cả đơn hàng được submit
- Update trạng thái thanh toán (Chờ TT / Đã TT / Hủy)
- Xem mã QR cho từng đơn
- Thống kê tổng đơn, đơn đã thanh toán, chờ thanh toán

### API Endpoints

**POST /api/submit**
- Gửi form submission
- Body: `{ name, phone, product, size, quantity, date, note }`

**POST /api/generate-qr**
- Tạo QR code thanh toán
- Body: `{ name, phone, amount }`

**GET /api/admin/submissions?password=1988**
- Lấy danh sách tất cả submissions

**PUT /api/admin/submissions/:id?password=1988**
- Update trạng thái
- Body: `{ payment_status: "pending|paid|cancelled" }`

---

## 🔒 Bảo mật

- Admin password: `1988` (nên thay đổi trong production)
- Database file không được commit (trong .gitignore)
- HTTPS nên bật khi deploy

---

## 📦 Deploy (Cloudflare Pages + Backend)

Để deploy backend, bạn cần:

1. **Option A: Railway.app** (miễn phí 5 USD/tháng)
   - https://railway.app
   - Connect GitHub repo
   - Set NODE_ENV=production

2. **Option B: Render** (miễn phí)
   - https://render.com
   - Deploy Node.js service

3. **Option C: Vercel + API Routes**
   - Chuyển server.js sang `/api` folder cho Vercel

---

## 📱 Bank Details (để tùy chỉnh)

```
Ngân hàng: ACB
Số tài khoản: 833336666
Số tiền: 100000 đ
Nội dung: [Tên][SĐT] (vd: Binh0963738833)
```

Chỉnh sửa trong `server.js` hàm `generateQRCode` nếu cần đổi bank/account.
