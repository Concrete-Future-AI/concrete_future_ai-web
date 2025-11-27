// Type definitions for the AI Sales & Customer Management System

export interface Opportunity {
  id: string;
  customerName: string;
  customerLogo?: string;
  score: number;
  signals: string[];
  estimatedValue: number;
  contact: string;
  source: string;
  tags: string[];
}

export interface ChurnRisk {
  id: string;
  customerName: string;
  churnScore: number;
  riskLevel: 'high' | 'medium' | 'low';
  riskFactors: string[];
  arr: number;
  lastActive: string;
  owner: string;
  retentionStrategies: RetentionStrategy[];
}

export interface RetentionStrategy {
  name: string;
  successRate: number;
  description: string;
  template?: string;
}

export interface SalesForecast {
  id: string;
  opportunityName: string;
  customer: string;
  owner: string;
  expectedCloseDate: string;
  amount: number;
  aiProbability: number;
  stage: string;
}

export interface Task {
  id: string;
  type: string;
  customer: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

export interface ActivityFeedItem {
  id: string;
  type: 'opportunity' | 'risk' | 'prediction';
  message: string;
  timestamp: string;
  relatedId?: string;
}
