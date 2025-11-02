/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.sql(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'quiz_privacy') THEN
        CREATE TYPE quiz_privacy AS ENUM ('public', 'private');
      END IF;
    END $$;

    ALTER TABLE quizes
    ADD COLUMN privacy quiz_privacy NOT NULL DEFAULT 'public';
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE quizes DROP COLUMN IF EXISTS privacy;
    DROP TYPE IF EXISTS quiz_privacy;
  `);
};
