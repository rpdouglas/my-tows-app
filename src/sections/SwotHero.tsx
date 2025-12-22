/**
 * @github_comment: "v0.6.7 SwotHero Restoration: Re-implemented Approach 2 visuals. 
 * Restored scaled typography (2xl headers), glassmorphic backdrop-blur effects, 
 * and quadrant-specific color logic (Emerald/Blue/Amber/Rose). Verified 
 * Lucide icon utilization for zero unused imports."
 */

import React from 'react';
import { ArrowUpRight, Zap, Info, ChevronDown } from 'lucide-react';
import { towsAnalysis } from '../data/towsData';
import type { SectionId } from '../types';

interface SwotHeroProps {
  scrollTo: (id: SectionId) => void;
}

export const SwotHero: React.FC<SwotHeroProps> = ({ scrollTo }) => {
  return (
    <section id="swot" className="pt-20 pb-32 text-center">
      <h1 className="text-7xl font-black tracking-tighter mb-4 text-slate-900 leading-none">
        Strategic <span className="text-indigo-600">TOWS</span>
      </h1>
      <p className="text-slate-500 max-w-2xl mx-auto mb-16 flex items-center justify-center gap-2 italic font-medium underline decoration-indigo-100 decoration-4 underline-offset-8">
        <Info size={16} className="text-indigo-400" /> Executive insight for BI platform selection
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
        {towsAnalysis.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 relative group hover:border-indigo-100 transition-all hover:shadow-2xl shadow-sm overflow-hidden"
          >
            {/* Quadrant Header Logic */}
            <div className="flex justify-between items-center mb-8">
              <div className={`px-6 py-2 rounded-full text-2xl font-black uppercase tracking-tighter shadow-xs
                ${item.colorClass === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                  item.colorClass === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  item.colorClass === 'amber' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  'bg-rose-50 text-rose-600 border border-rose-100'}`}>
                {item.quadrant}
              </div>
              <div className={`p-3 rounded-2xl ${
                item.colorClass === 'emerald' ? 'bg-emerald-50 text-emerald-600' : 
                item.colorClass === 'blue' ? 'bg-blue-50 text-blue-600' :
                item.colorClass === 'amber' ? 'bg-amber-50 text-amber-600' :
                'bg-rose-50 text-rose-600'}`}>
                {item.icon}
              </div>
            </div>

            <h3 className="text-3xl font-black mb-6 tracking-tight text-slate-900 leading-tight">
              {item.title}
            </h3>
            
            <div className="space-y-8">
              {/* Strategic Context Box */}
              <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-6">
                  {item.context}
                </p>
                <p className="text-lg font-black border-l-4 border-indigo-500 pl-4 flex items-center gap-2 text-slate-900 leading-tight">
                  <ArrowUpRight size={20} className="text-indigo-500 shrink-0" /> {item.action}
                </p>
              </div>
              
              {/* GLASSMORPHIC PROOF POINT BOX */}
              <div className="relative p-1 rounded-[2.5rem] bg-linear-to-br from-slate-200 to-transparent">
                <div className="bg-indigo-900/95 backdrop-blur-xl p-8 rounded-[2.4rem] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
                    <Zap size={100} />
                  </div>
                  
                  <p className="text-sm font-black text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-2 mb-6 leading-none">
                    {item.proofPoint.icon} {item.proofPoint.label}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                    <div className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                      <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2 leading-none">
                        Zoho Advantage
                      </p>
                      <p className="text-base font-bold text-slate-100 leading-snug">
                        {item.proofPoint.zoho}
                      </p>
                    </div>
                    <div className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                      <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2 leading-none">
                        Power BI Gap
                      </p>
                      <p className="text-base font-bold text-slate-300 leading-snug">
                        {item.proofPoint.pbi}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ChevronDown 
        size={48} 
        className="mx-auto text-slate-200 animate-bounce mt-16 cursor-pointer hover:text-indigo-300 transition-colors" 
        onClick={() => scrollTo('market')} 
      />
    </section>
  );
};