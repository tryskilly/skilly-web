// Legacy invalid URL emitted by an earlier curriculum-link implementation.
// Preserve crawl equity while moving Google and users to the real DaVinci Resolve hub.
export const prerender = false;

export const GET = () =>
  Response.redirect('https://tryskilly.app/learn/davinci-resolve-tutorial-for-beginners/', 301);
