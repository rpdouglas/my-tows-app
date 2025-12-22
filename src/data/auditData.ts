/**
 * @github_comment: "v0.6.5 Data Restoration: Restored full strategic strings for all 
 * 8 audit dimensions. Ensured 'impact' column contains the high-value 
 * business logic lost during the modular refactor."
 */

import type { AuditDimension, RoadmapPhase, MarketShare, RiskPoint } from '../types';

export const marketShareData: MarketShare[] = [
  { name: 'Power BI', value: 36, color: '#4f46e5' },
  { name: 'Tableau', value: 22, color: '#94a3b8' },
  { name: 'Zoho Analytics', value: 14, color: '#10b981' },
  { name: 'Looker', value: 12, color: '#cbd5e1' },
  { name: 'Others', value: 16, color: '#f1f5f9' },
];

export const riskData: RiskPoint[] = [
  { dimension: 'Vendor Lock-in', zoho: 4, pbi: 9 },
  { dimension: 'Cost Volatility', zoho: 2, pbi: 7 },
  { dimension: 'Complexity', zoho: 5, pbi: 8 },
  { dimension: 'Sovereignty', zoho: 3, pbi: 6 },
  { dimension: 'Technical Debt', zoho: 4, pbi: 6 },
];

export const auditData: AuditDimension[] = [
  { 
    feature: "Data Prep / ETL", 
    zoho: "Self-service DataPrep (High)", 
    pbi: "Power Query (Industry Standard)", 
    winner: "Power BI",
    impact: "Power BI offers deeper enterprise ETL for complex legacy transformations, but Zoho significantly lowers the entry barrier for non-technical business managers to clean data.",
    codeSnippet: { zoho: "Apply 'Auto-Clean' in DataPrep studio", pbi: "Table.TransformColumnTypes(#\"Changed Type\")" } 
  },
  { 
    feature: "Native Connectivity", 
    zoho: "50+ Zoho Apps / 200+ Others", 
    pbi: "Deep O365 / Azure / Dynamics", 
    winner: "Tie",
    impact: "Choosing Zoho secures synergy for current Zoho One users; Power BI is functionally mandated for firms heavily reliant on Dynamics 365 or Azure Data Lake.",
    codeSnippet: { zoho: "Enable 'Zoho Books' Connector", pbi: "Get Data -> Dynamics 365" } 
  },
  { 
    feature: "Natural Language", 
    zoho: "Zia AI (Conversational)", 
    pbi: "Copilot (Generative AI)", 
    winner: "Power BI",
    impact: "Microsoft's LLM investment provides an edge in narrative report generation, while Zia focuses on conversational query accuracy and automated briefings.",
    codeSnippet: { zoho: "Zia, show sales by region", pbi: "Copilot, create a summary sales report" } 
  },
  { 
    feature: "Pricing Model", 
    zoho: "Fixed / Predictable / Flat", 
    pbi: "Variable / Hidden / Complex", 
    winner: "Zoho",
    impact: "Zoho prevents 'Consumption Shock' with a flat $37/user rate. Power BI costs scale exponentially as capacity needs grow across Pro, Premium, and Fabric SKUs.",
    codeSnippet: { zoho: "Zoho One Flat Rate $37/user", pbi: "Pro + Premium Capacity + Fabric Storage" } 
  },
  { 
    feature: "Embedded Analytics", 
    zoho: "Highly customizable JS/API", 
    pbi: "Azure Embedded (Expensive)", 
    winner: "Zoho",
    impact: "Zoho allows for high-margin, white-labeled client portals at a fraction of Microsoft's specialized Azure Embedded pricing and token-based consumption costs.",
    codeSnippet: { zoho: "zoho.embed.render({type: 'report'})", pbi: "PowerBI.embed(element, config)" } 
  },
  { 
    feature: "Data Modeling", 
    zoho: "Cloud Query (SQL-based)", 
    pbi: "DAX (Functional/Expression)", 
    winner: "Power BI",
    impact: "Power BI offers superior calculation depth for financial analysts, but creates 'Knowledge Silos' requiring niche, high-salary DAX specialists to maintain.",
    codeSnippet: { zoho: "SELECT sum(Sales) FROM Orders", pbi: "Total Sales = SUM(Orders[Sales])" } 
  },
  { 
    feature: "Security Sovereignty", 
    zoho: "Independent Global DCs", 
    pbi: "Azure / MS Cloud Dependency", 
    winner: "Zoho",
    impact: "Zoho ensures strict data residency and sovereignty (EU/IN/US) independent of 'Big Tech' ecosystem shifts or Azure Active Directory policy changes.",
    codeSnippet: { zoho: "EU/US/IN DC Sovereignty", pbi: "Shared Azure Active Directory" } 
  },
  { 
    feature: "Ease of Use", 
    zoho: "Low curve for SMB / Business", 
    pbi: "Steep curve (DAX/M / Logic)", 
    winner: "Zoho",
    impact: "Zoho facilitates a true self-service culture for business units; Power BI often recentralizes report creation back into an overworked IT bottleneck.",
    codeSnippet: { zoho: "Drag-and-Drop Report Builder", pbi: "Requires DAX for complex measures" } 
  }
];

export const roadmapPhases: RoadmapPhase[] = [
  { 
    title: "Phase 1: Foundation", 
    period: "Q1-Q2 2025", 
    status: "Active", 
    items: ["Unified Data Sync", "Legacy Migration", "Zia Training"] 
  },
  { 
    title: "Phase 2: AI Optimization", 
    period: "Q3-Q4 2025", 
    status: "Planned", 
    items: ["Predictive Churn", "Auto-Briefings", "Data Blending Pro"] 
  },
  { 
    title: "Phase 3: Leadership", 
    period: "2026", 
    status: "Planned", 
    items: ["Embedded Analytics", "Monetization", "Custom AI Models"] 
  }
];