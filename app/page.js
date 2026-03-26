"use client";

import { projects } from "./lib/dealflow-data";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden font-body selection:bg-fp-accent/20">
      {/* Background glowing effects */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-fp-accent/5 blur-[120px] rounded-full pointer-events-none opacity-40" />

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 pt-32 pb-40 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fp-accent/10 border border-fp-accent/20 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fp-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-fp-accent"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-fp-accent">Welcome to Rauly Dealflow</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-display tracking-tight text-white mb-8 leading-[1.1] max-w-5xl mx-auto">
            Community-Powered <br /> 
            <span className="text-white/90">Venture Fund for Web3 Teams</span>
          </h1>
          
          <p className="text-fp-text-dim text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
            We help early-stage Web3 teams with funding, mentorship, and community to build the future of the decentralized web.
          </p>

          {/* <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg transition-all hover:pr-10">
            Get Started
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">
              →
            </span>
          </button> */}

          {/* Glowing Arc & Logos Section */}
          <div className="mt-32 relative">
            {/* The Emerald Arc */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-fp-accent to-transparent shadow-[0_0_20px_2px_rgba(0,212,170,0.4)]" />
            
            <div className="pt-20 grid grid-cols-2 lg:grid-cols-5 gap-12 items-center justify-items-center opacity-40 hover:opacity-100 transition-all duration-700">
               {/* Ethereum */}
               <div className="flex items-center gap-2 group/logo cursor-default">
                 <svg className="w-6 h-6 text-white group-hover/logo:text-fp-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.37 4.35zm.056-17.97l-7.37 12.12L12 16.48l7.37-4.33L12 0z"/>
                 </svg>
                 <span className="text-sm font-bold tracking-widest text-white/80">ETHEREUM</span>
               </div>
               
               {/* Solana */}
               <div className="flex items-center gap-2 group/logo cursor-default">
                 <svg className="w-6 h-6 text-white group-hover/logo:text-fp-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M1.55 19.46a.78.78 0 01-.55-.23.78.78 0 010-1.1L5.12 14h17.33a.78.78 0 01.55.23.78.78 0 010 1.1L18.88 19.46a.78.78 0 01-.55.23H1.55zm0-8.91a.78.78 0 01-.55-.23.78.78 0 010-1.1L5.12 5.08h17.33a.78.78 0 01.55.23.78.78 0 010 1.1L18.88 10.55a.78.78 0 01-.55.23H1.55zm0-8.92a.78.78 0 01-.55-.23.78.78 0 010-1.1L5.12 .17h17.33a.78.78 0 01.55.23.78.78 0 010 1.1L18.88 5.63a.78.78 0 01-.55.23H1.55z"/>
                 </svg>
                 <span className="text-sm font-bold tracking-widest text-white/80">SOLANA</span>
               </div>

               {/* Bitcoin */}
               <div className="flex items-center gap-2 group/logo cursor-default">
                 <svg className="w-6 h-6 text-white group-hover/logo:text-fp-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M14.948 10.876c.404-2.703-1.655-4.157-4.47-5.127l.914-3.665-2.23-.557-.89 3.57c-.586-.146-1.189-.283-1.787-.419l.9-3.608-2.23-.556-.914 3.666c-.484-.11-1.343-.207-1.343-.207l.001.077h-3.08l-.594 2.384s1.656-.379 1.621-.347c.904 0 1.068.495 1.041.78l-.348 3.036c-.062.253-.22.634-.72.509.023.033-1.62-.405-1.62-.405l-1.108 2.556c.552.138 1.09.27 1.62.405l.914 3.665 2.23.557-.914-3.666c.608.165 1.199.32 1.776.467l-.9 3.612 2.23.556.914-3.667c3.812.72 6.678.43 7.884-3.018.972-2.776-.047-4.376-2.056-5.421zm-3.653 7.844c-.69 2.775-5.37 1.275-6.887.896l1.23-4.93c1.517.379 6.36.913 5.657 4.034zm.813-7.876c-.63 2.525-4.529 1.243-5.789.929l1.115-4.474c1.26.315 5.316.713 4.674 3.545z"/>
                 </svg>
                 <span className="text-sm font-bold tracking-widest text-white/80">BITCOIN</span>
               </div>

               {/* Uniswap */}
               <div className="flex items-center gap-2 group/logo cursor-default">
                 <svg className="w-6 h-6 text-white group-hover/logo:text-fp-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12.001 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2.2c5.412 0 9.8 4.388 9.8 9.8s-4.388 9.8-9.8 9.8-9.8-4.388-9.8-9.8 4.388-9.8 9.8-9.8zm0 17.6c4.308 0 7.8-3.492 7.8-7.8s-3.492-7.8-7.8-7.8-7.8 3.492-7.8 7.8 3.492 7.8 7.8 7.8z"/>
                 </svg>
                 <span className="text-sm font-bold tracking-widest text-white/80">UNISWAP</span>
               </div>

               {/* Generic Blockchain / Base */}
               <div className="flex items-center gap-2 group/logo cursor-default">
                 <svg className="w-6 h-6 text-white group-hover/logo:text-fp-accent transition-colors" viewBox="0 0 24 24" fill="currentColor">
                   <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1" fill="none"/>
                 </svg>
                 <span className="text-sm font-bold tracking-widest text-white/80">BLOCKCHAIN</span>
               </div>
            </div>
          </div>
        </section>

        {/* ABOUT / STATS SECTION */}
        <section className="bg-white/[0.01] border-y border-white/5 py-32">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="text-[10px] uppercase tracking-widest font-bold text-fp-text-dim mb-4">About Us</div>
            <h2 className="text-3xl md:text-5xl font-semibold mb-20 tracking-tight">
              Building the Foundation of a <br /> Decentralized Future
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
              {[
                { label: "Capital Facilitated", value: "$20M+" },
                { label: "Projects Supported", value: "30+" },
                { label: "Global Partners & Integrations", value: "50+" },
              ].map((stat, i) => (
                <div key={i} className={`flex flex-col items-center text-center ${i !== 0 ? 'md:border-l border-white/10' : ''} h-full justify-center`}>
                  <span className="text-4xl md:text-5xl font-display text-white mb-3">
                    {stat.value}
                  </span>
                  <span className="text-xs text-fp-text-dim max-w-[140px] leading-relaxed">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS / FEATURES SECTION */}
        <section className="max-w-7xl mx-auto px-6 py-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
               <div className="text-[10px] uppercase tracking-widest font-bold text-fp-accent mb-4 px-2 py-1 bg-fp-accent/10 inline-block rounded">Features</div>
               <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight">
                How we structure <br /> our raises
               </h2>
            </div>
            <p className="text-fp-text-dim max-w-xs text-sm leading-relaxed">
              We provide a comprehensive suite of services to support the entire lifecycle of a token sale, from initial planning and token design to post-launch liquidity and community management.
            </p>
          </div>

          {/* Projects with Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {projects.filter(p => p.image).map((project, index) => (
              <div 
                key={index}
                className="group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-fp-accent/40 transition-all duration-500 relative overflow-hidden flex flex-col h-full"
              >
                {/* Image Container */}
                <div className="mb-8 relative aspect-video overflow-hidden rounded-2xl bg-white/5 border border-white/10 group-hover:border-fp-accent/30 transition-all">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-fp-accent transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-fp-accent/10 text-fp-accent border border-fp-accent/20">
                      {project.ticker}
                    </span>
                  </div>
                  
                  <p className="text-fp-text-dim text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest font-black text-white/30">Raised</span>
                      <span className="text-sm font-mono font-bold text-fp-success">{project.raised}</span>
                    </div>
                    <Link href={`/token/${project.address}`}>
                      <button className="text-[10px] font-bold text-fp-accent flex items-center gap-2 group/btn hover:gap-3 transition-all uppercase tracking-widest">
                        Details <span>→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects without Images - Minimal UI */}
          {projects.some(p => !p.image) && (
            <>
              <div className="flex items-center gap-4 mb-10 opacity-40">
                <div className="h-[1px] flex-grow bg-white/10"></div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/60">Emerging Projects</span>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {projects.filter(p => !p.image).map((project, index) => (
                  <Link 
                    key={index}
                    href={`/token/${project.address}`}
                    className="p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all group block cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-white/80 group-hover:text-white transition-colors">{project.name}</h4>
                      <span className="text-[9px] font-mono text-white/40">{project.ticker}</span>
                    </div>
                    <p className="text-xs text-fp-text-dim leading-relaxed mb-6 line-clamp-2 italic">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center text-[10px] pt-4 border-t border-white/5">
                      <span className="text-white/20 uppercase tracking-widest">Raised</span>
                      <span className="font-mono text-fp-success/70 font-bold">{project.raised}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
          
          {/* Bottom Button */}
          <div className="mt-20 flex justify-center">
             <a href="https://cal.com/rauly-dealflow/30min" target="_blank" rel="noopener noreferrer">
               <button className="px-6 py-2 rounded-full border border-white/10 hover:border-fp-accent/50 text-xs font-bold text-fp-text-dim hover:text-white transition-all">
                Contact Us
               </button>
             </a>
          </div>
        </section>

        {/* FOOTER MOCKUP */}
        <footer className="border-t border-white/5 py-20 px-6">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="font-display text-xl text-fp-accent">Rauly Dealflow</div>
              
              <div className="flex items-center gap-6">
                <a 
                  href="mailto:raulycrypto@gmail.com" 
                  className="text-white/40 hover:text-fp-accent transition-colors p-2 rounded-full hover:bg-white/5"
                  title="Email"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </a>
                <a 
                  href="https://www.linkedin.com/in/rauly-victorio-802442247?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white/40 hover:text-fp-accent transition-colors p-2 rounded-full hover:bg-white/5"
                  title="LinkedIn"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
              </div>

              {/* <div className="flex gap-8 text-xs font-medium text-fp-text-dim">
                <a href="#" className="hover:text-white">Features</a>
                <a href="#" className="hover:text-white">Developer</a>
                <a href="#" className="hover:text-white">Platform</a>
                <a href="#" className="hover:text-white">Help</a>
              </div> */}
              <div className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
                © 2026 Rauly Dealflow. All Rights Reserved.
              </div>
           </div>
        </footer>
      </div>

      {/* Side Vignette */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-50 px-6" />
    </main>
  );
}
