CREATE TABLE `income` (
	`id` text PRIMARY KEY NOT NULL,
	`from` text NOT NULL,
	`date` integer NOT NULL,
	`amount` real NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `income_id_unique` ON `income` (`id`);--> statement-breakpoint
CREATE TABLE `settings` (
	`name` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `settings_name_unique` ON `settings` (`name`);