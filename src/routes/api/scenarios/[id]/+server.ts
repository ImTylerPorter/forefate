import { db } from '$lib/db';
import { scenariosTable, scenarioVariablesTable } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PUT({ request, params }: { request: Request; params: { id: string } }) {
    try {
        const { id } = params;
        const data = await request.json();
        const { formData, variables } = data;
        const { name, type, description } = formData;

        // Update scenario
        await db.update(scenariosTable)
            .set({
                name,
                type,
                description
            })
            .where(eq(scenariosTable.id, id))
            .execute();

        // Update scenario variables
        await db.delete(scenarioVariablesTable)
            .where(eq(scenarioVariablesTable.scenario_id, id))
            .execute();

        if (variables && Array.isArray(variables)) {
            await db.insert(scenarioVariablesTable).values(
                variables.map((variable) => ({
                    scenario_id: id,
                    name: variable.value.measure || variable.value.factorMeasure,
                    type: variable.type,
                    value: variable.value,
                    created_at: new Date(),
                    updated_at: new Date(),
                }))
            );
        }

        return new Response(
            JSON.stringify({ message: 'Scenario updated successfully' }),
            { headers: { 'Content-Type': 'application/json' } }
        );
    } catch (err) {
        console.error('Error updating scenario:', err);
        return new Response(
            JSON.stringify({ error: 'Failed to update scenario' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}