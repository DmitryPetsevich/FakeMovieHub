import { API_KEY } from '@constants/index';
import type { IUrl } from '@interfaces/index';

export function createURL(url: IUrl): string {
  const { base, path, params } = url;

  const p = new URLSearchParams({
    api_key: API_KEY,
  });

  for (let [key, value] of Object.entries(params)) {
    if (key === 'api_key') continue;

    if (typeof value === 'number') p.set(key, `${value}`);
    if (typeof value === 'string' && value.trim()) p.set(key, value);
  }

  return `${base}/${path}?${p.toString()}`;
}
