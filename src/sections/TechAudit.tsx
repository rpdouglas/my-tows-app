/**
 * @github_comment: "v0.6.12 Export Alignment: Converted TechAudit to a Named Export 
 * to resolve TS2614. Maintained 100% data density for the 8-dimension audit."
 */

import React from 'react';
import { 
  BarChart3, 
  MinusCircle, 
  CheckCircle2, 
  Scale, 
  Trophy, 
  AlertTriangle 
} from 'lucide-react';
import { auditData } from '../data/auditData';

// Change: Export const instead of export default
export const TechAudit: React.FC = () => {
  return (
    <section id="audit" className="py-32 border-t border-slate-200 text-left">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-slate-900 leading-none">
          <BarChart3 size={32} className="text-indigo-600" /> Technical Audit
        </h2>
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <MinusCircle size={14} /> Competitive Tie
          </div>
          <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600">
            Executive Decision Support
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm mb-16">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Feature Dimension</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Winning Edge</th>
              <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Strategic Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {auditData.map((row, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-10 py-10 font-bold text-xl text-slate-800 tracking-tight leading-none">
                  {row.feature}
                </td>
                <td className="px-10 py-10">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 w-fit ${
                    row.winner === 'Zoho' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                      : row.winner === 'Power BI' 
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-100' 
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>
                    {row.winner === 'Tie' ? <MinusCircle size={10} /> : <CheckCircle2 size={10} />} 
                    {row.winner}
                  </span>
                </td>
                <td className="px-10 py-10 text-sm text-slate-500 font-medium italic leading-relaxed">
                  {row.impact}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-indigo-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20"></div>
        <div className="relative z-10 text-left">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-white/10 p-3 rounded-2xl">
              <Scale size={28} className="text-indigo-300" />
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tight leading-none mb-2">Strategic Decision Matrix</h3>
              <p className="text-indigo-300 text-sm font-bold uppercase tracking-[0.2em]">Weighted Executive Recommendation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <p className="text-[10px] font-bold text-indigo-400 uppercase mb-6 flex items-center gap-2 tracking-widest">
                <Trophy size={12} /> Key Advantage
              </p>
              <h4 className="text-4xl font-black mb-2 leading-none">84%</h4>
              <p className="text-sm text-slate-300 font-medium">Zoho Savings Potential</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-6">
                <div 
                  className="bg-indigo-400 h-full rounded-full shadow-[0_0_12px_rgba(129,140,248,0.5)]" 
                  style={{ width: '84%' }}
                ></div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <p className="text-[10px] font-bold text-rose-400 uppercase mb-6 flex items-center gap-2 tracking-widest">
                <AlertTriangle size={12} /> Risk Mitigation
              </p>
              <h4 className="text-4xl font-black mb-2 leading-none">92%</h4>
              <p className="text-sm text-slate-300 font-medium">Sovereignty Compliance</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-6">
                <div 
                  className="bg-rose-400 h-full rounded-full shadow-[0_0_12px_rgba(251,113,133,0.5)]" 
                  style={{ width: '92%' }}
                ></div>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center text-center p-8 bg-indigo-800/50 rounded-3xl border border-indigo-700 backdrop-blur-xl">
              <h4 className="text-indigo-200 text-xs font-black uppercase mb-2 tracking-widest">Final Recommendation</h4>
              <p className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-4">Zoho Win</p>
              <div className="text-[10px] text-indigo-300 px-4 py-1 bg-white/5 rounded-full border border-white/10 tracking-tight font-bold">
                Based on TCO + Data Residency
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};