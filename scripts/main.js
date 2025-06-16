// Fade-in semplice quando gli elementi entrano nel viewport
document.addEventListener('DOMContentLoaded', () => {
  const fadeInElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // smetti di osservare dopo la prima comparsa
      }
    });
  }, { threshold: 0.1 }); // si attiva appena il 10% è visibile

  fadeInElements.forEach(el => observer.observe(el));
});

const swiper = new Swiper('.swiper', {
  loop: true,
  effect: 'fade', // <--- EFFETTO FADE
  fadeEffect: {
    crossFade: true
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  speed: 1000, // durata della transizione
});

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.matchMedia({
  // Desktop (larghezza maggiore di 768px)
  "(min-width: 769px)": function () {
    gsap.utils.toArray(".project-slide").forEach((slide) => {
      // Slide container
      gsap.fromTo(slide,
        { opacity: 0, y: 200 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

      // Descrizione entra da sinistra
      gsap.fromTo(slide.querySelector('.description'),
        { opacity: 0, x: -150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

      // Preview entra da destra
      gsap.fromTo(slide.querySelector('.preview'),
        { opacity: 0, x: 150 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
    });
  },

  // Mobile (768px e meno)
  "(max-width: 768px)": function () {
    gsap.utils.toArray(".project-slide").forEach((slide) => {
      gsap.fromTo(slide,
        { opacity: 0, y: 200 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });

      // Entrano solo in fade (senza movimento laterale)
      gsap.fromTo(slide.querySelector('.description'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });

      gsap.fromTo(slide.querySelector('.preview'),
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: slide,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
    });
  }
});

gsap.utils.toArray(".about").forEach((slide) => {
    gsap.fromTo(slide.querySelector('.profile-img'),
      { opacity: 0, y: 150 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slide,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
  });

const MIN_DISPLAY_TIME = 2000;
const preloader = document.getElementById('preloader');
const imageContainer = document.getElementById('image-container');
const circle = document.getElementById('circle');
const startTime = Date.now();

// Precarica manualmente l'immagine
const bgImage = new Image();
bgImage.src = '../assets/caric.png';

// Funzione da eseguire quando tutto è pronto
function startAnimations() {
  // 1. Avvia cerchio
  circle.classList.add('start');

  // 2. Dopo che il cerchio ha quasi finito (2s animazione), fai partire le altre
  setTimeout(() => {
    document.querySelector('.diagonal-line')?.classList.add('fade');
    imageContainer.classList.add('explode');

    // 3. Dopo animazione explode, rimuovi il preloader
    const explodeDuration = 1000;
    setTimeout(() => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }, explodeDuration);
  }, 2000); // Match con la durata animazione cerchio
}

// Controlla che **entrambe** le condizioni siano soddisfatte
function tryStart() {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

  setTimeout(() => {
    if (bgImage.complete) {
      startAnimations();
    } else {
      bgImage.onload = startAnimations;
    }
  }, remaining);
}

// Inizia quando window è caricato
window.addEventListener('load', tryStart);




    

    