const pool = require('../config/database');

exports.crearRegistro = async (req, res) => {
  const { 
    parvovirus, 
    primera_multiple, 
    segunda_multiple, 
    leptospira, 
    tercera_multiple, 
    bordetella_16, 
    dhppl, 
    rabia_anual, 
    bordetella_anual } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO vacunas (parvovirus, primera_multiple, segunda_multiple, leptospira, tercera_multiple, bordetella_16, dhppl, rabia_anual, bordetella_anual) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [parvovirus, primera_multiple, segunda_multiple, leptospira, tercera_multiple, bordetella_16, dhppl, rabia_anual, bordetella_anual]
    );
    res.status(201).json({ message: 'Registro guardado', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
exports.obtenerRegistros = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM vacunas');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener registros:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};