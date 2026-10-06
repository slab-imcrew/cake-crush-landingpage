# Landing page 20/10 — Cake Crush

Trang tĩnh (HTML/CSS/JS thuần), không cần cài thư viện.

## Cấu trúc

| File | Nội dung |
|---|---|
| `index.html` | Bố cục 7 phần: Hero · Nhu cầu · Sản phẩm · Lý do chọn · 4 bước đặt hàng · FAQ · Form tư vấn |
| `css/styles.css` | Giao diện tối giản, ưu tiên điện thoại (mobile-first). Màu thương hiệu tạm đặt ở `:root` |
| `js/data.js` | **Nơi chỉnh dữ liệu**: sản phẩm, kích thước, giá, ảnh, liên hệ, chi nhánh, endpoint form |
| `js/main.js` | Hiển thị sản phẩm, bộ lọc theo người nhận, chọn size, kiểm tra và gửi form |

## Cách mở

Cách 1 — mở thẳng file: nhấp đúp `index.html`.

Cách 2 — chạy server local (giống môi trường thật hơn):

```
python -m http.server 5520 --directory "06_Output/landing-20-10"
```

Rồi mở http://localhost:5520

## Dữ liệu cần bổ sung trước khi chạy thật

Khi `DRAFT_MODE: true` (trong `js/data.js`), mọi chỗ thiếu sẽ có nhãn vàng trên trang.

1. **Giá theo từng size**: `products[].sizes[].price` (số VNĐ, ví dụ `350000`)
2. **Ảnh bánh thật**: `products[].image` (ví dụ `assets/img/banh-hoa.jpg`) và ảnh hero trong `index.html`
3. **Số người ăn / thành phần** cho từng size (đang để `___`)
4. **Xác nhận danh sách sản phẩm 20/10**: tên, mô tả, vị bánh (hiện là bản đề xuất theo danh mục sản phẩm)
5. **Hạn chót đặt hàng 20/10**, số ngày cần đặt trước (mẫu thường / tùy chỉnh / số lượng lớn)
6. **Giao hàng**: khu vực, phí theo khu, khung giờ
7. **Chính sách đặt cọc**, thời gian phản hồi sau khi gửi form
8. **Tùy chỉnh**: phạm vi và phụ phí
9. **Đơn doanh nghiệp**: số lượng tối thiểu, giá theo bậc, hóa đơn VAT, thời gian sản xuất
10. **Liên hệ**: hotline, link Zalo, địa chỉ 3 chi nhánh (`contact` trong `data.js`)
11. **Màu thương hiệu / logo** (đang dùng bảng màu tạm, chữ “Cake Crush” thay logo)
12. **Nơi nhận dữ liệu form**: `FORM_ENDPOINT` (Google Apps Script, Formspree, CRM...). Khi để trống, dữ liệu chỉ lưu tạm trong trình duyệt (`localStorage`, khóa `cc_leads_2010`), chưa gửi về đâu cả.

Điền xong thì đổi `DRAFT_MODE: false` để tắt banner và nhãn vàng.

## Dữ liệu form gửi đi (JSON)

```json
{ "name": "", "phone": "", "product": "", "size": "", "quantity": 1,
  "date": "2026-10-19", "note": "", "source": "landing-20-10", "createdAt": "..." }
```
