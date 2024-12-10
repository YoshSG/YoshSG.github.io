async function manejarContadorVisitas() {
    const contadorElemento = document.getElementById('contadorVisitas');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        if (!response.ok) {
            throw new Error("Error al obtener datos de la API.");
        }
        const data = await response.json();

        const visitas = data.id + 1;
        contadorElemento.textContent = visitas;

        console.log(`Visitas actualizadas a: ${visitas}`);
    } catch (error) {
        console.error("Error manejando el contador de visitas:", error);
        contadorElemento.textContent = "Error al cargar visitas.";
    }
}

document.addEventListener('DOMContentLoaded', manejarContadorVisitas);
