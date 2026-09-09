/**
 * MasterTech Settings TTL Cache Manager
 * 
 * Provides client-side TTL (Time-To-Live) caching for website settings.
 * Prevents redundant HTTP fetches across component mounts and page transitions,
 * eliminating unnecessary server load and bandwidth/egress consumption.
 */

export const SETTINGS_TTL_MS = 5 * 60 * 1000; // 5 minutes TTL
const STORAGE_KEY = 'mastertech_settings_store';
const TIMESTAMP_KEY = 'mastertech_settings_timestamp';

let inFlightPromise: Promise<any> | null = null;

/**
 * Reads settings from localStorage if available and within TTL.
 */
export function getCachedSettings(): { data: any | null; isStale: boolean; ageMs: number } {
  if (typeof window === 'undefined') {
    return { data: null, isStale: true, ageMs: Infinity };
  }

  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    const rawTimestamp = localStorage.getItem(TIMESTAMP_KEY);

    if (!rawData) {
      return { data: null, isStale: true, ageMs: Infinity };
    }

    const data = JSON.parse(rawData);
    const timestamp = rawTimestamp ? parseInt(rawTimestamp, 10) : 0;
    const ageMs = Date.now() - timestamp;
    const isStale = isNaN(timestamp) || ageMs > SETTINGS_TTL_MS;

    return { data, isStale, ageMs };
  } catch (e) {
    return { data: null, isStale: true, ageMs: Infinity };
  }
}

/**
 * Saves settings to localStorage with current timestamp.
 */
export function setCachedSettings(settings: any): void {
  if (typeof window === 'undefined' || !settings || typeof settings !== 'object') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    localStorage.setItem(TIMESTAMP_KEY, Date.now().toString());
  } catch (e) {}
}

/**
 * Invalidates the TTL cache so the next call performs a fresh fetch.
 */
export function invalidateSettingsCache(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(TIMESTAMP_KEY);
    window.dispatchEvent(new Event('mastertech_settings_updated'));
  } catch (e) {}
}

/**
 * Fetches settings respecting the TTL cache.
 * If data is fresh (< 5 min old), returns it immediately with zero network overhead.
 * Deduplicates in-flight requests if multiple components mount simultaneously.
 */
export async function fetchSettingsWithTTL(options?: { force?: boolean }): Promise<any> {
  const force = Boolean(options?.force);
  const cached = getCachedSettings();

  // If cache is fresh and not forced, return cached data immediately
  if (!force && cached.data && !cached.isStale) {
    return cached.data;
  }

  // Deduplicate concurrent requests
  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      // Use cache-busting only if force-requested (e.g. from Admin save)
      const url = force ? `/api/settings?_t=${Date.now()}` : '/api/settings';
      const res = await fetch(url);
      
      if (!res.ok) {
        // If fetch fails, fall back to cached data even if stale
        return cached.data || null;
      }

      const freshData = await res.json();
      if (freshData && typeof freshData === 'object') {
        if (freshData.SUCCESS_BADGE && freshData.SUCCESS_BADGE.includes('30%')) {
          freshData.SUCCESS_BADGE = '¡TIENES HASTA UN 15% DE DESCUENTO!';
        }
        setCachedSettings(freshData);
        return freshData;
      }

      return cached.data || null;
    } catch (err) {
      console.warn('Network fetch error for settings, using fallback cache:', err);
      return cached.data || null;
    } finally {
      inFlightPromise = null;
    }
  })();

  return inFlightPromise;
}