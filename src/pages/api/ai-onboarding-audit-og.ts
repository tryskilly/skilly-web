import type { APIRoute } from 'astro';

export const prerender = false;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const GET: APIRoute = ({ url }) => {
  const product = escapeXml(url.searchParams.get('product') || 'Product');
  const score = escapeXml(url.searchParams.get('score') || '--');
  const band = escapeXml(url.searchParams.get('band') || 'AI onboarding audit');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#FAF8F4"/>
  <rect x="56" y="56" width="1088" height="518" rx="36" fill="#1A1714"/>
  <circle cx="980" cy="162" r="190" fill="#F59E0B" opacity="0.22"/>
  <text x="96" y="126" fill="#F59E0B" font-family="Arial, sans-serif" font-size="28" font-weight="700">Skilly AI onboarding audit</text>
  <text x="96" y="224" fill="#FAF8F4" font-family="Arial, sans-serif" font-size="72" font-weight="800">${product}</text>
  <text x="96" y="300" fill="#FAF8F4" font-family="Arial, sans-serif" font-size="44" font-weight="700">${band}</text>
  <text x="96" y="440" fill="#F59E0B" font-family="Arial, sans-serif" font-size="156" font-weight="900">${score}</text>
  <text x="320" y="430" fill="#FAF8F4" opacity="0.7" font-family="Arial, sans-serif" font-size="36" font-weight="700">out of 100</text>
  <text x="96" y="524" fill="#FAF8F4" opacity="0.7" font-family="Arial, sans-serif" font-size="28">Can AI explain this product to a new user?</text>
</svg>`;
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
