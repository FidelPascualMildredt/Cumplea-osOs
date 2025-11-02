// corazones animados
const heartsContainer = document.getElementById("hearts");
setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}, 400);

// al iniciar
const startBtn = document.getElementById("startBtn");
const intro = document.querySelector(".intro");
const card = document.getElementById("card");
const envelope = document.getElementById("envelope");

startBtn.addEventListener("click", () => {
    gsap.to(intro, {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            intro.style.display = "none";
            card.classList.remove("hidden");
            gsap.from(card, {
                opacity: 0,
                y: 100,
                duration: 1
            });
        }
    });
});

// abrir carta
envelope.addEventListener("click", () => {
    envelope.classList.toggle("open");

    // confeti 🎉
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.textContent = "";
        confetti.style.position = "absolute";
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.top = Math.random() * window.innerHeight + "px";
        confetti.style.fontSize = Math.random() * 20 + 10 + "px";
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
});

// Carrusel 3D
const radius = 350; // qué tan grande es el círculo
const items = document.querySelectorAll(".carousel__item");
const itemCount = items.length;
let angleStep = (2 * Math.PI) / itemCount;

items.forEach((item, i) => {
    const angle = i * angleStep;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    item.style.transform = `rotateY(${(angle * 180) / Math.PI}deg) translateZ(${radius}px)`;
});
// reproducir música al iniciar
const music = document.getElementById("bg-music");

// === Transición final con globos/confeti ===
// const finalBtn = document.getElementById("finalBtn");
// const finalEfecto = document.getElementById("finalEfecto");

// finalBtn.addEventListener("click", () => {
//     for (let i = 0; i < 40; i++) {
//         const balloon = document.createElement("div");
//         balloon.textContent = "🎈";
//         balloon.style.position = "absolute";
//         balloon.style.left = Math.random() * 100 + "vw";
//         balloon.style.bottom = "-50px";
//         balloon.style.fontSize = Math.random() * 30 + 20 + "px";
//         balloon.style.animation = `subir ${Math.random() * 3 + 3}s linear forwards`;
//         finalEfecto.appendChild(balloon);
//         setTimeout(() => balloon.remove(), 5000);
//     }

//     // también confeti 🎊
//     for (let i = 0; i < 20; i++) {
//         const confetti = document.createElement("div");
//         confetti.textContent = "🎊";
//         confetti.style.position = "absolute";
//         confetti.style.left = Math.random() * 100 + "vw";
//         confetti.style.top = Math.random() * 100 + "vh";
//         confetti.style.fontSize = Math.random() * 25 + 15 + "px";
//         finalEfecto.appendChild(confetti);
//         setTimeout(() => confetti.remove(), 4000);
//     }
// });

// animación de globos
// const style = document.createElement("style");
// style.innerHTML = `
//   @keyframes subir {
//     0% { transform: translateY(0); opacity: 1; }
//     100% { transform: translateY(-110vh); opacity: 0; }
//   }`;
// document.head.appendChild(style);
const finalBtn = document.getElementById("finalBtn");
const finalEfecto = document.getElementById("finalEfecto");

// Crear canvas fijo si no existe
let canvas = document.querySelector("#finalEfecto canvas");
if (!canvas) {
    canvas = document.createElement("canvas");
    finalEfecto.appendChild(canvas);
}
canvas.width = finalEfecto.offsetWidth;
canvas.height = finalEfecto.offsetHeight;
const ctx = canvas.getContext("2d");

class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.targetY = Math.random() * canvas.height / 2;
            this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
            this.particles = [];
            this.exploded = false;
        }
        update() {
            if (!this.exploded) {
                this.y -= 7;
                if (this.y <= this.targetY) this.explode();
            }
            this.particles.forEach(p => p.update());
            this.particles = this.particles.filter(p => !p.done);
        }
        explode() {
            this.exploded = true;
            for (let i = 0; i < 250; i++) {
                this.particles.push(new Particle(this.x, this.y, this.color));
            }
        }
        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            this.particles.forEach(p => p.draw());
        }
    }


class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = Math.random() * 10 - 5;
        this.vy = Math.random() * 10 - 5;
        this.alpha = 1;
        this.done = false;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        if (this.alpha <= 0) this.done = true;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

