/**
 * @github_comment: "v0.6.6 Section Restoration: Restored full layout for MarketIntel. 
 * Re-implemented Ecosystem Synergy and Fabric Consolidation cards. 
 * Re-applied premium styling to Recharts containers and Radar/Pie components."
 */

import React from 'react';
import { Globe, Radar as RadarIcon, PieChart as PieIcon, Layers, Cpu } from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer, 
  Legend, 
  Tooltip as ChartTooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { marketShareData, riskData } from '../data/auditData';

export const MarketIntel: React.FC = () => {
  return (
    <section id="market" className="py-32 border-t border-slate-200 text-left">
      <div className="flex items-center gap-4 mb-12">
        <Globe size={40} className="text-indigo-600" />
        <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">
          Market Intelligence
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Risk Radar Chart Card */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-200 h-[500px] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-8 text-slate-900">
            <RadarIcon size={24} className="text-indigo-600" />
            <h3 className="font-bold text-xl uppercase tracking-tight">Strategic Risk Radar</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={riskData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis 
                dataKey="dimension" 
                tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} 
              />
              <Radar 
                name="Zoho Analytics" 
                dataKey="zoho" 
                stroke="#4f46e5" 
                fill="#4f46e5" 
                fillOpacity={0.5} 
              />
              <Radar 
                name="Power BI" 
                dataKey="pbi" 
                stroke="#f43f5e" 
                fill="#f43f5e" 
                fillOpacity={0.3} 
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share Donut Chart Card */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-200 h-[500px] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-8 text-slate-900">
            <PieIcon size={24} className="text-emerald-600" />
            <h3 className="font-bold text-xl uppercase tracking-tight">Global Market Share</h3>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie 
                data={marketShareData} 
                innerRadius={80} 
                outerRadius={120} 
                paddingAngle={8} 
                dataKey="value"
                stroke="none"
              >
                {marketShareData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip 
                contentStyle={{ 
                  borderRadius: '1rem', 
                  border: 'none', 
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' 
                }} 
              />
              <Legend verticalAlign="middle" align="right" layout="vertical" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Strategic Insight Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-100 rounded-[2.5rem] p-10 border border-slate-200 flex items-start gap-6 group hover:border-indigo-200 transition-colors">
          <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
            <Layers size={32} className="text-indigo-600" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-slate-900 leading-none">Ecosystem Synergy</h4>
            <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
              Integrated 'Horizontal SaaS' strategy across 50+ Zoho applications allows for zero-middleware data synchronization, significantly reducing technical overhead.
            </p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex items-start gap-6 group hover:ring-2 hover:ring-indigo-500/50 transition-all">
          <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform">
            <Cpu size={32} className="text-indigo-300" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2 text-indigo-300 leading-none">Fabric Consolidation</h4>
            <p className="text-sm text-slate-400 font-medium italic leading-relaxed">
              Microsoft Fabric migration pathways offer high-complexity enterprise lakehouse features but mandate significant investment in specialized Azure resources.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};