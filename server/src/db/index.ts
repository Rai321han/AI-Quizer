import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 12,
  min: 4,
  idleTimeoutMillis: 30000,
  keepAlive: true,
});

export default pool;
