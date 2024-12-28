import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { generateScenarioPrompt } from './openAIPrompt';
import type { ScenarioVariable, ScenarioFormData } from '$lib/types';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export async function analyzeScenario(
  formData: ScenarioFormData,
  variables: ScenarioVariable[]
): Promise<{ analysis: string; confidence: number }> {
  try {
    const prompt = generateScenarioPrompt(formData, variables);

    const completion = await openai.chat.completions.create({
      model: 'grok-beta',
      messages: [
        {
          role: 'system',
          content: `You are a highly confident decision-making assistant. After analyzing a scenario, provide your analysis followed by a confidence score on a new line starting with "CONFIDENCE_SCORE:". Base this score (0-100) on:
          - Completeness of input data (are all necessary variables present?)
          - Quality of data (are the values reasonable and well-justified?)
          - Complexity of the scenario (simpler scenarios = higher confidence)
          - Presence of clear constraints and boundaries
          Example: "Here's my analysis... CONFIDENCE_SCORE: 85"`
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content?.trim() ?? 'No analysis provided.';

    // Extract confidence score and analysis
    const confidenceMatch = response.match(/CONFIDENCE_SCORE:\s*(\d+)/);
    const confidence = confidenceMatch ? Math.min(100, Math.max(0, parseInt(confidenceMatch[1]))) : 70;
    const analysis = response.replace(/CONFIDENCE_SCORE:\s*\d+/, '').trim();

    return { analysis, confidence };
  } catch (error) {
    console.error('Error analyzing scenario:', error);
    throw new Error('Failed to analyze scenario.');
  }
}
