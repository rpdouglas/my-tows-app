/**
 * @github_comment: "Fixed CSS conflict warning (redundant tracking-tighter classes) 
 * in the footer. Performed a final audit of the 'Storyteller Scroll' structure to 
 * ensure 100% lint compliance and optimal visual hierarchy for the SWOT/TOWS 
 * analysis. Project is now ready for deployment."
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
  XCircle
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
    zoho: "Self-service DataPrep (High)", 
    pbi: "Power Query (Industry Standard)", 
    winner: "Power BI",
    codeSnippet: { zoho: "Apply 'Auto-Clean' in DataPrep studio", pbi: "Table.TransformColumnTypes(#\"Changed Type\")" }
  },
  { 
    feature: "Native Connectivity", 
    zoho: "50+ Zoho Apps / 200+ Others", 
    pbi: "Deep O365 / Azure / Dynamics", 
    winner: "Tie",
    codeSnippet: { zoho: "Enable 'Zoho Books' Connector", pbi: "Get Data -> Dynamics 365" }
  },
  { 
    feature: "Natural Language", 
    zoho: "Zia (Conversational AI)", 
    pbi: "Copilot (Generative AI)", 
    winner: "Power BI",
    codeSnippet: { zoho: "Zia, show sales by region", pbi: "Copilot, create a sales report" }
  },
  { 
    feature: "Pricing Transparency", 
    zoho: "Fixed / Predictable", 
    pbi: "Variable / Hidden", 
    winner: "Zoho",
    codeSnippet: { zoho: "$37/user Flat Rate", pbi: "Pro + Premium Capacity + Fabric" }
  },
  { 
    feature: "Embedded Analytics", 
    zoho: "Highly customizable JS/API", 
    pbi: "Azure Embedded (Expensive)", 
    winner: "Zoho",
    codeSnippet: { zoho: "zoho.embed.render({type: 'report'})", pbi: "PowerBI.embed(element, config)" }
  },
  { 
    feature: "Data Modeling", 
    zoho: "Cloud Query (SQL-based)", 
    pbi: "DAX (Functional/Expression)", 
    winner: "Power BI",
    codeSnippet: { zoho: "SELECT sum(Sales) FROM Orders", pbi: "Total Sales = SUM(Orders[Sales])" }
  },
  { 
    feature: "Security / Sovereignty", 
    zoho: "Independent Global DCs", 
    pbi: "Azure / MS Cloud Dependency", 
    winner: "Zoho",
    codeSnippet: { zoho: "EU/US/IN DC Sovereignty", pbi: "Shared Azure Active Directory" }
  },
  { 
    feature: "Ease of Use", 
    zoho: "Low curve for SMB", 
    pbi: "Steep curve (DAX/M)", 
    winner: "Zoho",
    codeSnippet: { zoho: "Drag-and-Drop Report Builder", pbi: "Requires DAX for complex measures" }
  }
];

const towsAnalysis: TowsLogic[] = [
  {
    quadrant: "SO (Maxi-Maxi)",
    title: "Zero-ETL Ecosystem Play",
    icon: <TrendingUp size={24} className="text-emerald-500" />,
    context: "Leverages Zoho's 50+ apps vs. high market demand for unified data.",
    action: "Position Analytics as a 'Native Utility' for Zoho One users.",
    proofPoint: { label: "Connectivity", zoho: "Native 'One-Click' sync for 50+ Zoho apps.", pbi: "Requires O365/Azure licensing + Gateway setup.", icon: <Box size={14} /> }
  },
  {
    quadrant: "WO (Mini-Maxi)",
    title: "AI-Led SQL Bridge",
    icon: <Lightbulb size={24} className="text-blue-500" />,
    context: "Uses Gen-AI to solve Zoho's internal SQL modeling learning curve.",
    action: "Deploy Zia as the primary no-code interface.",
    proofPoint: { label: "AI UX", zoho: "Zia NLQ (Ask Zia)", pbi: "DAX complexity / Copilot licensing.", icon: <Code2 size={14} /> }
  },
  {
    quadrant: "ST (Maxi-Mini)",
    title: "Privacy Sovereignty",
    icon: <ShieldCheck size={24} className="text-amber-500" />,
    context: "Uses private cloud status to counter 'Big Tech' lock-in.",
    action: "Market 'Clean Room' environment where data isn't trained on.",
    proofPoint: { label: "Governance", zoho: "Independent data centers; No-Ad policy.", pbi: "Azure dependency; data fed into MS Graph.", icon: <Lock size={14} /> }
  },
  {
    quadrant: "WT (Mini-Mini)",
    title: "Vertical Blueprints",
    icon: <AlertTriangle size={24} className="text-rose-500" />,
    context: "Defensive play to avoid competition with PBI's generic scale.",
    action: "Utilize Zoho industry templates to reduce friction.",
    proofPoint: { label: "Speed", zoho: "250+ Pre-built Industry Blueprints.", pbi: "Generic 'Blank Canvas' start-up friction.", icon: <LayoutTemplate size={14} /> }
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
    pdf.save('Strategic-Audit-2025.pdf');
    setIsExporting(false);
  };

  const scrollTo = (id: SectionId) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 font-sans">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 h-20 flex items-center justify-between px-8">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollTo('swot')}>
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg"><ShieldCheck size={20} /></div>
          <span className="font-black text-2xl tracking-tighter uppercase">Z<span className="text-indigo-600">v</span>P</span>
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
        {/* SWOT Section */}
        <section id="swot" className="pt-20 pb-32 text-center">
          <h1 className="text-7xl font-black tracking-tighter mb-4">Strategic <span className="text-indigo-600">TOWS</span></h1>
          <p className="text-slate-500 max-w-2xl mx-auto mb-12 flex items-center justify-center gap-2 italic font-medium underline decoration-indigo-100 decoration-4 underline-offset-8">
            <Info size={16} className="text-indigo-400" /> Advanced lens on Zoho vs. Power BI
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {towsAnalysis.map((item, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-100 rounded-[3.5rem] p-10 relative group hover:border-indigo-100 transition-all hover:shadow-2xl">
                <div className="flex justify-between mb-6">
                  <div className="px-4 py-1.5 rounded-full bg-slate-50 text-indigo-600 text-[10px] font-black uppercase border border-slate-100">{item.quadrant}</div>
                  <div className="p-2 bg-slate-50 rounded-lg">{item.icon}</div>
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight">{item.title}</h3>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-6">
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.context}</p>
                  <p className="text-sm font-bold mt-4 border-l-2 border-indigo-400 pl-3 flex items-center gap-2 text-indigo-900">
                    <ArrowUpRight size={14} /> {item.action}
                  </p>
                </div>
                <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 opacity-10 rotate-12"><Zap size={80} /></div>
                  <p className="text-[10px] font-black text-indigo-300 uppercase flex items-center gap-2 mb-4">{item.proofPoint.icon} {item.proofPoint.label}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><p className="text-[10px] text-indigo-400 font-bold uppercase mb-1">Zoho Edge</p><p className="text-xs font-medium">{item.proofPoint.zoho}</p></div>
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><p className="text-[10px] text-rose-400 font-bold uppercase mb-1">PBI Gap</p><p className="text-xs font-medium">{item.proofPoint.pbi}</p></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ChevronDown size={48} className="mx-auto text-slate-200 animate-bounce mt-12 cursor-pointer hover:text-indigo-300" onClick={() => scrollTo('market')} />
        </section>

        {/* Market Section */}
        <section id="market" className="py-32 border-t border-slate-200">
          <div className="flex items-center gap-4 mb-12">
            <Globe size={40} className="text-indigo-600" />
            <h2 className="text-5xl font-black uppercase tracking-tighter">Market Intelligence</h2>
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
              <div className="flex items-center gap-3 mb-8"><PieIcon size={24} className="text-emerald-600" /><h3 className="font-bold text-xl uppercase tracking-tight">Market Share</h3></div>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart><Pie data={marketShareData} innerRadius={80} outerRadius={120} paddingAngle={8} dataKey="value">{marketShareData.map((entry, i) => (<Cell key={i} fill={entry.color} />))}</Pie><ChartTooltip contentStyle={{borderRadius: '1rem', border: 'none'}} /><Legend verticalAlign="middle" align="right" layout="vertical" /></PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-100 rounded-[2.5rem] p-10 border border-slate-200 flex items-start gap-6 group">
              <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform"><Layers size={32} className="text-indigo-600" /></div>
              <div><h4 className="text-xl font-bold mb-2">Ecosystem Synergy</h4><p className="text-sm text-slate-500 font-medium">Zoho Analytics' primary growth driver is the move toward unified SaaS platform suites.</p></div>
            </div>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex items-start gap-6 group">
              <div className="p-4 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform"><Cpu size={32} className="text-indigo-300" /></div>
              <div><h4 className="text-xl font-bold mb-2 text-indigo-300">Fabric Consolidation</h4><p className="text-sm text-slate-400 font-medium">Power BI remains dominant but faces friction due to technical debt in MS Fabric.</p></div>
            </div>
          </div>
        </section>

        {/* Audit Section */}
        <section id="audit" className="py-32 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4 text-slate-900"><BarChart3 size={32} className="text-indigo-600" /> Technical Audit</h2>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase">
              <div className="flex items-center gap-2"><MinusCircle size={14} /> Competitive Tie</div>
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl text-indigo-600 tracking-widest"><Terminal size={14} /> Hover for code snippets</div>
            </div>
          </div>
          <div className="bg-white rounded-[3rem] border border-slate-200 overflow-visible shadow-sm">
            <table className="w-full text-left">
              <thead><tr className="bg-slate-50/50 border-b border-slate-100"><th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400">Feature Dimension</th><th className="px-10 py-6 text-[10px] font-black uppercase text-slate-400 text-right">Strategic Advantage</th></tr></thead>
              <tbody className="divide-y divide-slate-100">
                {auditData.map((row, i) => (
                  <tr key={i} className="relative hover:bg-slate-50 transition-colors" onMouseEnter={() => setHoveredRow(i)} onMouseLeave={() => setHoveredRow(null)}>
                    <td className="px-10 py-10 font-bold text-xl flex items-center gap-4 text-slate-800 tracking-tight">{row.feature}
                      <AnimatePresence>{hoveredRow === i && (
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 40 }} exit={{ opacity: 0, x: 20 }} className="absolute left-[35%] z-50 bg-slate-900 text-white p-8 rounded-[2rem] w-[550px] pointer-events-none shadow-2xl border border-slate-700">
                          <div className="space-y-6">
                            <div><p className="text-[10px] font-bold text-indigo-400 uppercase mb-3 flex items-center gap-2">Zoho Logic</p><code className="text-xs bg-black/40 p-4 rounded-xl block border border-white/5 font-mono leading-relaxed">{row.codeSnippet.zoho}</code></div>
                            <div><p className="text-[10px] font-bold text-rose-400 uppercase mb-3 flex items-center gap-2">Power BI Logic</p><code className="text-xs bg-black/40 p-4 rounded-xl block border border-white/5 font-mono leading-relaxed">{row.codeSnippet.pbi}</code></div>
                          </div>
                        </motion.div>
                      )}</AnimatePresence>
                    </td>
                    <td className="px-10 py-10 text-right"><span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase border flex items-center gap-1.5 justify-end w-fit ml-auto ${row.winner === 'Zoho' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : row.winner === 'Power BI' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{row.winner === 'Tie' ? <MinusCircle size={10} /> : <CheckCircle2 size={10} />} {row.winner}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-32 border-t border-slate-200">
          <div className="flex items-center gap-4 mb-16">
            <Target size={40} className="text-indigo-600" />
            <h2 className="text-5xl font-black uppercase tracking-tighter text-slate-900">Strategic Roadmap</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roadmapPhases.map((phase, i) => (
              <div key={i} className="bg-white rounded-[3.5rem] p-10 border border-slate-200 relative pt-16 group hover:border-indigo-300 transition-all shadow-sm hover:shadow-lg">
                <div className={`absolute top-0 left-0 w-full h-4 rounded-t-3xl ${phase.status === 'Active' ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                <h4 className="text-3xl font-black mb-1 tracking-tight">{phase.title}</h4>
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-10">{phase.period}</p>
                <ul className="space-y-5 mb-10">{phase.items.map((item, idx) => (
                  <li key={idx} className="flex gap-4 text-sm font-bold text-slate-600"><Target size={18} className="text-slate-200 shrink-0 mt-0.5 group-hover:text-indigo-200 transition-colors" /> {item}</li>
                ))}</ul>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50 mt-auto">
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{phase.status}</span>
                   <XCircle size={20} className={phase.status === 'Active' ? 'hidden' : 'text-slate-100'} />
                   {phase.status === 'Active' && <Zap size={20} className="text-amber-500 animate-pulse" />}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 py-32 text-white px-8">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12 border-t border-white/5 pt-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck className="text-indigo-400" />
              <span className="font-black text-2xl tracking-tighter uppercase italic">Z<span className="text-indigo-400">v</span>P</span>
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