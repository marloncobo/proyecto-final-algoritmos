# Sistema de Gestión Veterinaria

## Descripción General

Este proyecto es una aplicación web que permite registrar y gestionar servicios veterinarios como peluquería, vacunación, desparasitación y cirugías. Está compuesto por:

- Una interfaz HTML/CSS para usuarios.
- Un backend en Node.js con Express y MySQL.
- Un sistema de almacenamiento de citas y cirugías en una base de datos.


## Estructura del Proyecto

proyecto-final--main/
│
├── *.html               # Páginas web del frontend
├── src/
│   ├── controllers/     # Lógica de controladores
│   ├── routes/          # Rutas de la API REST
│   └── config/          # Configuración de la base de datos
├── public/              # Archivos estáticos (CSS, imágenes, scripts)
├── app.js               # Configuración principal de la app Express
├── package.json         # Dependencias del proyecto
└── README.md            # Descripción general del proyecto

## Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Base de datos:** MySQL

## Funcionalidades Principales

###  Registro de Citas
- Registro de clientes y mascotas para un servicio específico.
- Validación para evitar citas duplicadas en la misma fecha y hora.

### Registro de Cirugías
- Captura detalles clínicos (tipo de cirugía, especie, edad, etc).
- Relación con la tabla `citas` para control de agenda.

### CRUD de Servicios
- Posibilidad de consultar cirugías registradas (`GET /api/cirugias`).
- Redirección o respuesta JSON según la acción.

---

## Instalación y Configuración

1. Clonar el repositorio o descargar el ZIP.
2. Instalar dependencias:

```bash
npm install
```

3. Configurar base de datos:
   - Crear una base de datos en MySQL.
   - Crear las tablas necesarias (`citas`, `cirugias`).
   - Configurar `src/config/database.js`.

4. Ejecutar servidor:

```bash
npm run dev
```

---

## 📂 Endpoints de la API REST

### `POST /api/cirugia`
Registra una cita + cirugía, validando si la fecha ya está ocupada.

```json
{
  "tipo_cirugia": "Esterilización",
  "nombre_cliente": "Ana López",
  "nombre_mascota": "Firulais",
  "edad_mascota": 3,
  "especie": "Perro",
  "nombre_especie": "Labrador",
  "detalle": "Ayuno 8h",
  "fecha_cirugia": "2025-07-01T10:00"
}
```

### `GET /api/cirugias`
Retorna todas las cirugías registradas.

---

## Validaciones Importantes

- No se permite registrar dos cirugías con la misma fecha/hora (`fecha_cita` es única).
- El campo `fecha_cita` en la tabla `citas` **no puede ser NULL**.
- Si `fecha_cirugia` no se envía, se rechaza la solicitud con error `400`.

---

## Autor / Colaboradores

- (Marlon Sarria, Charly Usma, Alejandro)

