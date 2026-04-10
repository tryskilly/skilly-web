// src/scripts/reveal-on-scroll.ts
const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (els.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 },
  );
  for (const el of els) observer.observe(el);
}
