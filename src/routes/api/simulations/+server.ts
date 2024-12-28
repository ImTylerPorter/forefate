import { db } from '$lib/db'; // Database integration
import { json } from '@sveltejs/kit';
import { analyzeScenario } from '$lib/server/openai'; // OpenAI integration
import { simulationsTable } from '$lib/db/schema'; // Import your Drizzle schema
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    // Parse input data
    const { scenario, variables } = await request.json();

    // Call OpenAI function with the unified variables
    const { analysis, confidence } = await analyzeScenario(scenario, variables);

    // Save the simulation to the database
    const simulationData = {
      scenario_id: scenario.id, // Assuming the scenario object contains the ID
      simulation_type: 'OpenAI Analysis', // Specify your simulation type
      parameters: { scenario, variables }, // Save input as JSON
      results: JSON.stringify({ analysis }), // Save analysis results as string
      confidence: confidence.toString(), // Convert confidence to a string
    };

    await db.insert(simulationsTable).values(simulationData);

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
