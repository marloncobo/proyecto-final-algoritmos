const express = require('express');
const cors = require('cors'); // útil si pruebas desde otro origen
// Importamos express y cors para manejar las solicitudes HTTP y CORS

// Importamos las rutas
const registroRoutes = require('./routes/registroRoutes');
const desparasitacionRoutes = require('./routes/desparasitacionRoutes');
const contactoRoutes = require('./routes/contactoRoutes');
const cirugiaRoutes = require('./routes/cirugiaRoutes');
const vacunaRoutes = require('./routes/vacunaRoutes');

// Creamos una instancia de express

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/registro', registroRoutes);
app.use('/api/desparasitacion', desparasitacionRoutes);
app.use('/api/contacto', contactoRoutes);
app.use('/api/cirugia', cirugiaRoutes);
app.use('/api/vacuna', vacunaRoutes);
module.exports = app;
// Exportamos la aplicación para que pueda ser utilizada en otros archivos
// (por ejemplo, en el archivo server.js)