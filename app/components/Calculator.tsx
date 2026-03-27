"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, CreditCard, Calendar, TrendingUp, Calculator as CalcIcon, ShieldCheck, Wallet } from "lucide-react";
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="clean-card p-10 rounded-[32px] space-y-10"
      >
        <div className="flex items-center gap-4">
          <div className="bg-indigo-50 p-4 rounded-2xl">
            <CalcIcon className="text-indigo-600 w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Kalkulator Kredit
            </h2>
            <p className="text-slate-500 text-sm">Sesuaikan budget Anda</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-slate-700 text-sm font-semibold flex items-center gap-2">
              <Car className="w-4 h-4 text-indigo-500" /> Harga Kendaraan (OTR)
            </label>
            <div className="relative group">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-indigo-600 transition-colors">Rp</span>
              <input
                type="text"
                value={otr.toLocaleString("id-ID")}
                onChange={handleOtrChange}
                className="w-full input-field py-6 pl-14 pr-6 text-2xl font-black text-slate-900 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-slate-700 text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-500" /> Jangka Waktu (Tenor)
            </label>
            <div className="grid grid-cols-4 gap-4">
              {[12, 18, 24, 36].map((t) => (
                <button
                  key={t}
                  onClick={() => setTenor(t)}
                  className={cn(
                    "py-5 rounded-2xl text-base font-bold transition-all duration-200 border-2",
                    tenor === t
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                      : "bg-white border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {t} <span className="text-[10px] block opacity-80">Bulan</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 space-y-5">
          <div className="flex items-center justify-between">
            <label className="text-slate-700 text-sm font-semibold uppercase tracking-wide">Down Payment</label>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-bold">
              {stats.dpPercent}% • {formatIDR(stats.dp)}
            </div>
          </div>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="100"
              step="20"
              value={dpPercent}
              onChange={(e) => setDpPercent(Number(e.target.value))}
              className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-indigo-600 [&::-webkit-slider-thumb]:shadow-md"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-extrabold px-1">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-8"
      >
        <div className="clean-card p-12 rounded-[32px] bg-white border-indigo-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-[0.05] group-hover:scale-110 transition-transform duration-1000">
            <TrendingUp className="w-40 h-40 text-indigo-600" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <h3 className="text-indigo-600 text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Wallet className="w-4 h-4 opacity-70" /> Estimasi Angsuran
            </h3>
            <div className="text-6xl font-black text-slate-900 tracking-tighter tabular-nums">
              {formatIDR(stats.installment)}
              <span className="text-xl text-slate-400 ml-2 font-medium tracking-normal">/ Bln</span>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100 grid grid-cols-2 gap-10 relative z-10">
            <div className="space-y-2">
              <span className="text-slate-400 text-[11px] uppercase font-black tracking-widest">Pokok Pinjaman</span>
              <p className="text-slate-900 text-xl font-bold tabular-nums">{formatIDR(stats.principal)}</p>
            </div>
            <div className="space-y-2">
              <span className="text-slate-400 text-[11px] uppercase font-black tracking-widest flex items-center gap-2">
                Total Bunga
                <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-bold">{(stats.interestRate * 100).toFixed(1).replace(/\.0$/, "")}%</span>
              </span>
              <p className="text-slate-900 text-xl font-bold tabular-nums">{formatIDR(stats.totalInterest)}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

