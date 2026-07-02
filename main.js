/* =============================================
   MAIN.JS — Más que Magos
   Navigation, mobile menu, scroll animations
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAV: add .scrolled class on scroll ─────
  const nav = document.querySelector('.nav');
  const navLogo = document.getElementById('navLogo');
  const heroHeight = window.innerHeight * 0.7;

  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    if (navLogo) {
      if (window.scrollY > heroHeight) {
        navLogo.classList.add('visible');
      } else {
        navLogo.classList.remove('visible');
      }
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

    // Clone desktop nav links for mobile
    const desktopLinks = document.querySelectorAll('.nav__links .nav__link');
    desktopLinks.forEach(link => {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'nav__link';
      a.textContent = link.textContent;
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
