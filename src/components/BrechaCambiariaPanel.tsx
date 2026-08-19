import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Calculator, ShieldCheck, ArrowRightLeft, DollarSign, Euro, Coins, Zap } from 'lucide-react';

interface RateData {
  bcv_usd: number;
  bcv_eur: number;
  usdt: number;
  brecha_usdt_usd: number;
  brecha_usdt_eur: number;
  brecha_eur_usd: number;
  timestamp: string;
}

export default function BrechaCambiariaPanel() {
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
  const totalVES_BCV = parsedAmount * rates.bcv_usd;
  const totalVES_USDT = parsedAmount * rates.usdt;

  return (
    <section className="py-12 px-4 sm:px-6 bg-gradient-to-b from-[#090a0d] via-[#0d0e14] to-[#090a0d] border-y border-white/10 relative overflow-hidden select-none">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* MasterTech Automotive Exchange Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-[10px] font-black uppercase tracking-widest text-primary">
              <Zap size={12} className="animate-pulse" />
              <span>Telemetría Cambiaria Automotriz MasterTech</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white uppercase">
              Tasas & Brecha Cambiaria <span className="text-primary italic">En Vivo</span>
            </h2>
            <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
              Referencia cambiaria sincronizada al instante para presupuestos de mano de obra, repuestos importados y pagos en bolívares.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 bg-[#12141a] border border-white/10 rounded-xl px-3.5 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-tight">
                FEED EN VIVO
              </span>
            </div>

            <button
              onClick={fetchRates}
              disabled={isLoading}
              className="bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 text-zinc-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
              title="Refrescar tasas en tiempo real"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin text-primary" : "text-zinc-400"} />
              <span>{isLoading ? "Actualizando..." : "Sincronizar"}</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-[#12141a]/90 backdrop-blur-md border border-white/10 border-l-4 border-l-primary rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-zinc-300 font-mono">
            <span className="text-zinc-500">Última actualización:</span>
            <strong className="text-white font-black">{lastUpdatedFormatted || 'Sincronizando...'}</strong>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-zinc-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
            <span>Fuentes: Binance P2P • Banco Central de Venezuela (BCV)</span>
          </div>
        </div>

        {/* 6 Technical Telemetry Rate Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* 1. USDT BINANCE */}
          <div className="bg-[#12141a] border border-amber-500/20 hover:border-amber-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400/90 flex items-center gap-1.5">
                <Coins size={12} className="text-amber-400" />
                <span>USDT BINANCE</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-amber-300 tracking-tight">
              {formatNumber(rates.usdt)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>VES / USDT</span>
              <span className="text-amber-400/80 font-bold">P2P</span>
            </div>
          </div>

          {/* 2. DÓLAR BCV */}
          <div className="bg-[#12141a] border border-emerald-500/20 hover:border-emerald-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
                <DollarSign size={12} className="text-emerald-400" />
                <span>DÓLAR BCV</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-emerald-400 tracking-tight">
              {formatNumber(rates.bcv_usd)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>VES / USD</span>
              <span className="text-emerald-400/80 font-bold">Oficial</span>
            </div>
          </div>

          {/* 3. EURO BCV */}
          <div className="bg-[#12141a] border border-cyan-500/20 hover:border-cyan-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400/90 flex items-center gap-1.5">
                <Euro size={12} className="text-cyan-400" />
                <span>EURO BCV</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-cyan-300 tracking-tight">
              {formatNumber(rates.bcv_eur)}
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>VES / EUR</span>
              <span className="text-cyan-400/80 font-bold">Oficial</span>
            </div>
          </div>

          {/* 4. USDT VS $ BCV */}
          <div className="bg-[#12141a] border border-red-500/20 hover:border-red-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-rose-400" />
                <span>USDT VS $ BCV</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-rose-400 tracking-tight">
              {formatNumber(rates.brecha_usdt_usd)}%
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>Diferencial</span>
              <span className="text-rose-400/80 font-bold">Brecha</span>
            </div>
          </div>

          {/* 5. USDT VS € BCV */}
          <div className="bg-[#12141a] border border-rose-500/20 hover:border-rose-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-rose-400" />
                <span>USDT VS € BCV</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-rose-400 tracking-tight">
              {formatNumber(rates.brecha_usdt_eur)}%
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>Diferencial</span>
              <span className="text-rose-400/80 font-bold">Brecha</span>
            </div>
          </div>

          {/* 6. € BCV VS $ BCV */}
          <div className="bg-[#12141a] border border-rose-500/20 hover:border-rose-400/60 rounded-2xl p-4 transition-all space-y-2 shadow-xl relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-400/90 flex items-center gap-1.5">
                <TrendingUp size={12} className="text-rose-400" />
                <span>€ BCV VS $ BCV</span>
              </span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-rose-400 tracking-tight">
              {formatNumber(rates.brecha_eur_usd)}%
            </div>
            <div className="text-[10px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-white/5">
              <span>Diferencial</span>
              <span className="text-rose-400/80 font-bold">Brecha</span>
            </div>
          </div>

        </div>

        {/* Quick Workshop Currency Converter Card */}
        <div className="bg-[#12141a]/60 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-primary shrink-0">
              <Calculator size={20} />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wide text-white block">
                Calculadora Rápida de Presupuesto Taller
              </span>
              <span className="text-[11px] text-zinc-400">
                Calcula al instante el monto equivalente de tu servicio o repuesto en Bolívares.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 bg-black/60 border border-white/15 rounded-xl px-3 py-2">
              <span className="text-xs font-bold text-zinc-400">$ USD:</span>
              <input
                type="number"
                min="1"
                step="5"
                value={calcAmountUSD}
                onChange={(e) => setCalcAmountUSD(e.target.value)}
                className="w-20 bg-transparent text-xs font-mono font-black text-white outline-none"
                placeholder="50"
              />
            </div>

            <div className="flex items-center gap-4 bg-black/60 border border-primary/30 rounded-xl px-4 py-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-zinc-400 block">TASA OFICIAL BCV</span>
                <span className="text-emerald-400 font-bold">{formatNumber(totalVES_BCV)} Bs.</span>
              </div>
              <span className="text-zinc-600">|</span>
              <div>
                <span className="text-[10px] text-zinc-400 block">TASA USDT P2P</span>
                <span className="text-amber-400 font-bold">{formatNumber(totalVES_USDT)} Bs.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
