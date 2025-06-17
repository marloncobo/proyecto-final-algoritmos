const express = require('express');
const router = express.Router();
const desparasitacionController = require('../controllers/desparasitacionController');

router.post('/', desparasitacionController.registrarDesparasitacion);
router.get('/', desparasitacionController.obtenerCitas);

module.exports = router;
// Exportamos el router para que pueda ser utilizado en otros archivos
// (por ejemplo, en el archivo app.js)