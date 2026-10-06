(function () {
  "use strict";

  var cfg = window.CC_CONFIG;
  var TODO = '<mark class="todo">[Cần bổ sung]</mark>';
  var CAKE_SVG =
    '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M32 6c2 3 2 5 0 7-2-2-2-4 0-7z"/><path d="M32 13v7"/>' +
    '<rect x="14" y="20" width="36" height="14" rx="3"/>' +
    '<path d="M14 27c4 3 8 3 12 0s8-3 12 0 8 3 12 0"/>' +
    '<rect x="8" y="34" width="48" height="18" rx="3"/>' +
    '<path d="M8 42c4 3 8 3 12 0s8-3 12 0 8 3 12 0 8 3 12 0"/><path d="M4 56h56"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // "___" trong dữ liệu = chỗ trống chờ bổ sung
  function fill(s) {
    return esc(s).replace(/_{3,}/g, '<mark class="todo">___</mark>');
  }
  function formatPrice(v) {
    return v.toLocaleString("vi-VN") + "đ";
  }
  function priceHtml(size, product) {
    if (typeof size.price === "number") return '<span class="price">' + formatPrice(size.price) + "</span>";
    if (product.bulk) return '<span class="price price--na">Báo giá theo số lượng</span>';
    return '<span class="price price--na">Giá: ' + TODO + "</span>";
  }
  function recipientLabels(ids) {
    return ids.map(function (id) {
      var r = cfg.recipients.find(function (x) { return x.id === id; });
      return r ? r.label : id;
    }).join(", ");
  }

  /* ---------- Draft mode ---------- */
  if (cfg.DRAFT_MODE) {
    document.body.classList.add("is-draft");
    document.getElementById("draftBanner").hidden = false;
  }

  /* ---------- Placeholder images ---------- */
  document.querySelectorAll(".hero__img[data-ph]").forEach(function (el) { el.innerHTML = CAKE_SVG; });

  /* ---------- Filters ---------- */
  var filtersEl = document.getElementById("filters");
  var activeFilter = "all";
  var chips = [{ id: "all", label: "Tất cả" }].concat(cfg.recipients);
  filtersEl.innerHTML = chips.map(function (c) {
    return '<button type="button" class="chip" data-filter="' + esc(c.id) + '" aria-pressed="' + (c.id === "all") + '">' + esc(c.label) + "</button>";
  }).join("");
  filtersEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".chip");
    if (!btn) return;
    activeFilter = btn.dataset.filter;
    filtersEl.querySelectorAll(".chip").forEach(function (b) { b.setAttribute("aria-pressed", b === btn); });
    applyFilter();
  });

  /* ---------- Products ---------- */
  var grid = document.getElementById("productGrid");
  grid.innerHTML = cfg.products.map(function (p) {
    var img = p.image
      ? '<div class="product__img"><img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy"></div>'
      : '<div class="product__img" data-ph="Ảnh minh hoạ" style="--ph-tint:' + esc(p.tint) + '">' + CAKE_SVG + "</div>";
    var sizes = p.sizes.map(function (s, i) {
      return '<button type="button" class="size" data-i="' + i + '" aria-pressed="' + (i === 0) + '">' + esc(s.label) + "</button>";
    }).join("");
    return (
      '<article class="product" data-id="' + esc(p.id) + '" data-recipients="' + esc(p.recipients.join(" ")) + '">' +
        img +
        '<div class="product__body">' +
          '<p class="product__tag">' + esc(p.tag) + "</p>" +
          '<h3 class="product__name">' + esc(p.name) + "</h3>" +
          '<p class="product__desc">' + fill(p.desc) + "</p>" +
          '<p class="product__for">Hợp tặng: ' + esc(recipientLabels(p.recipients)) + "</p>" +
          '<fieldset class="sizes"><legend>Kích thước</legend>' + sizes + "</fieldset>" +
          '<div class="product__price"><span class="js-price">' + priceHtml(p.sizes[0], p) + '</span><span class="size-note js-note">' + fill(p.sizes[0].note) + "</span></div>" +
          '<button type="button" class="btn btn--primary js-pick">' + (p.bulk ? "Nhận báo giá" : "Chọn mẫu này") + "</button>" +
        "</div>" +
      "</article>"
    );
  }).join("");

  function getProduct(id) {
    return cfg.products.find(function (p) { return p.id === id; });
  }

  grid.addEventListener("click", function (e) {
    var card = e.target.closest(".product");
    if (!card) return;
    var p = getProduct(card.dataset.id);

    var sizeBtn = e.target.closest(".size");
    if (sizeBtn) {
      var s = p.sizes[+sizeBtn.dataset.i];
      card.querySelectorAll(".size").forEach(function (b) { b.setAttribute("aria-pressed", b === sizeBtn); });
      card.querySelector(".js-price").innerHTML = priceHtml(s, p);
      card.querySelector(".js-note").innerHTML = fill(s.note);
      return;
    }

    if (e.target.closest(".js-pick")) {
      var pressed = card.querySelector('.size[aria-pressed="true"]');
      selectProduct(p.id, pressed ? +pressed.dataset.i : 0);
      document.getElementById("tu-van").scrollIntoView();
      setTimeout(function () { document.getElementById("name").focus({ preventScroll: true }); }, 400);
    }
  });

  function applyFilter() {
    var shown = 0;
    grid.querySelectorAll(".product").forEach(function (card) {
      var match = activeFilter === "all" || card.dataset.recipients.split(" ").indexOf(activeFilter) !== -1;
      card.hidden = !match;
      if (match) shown++;
    });
    document.getElementById("emptyState").hidden = shown > 0;
  }

  /* ---------- Form ---------- */
  var form = document.getElementById("leadForm");
  var productSel = document.getElementById("product");
  var sizeSel = document.getElementById("size");
  var dateInput = document.getElementById("date");

  productSel.insertAdjacentHTML("beforeend",
    cfg.products.map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(p.name) + "</option>"; }).join("") +
    '<option value="khac">Chưa chọn được, cần tư vấn</option>');

  function fillSizes(productId, sizeIndex) {
    var p = getProduct(productId);
    sizeSel.innerHTML = '<option value="">Chưa chọn</option>' + (p ? p.sizes.map(function (s, i) {
      return '<option value="' + esc(s.label) + '"' + (i === sizeIndex ? " selected" : "") + ">" + esc(s.label) + "</option>";
    }).join("") : "");
    sizeSel.disabled = !p;
  }
  function selectProduct(id, sizeIndex) {
    productSel.value = id;
    fillSizes(id, sizeIndex);
    clearError("product");
  }
  productSel.addEventListener("change", function () { fillSizes(productSel.value, 0); });
  fillSizes("", -1);

  function todayISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }
  dateInput.min = todayISO();

  function setError(name, msg) {
    var el = form.querySelector('.err[data-for="' + name + '"]');
    el.textContent = msg;
    el.closest(".field").classList.add("has-error");
  }
  function clearError(name) {
    var el = form.querySelector('.err[data-for="' + name + '"]');
    if (!el) return;
    el.textContent = "";
    el.closest(".field").classList.remove("has-error");
  }
  form.addEventListener("input", function (e) { if (e.target.name) clearError(e.target.name); });

  function validate(data) {
    var ok = true;
    if (data.name.trim().length < 2) { setError("name", "Vui lòng nhập họ tên."); ok = false; }
    var phone = data.phone.replace(/[\s.\-]/g, "");
    if (!/^(0|\+84)(3|5|7|8|9)\d{8}$/.test(phone)) { setError("phone", "Số điện thoại chưa đúng (10 số, ví dụ 0905123456)."); ok = false; }
    if (!data.product) { setError("product", "Vui lòng chọn sản phẩm."); ok = false; }
    var q = Number(data.quantity);
    if (!Number.isInteger(q) || q < 1) { setError("quantity", "Số lượng tối thiểu là 1."); ok = false; }
    if (!data.date) { setError("date", "Vui lòng chọn ngày cần nhận."); ok = false; }
    else if (data.date < todayISO()) { setError("date", "Ngày nhận phải từ hôm nay trở đi."); ok = false; }
    return ok;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    if (!validate(data)) {
      var firstErr = form.querySelector(".has-error input, .has-error select");
      if (firstErr) firstErr.focus();
      return;
    }
    var p = getProduct(data.product);
    var lead = {
      name: data.name.trim(),
      phone: data.phone.trim(),
      product: p ? p.name : "Cần tư vấn",
      size: data.size || "",
      quantity: Number(data.quantity),
      date: data.date,
      note: (data.note || "").trim(),
      source: "landing-20-10",
      createdAt: new Date().toISOString()
    };

    var btn = document.getElementById("submitBtn");
    btn.disabled = true;
    btn.textContent = "Đang gửi...";

    send(lead).then(function () {
      document.getElementById("successPhone").textContent = lead.phone;
      document.getElementById("formSuccess").hidden = false;
    }).catch(function () {
      alert("Chưa gửi được yêu cầu. Bạn thử lại hoặc nhắn fanpage Cake Crush nhé.");
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = "Gửi yêu cầu tư vấn";
    });
  });

  // TODO: khi có FORM_ENDPOINT, dữ liệu được POST dạng JSON tới endpoint đó.
  function send(lead) {
    if (cfg.FORM_ENDPOINT) {
      return fetch(cfg.FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead)
      }).then(function (r) { if (!r.ok) throw new Error(r.status); });
    }
    // Chưa có endpoint: lưu tạm trên trình duyệt để chạy thử
    try {
      var list = JSON.parse(localStorage.getItem("cc_leads_2010") || "[]");
      list.push(lead);
      localStorage.setItem("cc_leads_2010", JSON.stringify(list));
    } catch (err) { /* bỏ qua nếu trình duyệt chặn storage */ }
    console.info("[Cake Crush] Lead (chưa kết nối FORM_ENDPOINT):", lead);
    return new Promise(function (resolve) { setTimeout(resolve, 400); });
  }

  document.getElementById("newRequest").addEventListener("click", function () {
    form.reset();
    fillSizes("", -1);
    document.getElementById("formSuccess").hidden = true;
    document.getElementById("name").focus();
  });

  /* ---------- Contact & branches ---------- */
  var c = cfg.contact;
  var links = ['<a href="' + esc(c.fanpage) + '" target="_blank" rel="noopener">Fanpage</a>'];
  links.push(c.zalo ? '<a href="' + esc(c.zalo) + '" target="_blank" rel="noopener">Zalo</a>' : "Zalo " + TODO);
  links.push(c.hotline ? '<a href="tel:' + esc(c.hotline.replace(/\s/g, "")) + '">' + esc(c.hotline) + "</a>" : "Hotline " + TODO);
  document.getElementById("altContact").innerHTML = links.join(" · ");

  document.getElementById("branches").innerHTML = c.branches.map(function (b) {
    return "<li>" + esc(b.name) + ": " + (b.address ? esc(b.address) : TODO) + "</li>";
  }).join("") +
    '<li><a href="' + esc(c.fanpage) + '" target="_blank" rel="noopener">Facebook</a> · <a href="' + esc(c.tiktok) + '" target="_blank" rel="noopener">TikTok</a></li>';
})();
