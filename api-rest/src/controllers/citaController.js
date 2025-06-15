const pool = require('../config/database');

exports.crearCita = async (req, res) => {
  const { nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle } = req.body;

  try {
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha_cita]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }

    const [result] = await pool.query(
      'INSERT INTO citas (nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle) VALUES (?, ?, ?, ?, ?)',
      [nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle]
    );

    res.status(201).json({ message: 'Cita agendada correctamente', id: result.insertId });
  } catch (error) {
    console.error('Error al agendar cita:', error);
    res.status(500).json({ message: 'Error al agendar la cita' });
  }
};

exports.listarCitas = async (req, res) => {
  try {
    const [citas] = await pool.query('SELECT * FROM citas ORDER BY fecha_cita ASC');
    res.json(citas);
  } catch (error) {
    console.error('Error al listar citas:', error);
    res.status(500).json({ message: 'Error al obtener citas' });
  }
};

exports.eliminarCita = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM citas WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.json({ message: 'Cita eliminada' });
  } catch (error) {
    console.error('Error al eliminar cita:', error);
    res.status(500).json({ message: 'Error al eliminar cita' });
  }
};