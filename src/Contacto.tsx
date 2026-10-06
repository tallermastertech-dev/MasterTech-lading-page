import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Car,
  MapPin,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import InspectionSlotPicker from './InspectionSlotPicker';
import { fetchSettingsWithTTL, getCachedSettings } from './utils/settingsCache';

const WhatsAppIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2a10 10 0 0 0-8.624 15.086L2 22l5.067-1.328A10 10 0 1 0 12 2zm5.457 14.28c-.244.686-1.413 1.309-1.977 1.393-.518.077-1.162.109-1.871-.116-.432-.137-.985-.32-1.693-.626-2.981-1.287-4.927-4.289-5.076-4.487-.149-.198-1.213-1.611-1.213-3.074 0-1.463.768-2.18 1.04-2.479.272-.298.594-.372.792-.372.198 0 .396.002.57.01.182.009.427-.069.669.51.247.595.841 2.058.916 2.206.075.149.124.323.025.521-.099.198-.149.322-.3.495-.149.174-.312.388-.446.521-.148.148-.303.309-.13.606.173.298.77 1.271 1.653 2.059 1.135 1.012 2.093 1.325 2.39 1.475.297.148.471.124.644-.075.173-.198.743-.867.94-1.164.199-.298.397-.249.67-.15.272.099 1.733.818 2.03.967.297.149.496.223.57.347.075.124.075.719-.173 1.414z"/>
  </svg>
);

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  WEBHOOK_URL: "https://script.google.com/macros/s/AKfycbxIzUm7itb1hP8BCfbt3tWThExU_jBM9h_-kxJbGb7TlMryGA-zc01OmRnoAASU5AOM/exec",
  GOOGLE_MAPS_LINK: "https://maps.app.goo.gl/fybS1jW9buxQD5gv7",
  LOGO_URL: "/logo.png",
  SUCCESS_BADGE: "¡TIENES HASTA UN 15% DE DESCUENTO!",
  SUCCESS_TEXT: "Un técnico especialista se comunicará contigo vía WhatsApp en breve para coordinar tu descuento y cita.",
};

