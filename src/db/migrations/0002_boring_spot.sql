PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_settings` (
	`name` text PRIMARY KEY NOT NULL,
	`value` text
);
--> statement-breakpoint
INSERT INTO `__new_settings`("name", "value") SELECT "name", "value" FROM `settings`;--> statement-breakpoint
DROP TABLE `settings`;--> statement-breakpoint
ALTER TABLE `__new_settings` RENAME TO `settings`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `settings_name_unique` ON `settings` (`name`);