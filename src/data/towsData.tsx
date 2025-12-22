import { TrendingUp, Lightbulb, ShieldCheck, AlertTriangle, Box, Code2, Lock, LayoutTemplate } from 'lucide-react';
import type { TowsLogic } from '../types';

export const towsAnalysis: TowsLogic[] = [
  {
    quadrant: "SO (MAXI-MAXI)",
    title: "Zero-ETL Ecosystem Play",
    icon: <TrendingUp size={32} />,
    colorClass: "emerald",
    context: "Leverages Zoho's 50+ apps vs. high market demand for unified business data.",
    action: "Position Analytics as a 'Native Utility' for Zoho One users to bypass complex pipelines.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Native 'One-Click' sync for 50+ Zoho apps.", pbi: "Requires O365 licensing + Gateway.", icon: <Box size={16} /> }
  },
  {
    quadrant: "WO (MINI-MAXI)",
    title: "AI-Led SQL Bridge",
    icon: <Lightbulb size={32} />,
    colorClass: "blue",
    context: "Uses the Gen-AI trend to solve the learning curve of SQL modeling.",
    action: "Deploy Zia as the primary interface for non-technical users to generate reports.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Zia Natural Language Query (Ask Zia).", pbi: "DAX complexity/Copilot overhead.", icon: <Code2 size={16} /> }
  },
  {
    quadrant: "ST (MAXI-MINI)",
    title: "Privacy Sovereignty",
    icon: <ShieldCheck size={32} />,
    colorClass: "amber",
    context: "Uses Zoho's private cloud status to counter 'Big Tech' lock-in.",
    action: "Market the 'Clean Room' analytics where data is never used to train public models.",
    proofPoint: { label: "Technical Feature Lens", zoho: "Independent data centers; No-Ad policy.", pbi: "Azure dependency; MS Graph integration.", icon: <Lock size={16} /> }
  },
  {
    quadrant: "WT (MINI-MINI)",
    title: "Vertical Blueprints",
    icon: <AlertTriangle size={32} />,
    colorClass: "rose",
    context: "Defensive play to avoid direct competition with Power BI's scale.",
    action: "Utilize Zoho industry templates to reduce onboarding friction and modeling difficulty.",
    proofPoint: { label: "Technical Feature Lens", zoho: "250+ Pre-built Industry Blueprints.", pbi: "Generic 'Blank Canvas' requires heavy dev.", icon: <LayoutTemplate size={16} /> }
  }
];