import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Calculator, ShieldCheck, DollarSign, Euro, Coins, Zap, X, Minimize2, ArrowRight } from 'lucide-react';

interface RateData {
  bcv_usd: number;
  bcv_eur: number;
  usdt: number;
  brecha_usdt_usd: number;
  brecha_usdt_eur: number;
  brecha_eur_usd: number;
  timestamp: string;
}

export default function BrechaCambiariaPanel({ initialOpen = false }: { initialOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [rates, setRates] = useState<RateData>({
    bcv_usd: 775.34,
    bcv_eur: 897.82,
    usdt: 922.43,
    brecha_usdt_usd: 18.88,
    brecha_usdt_eur: 2.66,
    brecha_eur_usd: 15.80,
    timestamp: new Date().toISOString()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdatedFormatted, setLastUpdatedFormatted] = useState<string>('');
  
  // Quick Automotive Cost Calculator State
  const [calcAmountUSD, setCalcAmountUSD] = useState<string>('50');

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/brecha-cambiaria');
      if (res.ok) {
        const data = await res.json();
        if (data && (data.bcv_usd || data.usdt)) {
          setRates(prev => ({
            bcv_usd: data.bcv_usd || prev.bcv_usd,
            bcv_eur: data.bcv_eur || prev.bcv_eur,
            usdt: data.usdt || ((data.bcv_usd || prev.bcv_usd) * (1 + (data.brecha_usdt_usd || 18.88) / 100)),
            brecha_usdt_usd: data.brecha_usdt_usd ?? prev.brecha_usdt_usd,
            brecha_usdt_eur: data.brecha_usdt_eur ?? prev.brecha_usdt_eur,
            brecha_eur_usd: data.brecha_eur_usd ?? prev.brecha_eur_usd,
            timestamp: data.timestamp || new Date().toISOString()
          }));
        }
      }
    } catch (e) {
      console.error("Error al obtener tasas:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open_brecha_widget', handleOpenEvent);
    return () => window.removeEventListener('open_brecha_widget', handleOpenEvent);
  }, []);

  useEffect(() => {
    try {
      const date = rates.timestamp ? new Date(rates.timestamp) : new Date();
      const formatted = date.toLocaleString('es-VE', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      setLastUpdatedFormatted(formatted);
    } catch (e) {
      setLastUpdatedFormatted(new Date().toLocaleTimeString());
    }
  }, [rates.timestamp]);

  const formatNumber = (num: number, decimals: number = 2) => {
    if (typeof num !== 'number' || isNaN(num)) return '0,00';
    return num.toLocaleString('es-VE', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  const parsedAmount = parseFloat(calcAmountUSD) || 0;
  const parsedAmount = parseFloat(calcAmountUSD) || 0;
  const totalVES_USD_BCV = parsedAmount * rates.bcv_usd;
  const totalVES_EUR_BCV = parsedAmount * rates.bcv_eur;
  const totalVES_USDT = parsedAmount * rates.usdt;

  const ContentPanel = (
    <div className="space-y-6 select-none">
      {/* MasterTech Automotive Exchange Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary">
            <Zap size={11} className="animate-pulse" />
            <span>Telemetría Cambiaria Automotriz MasterTech</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-white uppercase">
            Tasas & Brecha Cambiaria <span className="text-primary italic">En Vivo</span>
          </h2>
          <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
            Referencia cambiaria en tiempo real para presupuestos de taller, repuestos importados y conversiones en Bolívares.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-[#12141a] border border-white/10 rounded-xl px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-tight">
              EN VIVO
            </span>
          </div>

          <button
            onClick={fetchRates}
            disabled={isLoading}
            className="bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-zinc-300 hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg active:scale-95"
            title="Refrescar tasas"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin text-primary" : "text-zinc-400"} />
            <span className="hidden sm:inline">{isLoading ? "Sincronizando..." : "Sincronizar"}</span>
          </button>

          {!initialOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 p-1.5 rounded-xl transition-colors cursor-pointer"
              title="Ocultar panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-[#12141a]/90 backdrop-blur-md border border-white/10 border-l-4 border-l-primary rounded-xl px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-zinc-300 font-mono text-[11px]">
          <span className="text-zinc-500">Última actualización:</span>
          <strong className="text-white font-black">{lastUpdatedFormatted || 'Sincronizando...'}</strong>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
          <span>Fuentes: Binance P2P • Banco Central de Venezuela (BCV)</span>
        </div>
      </div>

      {/* 6 Technical Telemetry Rate Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. USDT BINANCE */}
        <div className="bg-[#12141a] border border-amber-500/20 hover:border-amber-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-400/90 flex items-center gap-1">
              <Coins size={11} className="text-amber-400" />
              <span>USDT BINANCE</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-amber-300 tracking-tight">
            {formatNumber(rates.usdt)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>VES / USDT</span>
            <span className="text-amber-400/80 font-bold">P2P</span>
          </div>
        </div>

        {/* 2. DÓLAR BCV */}
        <div className="bg-[#12141a] border border-emerald-500/20 hover:border-emerald-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-400/90 flex items-center gap-1">
              <DollarSign size={11} className="text-emerald-400" />
              <span>DÓLAR BCV</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-emerald-400 tracking-tight">
            {formatNumber(rates.bcv_usd)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>VES / USD</span>
            <span className="text-emerald-400/80 font-bold">Oficial</span>
          </div>
        </div>

        {/* 3. EURO BCV */}
        <div className="bg-[#12141a] border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-400/90 flex items-center gap-1">
              <Euro size={11} className="text-cyan-400" />
              <span>EURO BCV</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-cyan-300 tracking-tight">
            {formatNumber(rates.bcv_eur)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>VES / EUR</span>
            <span className="text-cyan-400/80 font-bold">Oficial</span>
          </div>
        </div>

        {/* 4. USDT VS $ BCV */}
        <div className="bg-[#12141a] border border-rose-500/20 hover:border-rose-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1 truncate">
              <span>USDT vs $</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-500/20 text-rose-300 font-mono">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_usdt_usd)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>Diferencial</span>
          </div>
        </div>

        {/* 5. USDT VS € BCV */}
        <div className="bg-[#12141a] border border-rose-500/20 hover:border-rose-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1 truncate">
              <span>USDT vs €</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-500/20 text-rose-300 font-mono">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_usdt_eur)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>Diferencial</span>
          </div>
        </div>

        {/* 6. € BCV VS $ BCV */}
        <div className="bg-[#12141a] border border-rose-500/20 hover:border-rose-400/60 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-xl relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1 truncate">
              <span>€ vs $</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-500/20 text-rose-300 font-mono">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_eur_usd)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
            <span>Diferencial</span>
          </div>
        </div>
      </div>

      {/* Quick Workshop Currency Converter Card */}
      <div className="bg-[#12141a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
            <Calculator size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wide text-white block">
              Calculadora Rápida de Presupuesto Taller
            </span>
            <span className="text-[11px] text-zinc-400">
              Calcula al instante el monto en Bolívares según las 3 tasas oficiales.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 bg-black/70 border border-white/15 rounded-xl px-3 py-2">
            <span className="text-xs font-bold text-zinc-400">$ USD:</span>
            <input
              type="number"
              min="1"
              step="any"
              value={calcAmountUSD}
              onChange={(e) => setCalcAmountUSD(e.target.value)}
              className="w-20 bg-transparent text-xs font-mono font-black text-white outline-none text-right"
              placeholder="50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-black/70 border border-primary/30 rounded-xl px-3.5 py-2 text-xs font-mono">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1">
                <DollarSign size={10} /> DÓLAR BCV
              </span>
              <span className="text-emerald-400 font-black text-xs">{formatNumber(totalVES_USD_BCV)} Bs.</span>
            </div>

            <span className="text-zinc-600 hidden sm:inline-block">|</span>

            <div>
              <span className="text-[9px] uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1">
                <Euro size={10} /> EURO BCV
              </span>
              <span className="text-cyan-300 font-black text-xs">{formatNumber(totalVES_EUR_BCV)} Bs.</span>
            </div>

            <span className="text-zinc-600 hidden sm:inline-block">|</span>

            <div>
              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1">
                <Coins size={10} /> USDT P2P
              </span>
              <span className="text-amber-300 font-black text-xs">{formatNumber(totalVES_USDT)} Bs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If used in Admin Dashboard or embedded mode, render directly
  if (initialOpen) {
    return (
      <div className="bg-gradient-to-b from-[#090a0d] via-[#0d0e14] to-[#090a0d] p-5 sm:p-6 rounded-2xl border border-white/10">
        {ContentPanel}
      </div>
    );
  }

  // Otherwise, render as interactive floating bubble widget + modal
  return (
    <>
      {/* 1. FLOATING BUBBLE BUTTON (Bottom-Left fixed) */}
      <div className="fixed bottom-5 left-5 z-40 select-none">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-xl transition-all duration-300 shadow-2xl cursor-pointer ${
            isOpen 
              ? 'bg-amber-500/25 text-amber-300 border border-amber-500/60 shadow-amber-500/20 scale-105' 
              : 'bg-[#12141a]/95 hover:bg-[#1a1d26] text-white border border-white/15 hover:border-amber-400/60 shadow-black/90 hover:scale-105'
          }`}
          title="Ver Tasas BCV, Euro & USDT en Vivo"
        >
          {/* Live pulse dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>

          <div className="flex items-center gap-1.5 text-xs font-black tracking-tight">
            <span className="text-zinc-400 group-hover:text-amber-300 transition-colors uppercase font-mono text-[10px] hidden sm:inline">TASAS:</span>
            <span className="text-emerald-400 font-mono">BCV ${formatNumber(rates.bcv_usd, 2)}</span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-amber-400 font-mono hidden md:inline">USDT {formatNumber(rates.usdt, 2)}</span>
          </div>

          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
            {isOpen ? <Minimize2 size={11} /> : <TrendingUp size={11} />}
          </div>
        </button>
      </div>

      {/* 2. EXPANDABLE FLOATING MODAL OVERLAY */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in select-none"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-[#0e1017] border border-white/15 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 shadow-2xl shadow-black/90 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {ContentPanel}
            <div className="flex justify-end pt-4 border-t border-white/10 mt-6">
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary !py-2 !px-6 text-xs font-black uppercase border-none cursor-pointer shadow-lg"
              >
                Ocultar / Minimizar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
