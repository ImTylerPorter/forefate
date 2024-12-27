import { db } from '$lib/db';
import { scenariosTable, scenarioVariablesTable } from '$lib/db/schema';
import { error } from '@sveltejs/kit';

export async function POST({ request, locals }: { request: Request; locals: App.Locals }) {
  try {
    const data = await request.json();
    const { formData, variables } = data;
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

    // Insert scenario variables
    if (variables && Array.isArray(variables)) {
      await db.insert(scenarioVariablesTable).values(
        variables.map((variable) => ({
          scenario_id: scenarioId,
          name: variable.data.measure || variable.data.factorMeasure, // Use measure or factorMeasure as name
          type: variable.type,
          value: variable.data, // Store the entire data object
          created_at: new Date(),
          updated_at: new Date(),
        }))
      );
    }

    // Respond with success
    return new Response(
      JSON.stringify({
        newScenario: newScenario[0],
        message: 'Scenario and variables added successfully'
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
