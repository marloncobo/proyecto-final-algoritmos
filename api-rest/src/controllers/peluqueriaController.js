const pool = require('../config/database'); // conexión a la base de datos

exports.registrarPeluqueria = async (req, res) => {
  const { nombre, telefono, mascota, raza, servicio, fecha, comentarios } = req.body;

  try {
    // Validar que la fecha no esté ocupada
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }

    const [result] = await pool.query(
      'INSERT INTO peluqueria (nombre, telefono, mascota, raza, servicio, fecha, comentarios) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, telefono, mascota, raza, servicio, fecha, comentarios]
    );
    res.status(201).json({ message: 'Cita de peluquería registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al guardar cita de peluquería:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM peluqueria');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener citas de peluquería:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};