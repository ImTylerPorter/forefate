import type { Target, Brain, ChartLine, Users2 } from 'lucide-svelte';
export type LucideIcon = typeof Target | typeof Brain | typeof ChartLine | typeof Users2;

export type Stat = {
  name: string;
  value: string;
  icon?: LucideIcon | null;
};

export type Scenario = {
  id: number;
  name: string;
  type: string;
  status: string;
  lastRun: string;
};