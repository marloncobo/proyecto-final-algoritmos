const pool = require('../config/database');

exports.registrarCirugia = async (req, res) => {
  const {
    tipo_cirugia,
    nombre_cliente,
    nombre_mascota,
    edad_mascota,
    especie,
    nombre_especie,
    detalle,
    fecha_cirugia
  } = req.body;

  try {
    //Validar fecha de cirugía
    const [existe] = await pool.query(
      'SELECT * FROM citas WHERE fecha_cita = ?',
      [fecha_cirugia]
    );

    if (existe.length > 0) {
      return res.status(400).json({ message: 'Ya hay una cita en ese horario' });
    }
  
    // Guardar la cita de peluquería
    const [cita] = await pool.query(
      'INSERT INTO citas (nombre_cliente, nombre_mascota, servicio, fecha_cita, detalle) VALUES (?, ?, ?, ?, ?)',
      [nombre_cliente, nombre_mascota, 'cirugia', fecha_cirugia,  detalle]
    );

    const [result] = await pool.query(
      'INSERT INTO cirugias (tipo_cirugia, nombre_cliente, nombre_mascota, edad_mascota, especie, nombre_especie, detalle, fecha_cirugia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [tipo_cirugia, nombre_cliente, nombre_mascota, edad_mascota, especie, nombre_especie, detalle, fecha_cirugia]
    );
    res.status(201).json({ message: 'Solicitud registrada', id: result.insertId });
    
  } catch (error) {
    console.error('Error al guardar la cirugía:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
exports.obtenerCirugias = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cirugias');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener cirugías:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};
