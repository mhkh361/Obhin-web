/**
 * Dynamic Asset Versioning & Cache Buster Utility
 * Appends version query string to static media paths and image URLs to bust aggressive
 * mobile browser (iOS Safari, Android Chrome) and in-app webview (WhatsApp, Telegram) caches,
 * while safely preserving inline base64 data URLs.
 */
export function getAssetUrl(url?: string | null, customVersion?: string | number): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Preserve inline base64/data URLs
  if (trimmed.startsWith('data:')) {
    return trimmed;
  }

  // Generate deterministic version hash/timestamp
  const v = customVersion ? String(customVersion) : '20261011';

  // If already versioned, return as is
  if (/[?&]v=/.test(trimmed)) {
    return trimmed;
  }

  const separator = trimmed.includes('?') ? '&' : '?';
  return `${trimmed}${separator}v=${v}`;
}
