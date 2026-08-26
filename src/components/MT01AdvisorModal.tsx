import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, RotateCcw, Car, Wrench, Sparkles } from 'lucide-react';

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
        text: 'Mi especialidad se centra exclusivamente en diagnóstico técnico y mecánica automotriz para Taller MasterTech. ¿En qué falla o mantenimiento de tu vehículo te puedo asistir hoy?',
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
            <p key={pIdx} className="leading-normal">
              {parts.map((part, idx) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                  const boldContent = part.slice(2, -2);
                  return (
                    <strong
                      key={idx}
                      className={isUser ? 'font-black underline' : 'font-extrabold text-amber-300'}
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
      {/* Floating Trigger Button (Hidden when modal is open to avoid overlaps) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-[9990] flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-amber-500 via-[#C2A472] to-amber-600 text-black font-black text-xs sm:text-sm shadow-[0_10px_35px_rgba(194,164,114,0.45)] hover:shadow-[0_15px_45px_rgba(194,164,114,0.7)] hover:scale-105 transition-all duration-300 border border-amber-300 cursor-pointer"
            title="MT-01 · Especialista MasterTech"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center backdrop-blur-md">
                <Bot size={18} className="text-black animate-pulse" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-black rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-black rounded-full" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] font-black tracking-wider uppercase leading-none text-black">MT-01 · IA MASTERTECH</div>
              <div className="text-[9px] text-zinc-950 font-bold leading-tight mt-0.5">Asesor Automotriz & VIN</div>
            </div>
          </button>
        </div>
      )}

      {/* Floating Chat Modal Popup (Positioned neatly within viewport bounds) */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[92vh] sm:h-[580px] max-h-[600px] bg-[#0d0e12] border border-amber-500/40 rounded-t-3xl sm:rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[9999] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#0d0e12] via-[#181a23] to-[#0d0e12] p-3.5 border-b border-amber-500/30 flex items-center justify-between shrink-0 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 via-[#C2A472] to-amber-600 p-0.5 shadow-md flex items-center justify-center relative shrink-0">
                <Bot size={22} className="text-black" />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-black text-white tracking-wide">MT-01 · Especialista MasterTech</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[9px] font-mono font-bold shrink-0">
                    Taller MasterTech
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Decodificador VIN & Asesor Automotriz</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reiniciar chat"
                className="p-2 rounded-xl text-zinc-400 hover:text-amber-400 hover:bg-white/10 transition-colors"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Cerrar modal"
                className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={20} />
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
                  <span className="text-[10px] font-bold text-zinc-500">
                    {msg.sender === 'user' ? 'TÚ' : 'MT-01'}
                  </span>
                  <span className="text-[9px] text-zinc-600">{msg.timestamp}</span>
                </div>

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-amber-500 via-[#C2A472] to-amber-600 text-black font-bold rounded-br-none shadow-md'
                      : 'bg-[#181a22] border border-white/10 text-zinc-200 rounded-bl-none shadow-lg'
                  }`}
                >
                  {/* Decoded Vehicle Card (if VIN was parsed) */}
                  {msg.decodedVehicle && (
                    <div className="mb-3 bg-gradient-to-br from-amber-950/40 via-slate-900 to-[#12141a] border border-amber-500/40 rounded-2xl p-3.5 shadow-xl text-white">
                      <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 mb-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-wider">
                          <Car size={14} className="text-amber-400" />
                          <span>ESPECIFICACIONES DE VEHÍCULO</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold border border-amber-400/40">
                          {msg.decodedVehicle.vin}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div>
                          <span className="text-zinc-400">Marca:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.make}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-400">Modelo:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.model}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-400">Año:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.year}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-400">Motor:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.engine}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-400">Tracción:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.drive}</strong>
                        </div>
                        <div>
                          <span className="text-zinc-400">Fuel:</span>{' '}
                          <strong className="text-white font-bold">{msg.decodedVehicle.fuel}</strong>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-amber-500/20 text-[10px] text-amber-300 font-bold flex items-center gap-1">
                        <span>🚘 Decodificación Oficial de VIN</span>
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
                        className="w-full justify-center px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-black text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
                      >
                        <Wrench size={14} className="text-black fill-current" />
                        <span>Agendar Diagnóstico por WhatsApp</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 bg-[#181a22] border border-white/10 text-zinc-300 p-3 rounded-2xl rounded-bl-none text-xs w-fit">
                <Bot size={14} className="animate-spin text-amber-400" />
                <span>MT-01 analizando diagnóstico técnico...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Pills */}
          <div className="px-3 py-2 bg-[#0d0e12] border-t border-white/5 flex flex-wrap gap-1.5 shrink-0">
            <button
              onClick={() => handleSend('JTEVA5AR1S5003715')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold transition-all cursor-pointer"
            >
              🚗 Probar VIN JTEVA5AR1S5003715
            </button>
            <button
              onClick={() => handleSend('¿Qué significa el código de falla P0300?')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold transition-all cursor-pointer"
            >
              ⚠️ Código DTC P0300
            </button>
            <button
              onClick={() => handleSend('Tengo un ruido metálico al frenar')}
              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold transition-all cursor-pointer"
            >
              🔧 Ruido al Frenar
            </button>
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
              className="flex-1 bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 outline-none focus:border-amber-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-black font-bold transition-all shadow-md cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
