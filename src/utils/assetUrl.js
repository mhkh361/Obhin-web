/**
 * Dynamic Asset Versioning & Cache Buster Utility (JS Export)
 */
export function getAssetUrl(url, customVersion) {
  if (!url) return '';
  const trimmed = String(url).trim();
  if (!trimmed) return '';

  if (trimmed.startsWith('data:')) {
    return trimmed;
  }

  const v = customVersion ? String(customVersion) : '20261011';
  if (/[?&]v=/.test(trimmed)) {
    return trimmed;
  }

  const separator = trimmed.includes('?') ? '&' : '?';
  return `${trimmed}${separator}v=${v}`;
}
