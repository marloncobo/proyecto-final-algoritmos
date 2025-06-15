const pool = require('../config/database');

exports.registrarCirugia = async (req, res) => {
  const {
    tipo_cirugia,
    nombre_mascota,
    edad_mascota,
    especie,
    nombre_especie,
    detalle
  } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO cirugias (tipo_cirugia, nombre_mascota, edad_mascota, especie, nombre_especie, detalle) VALUES (?, ?, ?, ?, ?, ?)',
      [tipo_cirugia, nombre_mascota, edad_mascota, especie, nombre_especie, detalle]
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
