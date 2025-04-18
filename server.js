const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const mysql = require('mysql2');

// 1️⃣ MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'hy'
});

connection.connect(err => {
  if (err) {
    console.error('❌ MySQL Connection Failed:', err.stack);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');
});

// 2️⃣ Create HTTP server
const server = http.createServer((req, res) => {
  // ── Static file serving & HTML pages ─────────────────────────────
  if (req.method === 'GET') {
    let file = null;
    if (req.url === '/' || req.url === '/createaccountt.html') {
      file = path.join(__dirname, 'html', 'createaccountt.html');
    } else if (req.url === '/finalreg.html') {
      file = path.join(__dirname, 'html', 'finalreg.html');
    }

    if (file) {
      return fs.readFile(file, (err, data) => {
        res.writeHead(err ? 500 : 200, { 'Content-Type': 'text/html' });
        return res.end(err ? `Error loading ${file}` : data);
      });
    }

    // static assets (css, js, images)
    let filePath;
    
    // Check if the request is for views folder content
    if (req.url.startsWith('/views/')) {
      filePath = path.join(__dirname, req.url);
    } 
    // Check if the request is for css, js or images without the /views/ prefix
    else if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico)$/)) {
      filePath = path.join(__dirname, 'views', req.url);
    } 
    // Other HTML files
    else if (req.url.match(/\.html$/)) {
      filePath = path.join(__dirname, 'html', req.url);
    }
    // Default fallback
    else {
      filePath = path.join(__dirname, req.url);
    }

    const ext = path.extname(filePath);
    const contentType = {
      '.css': 'text/css',
      '.js': 'application/javascript',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    }[ext] || 'text/plain';

    return fs.readFile(filePath, (err, data) => {
      res.writeHead(err ? 404 : 200, { 'Content-Type': contentType });
      res.end(err ? 'File not found' : data);
    });
  }

  // ── SIGN UP ───────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/register') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { ['signup-name']: name, ['signup-email']: email, ['signup-password']: password } = querystring.parse(body);

      const insertQuery = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)';
      connection.query(insertQuery, [name, email, password], err => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        if (err) {
          return res.end(`
            <h2>❌ Signup failed: ${err.message}</h2>
            <a href="/createaccountt.html">Back</a>
          `);
        }
        return res.end(`
          <h2>✅ Signup successful! Now login to continue.</h2>
          <a href="/createaccountt.html">Go to Login</a>
        `);
      });
    });
    return;
  }

  // ── LOGIN ─────────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/login') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { ['login-email']: email, ['login-password']: password } = querystring.parse(body);

      const checkQuery = 'SELECT * FROM users WHERE email = ? AND password = ?';
      connection.query(checkQuery, [email, password], (err, results) => {
        if (err || results.length === 0) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          return res.end(`
            <h2>❌ User does not exist or incorrect password.</h2>
            <a href="/createaccountt.html">Back</a>
          `);
        }
        // successful login → redirect to appointment page
        res.writeHead(302, { Location: '/finalreg.html' });
        res.end();
      });
    });
    return;
  }

  // ── BOOK APPOINTMENT ───────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/book') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = querystring.parse(body);
      const sql = `
        INSERT INTO appointments
          (name, gender, age, disease, description, blood, address, email, phone, appointment_date, appointment_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const vals = [
        data.name, data.gender, data.age, data.disease,
        data.description, data.blood, data.address,
        data.email, data.phone,
        data['appointment-date'], data['appointment-time']
      ];

      connection.query(sql, vals, err => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('❌ Error booking appointment: ' + err.message);
        }
        // popup + redirect back to finalreg.html
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
          <script>
            alert("✅ Appointment booked successfully!");
            window.location.href = "/finalreg.html";
          </script>
        `);
      });
    });
    return;
  }

  // ── FALLBACK ───────────────────────────────────────────────────────
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 - Not Found');
});

// 3️⃣ Start server
server.listen(3000, () => {
  console.log('🌐 Server running at http://localhost:3000');
});
