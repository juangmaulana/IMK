const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
const shouldUseSsl =
  connectionString &&
  !connectionString.includes("localhost") &&
  !connectionString.includes("127.0.0.1") &&
  process.env.PGSSLMODE !== "disable";

let pool;
let schemaReady;

function getPool() {
  if (!connectionString) {
    throw new Error("DATABASE_URL belum diatur. Isi DATABASE_URL dengan koneksi PostgreSQL.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString,
      max: Number(process.env.PG_POOL_MAX || 5),
      ssl: shouldUseSsl ? { rejectUnauthorized: false } : undefined,
    });
  }

  return pool;
}

async function query(text, params = []) {
  await ensureSchema();
  return getPool().query(text, params);
}

async function ensureSchema() {
  if (schemaReady) return schemaReady;

  schemaReady = (async () => {
    const db = getPool();
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_salt TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        points INTEGER NOT NULL DEFAULT 0,
        daily_streak INTEGER NOT NULL DEFAULT 0,
        progress JSONB NOT NULL DEFAULT '{"pinjol":0,"penipuan":0}'::jsonb,
        badges JSONB NOT NULL DEFAULT '[]'::jsonb,
        inventory JSONB NOT NULL DEFAULT '{}'::jsonb,
        last_activity_date DATE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS quiz_attempts (
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        path_id TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('pre', 'final')),
        score INTEGER NOT NULL,
        total INTEGER NOT NULL,
        percentage INTEGER NOT NULL,
        results JSONB NOT NULL DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS module_completions (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        path_id TEXT NOT NULL,
        module_number INTEGER NOT NULL,
        completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        item_id TEXT NOT NULL,
        price INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS point_events (
        id UUID PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        source TEXT NOT NULL,
        metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS users_points_idx ON users(points DESC);
      CREATE INDEX IF NOT EXISTS quiz_attempts_user_id_idx ON quiz_attempts(user_id);
      CREATE INDEX IF NOT EXISTS module_completions_user_id_idx ON module_completions(user_id);
      CREATE INDEX IF NOT EXISTS purchases_user_id_idx ON purchases(user_id);
      CREATE INDEX IF NOT EXISTS point_events_user_id_idx ON point_events(user_id);
      CREATE INDEX IF NOT EXISTS point_events_created_at_idx ON point_events(created_at);
    `);
  })();

  return schemaReady;
}

function rowToUser(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordSalt: row.password_salt,
    passwordHash: row.password_hash,
    points: row.points,
    dailyStreak: row.daily_streak,
    progress: row.progress || {},
    badges: row.badges || [],
    inventory: row.inventory || {},
    lastActivityDate: row.last_activity_date ? new Date(row.last_activity_date).toISOString().slice(0, 10) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function healthCheck() {
  await ensureSchema();
  const result = await getPool().query("SELECT NOW() AS now");
  return result.rows[0];
}

async function findUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return rowToUser(result.rows[0]);
}

async function findUserById(id) {
  const result = await query("SELECT * FROM users WHERE id = $1", [id]);
  return rowToUser(result.rows[0]);
}

async function createUser(user) {
  const result = await query(
    `INSERT INTO users (
      id, name, email, password_salt, password_hash, points, daily_streak,
      progress, badges, inventory, created_at, updated_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10::jsonb, $11, $12)
    RETURNING *`,
    [
      user.id,
      user.name,
      user.email,
      user.passwordSalt,
      user.passwordHash,
      user.points,
      user.dailyStreak,
      JSON.stringify(user.progress || {}),
      JSON.stringify(user.badges || []),
      JSON.stringify(user.inventory || {}),
      user.createdAt,
      user.updatedAt,
    ]
  );

  return rowToUser(result.rows[0]);
}

async function saveUser(user) {
  const result = await query(
    `UPDATE users
      SET name = $2,
          points = $3,
          daily_streak = $4,
          progress = $5::jsonb,
          badges = $6::jsonb,
          inventory = $7::jsonb,
          last_activity_date = $8,
          updated_at = NOW()
      WHERE id = $1
      RETURNING *`,
    [
      user.id,
      user.name,
      Number(user.points || 0),
      Number(user.dailyStreak || 0),
      JSON.stringify(user.progress || {}),
      JSON.stringify(user.badges || []),
      JSON.stringify(user.inventory || {}),
      user.lastActivityDate || null,
    ]
  );

  return rowToUser(result.rows[0]);
}

async function insertQuizAttempt(attempt) {
  await query(
    `INSERT INTO quiz_attempts (
      id, user_id, path_id, type, score, total, percentage, results, created_at
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)`,
    [
      attempt.id,
      attempt.userId,
      attempt.pathId,
      attempt.type,
      attempt.score,
      attempt.total,
      attempt.percentage,
      JSON.stringify(attempt.results || []),
      attempt.createdAt,
    ]
  );
}

async function insertModuleCompletion(completion) {
  await query(
    `INSERT INTO module_completions (
      id, user_id, path_id, module_number, completed_at
    ) VALUES ($1, $2, $3, $4, $5)`,
    [completion.id, completion.userId, completion.pathId, completion.moduleNumber, completion.completedAt]
  );
}

async function insertPurchase(purchase) {
  await query(
    `INSERT INTO purchases (
      id, user_id, item_id, price, created_at
    ) VALUES ($1, $2, $3, $4, $5)`,
    [purchase.id, purchase.userId, purchase.itemId, purchase.price, purchase.createdAt]
  );
}

async function insertPointEvent(event) {
  await query(
    `INSERT INTO point_events (
      id, user_id, amount, source, metadata, created_at
    ) VALUES ($1, $2, $3, $4, $5::jsonb, $6)`,
    [
      event.id,
      event.userId,
      event.amount,
      event.source,
      JSON.stringify(event.metadata || {}),
      event.createdAt,
    ]
  );
}

async function getLeaderboardUsers(period = "allTime") {
  const weekly = period === "weekly";
  const result = await query(
    weekly
      ? `SELECT
          users.id,
          users.name,
          users.daily_streak,
          COALESCE(SUM(point_events.amount) FILTER (WHERE point_events.amount > 0), 0)::int AS points
        FROM users
        LEFT JOIN point_events
          ON point_events.user_id = users.id
          AND point_events.created_at >= NOW() - INTERVAL '7 days'
        GROUP BY users.id, users.name, users.daily_streak, users.updated_at
        ORDER BY points DESC, users.updated_at ASC`
      : `SELECT id, name, points, daily_streak
        FROM users
        ORDER BY points DESC, updated_at ASC`
  );

  return result.rows.map((row) => ({
    userId: row.id,
    name: row.name,
    points: row.points,
    streak: row.daily_streak,
  }));
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getLeaderboardUsers,
  healthCheck,
  insertPointEvent,
  insertModuleCompletion,
  insertPurchase,
  insertQuizAttempt,
  saveUser,
};
