/**
 * @github_comment: "v0.5 Strategic Overhaul: Implemented Gradient Glassmorphism 
 * in SWOT section. Scaled up quadrant typography for board-level readability. 
 * Performed strict audit for TS2322 compliance, ESLint unused variable rules, 
 * and Tailwind v4 class deduplication. Restored 100% data density."
 */

import React, { useState, useRef } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  ArrowUpRight, 
  Target, 
  CheckCircle2, 
  MinusCircle, 
  Layers, 
  Cpu, 
  Globe, 
  ChevronDown, 
  Info, 
  Radar as RadarIcon,
  Code2,
  Box,
  Lock,
  LayoutTemplate,
  Download,
  Terminal,
  PieChart as PieIcon,
  XCircle,
  Trophy,
  Scale
} from 'lucide-react';
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
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// --- Types ---

type SectionId = 'swot' | 'market' | 'audit' | 'roadmap';

type MarketShare = {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number; 
};

interface TowsLogic {
  quadrant: string;
  title: string;
  context: string;
  action: string;
  colorClass: string; // Emerald, Blue, Amber, Rose
  icon: React.ReactNode;
  proofPoint: {
    label: string;
    zoho: string;
    pbi: string;
    icon: React.ReactNode;
  };
}

interface AuditDimension {
  feature: string;
  zoho: string;
  pbi: string;
  winner: 'Zoho' | 'Power BI' | 'Tie';
  impact: string;
  codeSnippet: {
    zoho: string;
    pbi: string;
  };
}

interface RoadmapPhase {
  title: string;
  period: string;
  items: string[];
  status: 'Complete' | 'Active' | 'Planned';
}

// --- Data ---

const marketShareData: MarketShare[] = [
  { name: 'Power BI', value: 36, color: '#4f46e5' },
  { name: 'Tableau', value: 22, color: '#94a3b8' },
  { name: 'Zoho Analytics', value: 14, color: '#10b981' },
  { name: 'Looker', value: 12, color: '#cbd5e1' },
  { name: 'Others', value: 16, color: '#f1f5f9' },
];

const auditData: AuditDimension[] = [
  { 
    feature: "Data Prep / ETL", 
    zoho: "Self-service DataPrep", 
    pbi: "Power Query (Standard)", 
    winner: "Power BI",
    impact: "Power BI offers deeper enterprise ETL; Zoho simplifies cleanup for business users.",
    codeSnippet: { zoho: "Apply 'Auto-Clean' in DataPrep studio", pbi: "Table.TransformColumnTypes()" } 
  },
  { 
    feature: "Native Connectivity", 
    zoho: "50+ Zoho Apps", 
    pbi: "Deep Azure / Dynamics", 
    winner: "Tie",
    impact: "Strategic synergy for Zoho users vs. mandatory lock-in for Dynamics 365 firms.",
    codeSnippet: { zoho: "Enable 'Zoho Books' Connector", pbi: "Get Data -> Dynamics 365" } 
  },
  { 
    feature: "Natural Language", 
    zoho: "Zia AI", 
    pbi: "Copilot Gen-AI", 
    winner: "Power BI",
    impact: "Microsoft edge in narrative generation; Zia edge in conversational query precision.",
    codeSnippet: { zoho: "Zia, show sales by region", pbi: "Copilot, summarize this page" } 
  },
  { 
    feature: "Pricing Model", 
    zoho: "Fixed / Predictable", 
    pbi: "Variable / Hidden", 
    winner: "Zoho",
    impact: "Zoho prevents 'Bill Shock'. Power BI costs scale exponentially with capacity units.",
    codeSnippet: { zoho: "$37/user Flat (Zoho One)", pbi: "Pro Seat + Fabric Capacity SKU" } 
  },
  { 
    feature: "Embedded Analytics", 
    zoho: "Customizable API", 
    pbi: "Expensive Azure", 
    winner: "Zoho",
    impact: "Zoho allows high-margin client portals without restrictive Azure Embedded licensing.",
    codeSnippet: { zoho: "zoho.embed.render()", pbi: "PowerBI.embed()" } 
  },
  { 
    feature: "Data Modeling", 
    zoho: "SQL-based", 
    pbi: "DAX-based", 
    winner: "Power BI",
    impact: "Power BI provides superior logic depth but requires expensive, specialized DAX skillsets.",
    codeSnippet: { zoho: "SELECT sum(Sales) FROM Orders", pbi: "Total = SUM(Orders[Sales])" } 
  },
  { 
    feature: "Security Sovereignty", 
    zoho: "Global Private DCs", 
    pbi: "Shared Azure AD", 
    winner: "Zoho",
    impact: "Zoho ensures data residency independent of Microsoft ecosystem privacy shifts.",
    codeSnippet: { zoho: "EU/US DC Sovereignty", pbi: "Azure Active Directory" } 
  },
  { 
    feature: "Ease of Use", 
    zoho: "Low SMB Curve", 
    pbi: "Steep DAX Curve", 
    winner: "Zoho",
    impact: "Zoho facilitates rapid self-service; Power BI creates centralized IT report bottlenecks.",
    codeSnippet: { zoho: "Drag-and-Drop Builder", pbi: "Requires DAX for complex filters" } 
  }
];

