import Calculator from "./components/Calculator";
import { Car, Fuel, Settings2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full -z-10" />

      <header className="text-center space-y-4 mb-16 relative z-10 w-full max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full text-indigo-400 text-sm font-bold uppercase tracking-widest backdrop-blur-md">
          <Car className="w-4 h-4" /> IMS Finance
        </div>
        <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight">
          Pilihan <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent italic">Finansial</span> Cerdas.
        </h1>
        <p className="text-slate-400 text-lg">
          Kalkulasi angsuran kendaraan impian Anda dengan transparansi penuh dan simulasi real-time.
        </p>
      </header>

      <Calculator />
      <footer className="mt-24 text-center pb-12 opacity-50">
        <p className="text-slate-500 text-sm font-medium">Dirancang oleh Ahmad Reihan Alavi</p>
      </footer>
    </main>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="space-y-3">
      <div className="text-indigo-500 w-8 h-8">{icon}</div>
      <h3 className="text-slate-200 font-bold">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
