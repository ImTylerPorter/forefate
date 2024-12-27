import type { Target, Brain, ChartLine, Users2 } from 'lucide-svelte';
export type LucideIcon = typeof Target | typeof Brain | typeof ChartLine | typeof Users2;

export type Stat = {
  name: string;
  value: string;
  icon?: LucideIcon | null;
};

export type Scenario = {
	id: number;
  user_id: string;
	name: string;
	description?: string;
	type: string;
	status: 'Draft' | 'In Progress' | 'Completed' | 'Archived';
	lastRun: string | null;
	confidence?: number | null;
};


export type RecentScenario = {
	id: number;
	name: string;
	type: string;
	status: string;
	lastRun: string | null;
};

export type Profile = {
  id: string;
  userId: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  displayName: string | null;
  bio: string | null;
  role: string | null;
  profileImage: string | null;
  createdAt: Date | null;
};


export type ScenarioValue ={
  measure?: string;
  reason?: string;
  unit?: string;
  value? : string;
  condition?: string;
  threshold?: string;
  explanation?: string;
};


export type ScenarioVariable = {
  id: string;
  scenario_id: string;
  name: string;
  type: string;
  value: ScenarioValue;
  created_at: Date;
  updated_at: Date;
}

export type SimulationResult = {
  analysis: string;
};

export type Simulation = {
  id: string;
  created_at: Date;
  updated_at: Date;
  scenario_id: string;
  simulation_type: string;
  parameters: unknown; // or a more specific type if known
  results: SimulationResult;
  confidence: string;
};


export type VariableValue = {
	measure?: string;
	factorMeasure?: string;
	unit?: string;
	value?: string;
	reason?: string;
	condition?: string;
	threshold?: string;
	explanation?: string;
};

// Minimal columns for scenario data
export type ScenarioFormData ={
  name: string;
  type: string;
  description: string;
}