const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // conexión a la base de datos

router.post('/', async (req, res) => {
  const { nombre, email, telefono, mascota, tipo, mensaje, fecha_desparasitacion } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO desparasitacion (nombre, email, telefono, mascota, tipo, mensaje, fecha_Des) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, email, telefono, mascota, tipo, mensaje, fecha_desparasitacion]
    );

    //Guardar en la tabla de citas
    const [cita] = await pool.query(
      'INSERT INTO citas (nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle) VALUES (?, ?, ?, ?, ?)',
      [nombre, mascota, 'desparasitacion', fecha_desparasitacion, mensaje]
    );

    res.status(201).json({ 
      message: 'Solicitud de desparasitación registrada',
      id: result.insertId,
      id_cita: cita.insertId
    });
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