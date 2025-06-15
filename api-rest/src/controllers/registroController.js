const pool = require('../config/database');

exports.crearRegistro = async (req, res) => {
  const { nombre, email, telefono, mascota, edad, fecha_hora } = req.body;
  try {
    // Validar que no exista un registro con la misma fecha y hora
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha_hora]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO registros (nombre, email, telefono, mascota, edad, fecha_hora) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, email, telefono, mascota, edad, fecha_hora]
    );
    res.status(201).json({ message: 'Registro guardado', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
exports.obtenerRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM registros');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener registros:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};