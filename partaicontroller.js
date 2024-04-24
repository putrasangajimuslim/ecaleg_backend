const connection = require('./db');
const moment = require('moment-timezone');

const kabupatenController = {
    getAllData: async function(req, res) {
        try {
            const sql = 'SELECT * FROM partai WHERE deleted_at IS NULL';
            connection.query(sql, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    const formattedData = {
                        partai: result.map(item => ({
                          id: item.id,
                          partai: item.partai,
                          logo: item.logo,
                          keterangan: item.keterangan,
                        }))
                      };
                  
                    res.json({data: formattedData});
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createPartai: async function(req, res) {
        const requestData = req.body;

        var partai = requestData.partai;
        var keterangan = requestData.keterangan;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'INSERT INTO partai (partai, keterangan, created_at) VALUES (?, ?, ?)';
            const values = [partai, keterangan, clientTimeZone];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Partai created successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updatePartai: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var partai = requestData.partai;
        var keterangan = requestData.keterangan;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE partai SET partai = ?, keterangan = ?, updated_at = ? WHERE id = ?';
            const values = [partai, keterangan, clientTimeZone, id];

            connection.query(sql, values, (err, result) => {
                if (err) {
                    res.status(500).json({ message: err.message });
                } else {
                    res.status(201).json({ message: 'Partai updated successfully', result });
                }
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deletePartai: async function(req, res) {
        const requestData = req.body;

        var id = requestData.id;
        var clientTimeZone = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

        try {
            const sql = 'UPDATE partai SET deleted_at = ? WHERE id = ?';
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