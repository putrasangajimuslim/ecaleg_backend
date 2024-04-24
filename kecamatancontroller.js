const connection = require('./db');
const moment = require('moment-timezone');

const kecamatanController = {
    getAllData: async function(req, res) {
        try {
            const sql = 'SELECT kecamatan.*, kabupaten.kabupaten AS nama_kab FROM kecamatan INNER JOIN kabupaten ON kabupaten.id = kecamatan.id_kabupaten WHERE kecamatan.deleted_at IS NULL';
            connection.query(sql, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    const formattedData = {
                        kecamatan: result.map(item => ({
                          id: item.id,
                          id_kabupaten: item.id_kabupaten,
                          nama_kabupaten: item.nama_kab,
                          kecamatan: item.kecamatan,
                          kode_kecamatan: item.kode_kecamatan,
                          jumlah_dpt: item.jumlah_dpt,
                        }))
                      };
                  
                    res.json({data: formattedData});
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createKecamatan: async function(req, res) {
        const requestData = req.body;
    
        var kodekab = requestData.id_kabupaten;
        var kodekec = requestData.kode_kecamatan;
        var kec = requestData.kecamatan;
        var jmldpt = requestData.jumlah_dpt;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'INSERT INTO kecamatan (id_kabupaten, kecamatan, kode_kecamatan, jumlah_dpt, created_at) VALUES (?, ?, ?, ?, ?)';
            const values = [kodekab, kec, kodekec, jmldpt, clientTimeZone];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kecamatan created successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateKecamatan: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var kodekab = requestData.id_kabupaten;
        var kodekec = requestData.kode_kecamatan;
        var kec = requestData.kecamatan;
        var jmldpt = requestData.jumlah_dpt;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kecamatan SET id_kabupaten = ?, kecamatan = ?, kode_kecamatan = ?, jumlah_dpt = ?, updated_at = ? WHERE id = ?';
    
            const values = [kodekab, kec, kodekec, jmldpt, clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kecamatan updated successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteKecamatan: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kecamatan SET deleted_at = ? WHERE id = ?';
            const values = [clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kecamatan Delete successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = kecamatanController;