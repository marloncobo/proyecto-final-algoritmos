const express = require('express');
const router = express.Router();
const vacunaController = require('../controllers/vacunaController');

router.post('/', vacunaController.crearRegistro);
router.get('/', vacunaController.obtenerRegistros);

module.exports = router;