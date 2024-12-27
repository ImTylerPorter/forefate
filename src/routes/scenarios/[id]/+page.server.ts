import { db } from '$lib/db';
import { scenariosTable, scenarioVariablesTable, simulationsTable } from '$lib/db/schema';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import type { SimulationResult } from '$lib/types';

export async function load({ params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    throw error(400, 'Scenario ID is required.');
  }

  // Fetch the scenario
  const [scenario] = await db
    .select()
    .from(scenariosTable)
    .where(eq(scenariosTable.id, id))
    .limit(1)
    .execute();
  if (!scenario) {
    throw error(404, `Scenario with ID ${id} not found.`);
  }

  // Fetch associated variables (factors and boundaries)
  const variables = await db
    .select()
    .from(scenarioVariablesTable)
    .where(eq(scenarioVariablesTable.scenario_id, id));


    // Fetch simulations for this scenario
  const simulations = await db
  .select()
  .from(simulationsTable)
  .where(eq(simulationsTable.scenario_id, id))
  .execute();

  const typedSimulations = simulations.map((sim) => ({
    ...sim,
    results: sim.results as SimulationResult,
  }));


  return { scenario, variables, simulations: typedSimulations };
}
