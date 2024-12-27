import OpenAI from 'openai';
import { OPENAI_API_KEY } from '$env/static/private';
import { generateScenarioPrompt } from './openAIPrompt';
import type { ScenarioVariable, ScenarioFormData } from '$lib/types';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
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
        { role: 'system', content: 'You are a highly confident decision-making assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    const analysis = completion.choices[0]?.message?.content?.trim() ?? 'No analysis provided.';

    // Derive confidence (simplified logic here)
    const wordsCount = analysis.split(' ').length;
    const confidence = Math.min(1, wordsCount / 200); // Cap at 100% for analyses with sufficient detail

    return { analysis, confidence: parseFloat((confidence * 100).toFixed(2)) }; // Convert to percentage
  } catch (error) {
    console.error('Error analyzing scenario:', error);
    throw new Error('Failed to analyze scenario.');
  }
}
