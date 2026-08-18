/**
 * Taller MasterTech - Dynamic Schedule & Open/Closed Status Helper
 * Horario oficial: Lunes a Viernes de 8:00 AM a 5:00 PM (Hora Venezuela UTC-4)
 * Sábados y Domingos: Solo Emergencias 24/7
 */

export interface TallerStatusInfo {
  isOpen: boolean;
  isAuto: boolean;
  label: string;
  badgeText: string;
  scheduleText: string;
  dotColor: string;
  badgeBg: string;
  badgeBorder: string;
}

export function getTallerStatus(isOpenSetting?: string): TallerStatusInfo {
  // Manual force overrides only if explicitly set to force_closed or force_open
  if (isOpenSetting === 'force_closed' || isOpenSetting === 'false') {
    return {
      isOpen: false,
      isAuto: false,
      label: 'Taller Cerrado',
      badgeText: 'Taller Cerrado • Emergencias 24/7',
      scheduleText: 'Cerrado Temporalmente (Guardia de Emergencias)',
      dotColor: 'bg-red-500 shadow-[0_0_10px_#ef4444]',
      badgeBg: 'bg-red-500/10 backdrop-blur-md',
      badgeBorder: 'border-red-500/30 text-red-400'
    };
  }

  if (isOpenSetting === 'force_open') {
    return {
      isOpen: true,
      isAuto: false,
      label: 'Taller Abierto',
      badgeText: 'Taller Abierto • Guardia Especial',
      scheduleText: 'Abierto Especialmente',
      dotColor: 'bg-emerald-500 shadow-[0_0_10px_#10b981]',
      badgeBg: 'bg-emerald-500/10 backdrop-blur-md',
      badgeBorder: 'border-emerald-500/30 text-emerald-400'
    };
  }

  // Automatic Schedule Mode (Venezuela Time Zone America/Caracas: Lun-Vie 8:00 AM a 5:00 PM)
  try {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Caracas',
      hour12: false,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const parts = formatter.formatToParts(now);

    let day = '';
    let hour = 0;
    let minute = 0;

    for (const p of parts) {
      if (p.type === 'weekday') day = p.value.toLowerCase();
      if (p.type === 'hour') hour = parseInt(p.value, 10);
      if (p.type === 'minute') minute = parseInt(p.value, 10);
    }

    // Mon - Fri check
    const isWeekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'lun', 'mar', 'mie', 'jue', 'vie'].some(d => day.includes(d));
    const currentMinutes = hour * 60 + minute;
    const openMinutes = 8 * 60;   // 8:00 AM
    const closeMinutes = 17 * 60; // 5:00 PM (17:00)

    const isOpenNow = isWeekday && currentMinutes >= openMinutes && currentMinutes < closeMinutes;

    if (isOpenNow) {
      return {
        isOpen: true,
        isAuto: true,
        label: 'Taller Abierto',
        badgeText: 'Taller Abierto • Lun-Vie 8am-5pm',
        scheduleText: 'Abierto de Lunes a Viernes 8:00am - 5:00pm',
        dotColor: 'bg-emerald-500 shadow-[0_0_10px_#10b981]',
        badgeBg: 'bg-emerald-500/10 backdrop-blur-md',
        badgeBorder: 'border-emerald-500/30 text-emerald-400'
      };
    } else {
      return {
        isOpen: false,
        isAuto: true,
        label: 'Taller Cerrado',
        badgeText: 'Taller Cerrado • Emergencias 24/7',
        scheduleText: 'Cerrado por Horario (Atención Emergencias 24/7)',
        dotColor: 'bg-amber-500 shadow-[0_0_10px_#f59e0b]',
        badgeBg: 'bg-amber-500/10 backdrop-blur-md',
        badgeBorder: 'border-amber-500/30 text-amber-300'
      };
    }
  } catch (e) {
    return {
      isOpen: true,
      isAuto: true,
      label: 'Taller Abierto',
      badgeText: 'Taller Abierto',
      scheduleText: 'Horario Habitual',
      dotColor: 'bg-emerald-500 shadow-[0_0_10px_#10b981]',
      badgeBg: 'bg-emerald-500/10 backdrop-blur-md',
      badgeBorder: 'border-emerald-500/30 text-emerald-400'
    };
  }
}
