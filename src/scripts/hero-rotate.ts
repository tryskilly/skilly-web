// src/scripts/hero-rotate.ts
import { apps } from '../data/apps.ts';

const target = document.querySelector<HTMLElement>('[data-hero-app]');
if (target) {
  let i = 0;
  const update = () => {
    target.style.opacity = '0';
    setTimeout(() => {
      i = (i + 1) % apps.length;
      target.textContent = apps[i] ?? '';
      target.style.opacity = '1';
    }, 200);
  };
  setInterval(update, 2400);
}
