import { json } from '@sveltejs/kit';
import { analyzeScenario } from '$lib/server/openai'; // OpenAI integration
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse input data
    const { scenario, variables } = await request.json();

    // Call OpenAI function with the unified variables
    const { analysis, confidence } = await analyzeScenario(scenario, variables);

    // Return the simulation result
    return json({
      confidence,
      results: { analysis },
    });
  } catch (error) {
    console.error('Error in simulation:', error);
    return json({ error: 'Simulation failed' }, { status: 500 });
  }
};
