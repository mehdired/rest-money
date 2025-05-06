CREATE TABLE `settings` (
	`tva` integer,
	`urssaf` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `income_id_unique` ON `income` (`id`);