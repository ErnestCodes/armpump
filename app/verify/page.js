"use client";

import { useState, useEffect } from "react";
import { BINANCE_VERIFY_DATA } from "../lib/demo-data";
import Link from "next/link";

export default function BinanceVerifyPage() {
  const [status, setStatus] = useState("searching"); // searching, finishing, found
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState("Initializing connection...");

  useEffect(() => {
    if (status === "searching") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("finishing");
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 500);

      const textInterval = setInterval(() => {
        const phrases = [
          "Connecting...",
          "Scanning records...",
          "Verifying digital signatures...",
          "Cross-referencing employee IDs...",
          "Decrypting metadata...",
          "Finalizing results...",
        ];
        setScanText(phrases[Math.floor(Math.random() * phrases.length)]);
      }, 1200);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [status]);

  useEffect(() => {
    if (status === "finishing") {
      const timer = setTimeout(() => {
        setStatus("found");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <main className="min-h-screen bg-[#0b0e11] text-[#EAECEF] font-body selection:bg-binance-yellow/20 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#FCD535 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header - Always visible or fades in */}
        <div className={`mb-16 text-center transition-all duration-1000 ${status === 'found' ? 'translate-y-0' : 'translate-y-4'}`}>
           <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-10 h-10 bg-fp-accent rounded-lg flex items-center justify-center">
                 <svg viewBox="0 0 24 24" className="w-6 h-6 text-black fill-current">
                    <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3ZM12 5.5L18.3 9L12 12.5L5.7 9L12 5.5ZM17.8 15.3L12 18.5L6.2 15.3V10.2L12 13.5L17.8 10.2V15.3Z" />
                 </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Verified Personnel</h1>
           </div>
           <p className="text-[#929AA5] max-w-md mx-auto">
             Official verification system for Rauly Dealflow partners.
           </p>
        </div>

        {status !== "found" ? (
          /* SCANNING STATE */
          <div className="w-full max-w-md bg-[#1e2329] rounded-2xl p-8 border border-[#474d57] shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col gap-8">
              {/* Radar/Scan Effect */}
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-binance-yellow/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-binance-yellow rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-4 bg-binance-yellow/10 rounded-full flex items-center justify-center">
                   <svg className="w-8 h-8 text-binance-yellow animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </div>
              </div>

              {/* Progress and Text */}
              <div className="space-y-4 text-center">
                <div className="text-sm font-mono text-binance-yellow h-5">{scanText}</div>
                <div className="w-full bg-[#0b0e11] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-binance-yellow transition-all duration-500 ease-out shadow-[0_0_10px_rgba(252,213,53,0.5)]" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-[#929AA5] font-mono">{Math.round(progress)}% Processed</div>
              </div>

              <div className="text-center pt-4 opacity-50">
                 <p className="text-[10px] uppercase tracking-widest">Secure Verification Protocol Active</p>
              </div>
            </div>
          </div>
        ) : (
          /* RESULTS STATE */
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000">
            {BINANCE_VERIFY_DATA.map((person, i) => (
              <div 
                key={i} 
                className="group bg-[#1e2329] border border-[#474d57] hover:border-binance-yellow/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                 <div className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                       <div className="w-24 h-24 rounded-full overflow-hidden bg-[#0b0e11] border-2 border-[#474d57] group-hover:border-binance-yellow transition-colors duration-500">
                          <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="absolute -bottom-1 -right-1 bg-binance-yellow text-black p-1 rounded-full border-4 border-[#1e2329]">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                       </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{person.name}</h3>
                    <p className="text-binance-yellow text-sm font-medium mb-4">{person.handle}</p>
                    
                    <div className="px-3 py-1 rounded bg-[#0b0e11] text-[10px] uppercase tracking-widest font-bold text-[#929AA5] mb-6">
                       {person.role}
                    </div>

                    <div className="w-full pt-6 border-t border-[#474d57] flex flex-col gap-2">
                       <div className="flex justify-between text-xs">
                          <span className="text-[#929AA5]">Status</span>
                          <span className="text-fp-success font-bold">{person.status}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="text-[#929AA5]">Membership</span>
                          <span className="text-[#EAECEF]">{person.joined}</span>
                       </div>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}

        {/* Home Button or Call to Action */}
        <div className={`mt-20 transition-all duration-1000 ${status === 'found' ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
           <Link href="/">
             <button className="px-8 py-3 bg-fp-accent hover:bg-fp-accent-hover text-black font-bold rounded-lg transition-all flex items-center gap-2">
                <span>←</span> Back to Hub
             </button>
           </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .slide-in-from-bottom-8 {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </main>
  );
}
