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
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'attempt_status_type') THEN
        CREATE TYPE attempt_status_type AS ENUM ('submitted', 'started');
      END IF;
    END $$;

    ALTER TABLE attempts
    ADD COLUMN attempt_status attempt_status_type NOT NULL DEFAULT 'started';
  `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`
    ALTER TABLE attempts DROP COLUMN IF EXISTS attempt_status;
    DROP TYPE IF EXISTS attempt_status_type;
        `);
};
