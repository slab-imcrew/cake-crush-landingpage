/*
 * DỮ LIỆU CẦN CHỈNH CỦA LANDING PAGE 20/10 — Cake Crush
 * ------------------------------------------------------
 * Mọi giá trị null / "" bên dưới đang CHỜ BỔ SUNG. Khi để trống, trang sẽ
 * hiện nhãn vàng "Cần bổ sung" (lúc DRAFT_MODE = true) hoặc "Liên hệ báo giá".
 *
 * - price: số nguyên VNĐ, ví dụ 350000. null = chưa có giá.
 * - image: đường dẫn ảnh thật, ví dụ "assets/img/banh-hoa.jpg". "" = dùng ảnh minh hoạ tạm.
 * - Tên, mô tả, kích thước bên dưới là ĐỀ XUẤT dựa trên danh mục sản phẩm
 *   (01_Context/02_Product_Portfolio.md), cần bộ phận sản phẩm xác nhận.
 */

window.CC_CONFIG = {
  // true: hiện banner + nhãn vàng để rà soát. Đổi thành false khi đã điền đủ.
  DRAFT_MODE: true,

  // URL nhận dữ liệu form (Google Apps Script, Formspree, CRM...). "" = chưa kết nối,
  // dữ liệu chỉ lưu tạm trên trình duyệt để thử.
  FORM_ENDPOINT: "",

  contact: {
    fanpage: "https://www.facebook.com/cakecrush47",
    tiktok: "https://www.tiktok.com/@cakecrushbakery",
    hotline: "",   // ví dụ "0905 xxx xxx"
    zalo: "",      // ví dụ "https://zalo.me/0905xxxxxx"
    branches: [    // địa chỉ chi nhánh — chưa có trong dữ liệu
      { name: "Chi nhánh KĐT FPT", address: "" },
      { name: "Chi nhánh Hòa Khánh", address: "" },
      { name: "Chi nhánh thứ 3", address: "" }
    ]
  },

  // Người nhận dùng cho bộ lọc
  recipients: [
    { id: "me", label: "Mẹ" },
    { id: "nguoi-thuong", label: "Vợ / người yêu" },
    { id: "ban-be", label: "Bạn bè" },
    { id: "dong-nghiep", label: "Đồng nghiệp" },
    { id: "doi-tac", label: "Khách hàng / đối tác" }
  ],

  products: [
    {
      id: "banh-kem-hoa",
      name: "Bánh kem hoa 20/10",
      tag: "Bánh kem thiết kế",
      desc: "Bánh kem trang trí hoa kem, tông màu nhẹ nhàng. Có thể ghi lời chúc riêng.",
      recipients: ["me", "nguoi-thuong"],
      tint: "#F6DDE0",
      image: "https://drive.google.com/uc?id=1qLwfBldu_hA42OPDw91QDGRBguQ_p2lV&export=view",
      sizes: [
        { label: "14 cm", note: "khoảng 4-6 người", price: 450000 },
        { label: "16 cm", note: "khoảng 6-8 người", price: 550000 },
        { label: "18 cm", note: "khoảng 8-10 người", price: 650000 }
      ]
    },
    {
      id: "bento-loi-nhan",
      name: "Bento cake lời nhắn",
      tag: "Bento cake",
      desc: "Bánh nhỏ trong hộp xinh, vừa cho 1–2 người. Viết lời nhắn ngắn trên mặt bánh.",
      recipients: ["nguoi-thuong", "ban-be"],
      tint: "#F3E6D8",
      image: "https://drive.google.com/uc?id=1IpkgK-1S6qwBMKZF9qbE9GyT7jOXZDjx&export=view",
      sizes: [
        { label: "Bento", note: "1–2 người", price: 180000 }
      ]
    },
    {
      id: "mini-cake",
      name: "Mini cake",
      tag: "Mini cake",
      desc: "Bánh nhỏ, dễ thương, dễ chụp ảnh. Hợp để tặng bạn bè hoặc tặng lẻ trong nhóm.",
      recipients: ["ban-be", "dong-nghiep"],
      tint: "#E8EEDF",
      image: "https://drive.google.com/uc?id=1rPNALL_k7zJ25bfsCFNPhPZdDd0yYSpP&export=view",
      sizes: [
        { label: "Mini", note: "kích thước 10cm", price: 120000 }
      ]
    },
    {
      id: "set-cupcake",
      name: "Set cupcake 20/10",
      tag: "Cupcake",
      desc: "Hộp cupcake trang trí hoa, dễ chia phần cho cả phòng ban hoặc nhóm bạn.",
      recipients: ["dong-nghiep", "ban-be"],
      tint: "#F7E3EC",
      image: "https://drive.google.com/uc?id=1TjsZNZfF3oGmMrehdUBJVLXXk2TJSSBF&export=view",
      sizes: [
        { label: "Hộp 6", note: "6 bánh", price: 250000 },
        { label: "Hộp 9", note: "9 bánh", price: 350000 },
        { label: "Hộp 12", note: "12 bánh", price: 450000 }
      ]
    },
    {
      id: "hop-qua-cookies",
      name: "Hộp quà bánh & cookies",
      tag: "Hộp quà",
      desc: "Hộp quà kết hợp bánh ngọt và cookies icing, kèm thiệp. Gọn gàng, dễ trao tay.",
      recipients: ["me", "doi-tac", "dong-nghiep"],
      tint: "#EFE4F2",
      image: "https://drive.google.com/uc?id=12VmMFeckCRZQyKTfGl3NdHnSmHG0pI76&export=view",
      sizes: [
        { label: "Hộp nhỏ", note: "3-4 items", price: 280000 },
        { label: "Hộp lớn", note: "6-8 items", price: 450000 }
      ]
    },
    {
      id: "qua-doanh-nghiep",
      name: "Set quà doanh nghiệp",
      tag: "Quà tặng doanh nghiệp",
      desc: "Set quà theo ngân sách, tùy chỉnh màu sắc, thông điệp, in logo, thiệp và túi. Báo giá theo số lượng.",
      recipients: ["dong-nghiep", "doi-tac"],
      tint: "#E3ECEF",
      image: "https://drive.google.com/uc?id=10y4E5Y3p7yLOK9CzuKKHHA81U51jvXBa&export=view",
      bulk: true,
      sizes: [
        { label: "Theo ngân sách", note: "tư vấn riêng", price: null }
      ]
    }
  ]
};
