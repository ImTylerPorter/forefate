export const SCENARIO_TYPES = ['Business Strategy', 'Financial Planning', 'Life Decision'];
import type { ScenarioVariable } from '../types';
// Recommended fields by scenario type (combining factors and boundaries)
export const RECOMMENDED_FIELDS: Record<
  string,
  ScenarioVariable[]
> = {
  'Business Strategy': [
    {
      id: '1',
      scenario_id: '',
      name: 'Budget',
      type: 'factor',
      value: { measure: 'Budget', reason: 'We have limited funds', value: '', unit: '$' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '2',
      scenario_id: '',
      name: 'Team Size',
      type: 'factor',
      value: { measure: 'Team Size', reason: 'We need at least 3 specialists', value: '3', unit: 'people' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '3',
      scenario_id: '',
      name: 'Budget Constraint',
      type: 'boundary',
      value: { measure: 'Budget', condition: '≤', threshold: '10000', explanation: 'Cannot exceed investor’s limit' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '4',
      scenario_id: '',
      name: 'Team Size Constraint',
      type: 'boundary',
      value: { measure: 'Team Size', condition: '≥', threshold: '3', explanation: 'Need at least 3 specialists' },
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  'Financial Planning': [
    {
      id: '5',
      scenario_id: '',
      name: 'Monthly Income',
      type: 'factor',
      value: { measure: 'Monthly Income', reason: 'We need stable incoming funds', value: '', unit: '$' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '6',
      scenario_id: '',
      name: 'Savings Goal',
      type: 'factor',
      value: { measure: 'Savings Goal', reason: 'We want to reach a certain amount of savings', value: '', unit: '$' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '7',
      scenario_id: '',
      name: 'Income Threshold',
      type: 'boundary',
      value: { measure: 'Monthly Income', condition: '≥', threshold: '3000', explanation: 'We want at least $3000 monthly' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '8',
      scenario_id: '',
      name: 'Savings Threshold',
      type: 'boundary',
      value: { measure: 'Savings Goal', condition: '≥', threshold: '5000', explanation: 'We want at least $5000 total savings' },
      created_at: new Date(),
      updated_at: new Date()
    }
  ],
  'Life Decision': [
    {
      id: '9',
      scenario_id: '',
      name: 'Time Commitment',
      type: 'factor',
      value: { measure: 'Time Commitment', reason: 'We need at least 2 free weeks', value: '2', unit: 'weeks' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '10',
      scenario_id: '',
      name: 'Emotional Readiness',
      type: 'factor',
      value: { measure: 'Emotional Readiness', reason: 'We should be sure we have the bandwidth', value: '', unit: '' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '11',
      scenario_id: '',
      name: 'Time Commitment Threshold',
      type: 'boundary',
      value: { measure: 'Time Commitment', condition: '≥', threshold: '2', explanation: 'Need at least 2 free weeks' },
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '12',
      scenario_id: '',
      name: 'Budget Constraint',
      type: 'boundary',
      value: { measure: 'Budget', condition: '≤', threshold: '2000', explanation: 'We cannot spend more than $2,000' },
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
};
