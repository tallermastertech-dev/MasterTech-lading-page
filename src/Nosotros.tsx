import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { ChevronLeft, ArrowRight, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

const CONFIG_DEFAULT = {
  WHATSAPP_LINK: "https://wa.link/xnj37f",
  LOGO_URL: "/logo.png",
};

const DEFAULT_TEAM = [
  { id: 1, name: 'Jesús Mata', role: 'JEFE DE MECANICA', desc: 'Experto en diagnóstico avanzado y reparación de motores con más de 15 años de experiencia multimarca.', img: '/jesus.jpg' },
  { id: 2, name: 'J. Vicente Betancourt', role: 'CEO - DIRECTOR', desc: 'Dirección general y gestión estratégica de MasterTech Taller.', img: '/assets/servicio-mecanica.jpg' },
  { id: 3, name: 'Brenda Santaella', role: 'COORDINADORA LOGISTICA', desc: 'Coordinación y gestión de repuestos e insumos automotrices.', img: '/assets/servicio-electricidad.jpg' },
  { id: 4, name: 'Ambar Salazar', role: 'ASESORA DE LOGISTICA', desc: 'Atención directa y seguimiento continuo a clientes.', img: '/assets/servicio-inyeccion.jpg' },
  { id: 5, name: 'Aaron Rivas', role: 'TECNICO ELECTRONICA', desc: 'Especialista en diagnóstico computarizado y reprogramación de módulos.', img: '/assets/servicio-electricidad.jpg' },
  { id: 6, name: 'Domingo Blandin', role: 'ASESOR DE SERVICIO', desc: 'Asesoría técnica personalizada y recepción de vehículos.', img: '/assets/servicio-frenos.jpg' },
  { id: 7, name: 'Beltran Lopez', role: 'TECNICO MECANICO', desc: 'Mantenimiento preventivo, correctivo y sistemas de suspensión.', img: '/assets/servicio-mecanica.jpg' },
  { id: 8, name: 'Jose Vasquez', role: 'MARKETING - DESARROLLADOR WEB', desc: 'Desarrollo tecnológico, presencia digital y comunicación.', img: '/assets/servicio-climatizacion.jpg' }
];

export default function Nosotros() {
  const [config, setConfig] = useState<any>(CONFIG_DEFAULT);
  const [teamMembers, setTeamMembers] = useState<any[]>(DEFAULT_TEAM);

  useEffect(() => {
    let localData: any = null;
    try {
      const stored = localStorage.getItem('mastertech_settings_store');
      if (stored) localData = JSON.parse(stored);
    } catch (e) {}

    const loadTeam = (dataObj: any) => {
      if (dataObj?.TEAM_MEMBERS_JSON) {
        try {
          const parsed = JSON.parse(dataObj.TEAM_MEMBERS_JSON);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
          }
        } catch (e) {}
      }
      return DEFAULT_TEAM;
    };

    if (localData) {
      setConfig((prev: any) => ({ ...prev, ...localData }));
      const team = loadTeam(localData);
      if (team && team.length > 0) setTeamMembers(team);
    }

    const fetchSettings = async () => {
      try {
        const res = await fetch(`/api/settings?t=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          let currentLocal: any = null;
          try {
            const stored = localStorage.getItem('mastertech_settings_store');
            if (stored) currentLocal = JSON.parse(stored);
          } catch (e) {}

          const merged = { ...(currentLocal || {}), ...(data || {}) };
          setConfig((prev: any) => ({ ...prev, ...merged }));
          try { localStorage.setItem('mastertech_settings_store', JSON.stringify(merged)); } catch (e) {}
          const team = loadTeam(merged);
          if (team && team.length > 0) setTeamMembers(team);
        }
      } catch (err) {}
    };
    fetchSettings();

    const handleSettingsUpdated = () => fetchSettings();
    window.addEventListener('mastertech_settings_updated', handleSettingsUpdated);
    return () => window.removeEventListener('mastertech_settings_updated', handleSettingsUpdated);
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#E2E8F0] selection:bg-primary selection:text-black flex flex-col overflow-x-hidden w-full max-w-full">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
      </div>

      {/* Header with Dropdown Menus */}
      <Navbar activePage="nosotros" config={config} />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Title Section */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 text-primary font-bold text-xs uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
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
                  {/* Photo Container with crystal-clear full color display */}
                  <div className="h-64 sm:h-72 overflow-hidden relative shrink-0 bg-[#0D0D0D]">
                    <img 
                      src={member.img || "/assets/servicio-mecanica.jpg"} 
                      alt={member.name} 
                      onError={(e) => { (e.target as HTMLImageElement).src = '/assets/servicio-mecanica.jpg'; }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121417] via-[#121417]/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content Area - Sleek Dark Aesthetic with Champagne Gold Accents */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 bg-[#121417] relative z-20 text-center items-center justify-between">
                    <div className="w-full flex flex-col items-center">
                      {/* Role Badge - Centered */}
                      <div className="mb-3.5 flex justify-center w-full">
                        <span className="inline-block text-[10px] sm:text-[11px] font-black text-primary uppercase tracking-widest bg-[#0D0D0D]/80 border border-primary/40 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                          {member.role || 'ESPECIALISTA'}
                        </span>
                      </div>
                      
                      {/* Member Name - Centered */}
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight mb-2.5 text-center group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>

                      {/* Profile Description - Centered */}
                      <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-normal text-center max-w-xs mx-auto">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box - Unirse al Equipo MasterTech */}
            <div className="bg-gradient-to-b from-white/10 via-[#16181D] to-[#0E1013] border border-primary/30 rounded-3xl p-8 sm:p-10 text-center max-w-xl mx-auto shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Oportunidades & Talento</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white tracking-tight">
                ¿Quieres formar parte del <span className="text-primary italic">equipo MasterTech</span>?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base mb-6 leading-relaxed max-w-md mx-auto">
                Buscamos profesionales apasionados por la precisión, la innovación y la excelencia automotriz. Envíanos tu perfil y da el siguiente paso en tu carrera.
              </p>
              <a
                href={`https://wa.me/${(config.PHONE_NUMBER || '+584123565012').replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hola MasterTech, me gustaría postularme para formar parte de su equipo de trabajo.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-3 !py-4 !px-8 text-sm sm:text-base font-bold border-none mx-auto rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] transition-all"
              >
                POSTULARME AL EQUIPO <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-5 text-center text-zinc-600 text-xs border-t border-white/5 relative z-10 bg-black/40">
        © 2026 MASTERTECH AUTOMOTRIZ. Todos los derechos reservados.
      </footer>
    </div>
  );
}
