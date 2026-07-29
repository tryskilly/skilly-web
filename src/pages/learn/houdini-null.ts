// Legacy invalid URL emitted by an earlier curriculum-link implementation.
// Preserve crawl equity while moving Google and users to the real Houdini hub.
export const prerender = false;

export const GET = () =>
  Response.redirect('https://tryskilly.app/learn/houdini-tutorial-for-beginners/', 301);
