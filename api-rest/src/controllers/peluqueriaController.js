const pool = require('../config/database'); // conexión a la base de datos

exports.registrarPeluqueria = async (req, res) => {
  const { nombre_cliente, telefono, nombre_mascota, servicios_seleccionados, fecha_cita } = req.body;

  try {
    // Validar que la fecha no esté ocupada
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha_cita]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }
    // Guardar la cita de peluquería
    const [cita] = await pool.query(
      'INSERT INTO citas (nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle) VALUES (?, ?, ?, ?, ?)',
      [nombre_cliente, nombre_mascota, 'peluqueria', fecha_cita, '']
    );

    const [result] = await pool.query(
      'INSERT INTO servicios_peluqueria (nombre_cliente, telefono, nombre_mascota, servicios_seleccionados, fecha_cita) VALUES (?, ?, ?, ?, ?)',
      [nombre_cliente, telefono, nombre_mascota, servicios_seleccionados, fecha_cita]
    );
    res.status(201).json({ message: 'Cita de peluquería registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al guardar cita de peluquería:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.obtenerCitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM servicios_peluqueria');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener citas de peluquería:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};