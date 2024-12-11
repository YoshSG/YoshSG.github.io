// Inicialización del mapa
const mapa = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(mapa);

// Función para obtener el clima en base a latitud y longitud
async function obtenerClima(lat, lon) {
    try {
        const apiKey = "2de119c5da8e9b2f3d3314443ed6d2d5";
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=${apiKey}`);
        const data = await res.json();

        document.getElementById('temperatura-valor').textContent = `${Math.round(data.main.temp)} °C`;
        document.getElementById('temperatura-descripcion').textContent = data.weather[0].description.toUpperCase();
        document.getElementById('ubicacion').textContent = data.name;
        document.getElementById('viento-velocidad').textContent = `${data.wind.speed} m/s`;

        const iconoAnimado = document.getElementById('icono-animado');
        switch (data.weather[0].main) {
            case 'Thunderstorm': iconoAnimado.src = 'animated/thunder.svg'; break;
            case 'Drizzle': iconoAnimado.src = 'animated/rainy-2.svg'; break;
            case 'Rain': iconoAnimado.src = 'animated/rainy-7.svg'; break;
            case 'Snow': iconoAnimado.src = 'animated/snowy-6.svg'; break;
            case 'Clear': iconoAnimado.src = 'animated/day.svg'; break;
            case 'Clouds': iconoAnimado.src = 'animated/cloudy-day-1.svg'; break;
            default: iconoAnimado.src = 'animated/weather.svg'; break;
        }
    } catch (error) {
        console.error("Error al obtener el clima:", error);
    }
}

// Función para buscar dirección
document.getElementById('buscarDireccion').addEventListener('click', async () => {
    const direccion = document.getElementById('direccion').value;
    if (!direccion) {
        alert('Por favor, ingresa una dirección.');
        return;
    }

    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(direccion)}&format=json&limit=1`);
        const data = await res.json();

        if (data.length === 0) {
            alert('Dirección no encontrada. Intenta con otra.');
            return;
        }

        const { lat, lon } = data[0];
        mapa.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(mapa).bindPopup(`Ubicación: ${direccion}`).openPopup();

        obtenerClima(lat, lon);
    } catch (error) {
        console.error("Error al buscar la dirección:", error);
    }
});

// Inicialización de la ubicación actual
async function obtenerUbicacion() {
    try {
        const res = await fetch(`http://api.ipstack.com/check?access_key=0b4ea8d8e2e830237d59b06bd45e6fa3`);
        const { latitude, longitude } = await res.json();

        mapa.setView([latitude, longitude], 13);
        L.marker([latitude, longitude]).addTo(mapa).bindPopup("Tu ubicación actual").openPopup();

        obtenerClima(latitude, longitude);
    } catch (error) {
        console.error("Error obteniendo la ubicación:", error);
    }
}

// Llamada inicial para establecer la ubicación actual
obtenerUbicacion();

document.addEventListener('DOMContentLoaded', () => {
  const botonCuestionario = document.getElementById('botonCuestionario');
  botonCuestionario.addEventListener('click', () => {
    window.location.href = './Cuestionarios/cuestionario.html'; // Cambia esta URL por el enlace de tu cuestionario.
  });
});

particlesJS(
    {
        "particles": {
          "number": {
            "value": 400,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#fff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            },
            "image": {
              "src": "img/github.svg",
              "width": 100,
              "height": 100
            }
          },
          "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 10,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": false,
            "distance": 500,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 2
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "bottom",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "bubble"
            },
            "onclick": {
              "enable": true,
              "mode": "repulse"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 0.5
              }
            },
            "bubble": {
              "distance": 400,
              "size": 4,
              "duration": 0.3,
              "opacity": 1,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      }
);
