import { db } from '$lib/db';
import { scenariosTable, simulationsTable } from '$lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session;
  if (!session?.user?.id) {
    return { scenarios: [] };
  }

  // Get all scenarios for the user
  const scenarios = await db.select().from(scenariosTable)
    .where(eq(scenariosTable.user_id, session.user.id))
    .orderBy(scenariosTable.updated_at);

  // Get latest simulation for each scenario
  const simulations = await db.select({
    scenario_id: simulationsTable.scenario_id,
    confidence: simulationsTable.confidence,
    created_at: simulationsTable.created_at
  })
  .from(simulationsTable)
  .where(
    inArray(
      simulationsTable.scenario_id,
      scenarios.map(s => s.id)
    )
  )
  .orderBy(simulationsTable.created_at);

  return {
    scenarios: scenarios.map(scenario => {
      const scenarioSimulations = simulations.filter(sim => sim.scenario_id === scenario.id);
      return {
        ...scenario,
        lastRun: scenarioSimulations[0]?.created_at ?? scenario.created_at,
        confidence: scenarioSimulations[0]?.confidence || null,
        status: (scenarioSimulations[0]?.confidence
          ? parseFloat(scenarioSimulations[0].confidence) >= 70 ? 'Completed' : 'In Progress'
          : 'Draft') as 'Completed' | 'In Progress' | 'Draft' | 'Archived'
      };
    })
  };
};