import { db } from '$lib/db';
import { scenariosTable, simulationsTable } from '$lib/db/schema';
import { eq, inArray } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

type ScenarioFromDB = typeof scenariosTable.$inferSelect & {
  simulations: Array<{
    confidence: string;
    created_at: Date;
  }>;
};

export const load: PageServerLoad = async ({ locals }) => {
  const session = locals.session;
  if (!session?.user?.id) {
    return {
      scenarios: [],
      stats: {
        activeScenarios: 0,
        simulationsRun: 0,
        successRate: 0,
        teamMembers: 1
      }
    };
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

  const scenariosWithSimulations = scenarios.map(scenario => {
    const scenarioSimulations = simulations.filter(sim => sim.scenario_id === scenario.id);
    return {
      ...scenario,
      simulations: scenarioSimulations,
      lastRun: scenarioSimulations[0]?.created_at ?? scenario.created_at,
      confidence: scenarioSimulations[0]?.confidence || null,
      status: (scenarioSimulations[0]?.confidence
        ? parseFloat(scenarioSimulations[0].confidence) >= 70 ? 'Completed' : 'In Progress'
        : 'Draft') as 'Completed' | 'In Progress' | 'Draft' | 'Archived'
    };
  });

  // Calculate stats
  const stats = {
    activeScenarios: scenarios.length,
    simulationsRun: simulations.length,
    successRate: calculateSuccessRate(scenariosWithSimulations),
    teamMembers: 1
  };

  return {
    scenarios: scenariosWithSimulations,
    stats
  };
};

function calculateSuccessRate(scenarios: ScenarioFromDB[]): number {
  const scenariosWithSimulations = scenarios.filter(s => s.simulations.length > 0);
  if (scenariosWithSimulations.length === 0) return 0;

  const successfulSimulations = scenariosWithSimulations.filter(
    s => parseFloat(s.simulations[0].confidence) >= 70
  );

  return Math.round((successfulSimulations.length / scenariosWithSimulations.length) * 100);
}