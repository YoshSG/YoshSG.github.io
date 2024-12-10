async function manejarContadorVisitas() {
    const contadorElemento = document.getElementById('contadorVisitas');

    try {
        // Enviar una solicitud para obtener o incrementar el contador de visitas
        const response = await fetch('https://api.countapi.xyz/hit/yoshsg.github.io/visits');

        if (!response.ok) {
            throw new Error("Error al obtener datos de la API de visitas.");
        }

        const data = await response.json();

        // Mostrar el número de visitas actualizado
        contadorElemento.textContent = data.value;
        console.log(`Visitas actualizadas a: ${data.value}`);
    } catch (error) {
        console.error("Error manejando el contador de visitas:", error);
        contadorElemento.textContent = "Error al cargar visitas.";
    }
}

document.addEventListener('DOMContentLoaded', manejarContadorVisitas);
