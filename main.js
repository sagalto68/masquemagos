document.addEventListener('DOMContentLoaded', () => {

  // NAV scrolled
  const nav = document.querySelector('.nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // MOBILE MENU: se construye de forma independiente en cada página (inline),
  // ya no depende de este archivo externo.

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
