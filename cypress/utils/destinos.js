// cypress/support/utils/destinos.js
import { normalize } from './text';

export const DESTINO_ALIASES = {
  // 🔴 claves SIEMPRE normalizadas (minúsculas, sin acentos)
  'cordoba': ['córdoba', 'cordoba', 'ciudad de córdoba', 'ciudad de cordoba'],
  'carlos paz': ['carlos paz', 'villa carlos paz'],
  'mar del plata': ['mar del plata', 'mdq'],
  'buenos aires': ['buenos aires', 'caba', 'ciudad autonoma de buenos aires', 'capital federal'],
  // agregá más según lo que veas en tu app
};

export function posiblesMatches(destino) {
  const key = normalize(destino);                    // "Córdoba" -> "cordoba"
  const lista = DESTINO_ALIASES[key] || [destino];   // si no hay alias, usa el propio destino
  return lista.map(normalize);                       // devuelve todo normalizado
}

