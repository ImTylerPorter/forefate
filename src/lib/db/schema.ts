// src/lib/db/schema.ts

import {
  pgEnum,
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  jsonb,
  uniqueIndex,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// 1. Define the 'auth' schema
const auth = pgSchema('auth');

// 2. Define the `auth.users` table
export const authUsers = auth.table('users', {
  id: uuid('id').primaryKey(),
  // Add other fields from `auth.users` if necessary
});

// 3. Define Enums
export const userRoleEnum = pgEnum('user_role', ['admin', 'normal']);

// 4. Define Application Tables

// Profiles Table
export const profileTable = pgTable(
  'profiles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id').notNull(),
    firstName: varchar('first_name'),
    lastName: varchar('last_name'),
    email: varchar('email'),
    displayName: varchar('display_name'),
    bio: varchar('bio'),
    role: userRoleEnum('role').default('normal'),
    profileImage: varchar('profile_image'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('profiles_user_id_idx').on(table.userId),
    index('profiles_email_idx').on(table.email),
  ]
);

// Scenarios Table
export const scenariosTable = pgTable(
  'scenarios',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    type: varchar('type', { length: 50 }).notNull(), // e.g., Career Move, Personal Decision, Gaming Strategy
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('scenarios_user_id_idx').on(table.user_id),
    index('scenarios_name_idx').on(table.name),
  ]
);

// Scenario Variables Table
export const scenarioVariablesTable = pgTable(
  'scenario_variables',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    scenario_id: uuid('scenario_id')
      .notNull()
      .references(() => scenariosTable.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    type: varchar('type', { length: 50 }).notNull(), // e.g., number, string, boolean
    value: jsonb('value').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('scenario_variables_scenario_id_idx').on(table.scenario_id),
    index('scenario_variables_name_idx').on(table.name),
  ]
);

// Simulations Table
export const simulationsTable = pgTable(
  'simulations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    scenario_id: uuid('scenario_id')
      .notNull()
      .references(() => scenariosTable.id, { onDelete: 'cascade' }),
    simulation_type: varchar('simulation_type', { length: 50 }).notNull(), // Monte Carlo, Decision Trees, Neural Networks
    parameters: jsonb('parameters').notNull(),
    results: jsonb('results').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('simulations_scenario_id_idx').on(table.scenario_id),
    index('simulations_type_idx').on(table.simulation_type),
  ]
);

// Risk Profiles Table
export const riskProfilesTable = pgTable(
  'risk_profiles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    name: varchar('name', { length: 255 }).notNull(),
    risk_tolerance: varchar('risk_tolerance', { length: 50 }).notNull(), // e.g., low, medium, high
    settings: jsonb('settings').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('risk_profiles_user_id_idx').on(table.user_id),
    index('risk_profiles_name_idx').on(table.name),
  ]
);

// Historical Data Table
export const historicalDataTable = pgTable(
  'historical_data',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    data_type: varchar('data_type', { length: 100 }).notNull(),
    data: jsonb('data').notNull(),
    imported_at: timestamp('imported_at').defaultNow().notNull(),
  },
  (table) => [
    index('historical_data_user_id_idx').on(table.user_id),
    index('historical_data_type_idx').on(table.data_type),
  ]
);

// Collaborations Table
export const collaborationsTable = pgTable(
  'collaborations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    scenario_id: uuid('scenario_id')
      .notNull()
      .references(() => scenariosTable.id, { onDelete: 'cascade' }),
    user_id: uuid('user_id')
      .notNull()
      .references(() => authUsers.id, { onDelete: 'cascade' }),
    role: varchar('role', { length: 50 }).notNull(), // e.g., editor, viewer
    created_at: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('collaborations_scenario_id_idx').on(table.scenario_id),
    index('collaborations_user_id_idx').on(table.user_id),
    index('collaborations_role_idx').on(table.role),
  ]
);

// Reports Table
export const reportsTable = pgTable(
  'reports',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    simulation_id: uuid('simulation_id')
      .notNull()
      .references(() => simulationsTable.id, { onDelete: 'cascade' }),
    report_data: jsonb('report_data').notNull(), // Can be JSON or a text field if using markdown or HTML
    exported_at: timestamp('exported_at').defaultNow().notNull(),
  },
  (table) => [
    index('reports_simulation_id_idx').on(table.simulation_id),
  ]
);

// 5. Define Relations

// Relations for `scenariosTable`
relations(scenariosTable, (r) => ({
  variables: r.many(scenarioVariablesTable),
  simulations: r.many(simulationsTable),
  collaborations: r.many(collaborationsTable),
}));

// Relations for `scenarioVariablesTable`
relations(scenarioVariablesTable, (r) => ({
  scenario: r.one(scenariosTable),
}));

// Relations for `simulationsTable`
relations(simulationsTable, (r) => ({
  scenario: r.one(scenariosTable),
  reports: r.many(reportsTable),
}));

// Relations for `riskProfilesTable`
relations(riskProfilesTable, (r) => ({
  user: r.one(authUsers),
}));

// Relations for `historicalDataTable`
relations(historicalDataTable, (r) => ({
  user: r.one(authUsers),
}));

// Relations for `collaborationsTable`
relations(collaborationsTable, (r) => ({
  scenario: r.one(scenariosTable),
  user: r.one(authUsers),
}));

// Relations for `reportsTable`
relations(reportsTable, (r) => ({
  simulation: r.one(simulationsTable),
}));
