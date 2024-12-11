CREATE TABLE IF NOT EXISTS sugerencias (
    id INTEGER PRIMARY KEY,
    nombre TEXT NOT NULL,
    matricula TEXT NOT NULL,
    satisfaccion TEXT NOT NULL,
    mejoras TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);