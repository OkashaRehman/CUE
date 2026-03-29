/* ============================================
   CUE CINEMAS — Premium Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');
  initPreloader();
  initNavbar();
  initScrollReveal();
  initMovieTabs();
  initFAQ();
  initTrailerModal();
  initMobileNav();
  initSmoothScroll();
  initParallax();
  initDustParticles();
  initMouseSpotlight();
  initCustomCursor();
  init3DTilt();
  initMagneticButtons();
  initLensFlare();
});

/* --- Cinematic Preloader & Text Scramble --- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const counter = document.querySelector('.preloader-counter');
  const progress = document.querySelector('.preloader-progress');
  if (!preloader) return;

  let count = 0;
  const target = 100;
  const duration = 1500; // ms
  const interval = duration / target;

  const timer = setInterval(() => {
    count += Math.floor(Math.random() * 3) + 1; // jump by 1-3%
    if (count >= target) {
      count = target;
      clearInterval(timer);
      
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        document.body.classList.remove('loading');
      }, 400);
    }
    
    counter.innerText = `${count}%`;
    progress.style.width = `${count}%`;
  }, interval);
}

/* --- Magnetic UI Elements --- */
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic-btn, .nav-links a');
  
  if (window.matchMedia('(pointer: coarse)').matches) return;

  magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = e.clientX - rect.left - h;
      const y = e.clientY - rect.top - w;
      
      // The pull strength (lower is weaker)
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });
}

/* --- Interactive Lens Flare --- */
function initLensFlare() {
  const hero = document.querySelector('.hero');
  const flare = document.getElementById('lens-flare');
  if (!hero || !flare) return;

  if (window.matchMedia('(pointer: coarse)').matches) return;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    flare.style.setProperty('--flare-x', `${x}px`);
    flare.style.setProperty('--flare-y', `${y}px`);
  });
}

/* --- Cinematic Dust Particles --- */
function initDustParticles() {
  const canvas = document.getElementById('bg-dust');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = Math.floor((width * height) / 15000); // Responsive amount of dust

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * -0.5 - 0.1; // Float slowly upwards
      this.opacity = Math.random() * 0.5 + 0.1;
      this.life = Math.random() * 100;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Reset when they float out or fade out
      if (this.y < -10 || this.x < -10 || this.x > width + 10 || this.life < 0) {
        this.y = height + 10;
        this.x = Math.random() * width;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.life = Math.random() * 100 + 50;
      }
      this.life--;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 168, 83, ${this.opacity})`; // Gold hue
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (const particle of particles) {
      particle.update();
      particle.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}

/* --- Interactive Mouse Spotlight --- */
function initMouseSpotlight() {
  const spotlight = document.getElementById('mouse-spotlight');
  if (!spotlight) return;

  document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    spotlight.style.setProperty('--mouse-x', `${x}px`);
    spotlight.style.setProperty('--mouse-y', `${y}px`);
  });
}

/* --- Custom Cursor --- */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  if (!cursor || !follower) return;

  // Only init if device supports hover (desktop)
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let followerX = mouseX;
  let followerY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.2;
    followerY += (mouseY - followerY) * 0.2;
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const interactables = document.querySelectorAll('a, button, .movie-card, select, input, .play-btn');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    });
  });
}

/* --- 3D Hover Tilt Effect on Movie Cards --- */
function init3DTilt() {
  const cards = document.querySelectorAll('.movie-card');
  
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      card.style.transition = 'transform 0.1s ease-out';
      card.style.zIndex = '10';
      card.style.boxShadow = `0 20px 40px rgba(0,0,0,0.5), ${-rotateY}px ${rotateX}px 20px rgba(212, 168, 83, 0.2)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease-out, box-shadow 0.5s ease-out';
      card.style.zIndex = '1';
      card.style.boxShadow = 'none';
    });
  });
}

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  }, { passive: true });
}

/* --- Scroll-triggered reveal animations --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --- Movie Tabs (Now Showing / Coming Soon) --- */
function initMovieTabs() {
  const tabs = document.querySelectorAll('.movies-tabs button');
  const panels = document.querySelectorAll('.movies-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        if (p.id === target) {
          p.style.display = '';
          // Re-trigger reveal animations for newly shown cards
          setTimeout(() => {
            p.querySelectorAll('.reveal, .reveal-scale').forEach(el => {
              el.classList.remove('visible');
              void el.offsetWidth; // force reflow
              el.classList.add('visible');
            });
          }, 50);
        } else {
          p.style.display = 'none';
        }
      });
    });
  });
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      items.forEach(i => i.classList.remove('active'));
      // Open clicked (if wasn't open)
      if (!isActive) item.classList.add('active');
    });
  });
}

/* --- Trailer Modal --- */
function initTrailerModal() {
  const modal = document.getElementById('trailerModal');
  if (!modal) return;
  const iframe = modal.querySelector('iframe');
  const closeBtn = modal.querySelector('.modal-close');

  document.querySelectorAll('[data-trailer]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const url = btn.dataset.trailer;
      // Convert youtube URL to embed
      let embedUrl = url;
      if (url.includes('youtube.com/watch')) {
        const vid = new URL(url).searchParams.get('v');
        embedUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
      } else if (url.includes('youtu.be/')) {
        const vid = url.split('youtu.be/')[1].split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
      }
      iframe.src = embedUrl;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* --- Mobile Nav Toggle --- */
function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('mobile-open');
    document.body.style.overflow = links.classList.contains('mobile-open') ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('mobile-open');
      document.body.style.overflow = '';
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --- Parallax on hero video --- */
function initParallax() {
  const heroVideo = document.querySelector('.hero-video-wrapper');
  if (!heroVideo) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      heroVideo.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }, { passive: true });
}