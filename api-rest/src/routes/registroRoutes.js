const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registroController');

router.post('/', registroController.crearRegistro);
router.get('/', registroController.obtenerRegistros);

module.exports = router;
// Exportamos el router para que pueda ser utilizado en otros archivos
// (por ejemplo, en el archivo app.js)