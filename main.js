document.addEventListener('DOMContentLoaded', () => {

  // NAV scrolled
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // MOBILE MENU
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'nav__mobile';

    const isHome = ['/', '/index.html', ''].some(p => window.location.pathname.endsWith(p));
    const links = [
      { text: 'Contratación de magos', href: isHome ? '#magos'         : 'index.html#magos' },
      { text: 'Espectáculos de magia', href: isHome ? '#espectaculos'  : 'index.html#espectaculos' },
      { text: 'Festivales de magia',   href: isHome ? '#festivales'    : 'index.html#festivales' },
      { text: 'Empresas',              href: 'empresas.html' },
      { text: 'Eventos familiares',    href: 'celebraciones/index.html' },
      { text: 'Contacto',              href: isHome ? '#contacto'      : 'index.html#contacto' },
    ];

    links.forEach(({ text, href }) => {
      const a = document.createElement('a');
      a.href = href; a.className = 'nav__link'; a.textContent = text;
      mobileMenu.appendChild(a);
    });

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&#x2715;';
    closeBtn.style.cssText = 'position:absolute;top:20px;right:24px;background:none;border:none;color:rgba(245,240,232,0.7);font-size:22px;cursor:pointer;padding:8px;';
    closeBtn.addEventListener('click', closeMenu);
    mobileMenu.appendChild(closeBtn);
    document.body.appendChild(mobileMenu);

    function openMenu()  { mobileMenu.classList.add('open');    document.body.style.overflow = 'hidden'; }
    function closeMenu() { mobileMenu.classList.remove('open'); document.body.style.overflow = ''; }

    menuToggle.addEventListener('click', () => mobileMenu.classList.contains('open') ? closeMenu() : openMenu());
    mobileMenu.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }

  // SCROLL REVEAL
  const targets = document.querySelectorAll([
    '.magos__text','.magos__images',
    '.espectaculos__image','.espectaculos__text',
    '.festivales__text','.festivales__image',
    '.empresas-preview__image','.empresas-preview__text',
    '.emp-hero__title','.que-hacemos__title','.qh-row',
    '.tagline-bar__text',
  ].join(','));

  targets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = `opacity 0.75s ease ${(i%5)*0.07}s, transform 0.75s ease ${(i%5)*0.07}s`;
  });

  targets.forEach(el => {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
      });
    }, { threshold: 0.1 }).observe(el);
  });

  // HERO PARALLAX (solo desktop)
  const video = document.querySelector('.hero__bg-video');
  if (video && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      video.style.transform = `translateY(${window.scrollY * 0.25}px)`;
    }, { passive: true });
  }
});
