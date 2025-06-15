const express = require('express');
const router = express.Router();
const cirugiaController = require('../controllers/cirugiaController');

router.post('/', cirugiaController.registrarCirugia);
router.get('/', cirugiaController.obtenerCirugias);

module.exports = router;