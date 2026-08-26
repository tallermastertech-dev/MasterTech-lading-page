import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, RotateCcw, Car, Wrench } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  decodedVehicle?: {
    vin: string;
    make: string;
    model: string;
    year: string;
    engine: string;
    drive: string;
    fuel: string;
  };
  timestamp: string;
}

export const MT01AdvisorModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: Message = {
    id: 'msg-1',
    sender: 'bot',
    text: `👋 ¡Hola! Soy **MT-01 · Especialista MasterTech**, tu Asesor Técnico Avanzado de Taller MasterTech.

Puedes consultarme sobre diagnósticos mecánicos, ruidos, códigos DTC (Check Engine), reprogramaciones o ingresar un **código VIN de 17 dígitos** para decodificar las especificaciones oficiales de tu vehículo.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || inputText;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!overrideText) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg.text,
          history: messages.map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: data.text || 'Sin respuesta de IA',
          decodedVehicle: data.decodedVehicle,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
      } else {
        throw new Error('Error al conectar con el servidor');
      }
    } catch (err) {
      const errorMsg: Message = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: '🔧 **Asistencia Técnica MasterTech:**\n\nHe tomado nota de tu consulta. Para darte un diagnóstico certero sobre este síntoma o código de falla en tu vehículo, te sugerimos comunicarte directamente con nuestro equipo de especialistas en **Taller MasterTech** a través del botón de WhatsApp abajo.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([initialGreeting]);
  };

  // Helper to render bold markdown **text** without raw asterisks
  const renderFormattedText = (rawText: string, isUser: boolean) => {
    const paragraphs = rawText.split('\n');
    return (
      <div className="space-y-1.5">
        {paragraphs.map((para, pIdx) => {
          if (!para.trim()) return <div key={pIdx} className="h-1" />;

          const parts = para.split(/(\*\*.*?\*\*)/g);
          return (
            <p
              key={pIdx}
              className={`leading-relaxed ${isUser ? 'user-para text-[#0d0e12] font-black' : 'bot-para text-slate-100'}`}
              style={{ color: isUser ? '#0d0e12' : '#f1f5f9' }}
            >
              {parts.map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const boldContent = part.slice(2, -2);
                  return (
                    <strong
                      key={idx}
                      className={isUser ? 'font-black underline text-[#0d0e12]' : 'font-extrabold text-amber-300'}
                      style={{ color: isUser ? '#0d0e12' : '#fde047' }}
                    >
                      {boldContent}
                    </strong>
                  );
                }
                return part;
              })}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Trigger Button: Midnight Black Glassmorphism + Radiant Gold Icon */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4.5 py-3 rounded-full bg-[#12141a] text-white font-bold text-xs sm:text-sm shadow-[0_10px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_15px_45px_rgba(194,164,114,0.35)] hover:scale-105 transition-all duration-300 cursor-pointer border border-[#C2A472]/60"
            title="MT-01 · Especialista MasterTech"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 via-[#C2A472] to-amber-600 flex items-center justify-center shadow-[0_0_12px_rgba(194,164,114,0.5)]">
                <Bot size={19} className="text-black animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#12141a] rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#12141a] rounded-full" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-black tracking-wider uppercase leading-none text-white flex items-center gap-1.5">
                <span>MT-01 · IA MASTERTECH</span>
                <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[8px] font-mono border border-amber-500/30">VIP</span>
              </div>
              <div className="text-[9px] text-zinc-400 font-medium leading-tight mt-1">Asesor Automotriz & VIN</div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Modal Popup (Positioned neatly at bottom-right viewport bound) */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[420px] h-[calc(100vh-100px)] sm:h-[560px] max-h-[580px] bg-[#0d0e12] border border-[#C2A472]/40 rounded-2xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[9999] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 mt01-chat-modal">
          {/* Header Bar */}
          <div className="bg-[#12141a] p-3.5 border-b border-[#C2A472]/30 flex items-center justify-between shrink-0 shadow-lg mt01-chat-header relative" style={{ backgroundColor: '#12141a' }}>
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Avatar Icon */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-[#C2A472] to-amber-600 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-[14px] bg-[#0d0e12] flex items-center justify-center">
                    <Bot size={20} className="text-amber-400 mt01-bot-icon" style={{ color: '#fbbf24', stroke: '#fbbf24' }} />
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#12141a] rounded-full" />
              </div>

              {/* Text Title & Subtitle */}
              <div className="flex flex-col min-w-0">
                <h3 className="text-xs sm:text-sm font-black tracking-wide text-white truncate leading-tight" style={{ color: '#ffffff' }}>
                  MT-01 · Especialista MasterTech
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="truncate" style={{ color: '#94a3b8' }}>Decodificador VIN & Asesor IA</span>
                </div>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 shrink-0 pl-2">
              <button
                onClick={handleReset}
                title="Reiniciar chat"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hdr-btn"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
              >
                <RotateCcw size={15} style={{ color: '#ffffff', stroke: '#ffffff' }} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar modal"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hdr-btn"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' }}
              >
                <X size={18} style={{ color: '#ffffff', stroke: '#ffffff' }} />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0b0c10] via-[#0f1117] to-[#0b0c10] scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className="text-[10px] font-bold text-zinc-400" style={{ color: '#a1a1aa' }}>
                    {msg.sender === 'user' ? 'TÚ' : 'MT-01'}
                  </span>
                  <span className="text-[9px] text-zinc-500" style={{ color: '#71717a' }}>{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'user-bubble bg-[#C2A472] text-[#0d0e12] font-black rounded-br-none shadow-md border border-amber-300/40'
                      : 'bot-bubble bg-[#181a22] border border-white/15 text-slate-100 rounded-bl-none shadow-lg'
                  }`}
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#C2A472' : '#181a22',
                    color: msg.sender === 'user' ? '#0d0e12' : '#f1f5f9'
                  }}
                >
                  {/* Decoded Vehicle Card (if VIN was parsed) */}
                  {msg.decodedVehicle && (
                    <div className="mb-3 bg-gradient-to-br from-amber-950/50 via-slate-900 to-[#12141a] border border-amber-500/40 rounded-2xl p-3.5 shadow-xl text-white vin-spec-card" style={{ backgroundColor: '#12141a', color: '#ffffff' }}>
                      <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-wider">
                          <Car size={14} className="text-amber-400 mt01-car-icon" style={{ color: '#fbbf24', stroke: '#fbbf24' }} />
                          <span style={{ color: '#fde047' }}>ESPECIFICACIONES DE VEHÍCULO</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-400/40" style={{ color: '#fde047', backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                          {msg.decodedVehicle.vin}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Marca:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.make}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Modelo:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.model}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Año:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.year}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Motor:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.engine}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Tracción:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.drive}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#cbd5e1' }}>Fuel:</span>{' '}
                          <strong className="font-bold" style={{ color: '#fde047' }}>{msg.decodedVehicle.fuel}</strong>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-amber-500/20 text-[10px] font-bold flex items-center gap-1">
                        <span style={{ color: '#fde047' }}>🚘 Decodificación Oficial de VIN</span>
                      </div>
                    </div>
                  )}

                  {/* Message formatted rendering */}
                  {renderFormattedText(msg.text, msg.sender === 'user')}

                  {/* WhatsApp scheduling action button */}
                  {msg.sender === 'bot' && (
                    <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between">
                      <a
                        href="https://wa.link/xnj37f"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full justify-center px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
                        style={{ backgroundColor: '#10b981', color: '#000000' }}
                      >
                        <Wrench size={15} className="text-black fill-current" style={{ color: '#000000' }} />
                        <span style={{ color: '#000000', fontWeight: 900 }}>Agendar Diagnóstico por WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 bg-[#181a22] border border-white/10 text-slate-100 p-3 rounded-2xl rounded-bl-none text-xs w-fit bot-loading-bubble" style={{ backgroundColor: '#181a22', color: '#ffffff' }}>
                <Bot size={14} className="animate-spin text-amber-400 mt01-bot-icon" style={{ color: '#fbbf24', stroke: '#fbbf24' }} />
                <span className="mt01-loading-text" style={{ color: '#ffffff', fontWeight: 600 }}>MT-01 analizando diagnóstico técnico...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#111218] border-t border-white/10 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Pregunta sobre fallas o pega un VIN de 17 dígitos..."
              className="flex-1 bg-[#161822] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-400 transition-all"
              style={{ backgroundColor: '#161822', color: '#ffffff' }}
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="w-10 h-10 rounded-xl bg-[#C2A472] hover:bg-amber-400 disabled:opacity-40 text-black font-black flex items-center justify-center transition-all shadow-md cursor-pointer shrink-0 send-btn"
              style={{ backgroundColor: '#C2A472', color: '#000000' }}
            >
              <Send size={16} className="mt01-send-icon" style={{ color: '#000000', stroke: '#000000' }} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
