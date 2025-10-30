import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 12,
  min: 4,
  idleTimeoutMillis: 60000,
  keepAlive: true,
});

export default pool;

export const dbQuery = async (query: string, value: any[]) => {
  const result = await pool.query(query, value);
  return result;
};
