const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

router.post('/', contactoController.crearRegistro);
router.get('/', contactoController.obtenerRegistros);

module.exports = router;