export default function Contacto() {
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [selectedService, setSelectedService] = useState('Línea de inspección gratuita');
  const [inspectionSlotStr, setInspectionSlotStr] = useState<string>('');
  const [isInspectionSlotValid, setIsInspectionSlotValid] = useState<boolean>(false);
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [services, setServices] = useState<any[]>([]);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');

  useEffect(() => {
    // SEO — meta tags de la página de Contacto
    document.title = 'Contacto & Citas | Taller MasterTech Porlamar';
    const setMeta = (name: string, content: string, prop = false) => {
      const sel = prop ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(prop ? 'property' : 'name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };
    setMeta('description', 'Agenda tu cita en Taller MasterTech, Porlamar, Isla de Margarita. Diagnóstico, mecánica, frenos, climatización y más. Contáctanos por WhatsApp al +58 412 356 5012.');
    setMeta('og:title', 'Contacto & Citas | Taller MasterTech Porlamar', true);
    setMeta('og:description', 'Agenda tu cita en Taller MasterTech, Porlamar, Isla de Margarita. Rápido, confiable y con garantía.', true);

    let linkCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', 'https://www.tallermastertech.com/contacto');

    const cached = getCachedSettings();
    const localData = cached.data;

    if (localData) {
      if (localData.SUCCESS_BADGE && localData.SUCCESS_BADGE.includes('30%')) {
        localData.SUCCESS_BADGE = '¡TIENES HASTA UN 15% DE DESCUENTO!';
      }
      setConfig((prev: any) => ({ ...prev, ...localData }));
      try { if (localData.SERVICES_JSON) setServices(JSON.parse(localData.SERVICES_JSON)); } catch (e) {}
    }

    const loadSettings = async (force = false) => {
      try {
        const data = await fetchSettingsWithTTL({ force });
        if (data && typeof data === 'object') {
          if (data.SUCCESS_BADGE && data.SUCCESS_BADGE.includes('30%')) {
            data.SUCCESS_BADGE = '¡TIENES HASTA UN 15% DE DESCUENTO!';
          }
          setConfig((prev: any) => ({ ...prev, ...data }));
          try { if (data.SERVICES_JSON) setServices(JSON.parse(data.SERVICES_JSON)); } catch (e) {}
        }
      } catch (err) {}
    };
    loadSettings();

    const handleUpdate = () => loadSettings(true);
    window.addEventListener('mastertech_settings_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mastertech_settings_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormErrorMessage('');
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<string, string>;

    if (selectedService === 'Línea de inspección gratuita') {
      if (inspectionSlotStr) {
        data.fecha_hora = inspectionSlotStr;
      }
    }

    const desc = data.descripcion ? ` — ${data.descripcion}` : '';
    data.servicio = selectedService === 'Otro'
      ? `Otro: ${data.descripcion}`
      : `${selectedService}${desc}`;

    // Format WhatsApp Direct Link
    const targetPhone = "584123565012";
    let msg = `🚗 *NUEVA SOLICITUD / CITA - MASTERTECH* 🛠️\n\n`;
    msg += `👤 *Cliente:* ${data.nombre || ''}\n`;
    msg += `📱 *WhatsApp:* ${data.telefono || ''}\n`;
    msg += `🚗 *Vehículo:* ${data.vehiculo || 'No especificado'}\n`;
    msg += `🛠️ *Servicio:* ${data.servicio || 'Servicio General'}\n`;
    if (data.fecha_hora) msg += `📅 *Horario:* ${data.fecha_hora}\n`;
    if (data.descripcion) msg += `📝 *Detalles:* ${data.descripcion}\n`;
    msg += `\n_Solicitud enviada desde MasterTech Web._`;

    const generatedWhatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    setWhatsappUrl(generatedWhatsappUrl);

    // Create local lead object immediately for client-side storage
    const localLead = {
      id: Date.now(),
      nombre: String(data.nombre || ''),
      telefono: String(data.telefono || ''),
      vehiculo: String(data.vehiculo || ''),
      servicio: String(data.servicio || ''),
      status: 'Pendiente',
      falla: String(data.descripcion || ''),
      fecha_hora: String(data.fecha_hora || ''),
      created_at: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
      existing.unshift(localLead);
      localStorage.setItem('mastertech_leads_store', JSON.stringify(existing.slice(0, 100)));
    } catch (e) {}

    // Auto-open WhatsApp in background
    setTimeout(() => {
      try { window.open(generatedWhatsappUrl, '_blank'); } catch (e) {}
    }, 300);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.lead) {
          try {
            const existing = JSON.parse(localStorage.getItem('mastertech_leads_store') || '[]');
            const filtered = existing.filter((l: any) => l.id !== localLead.id);
            filtered.unshift(json.lead);
            localStorage.setItem('mastertech_leads_store', JSON.stringify(filtered.slice(0, 100)));
          } catch (e) {}
        }
        setFormStatus('success');
      } else {
        if (res.status === 409) {
          const json = await res.json();
          alert(json.error || "El turno seleccionado ya fue reservado por otro usuario. Por favor selecciona otro turno libre.");
          setFormStatus('idle');
          return;
        }
        setFormStatus('success');
      }
    } catch (error) {
      console.warn("Fetch completed with local storage sync:", error);
      setFormStatus('success');
    }
  };

  return (
    <div className="theme-root min-h-screen selection:bg-primary selection:text-white flex flex-col overflow-x-hidden w-full max-w-full bg-slate-50 dark:bg-[#0a0b0f] text-slate-900 dark:text-white transition-colors duration-300">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/5 dark:bg-primary/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Header */}
      <header className="py-5 px-6 flex justify-center border-b border-slate-200 dark:border-white/5 bg-white/90 dark:bg-[#0d0e12]/90 backdrop-blur-xl relative z-10">
        <a href="/" className="cursor-pointer hover:opacity-90 transition-opacity inline-flex items-center gap-2.5">
          <img src={config.LOGO_URL || "/logo.png"} alt="MasterTech" className="h-9 w-auto object-contain shrink-0 logo-gold" />
          <span className="font-display font-black text-xl tracking-tighter uppercase text-slate-900 dark:text-white">
            MASTER<span className="text-primary italic">TECH</span>
          </span>
        </a>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 sm:py-16 relative z-10">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Page Title */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Agenda tu cita
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-tight mb-4 uppercase text-slate-900 dark:text-white">
                SOLICITA TU CITA DE REVISIÓN <br />
                <span className="text-primary">EN TALLER MASTERTECH</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
                Revisión preventiva y asesoría especializada con presupuesto previo antes de cualquier intervención.
              </p>
            </div>

            {/* Booking Form — full width */}
            <div className="bg-white dark:bg-[#12141a]/95 p-6 sm:p-10 rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl">
              <AnimatePresence mode="wait">
                {formStatus === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">¡CITA SOLICITADA!</h2>
                    {selectedService === 'Línea de inspección gratuita' ? (
                      <>
                        <div className="inline-block bg-primary/20 border border-primary text-primary px-4 py-2 rounded-full font-bold tracking-widest text-sm mb-6 animate-pulse">
                          {(config.SUCCESS_BADGE && !config.SUCCESS_BADGE.includes('30%')) ? config.SUCCESS_BADGE : '¡TIENES HASTA UN 15% DE DESCUENTO!'}
                        </div>
                        <p className="text-slate-600 dark:text-zinc-400 max-w-sm mx-auto">
                          {config.SUCCESS_TEXT || 'Un técnico especialista se comunicará contigo vía WhatsApp en breve para coordinar tu descuento y cita.'}
                        </p>
                      </>
                    ) : (
                      <p className="text-slate-600 dark:text-zinc-400 text-base sm:text-lg max-w-sm mx-auto">
                        Tu solicitud ha sido registrada con éxito. Un asesor de servicio te contactará de inmediato por WhatsApp para confirmar tu cita.
                      </p>
                    )}

                    {/* Action buttons on success */}
                    <div className="grid grid-cols-2 gap-4 mt-8 max-w-sm mx-auto">
                      <a
                        href={config.GOOGLE_MAPS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary/40 hover:bg-slate-100 dark:hover:bg-white/8 transition-all duration-300 group shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-red-100 dark:bg-white/5 border border-red-200 dark:border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                          <MapPin size={16} />
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500">Ubicación</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Porlamar,<br/>Nueva Esparta</p>
                        </div>
                      </a>
                      <a
                        href={whatsappUrl || config.WHATSAPP_LINK || 'https://wa.me/584123565012'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 p-4 bg-emerald-50 dark:bg-[#25D366]/20 border border-emerald-200 dark:border-[#25D366]/40 rounded-2xl hover:border-[#25D366] hover:bg-emerald-100 dark:hover:bg-[#25D366]/30 transition-all duration-300 group shadow-sm"
                      >
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-[#25D366]/30 border border-emerald-200 dark:border-[#25D366]/40 flex items-center justify-center text-emerald-600 dark:text-[#25D366] group-hover:bg-emerald-600 dark:group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                          <WhatsAppIcon size={18} className="fill-current" />
                        </div>
                        <div className="text-left">
                          <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-zinc-400">Confirmar</p>
                          <p className="text-sm font-black text-emerald-600 dark:text-[#25D366]">Chat en<br/>WhatsApp</p>
                        </div>
                      </a>
                    </div>

                    <button
                      onClick={() => { setFormStatus('idle'); setSelectedService('Línea de inspección gratuita'); }}
                      className="mt-6 text-primary font-bold uppercase tracking-widest text-xs hover:underline cursor-pointer"
                    >
                      Solicitar otra cita
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="mb-6">
                      <h2 className="text-2xl font-black tracking-tight mb-1 text-slate-900 dark:text-white">Completa tu registro</h2>
                      <p className="text-sm text-slate-500 dark:text-zinc-400">Solo unos datos y te contactamos por WhatsApp al instante.</p>
                    </div>

                    {/* Nombre + Teléfono */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="contacto-nombre" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 ml-2 sm:ml-4">Nombre</label>
                        <input
                          id="contacto-nombre"
                          required
                          name="nombre"
                          type="text"
                          placeholder="Ej: Carlos Rodríguez"
                          className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-slate-900 dark:text-white text-sm font-semibold shadow-sm hover:border-slate-400 dark:hover:border-white/20"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label htmlFor="contacto-telefono" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 ml-2 sm:ml-4">Teléfono</label>
                        <input
                          id="contacto-telefono"
                          required
                          name="telefono"
                          type="tel"
                          placeholder="Ej: 0412 000 0000"
                          className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-slate-900 dark:text-white text-sm font-semibold shadow-sm hover:border-slate-400 dark:hover:border-white/20"
                        />
                      </div>
                    </div>

                    {/* Vehículo */}
                    <div className="space-y-1.5">
                      <label htmlFor="contacto-vehiculo" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 ml-2 sm:ml-4">Vehículo</label>
                      <div className="relative">
                        <Car className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-zinc-500" />
                        <input
                          id="contacto-vehiculo"
                          required
                          name="vehiculo"
                          type="text"
                          placeholder="Ej: Toyota Hilux 2022 — Gris"
                          className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 sm:py-4 pl-12 sm:pl-14 pr-5 sm:pr-6 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-600 text-slate-900 dark:text-white text-sm font-semibold shadow-sm hover:border-slate-400 dark:hover:border-white/20"
                        />
                      </div>
                    </div>

                    {/* Servicio */}
                    <div className="space-y-1.5">
                      <label htmlFor="contacto-servicio" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 ml-2 sm:ml-4">Servicio Requerido</label>
                      <div className="relative">
                        <select
                          id="contacto-servicio"
                          name="servicio"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 sm:py-4 pl-5 sm:pl-6 pr-10 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all appearance-none cursor-pointer text-slate-900 dark:text-white text-sm font-semibold shadow-sm hover:border-slate-400 dark:hover:border-white/20"
                        >
                          <option value="Línea de inspección gratuita" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Línea de inspección gratuita</option>
                          {services.length > 0 ? (
                            services.map((s, idx) => (
                              <option key={s.id || idx} value={s.title} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">{s.title}</option>
                            ))
                          ) : (
                            <>
                              <option value="Mecánica general" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Mecánica general</option>
                              <option value="Mantenimiento preventivo" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Mantenimiento preventivo</option>
                              <option value="Electricidad y electrónica" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Electricidad y electrónica</option>
                              <option value="Frenos y suspensión" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Frenos y suspensión</option>
                              <option value="Inyección electrónica" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Inyección electrónica</option>
                              <option value="Climatización" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Climatización</option>
                            </>
                          )}
                          <option value="Otro" className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white py-1">Otro (Especificar)</option>
                        </select>
                        <ChevronDown className="w-4 h-4 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-zinc-400" />
                      </div>
                    </div>

                    {selectedService === 'Línea de inspección gratuita' && (
                      <InspectionSlotPicker 
                        onSelectSlot={(slotStr, isValid) => {
                          setInspectionSlotStr(slotStr);
                          setIsInspectionSlotValid(isValid);
                        }} 
                      />
                    )}

                    {/* Descripción — siempre visible */}
                    <motion.div layout className="space-y-1.5">
                      <label htmlFor="contacto-descripcion" className="text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-400 ml-2 sm:ml-4">
                        {selectedService === 'Otro' ? 'Descripción del Servicio' : 'Descripción / Observaciones'}
                      </label>
                      <textarea
                        id="contacto-descripcion"
                        required={selectedService === 'Otro'}
                        name="descripcion"
                        placeholder={
                          selectedService === 'Línea de inspección gratuita'
                            ? 'Ej: Quiero revisar el vehículo antes de un viaje largo...'
                            : selectedService === 'Mecánica general'
                            ? 'Ej: El motor hace un ruido extraño al arrancar...'
                            : selectedService === 'Mantenimiento preventivo'
                            ? 'Ej: Cambio de aceite y filtros, revisión general...'
                            : selectedService === 'Electricidad y electrónica'
                            ? 'Ej: Se apaga el tablero, falla en el sistema eléctrico...'
                            : selectedService === 'Frenos y suspensión'
                            ? 'Ej: Vibración al frenar, ruido en la suspensión...'
                            : selectedService === 'Inyección electrónica'
                            ? 'Ej: Luz de check encendida, falla en inyectores...'
                            : selectedService === 'Climatización'
                            ? 'Ej: El aire acondicionado no enfría bien...'
                            : 'Describe detalladamente lo que necesitas...'
                        }
                        rows={3}
                        className="w-full bg-slate-50 dark:bg-black/60 border border-slate-300 dark:border-white/10 rounded-2xl py-3.5 sm:py-4 px-5 sm:px-6 focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all text-sm resize-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-600 shadow-sm hover:border-slate-400 dark:hover:border-white/20"
                      />
                    </motion.div>

                    {/* Submit button */}
                    <button
                      disabled={formStatus === 'loading'}
                      type="submit"
                      className="btn-primary w-full !py-4 sm:!py-5 shadow-[0_20px_50px_rgba(194,164,114,0.3)] flex items-center justify-center gap-3 text-sm sm:text-base cursor-pointer"
                    >
                      {formStatus === 'loading' ? (
                        'Procesando...'
                      ) : (
                        <>AGENDAR MI CITA VÍA WHATSAPP <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>

                    {formStatus === 'error' && (
                      <p className="text-primary text-center text-sm font-bold pt-1">{formErrorMessage}</p>
                    )}

                    {/* Two action buttons below submit */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <a
                        href={config.GOOGLE_MAPS_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary/40 hover:bg-slate-100 dark:hover:bg-white/8 transition-all duration-300 group shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-white/5 border border-red-200 dark:border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-zinc-500 mb-0.5">Ubicación</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">Porlamar,<br/>Nueva Esparta</p>
                        </div>
                      </a>

                      <a
                        href={config.WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-[#25D366]/10 border border-emerald-200 dark:border-[#25D366]/20 rounded-2xl hover:border-[#25D366]/50 hover:bg-emerald-100 dark:hover:bg-[#25D366]/15 transition-all duration-300 group shadow-sm"
                      >
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-[#25D366]/15 border border-emerald-200 dark:border-[#25D366]/20 flex items-center justify-center text-emerald-600 dark:text-[#25D366] group-hover:bg-emerald-600 dark:group-hover:bg-[#25D366] group-hover:text-white transition-all shrink-0">
                          <WhatsAppIcon size={20} className="fill-current" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-emerald-700 dark:text-zinc-400 mb-0.5">Escríbenos ahora</p>
                          <p className="text-sm font-black text-emerald-600 dark:text-[#25D366]">Chat en WhatsApp</p>
                        </div>
                      </a>
                    </div>

                    <p className="text-[11px] sm:text-xs text-center text-slate-500 dark:text-zinc-500 leading-relaxed font-medium pt-1 sm:pt-2">Una vez enviado, un asesor de servicio te contactará de inmediato por WhatsApp para confirmar tu hora exacta. ¡Te esperamos en nuestro taller!</p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-slate-500 dark:text-zinc-500 text-xs border-t border-slate-200 dark:border-white/5 relative z-10 bg-slate-100 dark:bg-black/40">
        © 2026 SOLUCIONES MASTERTECH C.A. Todos los derechos reservados.
      </footer>
    </div>
  );
}
