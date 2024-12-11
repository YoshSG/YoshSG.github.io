const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de middleware
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos SQLite
const db = new sqlite3.Database('./sugerencias.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        db.run(`
            CREATE TABLE IF NOT EXISTS sugerencias (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                matricula TEXT NOT NULL,
                satisfaccion TEXT NOT NULL,
                mejoras TEXT NOT NULL,
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

// Ruta para agregar una sugerencia
app.post('/sugerencias', (req, res) => {
    const { nombre, matricula, satisfaccion, mejoras } = req.body;

    const query = `
        INSERT INTO sugerencias (nombre, matricula, satisfaccion, mejoras)
        VALUES (?, ?, ?, ?)
    `;

    db.run(query, [nombre, matricula, satisfaccion, mejoras], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Ruta para obtener todas las sugerencias
app.get('/sugerencias', (req, res) => {
    const query = `SELECT * FROM sugerencias ORDER BY fecha DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
