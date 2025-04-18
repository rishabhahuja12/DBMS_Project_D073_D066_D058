const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Set your MySQL password
    database: 'hy', // <-- Replace with your actual database name
    port: "3000"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database!");
});

module.exports = connection;

const http = require('http');

// Create server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello, Node.js!");
});

// Start server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
