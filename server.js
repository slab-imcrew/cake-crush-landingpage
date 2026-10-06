import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database(join(__dirname, 'cake-crush.db'));

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      product TEXT NOT NULL,
      size TEXT,
      quantity INTEGER NOT NULL,
      date TEXT NOT NULL,
      note TEXT,
      payment_status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.post('/api/submit', (req, res) => {
  const { name, phone, product, size, quantity, date, note } = req.body;

  if (!name || !phone || !product || !quantity || !date) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  db.run(
    `INSERT INTO submissions (name, phone, product, size, quantity, date, note) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [name, phone, product, size, quantity, date, note],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID, message: 'Đã lưu đơn hàng thành công' });
    }
  );
});

app.post('/api/generate-qr', async (req, res) => {
  const { name, phone, amount = 100000 } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Cần tên và số điện thoại' });
  }

  const content = `${name}${phone}`;
  const bankCode = 'ACB';
  const accountNo = '833336666';

  try {
    const response = await axios.get('https://qr.sepay.vn/img', {
      params: {
        bank: bankCode,
        account: accountNo,
        amount: amount,
        template: 'compact2',
        description: content
      }
    });

    res.json({
      success: true,
      qrUrl: response.config.url,
      imageUrl: `https://qr.sepay.vn/img?bank=${bankCode}&account=${accountNo}&amount=${amount}&template=compact2&description=${encodeURIComponent(content)}`,
      details: {
        bank: 'ACB',
        account: accountNo,
        amount: amount,
        description: content
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Không thể tạo QR code', details: error.message });
  }
});

app.get('/api/admin/check-password', (req, res) => {
  const { password } = req.query;
  if (password === '1988') {
    res.json({ success: true, message: 'Đăng nhập thành công' });
  } else {
    res.status(401).json({ success: false, message: 'Mật khẩu sai' });
  }
});

app.get('/api/admin/submissions', (req, res) => {
  const { password } = req.query;

  if (password !== '1988') {
    return res.status(401).json({ error: 'Mật khẩu không đúng' });
  }

  db.all(
    `SELECT * FROM submissions ORDER BY created_at DESC`,
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ data: rows, total: rows.length });
    }
  );
});

app.put('/api/admin/submissions/:id', (req, res) => {
  const { password } = req.query;
  const { id } = req.params;
  const { payment_status } = req.body;

  if (password !== '1988') {
    return res.status(401).json({ error: 'Mật khẩu không đúng' });
  }

  db.run(
    `UPDATE submissions SET payment_status = ? WHERE id = ?`,
    [payment_status, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, message: 'Cập nhật thành công' });
    }
  );
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