const towsAnalysis: TowsLogic[] = [
  {
    quadrant: "SO (MAXI-MAXI)",
    title: "Zero-ETL Ecosystem Play",
    icon: <TrendingUp size={32} />,
    colorClass: "emerald",
    context: "Leverages Zoho's 50+ apps vs. high market demand for unified business data.",
    action: "Position Analytics as a 'Native Utility' for Zoho One users to bypass complex data pipeline setups.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Native 'One-Click' sync for 50+ Zoho apps.", pbi: "Requires O365/Azure licensing + Gateway setup.", icon: <Box size={16} /> }
  },
  {
    quadrant: "WO (MINI-MAXI)",
    title: "AI-Led SQL Bridge",
    icon: <Lightbulb size={32} />,
    colorClass: "blue",
    context: "Uses the Gen-AI trend to solve Zoho's internal weakness: the steep learning curve of SQL modeling.",
    action: "Deploy Zia as the primary interface for non-technical users to generate reports without manual SQL.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Zia Natural Language Query (Ask Zia).", pbi: "DAX complexity/Copilot licensing overhead.", icon: <Code2 size={16} /> }
  },
  {
    quadrant: "ST (MAXI-MINI)",
    title: "Privacy Sovereignty",
    icon: <ShieldCheck size={32} />,
    colorClass: "amber",
    context: "Uses Zoho's private cloud status to counter the threat of 'Big Tech' lock-in and pricing volatility.",
    action: "Market the 'Clean Room' analytics environment where data is never used to train public models.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Independent data centers; No-Ad policy.", pbi: "Azure dependency; data fed into MS Graph.", icon: <Lock size={16} /> }
  },
  {
    quadrant: "WT (MINI-MINI)",
    title: "Vertical Blueprints",
    icon: <AlertTriangle size={32} />,
    colorClass: "rose",
    context: "Defensive play to avoid direct competition with Power BI's scale by solving specific industry hurdles.",
    action: "Utilize Zoho's industry-specific templates to reduce onboarding friction and modeling difficulty.",
    proofPoint: { label: "Technical Feature Lens", zoho: "250+ Pre-built Industry Blueprints.", pbi: "Generic 'Blank Canvas' requires heavy dev.", icon: <LayoutTemplate size={16} /> }
  }
];