let fireworks = [];
let animationRunning = false;

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(fw => {
        fw.update();
        fw.draw();
    });
    fireworks = fireworks.filter(fw => !fw.exploded || fw.particles.length > 0);
    if (fireworks.length > 0) {
        requestAnimationFrame(animate);
    } else {
        animationRunning = false;
    }
}

finalBtn.addEventListener("click", () => {
    // mensaje central
    let message = document.getElementById("finalMessage");
    if (!message) {
        message = document.createElement("div");
        message.id = "finalMessage";
        message.textContent = "";
        finalEfecto.appendChild(message);
        gsap.to(message, { opacity: 1, duration: 2 });
    }

    // añadir varios fuegos artificiales cada vez
    for (let i = 0; i < 20; i++) {
        fireworks.push(new Firework());
    }

    if (!animationRunning) {
        animationRunning = true;
        animate();
    }
});



// === Carta parte 2: efecto máquina de escribir ===
const typeText = document.getElementById("typeText");
// === Carta Parte 2 - "Un pedacito de mí" ===
const mensaje2 = `A veces pienso que si pudieras mirar dentro de mí, verías un montón de cosas con tu nombre.  
Mis pensamientos, mis risas, mis días buenos, incluso mis silencios.  
Todo está lleno de ti.  

No sé en qué momento te volviste parte de lo que soy,  
pero ya no imagino mi mundo sin tu manera de hacerlo más bonito.  

Este pedacito de mí que te doy hoy  
es lo que siento, lo que callo, y lo que me mueve cada vez que pienso en ti.  

... te quiero más que ayer y menos que mañana 💖  
Gracias por ser mi razón de sonreír, mi apoyo y mi lugar seguro 💌`;

// let i = 0;

// function escribirTexto() {
//     if (i < mensaje2.length) {
//         typeText.textContent += mensaje2.charAt(i);
//         i++;
//         setTimeout(escribirTexto, 60);
//     }
// }
let i = 0;
// const typeText = document.getElementById("typeText");

function escribirTexto() {
  if (i < mensaje2.length) {
    typeText.innerHTML += mensaje2.charAt(i);
    i++;
    setTimeout(escribirTexto, 50); // velocidad de escritura
  } else {
    // Cuando termina de escribir, muestra un corazón latiendo ❤️
    const heart = document.createElement("div");
    heart.classList.add("heartbeat");
    heart.innerHTML = "💖";
    typeText.appendChild(heart);
  }
}

// Para que empiece a escribir cuando llegue a la sección
document.addEventListener("DOMContentLoaded", () => {
  const carta2Section = document.getElementById("carta2");
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      escribirTexto();
      observer.disconnect();
    }
  });
  observer.observe(carta2Section);
});

// que empiece cuando se vea la sección
// window.addEventListener("scroll", () => {
//     const carta2Pos = document.getElementById("carta2").offsetTop;
//     if (window.scrollY + window.innerHeight > carta2Pos) {
//         if (i === 0) escribirTexto();
//     }
// });
//   ----------------------------------------------burbujas glotantes----
// === Burbujas de frases flotantes ===
const bubblesContainer = document.getElementById("bubbles");

const frasesBurbujas = [
    "Te amo 💕",
    "Feliz cumpleaños 🎂",
    "Mi razón de sonreír 😍",
    "Eres mi todo 💖",
    "Mi niño precioso 💖 ",
    "Eres mi Serendipity 💕",
    "Mi persona favorita ❤️",
    "Contigo siempre 💞",
    "Mi vida eres tú 💋",
    "Corazon de melon 💖 ",
];

setInterval(() => {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = frasesBurbujas[Math.floor(Math.random() * frasesBurbujas.length)];
    bubble.style.left = Math.random() * 90 + "vw";
    bubble.style.fontSize = Math.random() * 10 + 20 + "px";
    bubble.style.animationDuration = Math.random() * 3 + 5 + "s";

    bubblesContainer.appendChild(bubble);

    setTimeout(() => bubble.remove(), 8000);
}, 2500); // cada 2.5 segundos aparece una nueva burbuja

// *** POEMAS *****
gsap.from(".flip-card", {
    opacity: 0,
    y: 50,
    stagger: 0.3,
    duration: 1,
   
  });


//   **** video ********

  