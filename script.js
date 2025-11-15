// Toggle del menú lateral
const toggle = document.getElementById('toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  menu.classList.toggle('open');
  toggle.classList.toggle('active');
});

// --- CÓDIGO ACTUALIZADO: "Acerca de" con FADE y TIEMPO ---
const linkAcerca = document.getElementById('link-acerca');
const bioArrow = document.getElementById('bio-arrow');
const bioSection = document.getElementById('bio-section');

// Variable para evitar que la animación se repita si se pulsa rápido
let isArrowAnimating = false;

linkAcerca.addEventListener('click', (event) => {
  // 1. Evita que el enlace recargue la página
  event.preventDefault();

  // 2. Si la animación ya está en curso, no hace nada
  if (isArrowAnimating) {
    return;
  }

  // 3. Bloquea la animación
  isArrowAnimating = true;
  
  // 4. Cierra el menú lateral
  menu.classList.remove('open');
  toggle.classList.remove('active');
  
  // 5. (Extra) Hace scroll suave a la sección de Bio
  bioSection.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });

  // 6. Muestra la flecha (Inicia el fade-in de 1 segundo)
  bioArrow.classList.add('show');

  // 7. Define el tiempo de espera
  // 1000ms (para que termine el fade-in) + 3000ms (de espera visible) = 4000ms
  setTimeout(() => {
    // 8. Oculta la flecha (Inicia el fade-out de 1 segundo)
    bioArrow.classList.remove('show');

    // 9. Espera a que termine el fade-out (1 segundo) para desbloquear
    setTimeout(() => {
      isArrowAnimating = false;
    }, 1000); // 1000ms del fade-out

  }, 4000); // 4000ms = 1s (fade-in) + 3s (visible)
});


// --- NUEVO CÓDIGO PARA EL FONDO DINÁMICO ---
document.addEventListener('DOMContentLoaded', () => {
  
  /**
   * Revisa la hora actual en México y aplica el fondo de día o noche.
   */
  function setBackgroundByTime() {
    const body = document.body;

    // Usamos la zona horaria central de México (CDMX)
    const options = { timeZone: 'America/Mexico_City' };
    const now = new Date();

    // Obtenemos la hora (0-23) y minutos en esa zona horaria
    const hour = parseInt(now.toLocaleString('en-US', { ...options, hour: 'numeric', hour12: false }));
    const minute = parseInt(now.toLocaleString('en-US', { ...options, minute: 'numeric' }));

    // Definir los límites
    const nightStartHour = 18; // 6 PM
    const nightStartMinute = 30; // :30
    const dayStartHour = 6;  // 6 AM
    const dayStartMinute = 0; // :00

    let isNight = false;

    // Comprobamos si es de noche
    if (hour > nightStartHour) { 
      // Caso 1: Después de las 19:00 (e.g., 19:00 - 23:59)
      isNight = true;
    } else if (hour === nightStartHour && minute >= nightStartMinute) { 
      // Caso 2: Entre las 18:30 y las 18:59
      isNight = true;
    } else if (hour < dayStartHour) { 
      // Caso 3: Antes de las 6:00 AM (e.g., 00:00 - 05:59)
      isNight = true;
    }
    // Si no se cumple nada de lo anterior, es de día (entre 6:00 AM y 18:29 PM)

    // Aplicar la clase al body
    if (isNight) {
      body.classList.add('night-bg');
      body.classList.remove('day-bg');
    } else {
      body.classList.add('day-bg');
      body.classList.remove('night-bg');
    }
  }

  // Ejecutar la función una vez que la página cargue
  setBackgroundByTime();
  
  // Opcional: Si quieres que revise la hora cada 15 minutos (por si el
  // usuario deja la pestaña abierta y pasa de día a noche),
  // puedes descomentar la siguiente línea:
  // setInterval(setBackgroundByTime, 900000); // 900000 ms = 15 minutos
});