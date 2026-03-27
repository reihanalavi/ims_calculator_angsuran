import Calculator from "./components/Calculator";
import { Car, Fuel, Settings2, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 lg:p-24 bg-slate-50/50">
      <header className="text-center space-y-6 mb-16 w-full max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-full text-indigo-600 text-sm font-semibold uppercase tracking-wider">
          <Car className="w-4 h-4" /> IMS Finance
        </div>
        <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight">
          Kalkulator <span className="text-indigo-600">Angsuran</span>
        </h1>
        {/* <p className="text-slate-600 text-lg lg:text-xl max-w-2xl mx-auto font-medium">
          Dapatkan kalkulasi transparan untuk kendaraan impian Anda secara real-time.
        </p> */}
      </header>

      <Calculator />
      
      <footer className="mt-20 text-center pb-12 border-t border-slate-200 w-full pt-12">
        <p className="text-slate-400 text-sm font-medium">Developed by Ahmad Reihan Alavi</p>
      </footer>
    </main>
  );
}