const pool = require('../config/database'); // conexión a la base de datos

exports.crearRegistro = async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO contacto (name, email, asunto, mensaje) VALUES (?, ?, ?, ?)',
      [nombre, email, asunto, mensaje]
    );
    res.status(201).json({ message: 'Consulta registrada', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar consulta:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.obtenerRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacto');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener consultas:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
// Exportamos las funciones para que puedan ser utilizadas en otros archivos
