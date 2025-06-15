const express = require('express');
const router = express.Router();
const peluqueriaController = require('../controllers/peluqueriaController');

// POST - Registrar cita de peluquería
router.post('/', peluqueriaController.registrarPeluqueria);
router.get('/', peluqueriaController.obtenerCitas);

module.exports = router;