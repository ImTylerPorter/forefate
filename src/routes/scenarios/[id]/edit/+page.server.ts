import { db } from '$lib/db';
import { scenariosTable, scenarioVariablesTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { ScenarioVariable, ScenarioValue } from '$lib/types';

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

    // Fetch and map variables to match ScenarioVariable type
    const dbVariables = await db
        .select()
        .from(scenarioVariablesTable)
        .where(eq(scenarioVariablesTable.scenario_id, id))
        .execute();

    const variables: ScenarioVariable[] = dbVariables.map(v => ({
        id: v.id,
        scenario_id: v.scenario_id,
        name: v.name,
        type: 'factor',
        value: v.value as ScenarioValue,
        created_at: v.created_at,
        updated_at: v.updated_at
    }));

    return { scenario, variables };
}