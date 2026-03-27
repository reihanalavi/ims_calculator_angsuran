"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, CreditCard, Calendar, TrendingUp, Calculator as CalcIcon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatIDR = (val: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
};

export default function Calculator() {
  const [otr, setOtr] = useState<number>(240000000);
  const [tenor, setTenor] = useState<number>(18);
  const [dpPercent, setDpPercent] = useState<number>(20);

  const stats = useMemo(() => {
    const dp = (dpPercent / 100) * otr;
    const principal = otr - dp;
    
    let interestRate = 0;
    if (tenor <= 12) {
      interestRate = 0.12;
    } else if (tenor <= 24) {
      interestRate = 0.14;
    } else {
      interestRate = 0.165;
    }

    const totalInterest = principal * interestRate;
    const totalDept = principal + totalInterest;
    const installment = totalDept / tenor;

    return { dp, principal, interestRate, totalInterest, installment, dpPercent };
  }, [otr, tenor, dpPercent]);

  const handleOtrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    setOtr(Number(val));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
      {/* Input Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-8 rounded-3xl space-y-8"
      >
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 p-3 rounded-2xl">
            <CalcIcon className="text-indigo-400 w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 bg-clip-text text-transparent">
            Kalkulator Kredit
          </h2>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <label className="text-slate-400 text-sm font-medium flex items-center gap-2">
              <Car className="w-4 h-4" /> Harga Kendaraan (OTR)
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 font-semibold group-focus-within:text-indigo-400 transition-colors">Rp</span>
              <input
                type="text"
                value={otr.toLocaleString("id-ID")}
                onChange={handleOtrChange}
                className="w-full bg-slate-900/50 border border-slate-700/50 rounded-2xl py-5 pl-12 pr-6 text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all group-hover:bg-slate-900/80"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-slate-400 text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Jangka Waktu (Tenor)
            </label>
            <div className="grid grid-cols-4 gap-3">
              {[12, 18, 24, 36].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenor(t)}
                  className={cn(
                    "py-4 rounded-2xl text-sm font-bold border transition-all duration-300",
                    tenor === t
                      ? "bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-105"
                      : "bg-slate-800/30 border-slate-700/50 text-slate-400 hover:bg-slate-800/60 hover:border-slate-600"
                  )}
                >
                  {t} Bln
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-700/30 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 text-sm font-medium">Down Payment ({stats.dpPercent}%)</label>
            <span className="text-slate-200 font-bold">{formatIDR(stats.dp)}</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              step="20"
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-slate-900"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold px-1">
              <span>0%</span>
              <span>20%</span>
              <span>40%</span>
              <span>60%</span>
              <span>80%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Result Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        <div className="glass-card p-10 rounded-3xl bg-gradient-to-br from-emerald-600/5 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
            <TrendingUp className="w-24 h-24 text-emerald-400" />
          </div>
          
          <div className="relative z-10 space-y-2">
            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-wider">Angsuran / Bulan</h3>
            <div className="text-5xl font-extrabold text-white tracking-tight tabular-nums">
              {formatIDR(stats.installment)}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-emerald-500/20 grid grid-cols-2 gap-6 relative z-10">
            <div className="space-y-1">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Pokok Utang</span>
              <p className="text-slate-100 font-bold tabular-nums">{formatIDR(stats.principal)}</p>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 text-xs uppercase font-bold tracking-widest">Total Bunga ({(stats.interestRate * 100).toFixed(1).replace(/\.0$/, "")}%)</span>
              <p className="text-slate-100 font-bold tabular-nums">{formatIDR(stats.totalInterest)}</p>
            </div>
          </div>
        </div>

        <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-indigo-400 text-xs font-bold uppercase">Skema Finansial</p>
            <p className="text-slate-300 text-sm">Alur perhitungan bunga berdasarkan jangka waktu yang dipilih.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
