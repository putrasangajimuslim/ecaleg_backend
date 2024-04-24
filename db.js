// db.js

const mysql = require('mysql');

// Konfigurasi koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'ecaleg_daerah'
});

// Koneksi ke database
connection.connect((err) => {
  if (err) {
      console.error('Error connect database:', err);
      // Tidak ada res di sini karena ini adalah modul koneksi database
  } else {
      console.log('Berhasil terhubung ke database');
  }
});

module.exports = connection;