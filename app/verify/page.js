"use client";

import { useState, useEffect } from "react";
import { BINANCE_VERIFY_DATA } from "../lib/demo-data";
import Link from "next/link";

export default function BinanceVerifyPage() {
  const [status, setStatus] = useState("idle"); // idle, searching, finishing, result
  const [progress, setProgress] = useState(0);
  const [scanText, setScanText] = useState("Initializing connection...");
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (status === "searching") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus("finishing");
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 400);

      const phrases = [
        "Connecting...",
        "Scanning records...",
        "Verifying digital signatures...",
        "Cross-referencing database...",
        "Checking security Clearance...",
        "Encrypting channel...",
        "Finalizing results...",
      ];
      
      let phraseIdx = 0;
      const textInterval = setInterval(() => {
        setScanText(phrases[phraseIdx % phrases.length]);
        phraseIdx++;
      }, 1000);

      return () => {
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [status]);

  useEffect(() => {
    if (status === "finishing") {
      const timer = setTimeout(() => {
        const query = searchQuery.toLowerCase().trim().replace(/^@/, "");
        const found = BINANCE_VERIFY_DATA.find(person => 
          person.handle.toLowerCase().replace(/^@/, "") === query ||
          person.name.toLowerCase().includes(query)
        );
        
        setResult(found || "not_found");
        setStatus("result");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [status, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setStatus("searching");
    setProgress(0);
  };

  const resetSearch = () => {
    setStatus("idle");
    setSearchQuery("");
    setResult(null);
    setProgress(0);
  };

  return (
    <main className="min-h-screen bg-[#0b0e11] text-[#EAECEF] font-body selection:bg-binance-yellow/20 relative overflow-hidden">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#FCD535 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
        
        {/* Header */}
        <div className={`text-center transition-all duration-1000 ${status !== 'idle' ? 'mb-12' : 'mb-16'}`}>
           <div className="flex items-center justify-center gap-3 mb-6 animate-in fade-in duration-700">
              <div className="w-10 h-10 bg-fp-accent rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,212,170,0.3)]">
                 <svg viewBox="0 0 24 24" className="w-6 h-6 text-black fill-current">
                    <path d="M12 3L4 7.5V16.5L12 21L20 16.5V7.5L12 3ZM12 5.5L18.3 9L12 12.5L5.7 9L12 5.5ZM17.8 15.3L12 18.5L6.2 15.3V10.2L12 13.5L17.8 10.2V15.3Z" />
                 </svg>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Personnel Verification</h1>
           </div>
           {status === 'idle' && (
             <p className="text-[#929AA5] max-w-md mx-auto animate-in fade-in duration-1000 slide-in-from-bottom-2">
               Verify the authenticity of Rauly Dealflow team members and partners.
             </p>
           )}
        </div>

        {status === "idle" && (
          /* SEARCH INPUT */
          <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
            <form onSubmit={handleSearch} className="relative group">
               <input 
                 type="text" 
                 placeholder="Search by username or handle..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-[#1e2329] border border-[#474d57] rounded-xl py-4 px-6 pr-16 text-[#EAECEF] focus:outline-none focus:border-binance-yellow focus:ring-1 focus:ring-binance-yellow transition-all duration-300 placeholder:text-[#474d57]"
               />
               <button 
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-binance-yellow rounded-lg text-black hover:bg-binance-yellow-hover transition-colors shadow-lg"
               >
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                 </svg>
               </button>
            </form>
          </div>
        )}

        {(status === "searching" || status === "finishing") && (
          /* SCANNING STATE */
          <div className="w-full max-w-md bg-[#1e2329] rounded-2xl p-8 border border-[#474d57] shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="flex flex-col gap-8">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-4 border-binance-yellow/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-binance-yellow rounded-full border-t-transparent animate-spin" />
                <div className="absolute inset-4 bg-binance-yellow/10 rounded-full flex items-center justify-center">
                   <svg className="w-8 h-8 text-binance-yellow animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <div className="text-sm font-mono text-binance-yellow h-5">{scanText}</div>
                <div className="w-full bg-[#0b0e11] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-binance-yellow transition-all duration-500 ease-out shadow-[0_0_10px_rgba(252,213,53,0.5)]" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="text-xs text-[#929AA5] font-mono uppercase tracking-widest">Searching: {searchQuery}</div>
              </div>
            </div>
          </div>
        )}

        {status === "result" && (
          /* RESULTS STATE */
          <div className="w-full max-w-md flex flex-col items-center">
            {result === "not_found" ? (
              <div className="w-full bg-[#1e2329] border border-[#ef4444]/30 rounded-2xl p-10 text-center animate-in slide-in-from-bottom-4 fade-in duration-500">
                <div className="w-20 h-20 bg-[#ef4444]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#ef4444]/20">
                   <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="w-10 h-10">
                      <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Record Not Found</h3>
                <p className="text-[#929AA5] text-sm mb-8">
                  The user <span className="text-white font-mono">{searchQuery}</span> is not listed in the official Rauly Dealflow directory.
                </p>
                <button 
                  onClick={resetSearch}
                  className="w-full py-3 border border-[#474d57] hover:bg-[#2b3139] rounded-lg transition-colors text-sm font-bold"
                >
                  Try Another Search
                </button>
              </div>
            ) : (
              <div className="w-full bg-[#1e2329] border border-binance-yellow/50 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-8 fade-in duration-700">
                 <div className="p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                       <div className="w-28 h-28 rounded-full overflow-hidden bg-[#0b0e11] border-2 border-binance-yellow p-1">
                          <img src={result.image} alt={result.name} className="w-full h-full object-cover rounded-full" />
                       </div>
                       <div className="absolute -bottom-1 -right-1 bg-binance-yellow text-black p-1 rounded-full border-4 border-[#1e2329] shadow-lg">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-1">{result.name}</h3>
                    <p className="text-binance-yellow text-sm font-medium mb-6 uppercase tracking-wider">{result.handle}</p>
                    
                    <div className="px-4 py-1.5 rounded-full bg-[#0b0e11] text-[10px] uppercase tracking-[0.2em] font-black text-[#929AA5] mb-8 border border-[#474d57]">
                       {result.role}
                    </div>

                    <div className="w-full pt-8 border-t border-[#474d57] flex flex-col gap-4">
                       <div className="flex justify-between items-center px-2">
                          <span className="text-[#929AA5] text-xs font-bold uppercase">Status</span>
                          <span className="text-fp-success font-bold text-sm bg-fp-success/10 px-3 py-1 rounded ring-1 ring-fp-success/30">VERIFIED</span>
                       </div>
                       <div className="flex justify-between items-center px-2">
                          <span className="text-[#929AA5] text-xs font-bold uppercase">Membership</span>
                          <span className="text-[#EAECEF] text-xs font-mono">{result.joined}</span>
                       </div>
                    </div>

                    <button 
                      onClick={resetSearch}
                      className="mt-10 w-full py-3 bg-[#2b3139] hover:bg-[#363e48] text-white/50 hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-widest"
                    >
                      New Search
                    </button>
                 </div>
              </div>
            )}
          </div>
        )}

        {/* Back to Home - Only visible in idle */}
        {status === 'idle' && (
          <div className="mt-12 animate-in fade-in duration-1000">
             <Link href="/">
               <button className="text-[#929AA5] hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                  <span>←</span> Return to Dashboard
               </button>
             </Link>
          </div>
        )}
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
        .slide-in-from-bottom-2 {
          animation: slideUp 1s ease-out forwards;
        }
        .slide-in-from-bottom-4 {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .slide-in-from-bottom-8 {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </main>
  );
}
