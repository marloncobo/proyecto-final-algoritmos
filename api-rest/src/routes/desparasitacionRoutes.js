const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // conexión a la base de datos

router.post('/', async (req, res) => {
  const { nombre, email, telefono, mascota, tipo, mensaje } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO desparasitacion (nombre, email, telefono, mascota, tipo, mensaje) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, telefono, mascota, tipo, mensaje]
    );
    res.status(201).json({ message: 'Solicitud de desparasitación registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al guardar solicitud de desparasitación:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM desparasitacion');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener solicitudes de desparasitación:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
// Exportamos el router para que pueda ser utilizado en otros archivos
// (por ejemplo, en el archivo app.js)