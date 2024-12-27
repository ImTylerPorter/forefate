import type { ScenarioVariable, ScenarioFormData } from '$lib/types';

function formatVariable(variable: ScenarioVariable, index: number): string {
  const { name, value } = variable;
  const details = [];

  // Include core fields
  if (value.measure) details.push(`Measure: ${value.measure}`);
  if (value.unit) details.push(`Unit: ${value.unit}`);
  if (value.value) details.push(`Value: ${value.value}`);
  if (value.reason) details.push(`Reason: ${value.reason}`);

  // Include advanced settings
  if (value.condition) details.push(`Condition: ${value.condition}`);
  if (value.threshold) details.push(`Threshold: ${value.threshold}`);
  if (value.explanation) details.push(`Explanation: ${value.explanation}`);

  // Combine and format the variable details
  return `${index + 1}. ${name ? `${name} - ` : ''}${details.join(', ')}`;
}

export function generateScenarioPrompt(
  formData: ScenarioFormData,
  variables: ScenarioVariable[]
): string {
  let prompt = `You are an expert decision consultant. Analyze the following scenario and provide actionable recommendations:\n\n`;

  // Add scenario details
  prompt += `### Scenario Name:\n${formData.name}\n\n`;
  prompt += `### Scenario Type:\n${formData.type}\n\n`;
  prompt += `### Description:\n${formData.description}\n\n`;

  // Add scenario variables
  prompt += `### Scenario Variables:\n`;
  if (variables.length > 0) {
    prompt += variables.map(formatVariable).join('\n') + '\n';
  } else {
    prompt += `No variables provided.\n`;
  }

  // Add goal
  prompt += `### Goal:\nBased on the provided scenario variables, offer insights and recommendations. Highlight opportunities, identify risks, and suggest next steps to achieve the desired outcome.\n`;

  return prompt;
}
