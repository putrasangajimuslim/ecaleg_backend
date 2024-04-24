const connection = require('./db');
const moment = require('moment-timezone');

const kabupatenController = {
    getAllData: async function(req, res) {
        try {
            const sql = 'SELECT * FROM kabupaten WHERE deleted_at IS NULL ORDER BY id ASC';
            connection.query(sql, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    const formattedData = {
                        kabupaten: result.map(item => ({
                            id: item.id,
                            kd_kabupaten: item.kd_kabupaten,
                            kabupaten: item.kabupaten,
                            jumlah_kursi: item.jumlah_kursi,
                        }))
                    };
                  
                    res.json({data: formattedData});
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createKabupaten: async function(req, res) {
        const requestData = req.body;

        var kodekab = requestData.kd_kabupaten;
        var kab = requestData.kabupaten;
        var jmldpt = requestData.jumlah_kursi;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'INSERT INTO kabupaten (kd_kabupaten, kabupaten, jumlah_kursi, created_at) VALUES (?, ?, ?, ?)';
            const values = [kodekab, kab, jmldpt, clientTimeZone];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kabupaten created successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateKabupaten: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var kodekab = requestData.kd_kabupaten;
        var kab = requestData.kabupaten;
        var jmldpt = requestData.jumlah_kursi;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kabupaten SET kd_kabupaten = ?, kabupaten = ?, jumlah_kursi = ?, updated_at = ? WHERE id = ?';
            const values = [kodekab, kab, jmldpt, clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kabupaten updated successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteKabupaten: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE kabupaten SET deleted_at = ? WHERE id = ?';
            const values = [clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Kabupaten Delete successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = kabupatenController;