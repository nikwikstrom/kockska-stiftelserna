CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`fingerprint` text NOT NULL,
	`kind` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`state` text NOT NULL,
	`status` text DEFAULT 'received' NOT NULL,
	`created_at` text NOT NULL,
	`lease` text NOT NULL,
	`updated_at` text NOT NULL,
	`privacy_version` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `applications_state_created` ON `applications` (`state`,`created_at`,`id`);--> statement-breakpoint
CREATE TABLE `application_audit` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`actor` text NOT NULL,
	`action` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `application_files` (
	`id` text PRIMARY KEY NOT NULL,
	`application_id` text NOT NULL,
	`filename` text NOT NULL,
	`mime` text NOT NULL,
	`size` integer NOT NULL,
	`sha256` text NOT NULL,
	`role` text NOT NULL,
	`object_key` text NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `files_application` ON `application_files` (`application_id`);--> statement-breakpoint
CREATE TABLE `application_rate_limits` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`expires` integer NOT NULL
);
