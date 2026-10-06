/* =========================================
   POSICIÓN INICIAL DE SCROLL
========================================= */

if ("scrollRestoration" in history) {

  history.scrollRestoration = "manual";

}

function resetScrollToTop() {

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
  });

}

resetScrollToTop();

window.addEventListener(
  "pageshow",
  resetScrollToTop
);


/* =========================================
   CARGA INICIAL
========================================= */

const loader = document.getElementById("loader");
const invitation = document.getElementById("invitation");

/*
  Duración del crawl de apertura.
  Debe coincidir con --intro-duration en styles.css.
*/

const INTRO_DURATION = 4000;

window.addEventListener("load", () => {

  /*
    La misma clase inicia la animación CSS del crawl
    y el temporizador de cierre, así los recursos lentos
    no consumen la intro antes de que empiece.
  */

  loader.classList.add("intro");

  setTimeout(() => {

    loader.classList.add("hide");
    invitation.classList.add("active");

    startRevealAnimations();

  }, INTRO_DURATION);

});


/* =========================================
   ANIMACIONES DE ENTRADA
========================================= */

function startRevealAnimations() {

  const elements = document.querySelectorAll(".reveal");

  elements.forEach((element, index) => {

    setTimeout(() => {

      element.classList.add("visible");

    }, 180 * index);

  });

}


/* =========================================
   CANVAS DE ESTRELLAS
========================================= */

const canvas = document.getElementById("stars");

const ctx = canvas.getContext("2d");

let stars = [];

const STAR_COUNT = 150;


function resizeCanvas() {

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createStars();

}


function createStars() {

  stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {

    stars.push({

      x: Math.random() * canvas.width,

      y: Math.random() * canvas.height,

      size:
        Math.random() * 1.7 + 0.3,

      speed:
        Math.random() * 0.18 + 0.03,

      opacity:
        Math.random() * 0.7 + 0.2,

      pulse:
        Math.random() * 0.02 + 0.005

    });

  }

}


function drawStars() {

  ctx.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  stars.forEach(star => {

    star.opacity += star.pulse;

    if (
      star.opacity >= 1 ||
      star.opacity <= 0.2
    ) {

      star.pulse *= -1;

    }


    ctx.beginPath();

    ctx.arc(
      star.x,
      star.y,
      star.size,
      0,
      Math.PI * 2
    );

    ctx.fillStyle =
      `rgba(255,255,255,${star.opacity})`;

    ctx.fill();


    star.y += star.speed;


    if (star.y > canvas.height) {

      star.y = 0;

      star.x =
        Math.random() * canvas.width;

    }

  });


  requestAnimationFrame(drawStars);

}


resizeCanvas();

drawStars();

window.addEventListener(
  "resize",
  resizeCanvas
);


/* =========================================
   BOTÓN CONFIRMACIÓN
========================================= */

const confirmButton =
  document.getElementById("confirmButton");

confirmButton.addEventListener(
  "click",
  event => {

    /*
      Elimina esta parte cuando agregues
      tu URL real de WhatsApp.
    */

    if (
      confirmButton.getAttribute("href") === "#"
    ) {

      event.preventDefault();

      alert(
        "¡Que la diversión te acompañe! 🚀\n\nAgrega aquí el número de WhatsApp para confirmar asistencia."
      );

    }

  }
);