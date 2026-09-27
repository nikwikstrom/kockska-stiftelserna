import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const applications = sqliteTable('applications', {
  id: text('id').primaryKey(), fingerprint: text('fingerprint').notNull(),
  kind: text('kind').notNull(), name: text('name').notNull(), email: text('email').notNull(), phone: text('phone').notNull(),
  state: text('state').notNull(), status: text('status').notNull().default('received'),
  createdAt: text('created_at').notNull(), lease: text('lease').notNull(), updatedAt: text('updated_at').notNull(),
  privacyVersion: text('privacy_version').notNull(),
}, t => [index('applications_state_created').on(t.state, t.createdAt, t.id)]);
export const files = sqliteTable('application_files', {
  id: text('id').primaryKey(), applicationId: text('application_id').notNull().references(() => applications.id, { onDelete: 'cascade' }),
  filename: text('filename').notNull(), mime: text('mime').notNull(), size: integer('size').notNull(),
  sha256: text('sha256').notNull(), role: text('role').notNull(), objectKey: text('object_key').notNull(),
}, t => [index('files_application').on(t.applicationId)]);
export const audit = sqliteTable('application_audit', {
  id: text('id').primaryKey(), applicationId: text('application_id').notNull(), actor: text('actor').notNull(),
  action: text('action').notNull(), createdAt: text('created_at').notNull(),
});
export const rateLimits = sqliteTable('application_rate_limits', {
  key: text('key').primaryKey(), count: integer('count').notNull(), expires: integer('expires').notNull(),
});
