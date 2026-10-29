import { CatalogItem } from '../Catalogo';

export interface RecommendationBundle {
  companionProducts: CatalogItem[];
  similarProducts: CatalogItem[];
}

function normalize(text: string = ''): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Motor de recomendación inteligente para repuestos automotrices.
 * Clasifica los repuestos por afinidad mecánica y devuelve:
 * 1. companionProducts: Productos que "hacen el juego" / frecuentemente usados juntos.
 *    (Ej: Filtro de aceite <-> Aceite de motor, Filtro de aire <-> Limpia sensores MAF)
 * 2. similarProducts: Productos alternativos o del mismo sistema que también te pueden interesar.
 */
export function getProductRecommendations(
  current: CatalogItem | null,
  allItems: CatalogItem[]
): RecommendationBundle {
  if (!current || !Array.isArray(allItems) || allItems.length <= 1) {
    return { companionProducts: [], similarProducts: [] };
  }

  const pool = allItems.filter(item => item.id !== current.id);
  const curTitle = normalize(current.title);
  const curCat = normalize(current.category);
  const curDesc = normalize(current.desc || '');
  const curCompat = normalize(current.compatibility || '');
  const curCombined = `${curTitle} ${curCat} ${curDesc} ${curCompat}`;

  // Detección de tipos de repuesto
  const isOilFilter = curCombined.includes('filtro') && curCombined.includes('aceite');
  const isAirOrCabinFilter = curCombined.includes('filtro') && (curCombined.includes('aire') || curCombined.includes('cabina'));
  const isGeneralFilter = curCombined.includes('filtro') && !isOilFilter && !isAirOrCabinFilter;
  
  const isEngineOil = (
    curCombined.includes('aceite') ||
    curCombined.includes('gtx') ||
    curCombined.includes('special tec') ||
    curCombined.includes('castrol') ||
    curCombined.includes('liqui moly') ||
    /\b(0w|5w|10w|15w|20w)-\d{2}\b/.test(curCombined)
  ) && !curCombined.includes('atf') &&
      !curCombined.includes('cvt') &&
      !curCombined.includes('gear oil') &&
      !curCombined.includes('diferencial') &&
      !curCombined.includes('direccion') &&
      !curCombined.includes('psf');

  const isTransmissionFluid = curCombined.includes('atf') ||
    curCombined.includes('cvt') ||
    curCombined.includes('gear oil') ||
    curCombined.includes('diferencial') ||
    curCombined.includes('transmision') ||
    curCombined.includes('psf') ||
    curCombined.includes('direccion');

  const isCoolant = curCombined.includes('refrigerante') || curCombined.includes('coolant') || curCombined.includes('anticongelante');
  const isCleanerOrAdditive = curCombined.includes('maf') ||
    curCombined.includes('sensor') ||
    curCombined.includes('limpia') ||
    curCombined.includes('aditivo') ||
    curCombined.includes('octanaje') ||
    curCombined.includes('inyector');

  const isStarterOrMotor = curCombined.includes('arranque') || curCombined.includes('alternador') || curCombined.includes('motor');
  const isBrake = curCombined.includes('freno') || curCombined.includes('disco') || curCombined.includes('pastilla');

  // Clasificador de candidatos
  const getCandidateScores = (target: CatalogItem) => {
    const tTitle = normalize(target.title);
    const tCat = normalize(target.category);
    const tDesc = normalize(target.desc || '');
    const tCompat = normalize(target.compatibility || '');
    const tCombined = `${tTitle} ${tCat} ${tDesc} ${tCompat}`;

    const tIsOilFilter = tCombined.includes('filtro') && tCombined.includes('aceite');
    const tIsAirOrCabinFilter = tCombined.includes('filtro') && (tCombined.includes('aire') || tCombined.includes('cabina'));
    const tIsGeneralFilter = tCombined.includes('filtro');
    
    const tIsEngineOil = (
      tCombined.includes('aceite') ||
      tCombined.includes('gtx') ||
      tCombined.includes('special tec') ||
      tCombined.includes('castrol') ||
      tCombined.includes('liqui moly') ||
      /\b(0w|5w|10w|15w|20w)-\d{2}\b/.test(tCombined)
    ) && !tCombined.includes('atf') &&
        !tCombined.includes('cvt') &&
        !tCombined.includes('gear oil') &&
        !tCombined.includes('diferencial') &&
        !tCombined.includes('direccion') &&
        !tCombined.includes('psf');

    const tIsTransmissionFluid = tCombined.includes('atf') ||
      tCombined.includes('cvt') ||
      tCombined.includes('gear oil') ||
      tCombined.includes('transmision') ||
      tCombined.includes('psf') ||
      tCombined.includes('direccion');

    const tIsCoolant = tCombined.includes('refrigerante') || tCombined.includes('coolant');
    const tIsBrake = tCombined.includes('freno') || tCombined.includes('disco') || tCombined.includes('pastilla');
    const tIsCleanerOrAdditive = tCombined.includes('maf') ||
      tCombined.includes('sensor') ||
      tCombined.includes('limpia') ||
      tCombined.includes('aditivo') ||
      tCombined.includes('octanaje') ||
      tCombined.includes('inyector');

    // Compatibilidad compartida de vehículos
    let compatMatch = 0;
    const brands = ['toyota', 'jeep', 'dodge', 'ram', 'chrysler', 'honda', 'acura', 'ford', 'nissan', 'chevrolet'];
    for (const b of brands) {
      if (curCombined.includes(b) && tCombined.includes(b)) {
        compatMatch += 15;
      }
    }
    if (tCombined.includes('multimarca') || tCombined.includes('universal')) {
      compatMatch += 5;
    }

    let companionScore = 0;
    let similarScore = 0;

    // REGLA 1: Filtro de Aceite <---> Aceite de Motor
    if (isOilFilter) {
      if (tIsEngineOil) companionScore += 100 + compatMatch;
      else if (tIsAirOrCabinFilter) companionScore += 40 + compatMatch;
      else if (tIsCleanerOrAdditive) companionScore += 30;
      
      if (tIsOilFilter) similarScore += 90;
      else if (tIsGeneralFilter) similarScore += 60;
    } else if (isEngineOil) {
      if (tIsOilFilter) companionScore += 120 + compatMatch;
      else if (tIsAirOrCabinFilter) companionScore += 50 + compatMatch;
      else if (tIsCleanerOrAdditive) companionScore += 45;
      
      if (tIsEngineOil) similarScore += 95 + compatMatch;
      else if (tIsTransmissionFluid) similarScore += 30;
    }

    // REGLA 2: Filtro de Aire / Cabina <---> Limpia Sensores MAF / Limpiador de Inyectores / Octanaje
    if (isAirOrCabinFilter || isGeneralFilter) {
      if (tIsCleanerOrAdditive && (tCombined.includes('maf') || tCombined.includes('sensor') || tCombined.includes('limpia'))) {
        companionScore += 110 + compatMatch;
      } else if (tCombined.includes('octanaje') || tCombined.includes('aditivo')) {
        companionScore += 70 + compatMatch;
      } else if (tIsEngineOil) {
        companionScore += 50 + compatMatch;
      }

      if (tIsAirOrCabinFilter || tIsGeneralFilter) similarScore += 90 + compatMatch;
    } else if (isCleanerOrAdditive) {
      if (tIsAirOrCabinFilter || tIsGeneralFilter) companionScore += 110 + compatMatch;
      else if (tIsOilFilter || tIsEngineOil) companionScore += 60 + compatMatch;

      if (tIsCleanerOrAdditive) similarScore += 90;
    }

    // REGLA 3: Fluidos de Transmisión (ATF, CVT, PSF)
    if (isTransmissionFluid) {
      if (tIsCoolant || tIsGeneralFilter) companionScore += 70 + compatMatch;
      else if (tIsTransmissionFluid && target.id !== current.id) similarScore += 90 + compatMatch;
      else if (tIsEngineOil) similarScore += 40;
    }

    // REGLA 4: Refrigerante (Coolant)
    if (isCoolant) {
      if (tIsAirOrCabinFilter || tIsEngineOil) companionScore += 80 + compatMatch;
      if (tIsCoolant) similarScore += 90;
    }

    // REGLA 5: Arranque / Inyección / Motor
    if (isStarterOrMotor) {
      if (tCombined.includes('inyector') || tCombined.includes('octanaje')) companionScore += 85 + compatMatch;
      else if (tIsEngineOil) companionScore += 65 + compatMatch;
      similarScore += tCat === curCat ? 70 : 30;
    }

    // REGLA 6: Frenos
    if (isBrake) {
      if (tCombined.includes('sello') || tCombined.includes('garantia') || tIsCleanerOrAdditive) companionScore += 80;
      if (tIsBrake) similarScore += 95;
    }

    // Similaridad por categoría
    if (tCat === curCat) {
      similarScore += 40;
    }

    return { companionScore, similarScore };
  };

  // Puntuamos todos los candidatos
  const evaluated = pool.map(item => ({
    item,
    ...getCandidateScores(item)
  }));

  // Ordenar y seleccionar los mejores acompañantes (frecuentemente usado con / hacen el juego)
  const sortedCompanions = [...evaluated]
    .filter(e => e.companionScore > 20)
    .sort((a, b) => b.companionScore - a.companionScore)
    .map(e => e.item);

  // Si no alcanzamos al menos 2 acompañantes por reglas específicas, rellenar con artículos complementarios populares
  const companionIds = new Set<number>();
  const finalCompanions: CatalogItem[] = [];

  for (const c of sortedCompanions) {
    if (finalCompanions.length >= 3) break;
    companionIds.add(c.id);
    finalCompanions.push(c);
  }

  // Fallback si aún no hay 2 acompañantes
  if (finalCompanions.length < 2) {
    for (const entry of evaluated) {
      if (!companionIds.has(entry.item.id)) {
        companionIds.add(entry.item.id);
        finalCompanions.push(entry.item);
        if (finalCompanions.length >= 2) break;
      }
    }
  }

  // Ordenar y seleccionar productos similares (excluyendo a los ya seleccionados como acompañantes)
  const finalSimilar = evaluated
    .filter(e => !companionIds.has(e.item.id))
    .sort((a, b) => b.similarScore - a.similarScore)
    .slice(0, 6)
    .map(e => e.item);

  return {
    companionProducts: finalCompanions,
    similarProducts: finalSimilar
  };
}
