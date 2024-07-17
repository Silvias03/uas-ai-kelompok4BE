// const express = require('express');
// const axios = require('axios');
// const mysql = require('mysql');

// const app = express();
// const port = 3000;

// // Konfigurasi koneksi database
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "db_konsultasiobat"
// });

// db.connect(err => {
//   if (err) throw err;
//   console.log('Database connected!');
// });

// // Rute untuk mengambil data dari API lokal dan menyimpannya ke database
// app.get('/fetch-and-save', async (req, res) => {
//   try {
//     // Misalkan API lokal http://localhost:3306/data
//     const response = await axios.get('http://localhost:3306/data');
//     const data = response.data;

//     // Menggunakan Promise.all untuk menangani operasi async
//     const insertPromises = data.map(item => {
//       // Menyimpan data ke tabel obat
//       const obatQuery = 'INSERT INTO obat (nama_obat, kategori_obat, dosis, penggunaan_utama, penyakit_terkait, efek_samping) VALUES (?, ?, ?, ?)';
//       const konsultasiQuery = 'INSERT INTO konsultasi (obat_id, teks_konsultasi) VALUES (?, ?, ?, ?)';

//       return new Promise((resolve, reject) => {
//         db.query(obatQuery, [item.nama_obat, item.kategori_obat, item.dosis, item.penggunaan_utama, item.penyakit_terkait, item.efek_samping], (err, obatResult) => {
//           if (err) return reject(err);
//           console.log('Obat data inserted:', obatResult.insertId);
          
//           // Lanjutkan menyimpan data konsultasi setelah obat berhasil disimpan
//           db.query(konsultasiQuery, [item.obat_id, obatResult.insertId, item.teks_konsultasi], (err, konsultasiResult) => {
//             if (err) return reject(err);
//             console.log('Konsultasi data inserted:', konsultasiResult.insertId);
//             resolve();
//           });
//         });
//       });
//     });

//     await Promise.all(insertPromises);

//     res.send('Data fetched and saved successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error fetching data');
//   }
// });

// // Menambahkan endpoint untuk mendapatkan data dari tabel obat
// app.get('/obat', (req, res) => {
//   const query = 'SELECT * FROM obat';
//   db.query(query, (err, results) => {
//     if (err) {
//       console.error(err);
//       res.status(500).send('Error fetching data');
//       return;
//     }
//     res.json(results);
//   });
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port http://localhost:${port}`);
//   })