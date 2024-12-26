DROP INDEX "scenarios_user_id_idx";--> statement-breakpoint
CREATE UNIQUE INDEX "scenarios_user_id_name_idx" ON "scenarios" USING btree ("user_id","name");