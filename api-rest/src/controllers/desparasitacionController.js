const pool = require('../config/database'); // conexión a la base de datos

exports.registrarDesparasitacion = async (req, res) => {
  const { nombre, email, telefono, mascota, tipo, mensaje, fecha_desparasitacion } = req.body;

  try {
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha_desparasitacion]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }

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
}
exports.obtenerCitas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM desparasitacion');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener solicitudes de desparasitación:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};