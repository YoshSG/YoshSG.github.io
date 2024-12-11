const API_URL = 'http://localhost:3000/sugerencias';

// Manejo del envío del formulario
document.getElementById('sugerenciaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const matricula = document.getElementById('matricula').value;
    const satisfaccion = document.getElementById('satisfaccion').value;
    const mejoras = document.getElementById('mejoras').value;

    const data = { nombre, matricula, satisfaccion, mejoras };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        alert('¡Sugerencia enviada con éxito!');
        document.getElementById('sugerenciaForm').reset();
        cargarSugerencias();
    } catch (error) {
        console.error('Error enviando la sugerencia:', error);
    }
});

// Cargar y mostrar las sugerencias
async function cargarSugerencias() {
    try {
        const response = await fetch(API_URL);
        const sugerencias = await response.json();

        const lista = document.getElementById('listaSugerencias');
        lista.innerHTML = '';

        sugerencias.forEach(({ nombre, matricula, satisfaccion, mejoras, fecha }) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${nombre} (${matricula})</strong> - ${new Date(fecha).toLocaleString()}<br>
                Satisfacción: ${satisfaccion}<br>
                Sugerencia: ${mejoras}
            `;
            lista.appendChild(item);
        });
    } catch (error) {
        console.error('Error cargando las sugerencias:', error);
    }
}

// Cargar sugerencias al inicio
document.addEventListener('DOMContentLoaded', cargarSugerencias);
