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
  pgm.sql(
    `CREATE TYPE quiz_status AS ENUM ('draft', 'scheduled', 'ongoing', 'completed');`
  );
  pgm.sql(
    `   CREATE TABLE quizes (
            quiz_id UUID PRIMARY KEY,
            created_by TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
            scheduled_at TIMESTAMPTZ,
            no_of_questions INT NOT NULL,
            duration INT,
            status quiz_status DEFAULT 'draft',
            title VARCHAR(255) NOT NULL,
            total_marks INT,
            meta JSONB,
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        `
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql(`DROP TABLE quzies;
    DROP TYPE quiz_status;`);
};
