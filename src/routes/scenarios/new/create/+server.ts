// src/routes/api/scenarios/+server.ts
import { db } from '$lib/db';
import { scenariosTable, scenarioVariablesTable } from '$lib/db/schema';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }: { request: Request; locals: App.Locals }) {
  try {
    const data = await request.json();
    const { formData, factors, boundaries } = data;
    const { name, type, description } = formData;

    // Ensure user authentication
    if (!locals.user?.id) {
      throw error(401, 'User not authenticated');
    }

    // Insert new scenario
    const newScenario = await db.insert(scenariosTable).values({
      name,
      type,
      description,
      user_id: locals.user.id
    }).returning({
      id: scenariosTable.id
    });

    const scenarioId = newScenario[0]?.id;

    if (!scenarioId) {
      throw error(500, 'Failed to create a new scenario');
    }

    // Insert factors
    if (factors && Array.isArray(factors)) {
      await db.insert(scenarioVariablesTable).values(
        factors.map((factor) => ({
          scenario_id: scenarioId,
          name: factor.data.measure,
          type: factor.type,
          value: factor.data.value !== undefined ? factor.data.value : '',
          created_at: new Date(),
          updated_at: new Date(),
        }))
      );
    }

    // Insert boundaries
    if (boundaries && Array.isArray(boundaries)) {
      await db.insert(scenarioVariablesTable).values(
        boundaries.map((boundary) => ({
          scenario_id: scenarioId,
          name: boundary.data.factorMeasure,
          type: boundary.type,
          value: boundary.data.threshold !== undefined ? boundary.data.threshold : '',
          created_at: new Date(),
          updated_at: new Date(),
        }))
      );
    }

    // Respond with success
    return new Response(
      JSON.stringify({
        newScenario: newScenario[0],
        message: 'Scenario, factors, and boundaries added successfully'
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err) {
    console.error('Error creating scenario:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to create scenario' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
