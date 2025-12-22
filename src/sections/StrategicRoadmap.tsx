/**
 * @github_comment: "v0.6.10 Section Restoration: Restored StrategicRoadmap to full density. 
 * Re-implemented Phase status indicators (Zap for Active / XCircle for Planned). 
 * Restored timeline period typography and group-hover color transitions."
 */

import React from 'react';
import { Target, Zap, XCircle } from 'lucide-react';
import { roadmapPhases } from '../data/auditData';

export const StrategicRoadmap: React.FC = () => {
  return (
    <section id="roadmap" className="py-32 border-t border-slate-200 text-left">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-16">
        <div className="bg-indigo-50 p-3 rounded-2xl">
          <Target size={40} className="text-indigo-600" />
        </div>
        <div>
          <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            Strategic Roadmap
          </h2>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-2">
            Multi-Year Deployment & AI Integration
          </p>
        </div>
      </div>

      {/* Roadmap Grid */}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {roadmapPhases.map((phase, i) => (
          <div 
            key={i} 
            className="bg-white rounded-[3.5rem] p-10 border border-slate-200 relative pt-16 group hover:border-indigo-300 transition-all shadow-sm hover:shadow-xl"
          >
            {/* Status Bar */}
            <div 
              className={`absolute top-0 left-0 w-full h-4 rounded-t-3xl transition-colors ${
                phase.status === 'Active' ? 'bg-indigo-600' : 'bg-slate-200 group-hover:bg-slate-300'
              }`} 
            />
            
            {/* Phase Content */}
            <h4 className="text-3xl font-black mb-1 tracking-tight text-slate-900 leading-none">
              {phase.title}
            </h4>
            <p className="text-xs font-black text-indigo-600 uppercase tracking-widest mb-10">
              {phase.period}
            </p>

            {/* Deliverables List */}
            <ul className="space-y-5 mb-10 min-h-[180px]">
              {phase.items.map((item, idx) => (
                <li 
                  key={idx} 
                  className="flex gap-4 text-sm font-bold text-slate-600 tracking-tight items-start"
                >
                  <Target 
                    size={18} 
                    className="text-slate-200 shrink-0 mt-0.5 group-hover:text-indigo-200 transition-colors" 
                  /> 
                  {item}
                </li>
              ))}
            </ul>

            {/* Phase Footer / Status Indicator */}
            <div className="flex justify-between items-center pt-6 border-t border-slate-50">
               <div className="flex flex-col">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                   Status
                 </span>
                 <span className={`text-xs font-bold uppercase mt-1 ${
                   phase.status === 'Active' ? 'text-indigo-600' : 'text-slate-400'
                 }`}>
                   {phase.status}
                 </span>
               </div>
               
               {phase.status === 'Active' ? (
                 <div className="bg-amber-50 p-2 rounded-xl">
                   <Zap size={20} className="text-amber-500 animate-pulse" />
                 </div>
               ) : (
                 <div className="bg-slate-50 p-2 rounded-xl">
                   <XCircle size={20} className="text-slate-200" />
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>

      {/* Executive Summary Note */}
      <div className="mt-16 bg-slate-100 rounded-[2.5rem] p-8 border border-slate-200">
        <p className="text-sm text-slate-500 font-medium italic text-center">
          Roadmap targets are subject to quarterly review based on Zoho Analytics version releases and internal data maturity benchmarks.
        </p>
      </div>
    </section>
  );
};