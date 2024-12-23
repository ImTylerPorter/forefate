// Scenario Type array
export const SCENARIO_TYPES = ['Business Strategy', 'Financial Planning', 'Life Decision'];

// Recommended factors by scenario type
export const RECOMMENDED_FACTORS: Record<
  string,
  Array<{ measure: string; reason: string; value?: string; unit?: string }>
> = {
  'Business Strategy': [
    { measure: 'Budget', reason: 'We have limited funds', value: '', unit: '$' },
    { measure: 'Team Size', reason: 'We need at least 3 specialists', value: '3', unit: 'people' }
  ],
  'Financial Planning': [
    { measure: 'Monthly Income', reason: 'We need stable incoming funds', value: '', unit: '$' },
    {
      measure: 'Savings Goal',
      reason: 'We want to reach a certain amount of savings',
      value: '',
      unit: '$'
    }
  ],
  'Life Decision': [
    {
      measure: 'Time Commitment',
      reason: 'We need at least 2 free weeks',
      value: '2',
      unit: 'weeks'
    },
    {
      measure: 'Emotional Readiness',
      reason: 'We should be sure we have the bandwidth',
      value: '',
      unit: ''
    }
  ]
};

// Recommended boundaries by scenario type
export const RECOMMENDED_BOUNDARIES: Record<
  string,
  Array<{ factorMeasure: string; condition: string; threshold: string; explanation: string }>
> = {
  'Business Strategy': [
    {
      factorMeasure: 'Budget',
      condition: '≤',
      threshold: '10000',
      explanation: 'Cannot exceed investor’s limit'
    },
    {
      factorMeasure: 'Team Size',
      condition: '≥',
      threshold: '3',
      explanation: 'Need at least 3 specialists'
    }
  ],
  'Financial Planning': [
    {
      factorMeasure: 'Monthly Income',
      condition: '≥',
      threshold: '3000',
      explanation: 'We want at least $3000 monthly'
    },
    {
      factorMeasure: 'Savings Goal',
      condition: '≥',
      threshold: '5000',
      explanation: 'We want at least $5000 total savings'
    }
  ],
  'Life Decision': [
    {
      factorMeasure: 'Time Commitment',
      condition: '≥',
      threshold: '2',
      explanation: 'Need at least 2 free weeks'
    },
    {
      factorMeasure: 'Budget',
      condition: '≤',
      threshold: '2000',
      explanation: 'We cannot spend more than $2,000'
    }
  ]
};

// Minimal columns for scenario data
export interface ScenarioFormData {
  name: string;
  type: string;
  description: string;
}

// Single row for scenario_variables
// type='factor' | 'boundary'
export interface ScenarioVariable {
  type: 'factor' | 'boundary';
  data: Record<string, string>;
}
