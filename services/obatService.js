const axios = require('axios');
const db = require('../config/db');

const fetchDataAndSave = async () => {
  try {
    const response = await axios.get('http://localhost:3306/data');
    const data = response.data;

    const insertPromises = data.map(item => {
      const obatQuery = 'INSERT INTO obat (nama_obat, kategori_obat, dosis, penggunaan_utama, penyakit_terkait, efek_samping) VALUES (?, ?, ?, ?, ?, ?)';
      const konsultasiQuery = 'INSERT INTO konsultasi (obat_id, teks_konsultasi) VALUES (?, ?)';

      return new Promise((resolve, reject) => {
        db.query(obatQuery, [item.nama_obat, item.kategori_obat, item.dosis, item.penggunaan_utama, item.penyakit_terkait, item.efek_samping], (err, obatResult) => {
          if (err) return reject(err);
          console.log('Obat data inserted:', obatResult.insertId);
          
          db.query(konsultasiQuery, [obatResult.insertId, item.teks_konsultasi], (err, konsultasiResult) => {
            if (err) return reject(err);
            console.log('Konsultasi data inserted:', konsultasiResult.insertId);
            resolve();
          });
        });
      });
    });

    await Promise.all(insertPromises);
    return 'Data fetched and saved successfully';
  } catch (error) {
    throw new Error('Error fetching data');
  }
};

const getAllObat = (callback) => {
  const query = 'SELECT * FROM obat';
  db.query(query, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

module.exports = {
  fetchDataAndSave,
  getAllObat
};
