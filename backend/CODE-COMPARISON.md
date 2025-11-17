# SQLite to PostgreSQL Migration - Code Comparison

## Database Connection

### Before (SQLite)
```javascript
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, process.env.DATABASE_PATH);
const db = new Database(dbPath, { verbose: console.log });

module.exports = db;
```

### After (PostgreSQL)
```javascript
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

module.exports = pool;
```

## Table Creation

### Before (SQLite)
```javascript
db.prepare(`
  CREATE TABLE IF NOT EXISTS patients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`).run();
```

### After (PostgreSQL)
```javascript
await client.query(`
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    name TEXT
  )
`);
```

## INSERT Operations

### Before (SQLite)
```javascript
db.prepare(`
  INSERT OR IGNORE INTO patients (health_id, name)
  VALUES ('HV123', 'John')
`).run();
```

### After (PostgreSQL)
```javascript
await client.query(`
  INSERT INTO patients (health_id, name)
  VALUES ('HV123', 'John')
  ON CONFLICT (health_id) DO NOTHING
`);
```

## SELECT Single Row

### Before (SQLite)
```javascript
const stmt = db.prepare("SELECT * FROM patients WHERE health_id = ?");
const user = stmt.get(healthId);

if (!user) {
  return res.status(404).json({ error: "Not found" });
}
```

### After (PostgreSQL)
```javascript
const result = await pool.query(
  "SELECT * FROM patients WHERE health_id = $1",
  [healthId]
);

if (result.rows.length === 0) {
  return res.status(404).json({ error: "Not found" });
}

const user = result.rows[0];
```

## SELECT Multiple Rows

### Before (SQLite)
```javascript
const stmt = db.prepare("SELECT * FROM patients WHERE age > ?");
const rows = stmt.all(30);
```

### After (PostgreSQL)
```javascript
const result = await pool.query(
  "SELECT * FROM patients WHERE age > $1",
  [30]
);
const rows = result.rows;
```

## UPDATE Operations

### Before (SQLite)
```javascript
const stmt = db.prepare("UPDATE patients SET name = ? WHERE health_id = ?");
const result = stmt.run(name, healthId);

if (result.changes === 0) {
  return res.status(404).json({ error: "Not found" });
}
```

### After (PostgreSQL)
```javascript
const result = await pool.query(
  "UPDATE patients SET name = $1 WHERE health_id = $2",
  [name, healthId]
);

if (result.rowCount === 0) {
  return res.status(404).json({ error: "Not found" });
}
```

## DELETE Operations

### Before (SQLite)
```javascript
const stmt = db.prepare("DELETE FROM patients WHERE id = ?");
const result = stmt.run(id);

if (result.changes === 0) {
  return res.status(404).json({ error: "Not found" });
}
```

### After (PostgreSQL)
```javascript
const result = await pool.query(
  "DELETE FROM patients WHERE id = $1",
  [id]
);

if (result.rowCount === 0) {
  return res.status(404).json({ error: "Not found" });
}
```

## INSERT with RETURNING ID

### Before (SQLite)
```javascript
const stmt = db.prepare(
  "INSERT INTO reports (name, date) VALUES (?, ?)"
);
const result = stmt.run(name, date);

const newId = result.lastInsertRowid;
```

### After (PostgreSQL)
```javascript
const result = await pool.query(
  "INSERT INTO reports (name, date) VALUES ($1, $2) RETURNING id",
  [name, date]
);

const newId = result.rows[0].id;
```

## Password Comparison

### Before (SQLite - Synchronous)
```javascript
const valid = bcrypt.compareSync(password, user.password);
if (!valid) {
  return res.status(401).json({ error: "Invalid password" });
}
```

### After (PostgreSQL - Asynchronous)
```javascript
const valid = await bcrypt.compare(password, user.password);
if (!valid) {
  return res.status(401).json({ error: "Invalid password" });
}
```

## Transaction Support

### Before (SQLite)
```javascript
try {
  db.prepare("INSERT INTO ...").run(...);
  db.prepare("UPDATE ...").run(...);
} catch (err) {
  // No automatic rollback
}
```

### After (PostgreSQL)
```javascript
const client = await pool.connect();
try {
  await client.query("BEGIN");
  await client.query("INSERT INTO ...", [...]);
  await client.query("UPDATE ...", [...]);
  await client.query("COMMIT");
} catch (err) {
  await client.query("ROLLBACK");
  throw err;
} finally {
  client.release();
}
```

## Key Differences Summary

| Feature | SQLite (before) | PostgreSQL (after) |
|---------|----------------|-------------------|
| **Package** | better-sqlite3 | pg |
| **Connection** | File-based | Client-server |
| **Sync/Async** | Synchronous | Asynchronous (async/await) |
| **Placeholders** | `?` | `$1, $2, $3` |
| **Auto-increment** | `AUTOINCREMENT` | `SERIAL` |
| **Get single row** | `stmt.get()` | `result.rows[0]` |
| **Get multiple rows** | `stmt.all()` | `result.rows` |
| **Check affected rows** | `result.changes` | `result.rowCount` |
| **Last insert ID** | `result.lastInsertRowid` | `RETURNING id` |
| **Upsert** | `INSERT OR IGNORE` | `ON CONFLICT DO NOTHING` |
| **Transactions** | Limited | Full ACID support |
| **bcrypt** | `compareSync()` | `compare()` (async) |

## Environment Variables

### Before
```env
DATABASE_PATH=./database/healthvault.db
```

### After
```env
DATABASE_URL=postgresql://user:pass@host:5432/database
```

## Error Handling

### Before (SQLite)
```javascript
router.get("/patients/:id", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM patients WHERE id = ?");
    const patient = stmt.get(req.params.id);
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

### After (PostgreSQL)
```javascript
router.get("/patients/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM patients WHERE id = $1",
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

## Benefits of Migration

1. **Production Ready**: PostgreSQL is designed for production workloads
2. **Cloud Deployable**: Easy to deploy on Render, Heroku, Railway, etc.
3. **Concurrent Connections**: Handles multiple users simultaneously
4. **ACID Transactions**: Full transaction support with rollback
5. **Scalability**: Can scale to terabytes of data
6. **Rich Features**: JSON support, full-text search, advanced queries
7. **Free Hosting**: Available on many free cloud platforms
8. **Industry Standard**: Used by companies worldwide

## Migration Effort

- **Time Required**: ~30 minutes
- **Lines Changed**: ~200 lines across 8 files
- **Breaking Changes**: None for API consumers
- **Frontend Impact**: Only API URL needs updating
- **Data Migration**: Automatic via init-database.js

## Compatibility

The migration maintains 100% API compatibility:
- ✅ All endpoints work the same
- ✅ Request/response format unchanged
- ✅ Authentication flow identical
- ✅ File uploads work the same
- ✅ Frontend requires no changes (except API URL)

Ready to deploy! 🚀
