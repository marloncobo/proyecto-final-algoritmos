const pool = require('../config/database');

exports.crearRegistro = async (req, res) => {
  const { nombre, email, telefono, mascota, edad, fecha_hora } = req.body;
  try {
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