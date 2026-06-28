// /download — vanity redirect to the latest macOS release.
// Fixes a GSC "Not found (404)" for tryskilly.app/download (external links /
// typed URLs hit this path) and future-proofs any "/download" reference by
// always pointing at the canonical release asset.
import { DOWNLOAD_URL } from '../data/config.ts';

export const prerender = false;

export const GET = () => Response.redirect(DOWNLOAD_URL, 302);