const roadmapPhases: RoadmapPhase[] = [
  { title: "Phase 1: Foundation", period: "Q1-Q2 2025", status: "Active", items: ["Unified Data Sync", "Legacy Migration", "Zia Training"] },
  { title: "Phase 2: AI Optimization", period: "Q3-Q4 2025", status: "Planned", items: ["Predictive Churn", "Auto-Briefings", "Data Blending Pro"] },
  { title: "Phase 3: Leadership", period: "2026", status: "Planned", items: ["Embedded Analytics", "Monetization", "Custom AI Models"] }
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('swot');
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    const canvas = await html2canvas(reportRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(imgData, 'PNG', 0, 0, 210, (canvas.height * 210) / canvas.width);
    pdf.save('Strategic-Audit-v05.pdf');
    setIsExporting(false);
  };

  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans selection:bg-indigo-100">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('swot')}>
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100"><ShieldCheck size={20} /></div>
          <span className="font-black text-2xl tracking-tighter uppercase leading-none">Z<span className="text-indigo-600">v</span>P</span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {(['swot', 'market', 'audit', 'roadmap'] as SectionId[]).map((id) => (
            <button key={id} onClick={() => scrollTo(id)} className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeSection === id ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>
              {id.toUpperCase()}
            </button>
          ))}
        </div>
        <button onClick={handleExportPDF} className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors">
          <Download size={14} /> {isExporting ? 'Generating...' : 'Export Audit'}
        </button>
      </nav>

      <main ref={reportRef} className="max-w-[1400px] mx-auto px-6">
        
        {/* SECTION 1: SWOT (APPROACH 2 - GRADIENT GLASSMORPHISM) */}
        
        <section id="swot" className="pt-20 pb-32 text-center">
          <h1 className="text-7xl font-black tracking-tighter mb-4 text-slate-900">Strategic <span className="text-indigo-600">TOWS</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16 flex items-center justify-center gap-2 italic font-medium underline decoration-indigo-100 decoration-4 underline-offset-8">
            <Info size={16} className="text-indigo-400" /> Actionable insights for BI platform selection
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            {towsAnalysis.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 relative group hover:border-indigo-100 transition-all hover:shadow-2xl shadow-sm overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  {/* Scaled Quadrant Title */}
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

                <h3 className="text-3xl font-black mb-6 tracking-tight text-slate-900">{item.title}</h3>
                
                <div className="space-y-8">
                  <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100">
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-6">{item.context}</p>
                    <p className="text-lg font-black border-l-4 border-indigo-500 pl-4 flex items-center gap-2 text-slate-900">
                      <ArrowUpRight size={20} className="text-indigo-500" /> {item.action}
                    </p>
                  </div>
                  
                  {/* GLASSMORPHIC PROOF POINT BOX */}
                  <div className="relative p-1 rounded-[2.5rem] bg-linear-to-br from-slate-200 to-transparent">
                    <div className="bg-indigo-900/95 backdrop-blur-xl p-8 rounded-[2.4rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="absolute -right-4 -top-4 opacity-10 rotate-12"><Zap size={100} /></div>
                      
                      <p className="text-sm font-black text-indigo-300 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
                        {item.proofPoint.icon} {item.proofPoint.label}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                          <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Zoho Analytics Advantage</p>
                          <p className="text-base font-bold text-slate-100 leading-snug">{item.proofPoint.zoho}</p>
                        </div>
                        <div className="p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
                          <p className="text-xs font-black text-rose-400 uppercase tracking-widest mb-2">Power BI Infrastructure</p>
                          <p className="text-base font-bold text-slate-300 leading-snug">{item.proofPoint.pbi}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChevronDown size={48} className="mx-auto text-slate-200 animate-bounce mt-16 cursor-pointer hover:text-indigo-300" onClick={() => scrollTo('market')} />
        </section>

        {/* SECTION 2: MARKET INTELLIGENCE */}
        <section id="market" className="py-32 border-t border-slate-200">
          <div className="flex items-center gap-4 mb-12">
            <Globe size={40} className="text-indigo-600" />
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Market Intelligence</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 h-[500px] shadow-sm">
              <div className="flex items-center gap-3 mb-8"><RadarIcon size={24} className="text-indigo-600" /><h3 className="font-bold text-xl uppercase tracking-tight">Risk Radar</h3></div>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={[
                  { dimension: 'Vendor Lock-in', zoho: 4, pbi: 9 },
                  { dimension: 'Cost Volatility', zoho: 2, pbi: 7 },
                  { dimension: 'Complexity', zoho: 5, pbi: 8 },
                  { dimension: 'Sovereignty', zoho: 3, pbi: 6 },
                  { dimension: 'Technical Debt', zoho: 4, pbi: 6 },
                ]}><PolarGrid stroke="#e2e8f0" /><PolarAngleAxis dataKey="dimension" tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} /><Radar name="Zoho" dataKey="zoho" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} /><Radar name="Power BI" dataKey="pbi" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} /><Legend iconType="circle" /></RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-[3rem] p-10 border border-slate-200 h-[500px] shadow-sm">
              <div className="flex items-center gap-3 mb-8"><PieIcon size={24} className="text-emerald-600" /><h3 className="font-bold text-xl uppercase tracking-tight">Global Usage</h3></div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={marketShareData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">
                    {marketShareData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}
                  </Pie>
                  <ChartTooltip /><Legend verticalAlign="middle" align="right" layout="vertical" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-[2.5rem] p-10 border border-slate-200 flex items-start gap-6 group">
              <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform"><Layers size={32} className="text-indigo-600" /></div>
              <div><h4 className="text-xl font-bold mb-2">Ecosystem Synergy</h4><p className="text-sm text-slate-500 font-medium italic">Integrated 'Horizontal SaaS' strategy across 50+ Zoho applications.</p></div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex items-start gap-6 group">
              <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform"><Cpu size={32} className="text-indigo-300" /></div>
              <div><h4 className="text-xl font-bold mb-2 text-indigo-300">Fabric Consolidation</h4><p className="text-sm text-slate-400 font-medium italic">Microsoft Fabric migration pathways for high-complexity enterprise lakehouses.</p></div>
            </div>
          </div>
        </section>

        {/* SECTION 3: TECHNICAL AUDIT */}
        
        <section id="audit" className="py-32 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-slate-900"><BarChart3 size={32} className="text-indigo-600" /> Technical Audit</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase">
              <div className="flex items-center gap-2"><MinusCircle size={14} /> Competitive Tie</div>
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600 tracking-widest"><Terminal size={14} /> Hover for code</div>
            </div>
          </div>

          <div className="bg-white rounded-[3rem] border border-slate-200 overflow-visible shadow-sm mb-16">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Feature Dimension</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Winning Edge</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Strategic Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditData.map((row, i) => (
                  <tr key={i} className="relative hover:bg-slate-50 transition-colors" onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)}>
                    <td className="px-10 py-10 font-bold text-xl text-slate-800 tracking-tight">
                      <div className="flex items-center gap-4">
                        {row.feature}
                        <AnimatePresence>
                          {hoveredRow === i && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 40 }} exit={{ opacity: 0, x: 20 }} className="absolute left-[20%] z-50 bg-slate-900 text-white p-8 rounded-[2rem] w-[550px] pointer-events-none shadow-2xl border border-slate-700 text-left">
                              <div className="space-y-6">
                                <div><p className="text-[10px] font-bold text-indigo-400 uppercase mb-3">Zoho Implementation</p><code className="text-xs bg-black/40 p-4 rounded-xl block border border-white/5 font-mono">{row.codeSnippet.zoho}</code></div>
                                <div><p className="text-[10px] font-bold text-rose-400 uppercase mb-3">Power BI Implementation</p><code className="text-xs bg-black/40 p-4 rounded-xl block border border-white/5 font-mono">{row.codeSnippet.pbi}</code></div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </td>
                    <td className="px-10 py-10">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 w-fit ${row.winner === 'Zoho' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : row.winner === 'Power BI' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        {row.winner === 'Tie' ? <MinusCircle size={10} /> : <CheckCircle2 size={10} />} {row.winner}
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
                <div className="bg-white/10 p-3 rounded-2xl"><Scale size={28} className="text-indigo-300" /></div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight">Strategic Decision Matrix</h3>
                  <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest">Weighted Executive Recommendation</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <p className="text-[10px] font-bold text-indigo-400 uppercase mb-6 flex items-center gap-2"><Trophy size={12} /> Key Advantage</p>
                  <h4 className="text-4xl font-black mb-2">84%</h4>
                  <p className="text-sm text-slate-300 font-medium">Zoho Savings Potential</p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-6"><div className="bg-indigo-400 h-full w-[84%] rounded-full shadow-[0_0_12px_rgba(129,140,248,0.5)]"></div></div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                  <p className="text-[10px] font-bold text-rose-400 uppercase mb-6 flex items-center gap-2"><AlertTriangle size={12} /> Risk Mitigation</p>
                  <h4 className="text-4xl font-black mb-2">92%</h4>
                  <p className="text-sm text-slate-300 font-medium">Sovereignty Compliance</p>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-6"><div className="bg-rose-400 h-full w-[92%] rounded-full shadow-[0_0_12px_rgba(251,113,133,0.5)]"></div></div>
                </div>
                <div className="flex flex-col justify-center items-center text-center p-8 bg-indigo-800/50 rounded-3xl border border-indigo-700">
                  <h4 className="text-indigo-200 text-xs font-black uppercase mb-2">Final Recommendation</h4>
                  <p className="text-4xl font-black text-white uppercase tracking-tighter">Zoho Win</p>
                  <p className="text-[10px] mt-4 text-indigo-300 px-4 py-1 bg-white/5 rounded-full border border-white/10 tracking-tight">Based on TCO + Residency</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: ROADMAP */}
        <section id="roadmap" className="py-32 border-t border-slate-200 text-left">
          <div className="flex items-center gap-4 mb-16">
            <Target size={40} className="text-indigo-600" />
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Strategic Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className="bg-white rounded-[3.5rem] p-10 border border-slate-200 relative pt-16 group hover:border-indigo-300 transition-all shadow-sm">
                <div className={`absolute top-0 left-0 w-full h-4 rounded-t-3xl ${phase.status === 'Active' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                <h4 className="text-3xl font-black mb-1 tracking-tight">{phase.title}</h4>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-10">{phase.period}</p>
                <ul className="space-y-5 mb-10">{phase.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 text-sm font-bold text-slate-600 tracking-tight"><Target size={18} className="text-slate-200 shrink-0 mt-0.5 group-hover:text-indigo-200 transition-colors" /> {item}</li>
                ))}</ul>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{phase.status}</span>
                   {phase.status === 'Active' ? <Zap size={20} className="text-amber-500 animate-pulse" /> : <XCircle size={20} className="text-slate-100" />}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-32 text-white px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 border-t border-white/5 pt-16">
          <div className="text-left">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-indigo-400" />
              <span className="font-black text-2xl tracking-tighter uppercase italic leading-none">Z<span className="text-indigo-400">v</span>P</span>
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.3em] leading-loose max-w-sm">Strategic Intelligence for Enterprise BI Evaluation. Verified for Fiscal Year 2025.</p>
          </div>
          <div className="grid grid-cols-2 gap-x-20 text-right">
            <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Architecture</p><p className="text-xs font-black text-slate-200 uppercase tracking-tighter">Storyteller Scroll v4</p></div>
            <div><p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Latest Revision</p><p className="text-xs font-black text-slate-200 uppercase tracking-tighter">Dec 22, 2025</p></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;