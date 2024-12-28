import type { ScenarioVariable } from '../types';

export const SCENARIO_TYPES = ['Business Strategy', 'Financial Planning', 'Life Decision'] as const;

// Common variable templates
const COMMON_VARIABLES = {
  budget: (defaultValue = ''): ScenarioVariable => ({
    id: crypto.randomUUID(),
    scenario_id: '',
    name: 'Budget',
    type: 'factor',
    value: {
      measure: 'Budget',
      reason: 'Financial resources available',
      value: defaultValue,
      unit: '$'
    },
    created_at: new Date(),
    updated_at: new Date()
  }),
  budgetConstraint: (threshold: string): ScenarioVariable => ({
    id: crypto.randomUUID(),
    scenario_id: '',
    name: 'Budget Constraint',
    type: 'boundary',
    value: {
      measure: 'Budget',
      condition: '≤',
      threshold,
      explanation: `Cannot exceed $${threshold} budget limit`
    },
    created_at: new Date(),
    updated_at: new Date()
  }),
  timeCommitment: (weeks: string): ScenarioVariable => ({
    id: crypto.randomUUID(),
    scenario_id: '',
    name: 'Time Commitment',
    type: 'factor',
    value: {
      measure: 'Time Commitment',
      reason: 'Time allocation needed',
      value: weeks,
      unit: 'weeks'
    },
    created_at: new Date(),
    updated_at: new Date()
  }),
  timeConstraint: (weeks: string): ScenarioVariable => ({
    id: crypto.randomUUID(),
    scenario_id: '',
    name: 'Time Constraint',
    type: 'boundary',
    value: {
      measure: 'Time Commitment',
      condition: '≥',
      threshold: weeks,
      explanation: `Requires at least ${weeks} weeks`
    },
    created_at: new Date(),
    updated_at: new Date()
  })
};

// Scenario-specific templates
export const RECOMMENDED_FIELDS: Record<typeof SCENARIO_TYPES[number], ScenarioVariable[]> = {
  'Business Strategy': [
    COMMON_VARIABLES.budget('10000'),
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Team Size',
      type: 'factor',
      value: {
        measure: 'Team Size',
        reason: 'Required team capacity',
        value: '3',
        unit: 'people'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Market Research',
      type: 'factor',
      value: {
        measure: 'Market Research',
        reason: 'Understanding target market',
        value: '',
        unit: 'months'
      },
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  'Financial Planning': [
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Monthly Income',
      type: 'factor',
      value: {
        measure: 'Monthly Income',
        reason: 'Regular income stream',
        value: '5000',
        unit: '$'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Savings Goal',
      type: 'factor',
      value: {
        measure: 'Savings Target',
        reason: 'Desired savings amount',
        value: '20000',
        unit: '$'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Investment Allocation',
      type: 'factor',
      value: {
        measure: 'Investment Split',
        reason: 'Portfolio diversification',
        value: '60',
        unit: '%'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Emergency Fund',
      type: 'boundary',
      value: {
        measure: 'Emergency Fund',
        condition: '≥',
        threshold: '10000',
        explanation: 'Minimum safety net required'
      },
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  'Life Decision': [
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Emotional Impact',
      type: 'factor',
      value: {
        measure: 'Emotional Readiness',
        reason: 'Mental and emotional preparation',
        value: '7',
        unit: 'scale (1-10)'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: crypto.randomUUID(),
      scenario_id: '',
      name: 'Support System',
      type: 'factor',
      value: {
        measure: 'Support Network',
        reason: 'Available support resources',
        value: '3',
        unit: 'people'
      },
      created_at: new Date(),
      updated_at: new Date()
    },
    COMMON_VARIABLES.timeCommitment('4'),
    COMMON_VARIABLES.budget('3000'),
  ]
} as const;
