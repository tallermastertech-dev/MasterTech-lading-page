import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { 
  ChevronLeft, 
  ArrowRight, 
  Briefcase, 
  X, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  User, 
  Phone, 
  Sparkles, 
  AlertCircle,
  Clock,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONFIG_DEFAULT = {
  PHONE_NUMBER: "+584123565012",
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

const CARGOS_DISPONIBLES = [
  'Mecánica General & Motores',
  'Diagnóstico Computarizado & Electrónica Automotriz',
  'Asesoría de Servicio & Atención al Cliente',
  'Coordinación de Logística & Repuestos',
  'Detailing, Estética Automotriz & Lavado',
  'Aire Acondicionado & Climatización',
  'Inyección Electrónica & Limpieza por Ultrasonido',
  'Administración, Finanzas & Gestión de Taller',
  'Otro Perfil / Especialidad Técnica'
];

const NIVELES_EXPERIENCIA = [
  '1 a 2 años de experiencia',
  '3 a 5 años de experiencia',
  'Más de 5 años de experiencia',
  'Estudiante / Recién Graduado con Pasión por los Autos'
];

export default function Nosotros() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);

  // Recruitment Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formNombre, setFormNombre] = useState('');
  const [formTelefono, setFormTelefono] = useState('');
  const [formCargo, setFormCargo] = useState(CARGOS_DISPONIBLES[0]);
  const [formExperiencia, setFormExperiencia] = useState(NIVELES_EXPERIENCIA[1]);
  const [formMensaje, setFormMensaje] = useState('');
  const [formCvFile, setFormCvFile] = useState<File | null>(null);
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const parseTeam = (dataObj: any) => {
      if (dataObj?.TEAM_MEMBERS_JSON) {
        try {
          const parsed = JSON.parse(dataObj.TEAM_MEMBERS_JSON);
          if (Array.isArray(parsed)) return parsed;
        } catch (e) {}
      }
      return [];
    };

    // 1. Initial load from local store for instant rendering if available
    try {
      const stored = localStorage.getItem('mastertech_settings_store');
      if (stored) {
        const localData = JSON.parse(stored);
        if (localData) {
          setConfig((prev: any) => ({ ...prev, ...localData }));
          setTeamMembers(parseTeam(localData));
        }
      }
    } catch (e) {}

    // 2. Fetch authoritative fresh data from Supabase backend (no-cache)
    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data === 'object') {
            setConfig((prev: any) => ({ ...prev, ...data }));
            try { localStorage.setItem('mastertech_settings_store', JSON.stringify(data)); } catch (e) {}
            setTeamMembers(parseTeam(data));
          }
        }
      } catch (err) {
        console.error("Error cargando equipo desde Supabase:", err);
      }
    };
    fetchSettings();

    const handleSettingsUpdated = (e: any) => {
      const updated = e.detail || e;
      if (updated && typeof updated === 'object') {
        setConfig((prev: any) => ({ ...prev, ...updated }));
        setTeamMembers(parseTeam(updated));
      }
    };
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);

    return () => {
      window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max 15MB
      if (file.size > 15 * 1024 * 1024) {
        setFormError('El archivo es muy pesado. El tamaño máximo es 15MB.');
        return;
      }
      setFormCvFile(file);
      setFormError('');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formNombre.trim()) {
      setFormError('Por favor ingresa tu nombre y apellido.');
      return;
    }

    const cleanPhone = formTelefono.replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      setFormError('Por favor ingresa un número de teléfono o WhatsApp válido.');
      return;
    }

    setFormSubmitting(true);

    try {
      // 1. Opcional: Registro en el backend para histórico de postulaciones
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formNombre.trim(),
            telefono: formTelefono.trim(),
            vehiculo: 'Postulante Equipo MasterTech',
            servicio: `Reclutamiento: ${formCargo}`,
            falla: `[Experiencia: ${formExperiencia}] ${formMensaje ? `Mensaje: ${formMensaje}` : ''} ${formCvFile ? `[CV Adjunto: ${formCvFile.name} (${(formCvFile.size / 1024).toFixed(0)} KB)]` : '[Sin archivo adjunto previo]'}`
          })
        });
      } catch (err) {
        // Silencioso, continuamos con WhatsApp
      }

      // 2. Formatear mensaje profesional de WhatsApp
      let msg = `💼 *POSTULACIÓN LABORAL - MASTERTECH* 🛠️\n\n`;
      msg += `👤 *Candidato:* ${formNombre.trim()}\n`;
      msg += `📱 *WhatsApp de Contacto:* ${formTelefono.trim()}\n`;
      msg += `🎯 *Cargo de Interés:* ${formCargo}\n`;
      msg += `⏳ *Nivel de Experiencia:* ${formExperiencia}\n`;
      
      if (formMensaje.trim()) {
        msg += `\n📝 *Perfil & Habilidades:*\n"${formMensaje.trim()}"\n`;
      }

      if (formCvFile) {
        msg += `\n📎 *Currículum Vitae:*\nAdjunto mi archivo de CV: *${formCvFile.name}* (${(formCvFile.size / 1024).toFixed(0)} KB)`;
      } else {
        msg += `\n📎 *Currículum Vitae:*\nListo para adjuntar mi CV o responder a su solicitud de entrevista.`;
      }

      const targetPhone = (config.PHONE_NUMBER || '+584123565012').replace(/[^\d]/g, '');
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;

      setFormSuccess(true);
      setFormSubmitting(false);

      // Abrir WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 600);

    } catch (err: any) {
      setFormError('Hubo un error al procesar tu solicitud. Por favor intenta de nuevo.');
      setFormSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormNombre('');
    setFormTelefono('');
    setFormCargo(CARGOS_DISPONIBLES[0]);
    setFormExperiencia(NIVELES_EXPERIENCIA[1]);
    setFormMensaje('');
    setFormCvFile(null);
    setFormError('');
    setFormSuccess(false);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-white flex flex-col selection:bg-primary selection:text-black">
      {/* Navigation Header */}
      <Navbar activePage="nosotros" />

      {/* Main Content */}
      <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
        {/* Background Decorative Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-black tracking-widest uppercase mb-4">
                Conoce al equipo
              </div>
              <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tighter mb-6">
                NUESTRO <span className="text-primary italic">EQUIPO</span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Profesionales apasionados por la mecánica y comprometidos con la excelencia, precisión y transparencia en cada servicio.
              </p>
            </div>

            {/* Team Grid */}
            <div className={`grid gap-8 mb-20 ${teamMembers.length === 1 ? 'md:grid-cols-1 max-w-md mx-auto' : teamMembers.length === 2 ? 'md:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {teamMembers.map((member, i) => (
                <div key={member.id || i} className="glass-card overflow-hidden group flex flex-col h-full border border-primary/20 hover:border-primary/60 transition-all duration-300 shadow-2xl rounded-3xl bg-[#121417]">
                  {/* Photo Container */}
                  <div className="h-64 sm:h-72 overflow-hidden relative shrink-0 bg-[#0D0D0D]">
                    <img 
                      src={member.img || "/assets/servicio-mecanica.jpg"} 
                      alt={member.name} 
                      onError={(e) => { (e.target as HTMLImageElement).src = '/assets/servicio-mecanica.jpg'; }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 bg-[#121417] relative z-20 text-center items-center justify-between">
                    <div className="w-full flex flex-col items-center">
                      {/* Role Badge */}
                      <div className="mb-3.5 flex justify-center w-full">
                        <span className="inline-block text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-widest bg-[#0D0D0D]/80 border border-primary/40 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                          {member.role || 'ESPECIALISTA'}
                        </span>
                      </div>
                      
                      {/* Member Name */}
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-2.5 text-center group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>

                      {/* Profile Description */}
                      <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal text-center max-w-xs mx-auto">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box - Unirse al Equipo MasterTech */}
            <div className="bg-gradient-to-b from-white/10 via-[#16181D] to-[#0E1013] border border-primary/30 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Oportunidades & Talento</span>
              </div>
              
              <h3 className="text-2xl sm:text-4xl font-black mb-3 text-white tracking-tight leading-tight">
                ¿Quieres formar parte del <span className="text-primary italic">equipo MasterTech</span>?
              </h3>
              
              <p className="text-zinc-300 text-sm sm:text-base mb-8 leading-relaxed max-w-lg mx-auto">
                Buscamos profesionales apasionados por la precisión mecánica, el diagnóstico automotriz y la excelencia en el servicio. Completa tu postulación y adjunta tu currículum.
              </p>
              
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setFormSuccess(false);
                }}
                className="btn-primary inline-flex items-center justify-center gap-3 !py-4 !px-9 text-sm sm:text-base font-black border-none mx-auto rounded-full shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>POSTULARME AL EQUIPO</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* RECRUITMENT MODAL FORM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-xl bg-[#101216] border border-primary/40 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
            >
              {/* Gold Top Light Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-primary blur-md opacity-60 pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={resetForm}
                className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {!formSuccess ? (
                <div>
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 text-primary mb-3 shadow-inner">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Postulación de <span className="text-primary italic">Talento</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1.5">
                      Ingresa tus datos y adjunta tu currículum para conectar con nuestro equipo por WhatsApp.
                    </p>
                  </div>

                  {/* Error Alert */}
                  {formError && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Nombre y Apellido <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                        <input
                          type="text"
                          required
                          value={formNombre}
                          onChange={(e) => setFormNombre(e.target.value)}
                          placeholder="Ej: Carlos Mendoza"
                          className="w-full bg-[#0A0B0E] border border-white/15 focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Teléfono / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        WhatsApp / Teléfono de Contacto <span className="text-primary">*</span>
                      </label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                        <input
                          type="tel"
                          required
                          value={formTelefono}
                          onChange={(e) => setFormTelefono(e.target.value)}
                          placeholder="Ej: +58 412 1234567"
                          className="w-full bg-[#0A0B0E] border border-white/15 focus:border-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Cargo / Área */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Área o Cargo de Interés
                      </label>
                      <select
                        value={formCargo}
                        onChange={(e) => setFormCargo(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-white/15 focus:border-primary rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {CARGOS_DISPONIBLES.map((c, i) => (
                          <option key={i} value={c} className="bg-[#101216] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Experiencia */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Nivel de Experiencia
                      </label>
                      <select
                        value={formExperiencia}
                        onChange={(e) => setFormExperiencia(e.target.value)}
                        className="w-full bg-[#0A0B0E] border border-white/15 focus:border-primary rounded-xl py-3 px-4 text-sm text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                      >
                        {NIVELES_EXPERIENCIA.map((exp, i) => (
                          <option key={i} value={exp} className="bg-[#101216] text-white">
                            {exp}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Breve Resumen / Habilidades */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Breve Resumen de Experiencia o Habilidades <span className="text-zinc-500 font-normal lowercase">(opcional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={formMensaje}
                        onChange={(e) => setFormMensaje(e.target.value)}
                        placeholder="Cuéntanos sobre tus marcas de especialidad, certificaciones o habilidades principales..."
                        className="w-full bg-[#0A0B0E] border border-white/15 focus:border-primary rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Adjuntar Currículum Vitae */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Adjuntar Currículum Vitae (PDF o Imagen)
                      </label>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        className="hidden"
                      />

                      {!formCvFile ? (
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="border border-dashed border-white/20 hover:border-primary/60 rounded-2xl p-4 text-center cursor-pointer bg-[#0A0B0E]/60 hover:bg-primary/5 transition-all group/drop"
                        >
                          <UploadCloud size={24} className="mx-auto text-primary mb-1 group-hover/drop:scale-110 transition-transform" />
                          <p className="text-xs font-semibold text-white">
                            Haz clic para seleccionar tu CV
                          </p>
                          <p className="text-[11px] text-zinc-500 mt-0.5">
                            Formatos: PDF, Word, PNG o JPG (Máx. 15MB)
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between p-3 rounded-xl bg-primary/10 border border-primary/30">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileText size={20} className="text-primary shrink-0" />
                            <div className="text-left overflow-hidden">
                              <p className="text-xs font-bold text-white truncate max-w-[240px] sm:max-w-[320px]">
                                {formCvFile.name}
                              </p>
                              <p className="text-[10px] text-zinc-400">
                                {(formCvFile.size / 1024).toFixed(1)} KB • Listo para enviar
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setFormCvFile(null)}
                            className="text-zinc-400 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formSubmitting}
                        className="btn-primary w-full !py-3.5 text-sm sm:text-base font-black border-none rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)] cursor-pointer"
                      >
                        <Send size={18} />
                        <span>{formSubmitting ? 'Preparando...' : 'ENVIAR POSTULACIÓN VÍA WHATSAPP'}</span>
                      </button>
                      <p className="text-[11px] text-center text-zinc-500 mt-2">
                        Se abrirá WhatsApp con todos tus datos listos para enviar directamente a nuestro equipo.
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">
                    ¡Postulación Preparada con Éxito!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto mb-6 leading-relaxed">
                    Hemos abierto WhatsApp con todos tus datos organizados. {formCvFile ? `Recuerda adjuntar tu archivo (${formCvFile.name}) en el chat que se acaba de abrir.` : '¡Estaremos encantados de conocerte!'}
                  </p>
                  
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary !py-3 !px-8 text-sm rounded-full font-bold border border-white/20 hover:border-white cursor-pointer"
                  >
                    Cerrar ventana
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-5 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 MASTERTECH AUTOMOTRIZ. Todos los derechos reservados.
      </footer>
    </div>
  );
}
