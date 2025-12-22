/**
 * @github_comment: "v0.6.8 Type Restoration: Restored full interface definitions. 
 * Centralized all types for SWOT, Market Intelligence, Technical Audit, and 
 * Roadmap. Ensured strict type-safety for Recharts index signatures and 
 * ReactNode icons to satisfy verbatimModuleSyntax."
 */

import type { ReactNode } from 'react';

// Unified Section Identification
export type SectionId = 'swot' | 'market' | 'audit' | 'roadmap';

// Market Intelligence Types
export type MarketShare = {
  name: string;
  value: number;
  color: string;
  // Index signature for Recharts data stability
  [key: string]: string | number; 
};

export interface RiskPoint {
  dimension: string;
  zoho: number;
  pbi: number;
  // Index signature for RadarChart prop satisfaction
  [key: string]: string | number;
}

// SWOT / TOWS Logic Types
export interface TowsLogic {
  quadrant: string;
  title: string;
  context: string;
  action: string;
  colorClass: 'emerald' | 'blue' | 'amber' | 'rose' | string; 
  icon: ReactNode;
  proofPoint: {
    label: string;
    zoho: string;
    pbi: string;
    icon: ReactNode;
  };
}

// Technical Audit Types
export interface AuditDimension {
  feature: string;
  zoho: string;
  pbi: string;
  winner: 'Zoho' | 'Power BI' | 'Tie';
  impact: string; // Business outcome context
  codeSnippet: {
    zoho: string;
    pbi: string;
  };
}

// Strategic Roadmap Types
export interface RoadmapPhase {
  title: string;
  period: string;
  items: string[];
  status: 'Complete' | 'Active' | 'Planned';
}