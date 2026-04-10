// src/scripts/nav-scroll.ts
const header = document.querySelector('header[data-nav]');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
