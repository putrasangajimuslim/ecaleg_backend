const connection = require('./db');
const moment = require('moment-timezone');

const kabupatenController = {
    getAllData: async function(req, res) {
        try {
            const sql = 'SELECT kelurahan.*, kecamatan.kecamatan AS nama_kec FROM kelurahan INNER JOIN kecamatan ON kecamatan.id = kelurahan.id_kecamatan WHERE kelurahan.deleted_at IS NULL';
            connection.query(sql, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    const formattedData = {
                        kelurahan: result.map(item => ({
                          id: item.id,
                          id_kecamatan: item.id_kecamatan,
                          nama_kecamatan: item.nama_kec,
                          kelurahan: item.kelurahan,
                        }))
                      };
                  
                    res.json({data: formattedData});
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createKelurahan: async function(req, res) {
        const requestData = req.body;

        var kodekec = requestData.id_kecamatan;
        var kelurahan = requestData.kelurahan;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'INSERT INTO kelurahan (id_kecamatan, kelurahan, created_at) VALUES (?, ?, ?)';
            const values = [kodekec, kelurahan, clientTimeZone];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kelurahan created successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateKelurahan: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var kodekec = requestData.id_kecamatan;
        var kel = requestData.kelurahan;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kelurahan SET id_kecamatan = ?, kelurahan = ?, updated_at = ? WHERE id = ?';
            const values = [kodekec, kel, clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kelurahan updated successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteKelurahan: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kelurahan SET deleted_at = ? WHERE id = ?';
            const values = [clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kelurahan Delete successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = kabupatenController;