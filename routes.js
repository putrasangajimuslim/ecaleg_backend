const express = require('express');
const router = express.Router();
const kabupatencontroller = require('./kabupatencontroller');
const kecamatancontroller = require('./kecamatancontroller');
const kelurahancontroller = require('./kelurahancontroller');

router.get('/kabupaten', kabupatencontroller.getAllData);
router.post('/kabupaten/add', kabupatencontroller.createKabupaten);
router.post('/kabupaten/update', kabupatencontroller.updateKabupaten);
router.post('/kabupaten/delete', kabupatencontroller.deleteKabupaten);

router.get('/kecamatan', kecamatancontroller.getAllData);
router.post('/kecamatan/add', kecamatancontroller.createKecamatan);
router.post('/kecamatan/update', kecamatancontroller.updateKecamatan);
router.post('/kecamatan/delete', kecamatancontroller.deleteKecamatan);

router.get('/kelurahan', kelurahancontroller.getAllData);
router.post('/kelurahan/add', kelurahancontroller.createKelurahan);
router.post('/kelurahan/update', kelurahancontroller.updateKelurahan);
router.post('/kelurahan/delete', kelurahancontroller.deleteKelurahan);

module.exports = router;