/* =============================================
   MAIN.JS — Más que Magos
   Navigation, mobile menu, scroll animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV: add .scrolled class on scroll ─────
  const nav = document.querySelector('.nav');

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  // ─── MOBILE MENU ─────────────────────────────
  const menuToggle = document.getElementById('menuToggle');

  if (menuToggle) {
    // Build the mobile menu dynamically
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav__mobile';

    // Fixed list of all mobile links (including extras not in desktop nav)
    const mobileLinks = [
      { href: '#magos',                      text: 'Contratación de magos' },
      { href: '#espectaculos',               text: 'Espectáculos de magia' },
      { href: '#festivales',                 text: 'Festivales de magia' },
      { href: 'empresas.html',               text: 'Empresas' },
      { href: 'celebraciones/index.html',    text: 'Eventos familiares' },
      { href: '#contacto',                   text: 'Contacto' },
    ];

    mobileLinks.forEach(({ href, text }) => {
      const a = document.createElement('a');
      a.href = href;
      a.className = 'nav__link';
      a.textContent = text;
      mobileMenu.appendChild(a);
    });

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
      position: absolute; top: 24px; right: 28px;
      background: none; border: none; color: #f5f0e8;
      font-size: 24px; cursor: pointer; opacity: 0.7;
    `;
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.appendChild(closeBtn);

    document.body.appendChild(mobileMenu);

    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    // Close menu when any link is clicked
    mobileMenu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  // ─── MOBILE HERO BUTTON (solo móvil) ──────────
  if (window.innerWidth <= 768) {
    const heroContent = document.querySelector('.hero__content');
    if (heroContent) {
      const btn = document.createElement('a');
      btn.href = 'celebraciones/index.html';
      btn.className = 'btn btn--outline hero__mobile-cel';
      btn.textContent = '¿Tienes un evento familiar?';
      heroContent.appendChild(btn);
    }
  }


  // ─── SCROLL REVEAL ───────────────────────────
  // Elements to animate in on scroll
  const revealTargets = document.querySelectorAll([
    '.magos__text',
    '.magos__images',
    '.espectaculos__image',
    '.espectaculos__text',
    '.festivales__text',
    '.festivales__image',
    '.empresas-preview__image',
    '.empresas-preview__text',
    '.servicio',
    '.que-hacemos__title',
    '.emp-hero__title',
  ].join(', '));

  // Set initial state
  revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.08}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${(i % 4) * 0.08}s`;
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealTargets.forEach(el => revealObserver.observe(el));


  // ─── PARALLAX HERO (subtle) ───────────────────
  const heroBgVideo = document.querySelector('.hero__bg-video');
  if (heroBgVideo) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      heroBgVideo.style.transform = `translateY(${y * 0.3}px)`;
    }, { passive: true });
  }

});
