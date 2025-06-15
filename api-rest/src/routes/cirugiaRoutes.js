const express = require('express');
const router = express.Router();
const cirugiaController = require('../controllers/cirugiaController');

router.post('/', cirugiaController.registrarCirugia);

module.exports = router;