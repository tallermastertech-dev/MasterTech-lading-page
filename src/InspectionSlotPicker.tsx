import React, { useState, useEffect, useMemo } from 'react';
import { Calendar, Clock } from 'lucide-react';

export const INSPECTION_SLOTS = [
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM"
];

export const JORNADA_SLOTS = [
  "08:30 AM",
  "09:00 AM",
  "09:30 AM"
];

interface InspectionSlotPickerProps {
  onSelectSlot: (dateTimeString: string, isValid: boolean) => void;
  allowedDaysOfWeek?: number[];
  dateLabel?: string;
  customSlots?: string[];
  isJornada?: boolean;
  refreshTrigger?: number | string;
}

export default function InspectionSlotPicker({
  onSelectSlot,
  allowedDaysOfWeek,
  dateLabel,
  customSlots,
  isJornada,
  refreshTrigger
}: InspectionSlotPickerProps) {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [occupiedSlots, setOccupiedSlots] = useState<Record<string, string[]>>({});

  const activeSlots = useMemo(() => {
    if (customSlots && customSlots.length > 0) return customSlots;
    if (isJornada) return JORNADA_SLOTS;
    return INSPECTION_SLOTS;
  }, [customSlots, isJornada]);

  const targetDays = useMemo(() => {
    if (allowedDaysOfWeek && allowedDaysOfWeek.length > 0) return allowedDaysOfWeek;
    if (isJornada) return [3]; // Sólo Miércoles
    return [1]; // Sólo Lunes para inspecciones regulares
  }, [allowedDaysOfWeek, isJornada]);

  useEffect(() => {
    fetchOccupiedSlots();

    const handleSlotsEvent = () => {
      fetchOccupiedSlots();
    };

    window.addEventListener('mastertech_slots_updated', handleSlotsEvent);
    window.addEventListener('storage', handleSlotsEvent);

    return () => {
      window.removeEventListener('mastertech_slots_updated', handleSlotsEvent);
      window.removeEventListener('storage', handleSlotsEvent);
    };
  }, [refreshTrigger]);

  const fetchOccupiedSlots = async () => {
    let occupied: Record<string, string[]> = {};
    try {
      const res = await fetch(`/api/inspection-slots?_t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        occupied = data.occupied || {};
      }
    } catch (e) {}

    // Merge client-side local storage leads
    try {
      const c1 = localStorage.getItem('mastertech_leads_store');
      const c2 = localStorage.getItem('cached_admin_leads');
      const localLeads: any[] = [];
      if (c1) localLeads.push(...JSON.parse(c1));
      if (c2) localLeads.push(...JSON.parse(c2));

      for (const lead of localLeads) {
        if (!lead || lead.status === 'Cancelado') continue;
        const text = `${lead.fecha_hora || ''} ${lead.falla || ''} ${lead.servicio || ''}`;
        let dateStr = '';
        const ymdMatch = text.match(/\b(20\d{2})[-/](\d{2})[-/](\d{2})\b/);
        const esMatch = text.match(/\b(\d{1,2})\s+(?:de\s+)?(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)[a-z]*\b/i);
        
        if (ymdMatch) {
          dateStr = `${ymdMatch[1]}-${ymdMatch[2]}-${ymdMatch[3]}`;
        } else if (esMatch) {
          const monthMap: Record<string, string> = {
            ene: '01', feb: '02', mar: '03', abr: '04', may: '05', jun: '06',
            jul: '07', ago: '08', sep: '09', oct: '10', nov: '11', dic: '12'
          };
          const month = monthMap[esMatch[2].toLowerCase().slice(0, 3)] || '08';
          dateStr = `${new Date().getFullYear()}-${month}-${esMatch[1].padStart(2, '0')}`;
        }

        const timeMatch = text.match(/\b(0?[1-9]|1[0-2]):([0-5]\d)\s*(AM|PM)?\b/i);
        if (dateStr && timeMatch) {
          let h = timeMatch[1];
          if (h.length === 1) h = '0' + h;
          const m = timeMatch[2];
          const period = (timeMatch[3] || 'AM').toUpperCase();
          const timeStr = `${h}:${m} ${period}`;
          if (!occupied[dateStr]) occupied[dateStr] = [];
          if (!occupied[dateStr].includes(timeStr)) {
            occupied[dateStr].push(timeStr);
          }
        }
      }
    } catch (e) {}

    setOccupiedSlots(occupied);
  };

  // Generate upcoming days based on allowed days of week
  const availableDays = useMemo(() => {
    const dates: { dateStr: string; label: string }[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 60; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      if (targetDays.includes(dayOfWeek)) {
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        const rawWeekday = d.toLocaleDateString('es-ES', { weekday: 'long' });
        const weekdayName = rawWeekday.charAt(0).toUpperCase() + rawWeekday.slice(1);
        const monthName = d.toLocaleDateString('es-ES', { month: 'short' });
        const label = `${weekdayName} ${d.getDate()} ${monthName}`;

        dates.push({ dateStr, label });
        if (dates.length >= 6) break;
      }
    }
    return dates;
  }, [targetDays]);

  // Pre-select first available date & time slot automatically
  useEffect(() => {
    if (availableDays.length > 0) {
      const isValidDate = availableDays.some(d => d.dateStr === selectedDate);
      const activeDate = isValidDate ? selectedDate : availableDays[0].dateStr;
      if (!isValidDate) {
        setSelectedDate(activeDate);
      }
      const booked = occupiedSlots[activeDate] || [];
      const isValidTime = activeSlots.includes(selectedTime);
      const isAvailable = isValidTime && !booked.includes(selectedTime);
      const firstFree = activeSlots.find(slot => !booked.includes(slot)) || activeSlots[0];
      const activeTime = isAvailable ? selectedTime : firstFree;
      if (activeTime !== selectedTime) {
        setSelectedTime(activeTime);
      }
      const isTaken = booked.includes(activeTime);
      const formattedLabel = availableDays.find(d => d.dateStr === activeDate)?.label || activeDate;
      onSelectSlot(`Cita Inspección: [${activeDate}] ${formattedLabel} a las ${activeTime}`, !isTaken);
    }
  }, [availableDays, selectedDate, selectedTime, occupiedSlots, activeSlots, onSelectSlot]);

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
    const booked = occupiedSlots[dateStr] || [];
    const freeSlot = activeSlots.find(slot => !booked.includes(slot)) || activeSlots[0];
    setSelectedTime(freeSlot);
  };

  const handleTimeSelect = (timeStr: string) => {
    setSelectedTime(timeStr);
  };

  const effectiveDateLabel = useMemo(() => {
    if (dateLabel) return dateLabel;
    if (isJornada) return 'Fecha (Sólo Miércoles)';
    if (targetDays.length === 1) {
      const dayMap: Record<number, string> = {
        0: 'Domingos', 1: 'Lunes', 2: 'Martes', 3: 'Miércoles',
        4: 'Jueves', 5: 'Viernes', 6: 'Sábados'
      };
      return `Fecha (Sólo ${dayMap[targetDays[0]] || 'Lunes'})`;
    }
    return 'Fecha Disponible';
  }, [dateLabel, isJornada, targetDays]);

  const bookedForSelectedDate = selectedDate ? (occupiedSlots[selectedDate] || []) : [];
  const freeSlotsCount = Math.max(0, activeSlots.length - bookedForSelectedDate.length);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Cubículo 1: Selector de Fecha */}
      <div className="space-y-2 text-left">
        <label htmlFor="slot-fecha-select" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2 sm:ml-4 flex items-center gap-1.5 whitespace-nowrap h-4">
          <Calendar size={13} className="text-primary shrink-0" /> <span>{effectiveDateLabel}</span>
        </label>
        <div className="relative">
          <select 
            id="slot-fecha-select"
            name="fecha_inspeccion"
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-white text-sm font-bold pr-10"
          >
            {availableDays.map((d) => {
              const booked = occupiedSlots[d.dateStr] || [];
              const isFull = booked.length >= activeSlots.length;
              return (
                <option key={d.dateStr} value={d.dateStr} disabled={isFull}>
                  {d.label} {isFull ? '(LLENO)' : ''}
                </option>
              );
            })}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Cubículo 2: Selector de Horario / Turno */}
      <div className="space-y-2 text-left">
        <label htmlFor="slot-hora-select" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-2 sm:ml-4 flex items-center justify-between pr-2 whitespace-nowrap h-4">
          <span className="flex items-center gap-1.5"><Clock size={13} className="text-primary shrink-0" /> Hora (Turno)</span>
          <span className="text-primary font-bold">{freeSlotsCount}/{activeSlots.length} libres</span>
        </label>
        <div className="relative">
          <select 
            id="slot-hora-select"
            name="hora_inspeccion"
            value={selectedTime}
            onChange={(e) => handleTimeSelect(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-xl sm:rounded-2xl py-3 sm:py-4 px-4 sm:px-6 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-white text-sm font-bold pr-10"
          >
            {activeSlots.map((slot) => {
              const isTaken = bookedForSelectedDate.includes(slot);
              return (
                <option key={slot} value={slot} disabled={isTaken}>
                  {slot} {isTaken ? '(OCUPADO)' : ''}
                </option>
              );
            })}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 text-xs">
            ▼
          </div>
        </div>
      </div>
    </div>
  );
}
