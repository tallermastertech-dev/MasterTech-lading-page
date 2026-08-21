import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp, Calculator, DollarSign, Euro, Coins, Zap, X, ChevronDown } from 'lucide-react';

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
  const totalVES_USD_BCV = parsedAmount * rates.bcv_usd;
  const totalVES_EUR_BCV = parsedAmount * rates.bcv_eur;
  const totalVES_USDT = parsedAmount * rates.usdt;

  const ContentPanel = (
    <div className="space-y-6 select-none">
      {/* MasterTech Automotive Exchange Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-black uppercase tracking-widest text-amber-600 dark:text-primary">
            <Zap size={11} className="animate-pulse" />
            <span>Telemetría Cambiaria Automotriz MasterTech</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black tracking-tight text-zinc-900 dark:text-white uppercase">
            Tasas & Brecha Cambiaria <span className="text-amber-500 dark:text-primary italic">En Vivo</span>
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Referencia cambiaria en tiempo real para presupuestos de taller, repuestos importados y conversiones en Bolívares.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-2 bg-emerald-50 dark:bg-[#12141a] border border-emerald-200 dark:border-white/10 rounded-xl px-3 py-1.5 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
              EN VIVO
            </span>
          </div>

          <button
            onClick={fetchRates}
            disabled={isLoading}
            className="bg-zinc-100 hover:bg-zinc-200 dark:bg-white/5 dark:hover:bg-primary/20 border border-zinc-300 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-3 py-1.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            title="Refrescar tasas"
          >
            <RefreshCw size={13} className={isLoading ? "animate-spin text-primary" : "text-zinc-500"} />
            <span className="hidden sm:inline">{isLoading ? "Sincronizando..." : "Sincronizar"}</span>
          </button>

          {!initialOpen && (
            <button
              onClick={() => setIsOpen(false)}
              className="bg-zinc-100 hover:bg-red-500/10 dark:bg-white/5 dark:hover:bg-red-500/20 border border-zinc-300 dark:border-white/10 text-zinc-500 hover:text-red-500 p-1.5 rounded-xl transition-colors cursor-pointer"
              title="Ocultar panel"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-zinc-50 dark:bg-[#12141a]/90 backdrop-blur-md border border-zinc-200 dark:border-white/10 border-l-4 border-l-amber-500 rounded-xl px-3.5 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm">
        <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 font-mono text-[11px]">
          <span className="text-zinc-500">Última actualización:</span>
          <strong className="text-zinc-900 dark:text-white font-black">{lastUpdatedFormatted || 'Sincronizando...'}</strong>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
          <span>Fuentes: Binance P2P • Banco Central de Venezuela (BCV)</span>
        </div>
      </div>

      {/* 6 Technical Telemetry Rate Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* 1. USDT BINANCE */}
        <div className="bg-white dark:bg-[#12141a] border border-amber-300 dark:border-amber-500/20 hover:border-amber-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400/90 flex items-center gap-1">
              <Coins size={11} className="text-amber-500" />
              <span>USDT BINANCE</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-amber-600 dark:text-amber-300 tracking-tight">
            {formatNumber(rates.usdt)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>VES / USDT</span>
            <span className="text-amber-600 dark:text-amber-400/80 font-bold">P2P</span>
          </div>
        </div>

        {/* 2. DÓLAR BCV */}
        <div className="bg-white dark:bg-[#12141a] border border-emerald-300 dark:border-emerald-500/20 hover:border-emerald-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400/90 flex items-center gap-1">
              <DollarSign size={11} className="text-emerald-500" />
              <span>DÓLAR BCV</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
            {formatNumber(rates.bcv_usd)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>VES / USD</span>
            <span className="text-emerald-600 dark:text-emerald-400/80 font-bold">Oficial</span>
          </div>
        </div>

        {/* 3. EURO BCV */}
        <div className="bg-white dark:bg-[#12141a] border border-cyan-300 dark:border-cyan-500/20 hover:border-cyan-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-cyan-600 dark:text-cyan-400/90 flex items-center gap-1">
              <Euro size={11} className="text-cyan-500" />
              <span>EURO BCV</span>
            </span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-cyan-600 dark:text-cyan-300 tracking-tight">
            {formatNumber(rates.bcv_eur)}
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>VES / EUR</span>
            <span className="text-cyan-600 dark:text-cyan-400/80 font-bold">Oficial</span>
          </div>
        </div>

        {/* 4. USDT VS $ BCV */}
        <div className="bg-white dark:bg-[#12141a] border border-rose-300 dark:border-rose-500/20 hover:border-rose-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400/90 flex items-center gap-1 truncate">
              <span>USDT vs $</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono font-bold">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_usdt_usd)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>Diferencial</span>
          </div>
        </div>

        {/* 5. USDT VS € BCV */}
        <div className="bg-white dark:bg-[#12141a] border border-rose-300 dark:border-rose-500/20 hover:border-rose-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400/90 flex items-center gap-1 truncate">
              <span>USDT vs €</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono font-bold">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_usdt_eur)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>Diferencial</span>
          </div>
        </div>

        {/* 6. € BCV VS $ BCV */}
        <div className="bg-white dark:bg-[#12141a] border border-rose-300 dark:border-rose-500/20 hover:border-rose-500 rounded-2xl p-3.5 transition-all space-y-1.5 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400/90 flex items-center gap-1 truncate">
              <span>€ vs $</span>
            </span>
            <span className="text-[8px] px-1 rounded bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 font-mono font-bold">Brecha</span>
          </div>
          <div className="font-mono text-lg sm:text-xl font-black text-rose-600 dark:text-rose-400 tracking-tight">
            {formatNumber(rates.brecha_eur_usd)}%
          </div>
          <div className="text-[9px] font-mono text-zinc-500 flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-white/5">
            <span>Diferencial</span>
          </div>
        </div>
      </div>

      {/* Quick Workshop Currency Converter Card */}
      <div className="bg-zinc-50 dark:bg-[#12141a]/90 border border-zinc-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-primary shrink-0">
            <Calculator size={18} />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wide text-zinc-900 dark:text-white block">
              Calculadora Rápida de Presupuesto Taller
            </span>
            <span className="text-[11px] text-zinc-600 dark:text-zinc-400">
              Calcula al instante el monto en Bolívares según las 3 tasas oficiales.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 bg-white dark:bg-black/70 border border-zinc-300 dark:border-white/15 rounded-xl px-3 py-2 shadow-sm">
            <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">$ USD:</span>
            <input
              type="number"
              min="1"
              step="any"
              value={calcAmountUSD}
              onChange={(e) => setCalcAmountUSD(e.target.value)}
              className="w-20 bg-transparent text-xs font-mono font-black text-zinc-900 dark:text-white outline-none text-right"
              placeholder="50"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-white dark:bg-black/70 border border-zinc-300 dark:border-primary/30 rounded-xl px-3.5 py-2 text-xs font-mono shadow-sm">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <DollarSign size={10} /> DÓLAR BCV
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-black text-xs">{formatNumber(totalVES_USD_BCV)} Bs.</span>
            </div>

            <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline-block">|</span>

            <div>
              <span className="text-[9px] uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold flex items-center gap-1">
                <Euro size={10} /> EURO BCV
              </span>
              <span className="text-cyan-700 dark:text-cyan-300 font-black text-xs">{formatNumber(totalVES_EUR_BCV)} Bs.</span>
            </div>

            <span className="text-zinc-300 dark:text-zinc-600 hidden sm:inline-block">|</span>

            <div>
              <span className="text-[9px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                <Coins size={10} /> USDT P2P
              </span>
              <span className="text-amber-700 dark:text-amber-300 font-black text-xs">{formatNumber(totalVES_USDT)} Bs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // If used in Admin Dashboard or embedded mode, render full panel directly
  if (initialOpen) {
    return (
      <div className="bg-white dark:bg-gradient-to-b dark:from-[#090a0d] dark:via-[#0d0e14] dark:to-[#090a0d] p-5 sm:p-6 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm transition-colors">
        {ContentPanel}
      </div>
    );
  }

  // Otherwise, render as interactive non-intrusive compact floating popover widget
  return (
    <>
      {/* 1. NON-INTRUSIVE COMPACT FLOATING POPOVER (Anchored right above the bubble) */}
      {isOpen && (
        <div 
          className="fixed bottom-16 left-3 sm:left-5 z-40 w-[94vw] sm:w-[430px] max-h-[85vh] overflow-y-auto bg-[#0d0f15]/98 backdrop-blur-3xl border border-amber-500/40 rounded-3xl shadow-2xl shadow-black/95 p-4 sm:p-5 space-y-4 animate-fade-in select-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
                <Zap size={16} className="animate-pulse" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white block leading-tight font-display">
                  Tasas & Brecha Cambiaria
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  EN VIVO • BCV & BINANCE
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={fetchRates}
                disabled={isLoading}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Actualizar tasas"
              >
                <RefreshCw size={14} className={isLoading ? "animate-spin text-amber-400" : ""} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-zinc-300 hover:text-red-400 transition-colors cursor-pointer"
                title="Ocultar"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* 3 Currency Rates (3 Columns Grid - High Legibility) */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Dólar BCV */}
            <div className="bg-[#131620] p-2.5 sm:p-3 rounded-2xl border border-emerald-500/40 shadow-md">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-emerald-400 uppercase tracking-wide">
                <span>$ BCV</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">Oficial</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white font-mono mt-1 tracking-tight">
                {formatNumber(rates.bcv_usd)} <small className="text-[9px] text-emerald-400 font-bold">Bs.</small>
              </div>
            </div>

            {/* Euro BCV */}
            <div className="bg-[#131620] p-2.5 sm:p-3 rounded-2xl border border-cyan-500/40 shadow-md">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-cyan-400 uppercase tracking-wide">
                <span>€ BCV</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-300">Oficial</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white font-mono mt-1 tracking-tight">
                {formatNumber(rates.bcv_eur)} <small className="text-[9px] text-cyan-400 font-bold">Bs.</small>
              </div>
            </div>

            {/* USDT Binance */}
            <div className="bg-[#131620] p-2.5 sm:p-3 rounded-2xl border border-amber-500/40 shadow-md">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-black text-amber-400 uppercase tracking-wide">
                <span>USDT</span>
                <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-amber-500/20 text-amber-300">P2P</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white font-mono mt-1 tracking-tight">
                {formatNumber(rates.usdt)} <small className="text-[9px] text-amber-400 font-bold">Bs.</small>
              </div>
            </div>
          </div>

          {/* All 3 Exchange Rate Gaps / Brechas (3 Columns Grid - High Legibility) */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block px-1">
              Brechas Cambiarias (Diferencial %)
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {/* 1. USDT vs $ BCV */}
              <div className="bg-[#131620] p-2.5 rounded-2xl border border-rose-500/40 shadow-md">
                <div className="text-[9.5px] sm:text-[10px] font-bold text-rose-300 uppercase leading-tight truncate">
                  USDT vs $ BCV
                </div>
                <div className="text-base sm:text-lg font-black text-rose-400 font-mono mt-1">
                  {formatNumber(rates.brecha_usdt_usd)}%
                </div>
              </div>

              {/* 2. USDT vs € BCV */}
              <div className="bg-[#131620] p-2.5 rounded-2xl border border-rose-500/40 shadow-md">
                <div className="text-[9.5px] sm:text-[10px] font-bold text-rose-300 uppercase leading-tight truncate">
                  USDT vs € BCV
                </div>
                <div className="text-base sm:text-lg font-black text-rose-400 font-mono mt-1">
                  {formatNumber(rates.brecha_usdt_eur)}%
                </div>
              </div>

              {/* 3. € BCV vs $ BCV */}
              <div className="bg-[#131620] p-2.5 rounded-2xl border border-rose-500/40 shadow-md">
                <div className="text-[9.5px] sm:text-[10px] font-bold text-rose-300 uppercase leading-tight truncate">
                  € BCV vs $ BCV
                </div>
                <div className="text-base sm:text-lg font-black text-rose-400 font-mono mt-1">
                  {formatNumber(rates.brecha_eur_usd)}%
                </div>
              </div>
            </div>
          </div>

          {/* Compact Workshop Budget Calculator (High Legibility) */}
          <div className="bg-[#131620] border border-white/15 rounded-2xl p-3.5 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                <Calculator size={14} className="text-primary" />
                <span>Calculadora de Presupuesto</span>
              </span>
              <div className="flex items-center gap-1.5 bg-black/80 border border-amber-500/40 rounded-xl px-2.5 py-1">
                <span className="text-xs font-bold text-zinc-400">$ USD:</span>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={calcAmountUSD}
                  onChange={(e) => setCalcAmountUSD(e.target.value)}
                  className="w-16 bg-transparent text-sm font-mono font-black text-white outline-none text-right"
                  placeholder="50"
                />
              </div>
            </div>

            {/* Instant conversion outputs (Clear and Bold) */}
            <div className="space-y-1.5 text-xs font-mono pt-1">
              <div className="flex justify-between items-center bg-black/50 px-3 py-2 rounded-xl border border-emerald-500/20">
                <span className="text-emerald-400 font-bold text-xs">En Dólar BCV:</span>
                <span className="text-white font-black text-sm sm:text-base">{formatNumber(totalVES_USD_BCV)} <small className="text-[10px] text-emerald-400">Bs.</small></span>
              </div>
              <div className="flex justify-between items-center bg-black/50 px-3 py-2 rounded-xl border border-cyan-500/20">
                <span className="text-cyan-400 font-bold text-xs">En Euro BCV:</span>
                <span className="text-white font-black text-sm sm:text-base">{formatNumber(totalVES_EUR_BCV)} <small className="text-[10px] text-cyan-400">Bs.</small></span>
              </div>
              <div className="flex justify-between items-center bg-black/50 px-3 py-2 rounded-xl border border-amber-500/20">
                <span className="text-amber-400 font-bold text-xs">En USDT P2P:</span>
                <span className="text-white font-black text-sm sm:text-base">{formatNumber(totalVES_USDT)} <small className="text-[10px] text-amber-400">Bs.</small></span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-0.5 font-mono px-1">
            <span>Actualizado: <strong className="text-zinc-200">{lastUpdatedFormatted || 'Reciente'}</strong></span>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-amber-400 hover:text-amber-300 font-bold cursor-pointer transition-colors"
            >
              Minimizar ↑
            </button>
          </div>
        </div>
      )}

      {/* 2. FLOATING BUBBLE TRIGGER BUTTON (Bottom-Left fixed) */}
      <div className="fixed bottom-4 left-3 sm:left-5 z-40 select-none">
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

          <div className="flex items-center gap-1.5 text-xs font-black tracking-tight font-mono">
            <span className="text-zinc-400 group-hover:text-amber-300 transition-colors uppercase text-[10px] hidden sm:inline">TASAS:</span>
            <span className="text-emerald-400">BCV ${formatNumber(rates.bcv_usd, 2)}</span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-amber-400 hidden md:inline">USDT {formatNumber(rates.usdt, 2)}</span>
          </div>

          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-zinc-300 group-hover:text-white transition-colors">
            {isOpen ? <X size={11} /> : <TrendingUp size={11} />}
          </div>
        </button>
      </div>
    </>
  );
}
