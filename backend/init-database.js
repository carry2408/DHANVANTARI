const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

console.log("🔄 Initializing database...");

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    // Start transaction
    await client.query("BEGIN");

    // TABLE CREATION
    await client.query(`
      CREATE TABLE IF NOT EXISTS patients (
        health_id TEXT PRIMARY KEY,
        name TEXT,
        gender TEXT,
        age INTEGER,
        phone TEXT,
        address TEXT,
        password TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_conditions (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        condition TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS allergies (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        allergy TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS hospitals (
        hospital_id TEXT PRIMARY KEY,
        name TEXT,
        address TEXT,
        password TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS doctor_logins (
        doctor_id TEXT PRIMARY KEY,
        password TEXT
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS medical_reports (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        report_name TEXT,
        doctor_name TEXT,
        hospital_name TEXT,
        date TEXT,
        file_path TEXT
      )
    `);

    console.log("✅ Tables created successfully!");

    // SAMPLE DATA - Insert only if not exists
    await client.query(`
      INSERT INTO patients (health_id, name, gender, age, phone, address, password)
      VALUES ('HV123456789', 'John Doe', 'Male', 34, '9876543210', 'New York', '$2b$10$eJv9lGf8gZq7bN2PwIt8B.z4GJxk4I8BxHh3uQKENqJT9n05Nd3P6')
      ON CONFLICT (health_id) DO NOTHING
    `);

    await client.query(`
      INSERT INTO medical_conditions (health_id, condition)
      VALUES ('HV123456789', 'Hypertension')
    `);

    await client.query(`
      INSERT INTO allergies (health_id, allergy)
      VALUES ('HV123456789', 'Peanuts')
    `);

    await client.query(`
      INSERT INTO hospitals (hospital_id, name, address, password)
      VALUES ('HOSP12345', 'City General Hospital', 'Main Road', '$2b$10$0Uj9PRR7dBEz0FgVtUchOuQjPPAVWl7ASnbM8gbKzFXWWx4IpHq6a')
      ON CONFLICT (hospital_id) DO NOTHING
    `);

    await client.query(`
      INSERT INTO doctor_logins (doctor_id, password)
      VALUES ('DOC999', '$2b$10$Q1yY0xejP2wArMRR8pN0EOf1C.9iUoEMrAwt8pYzW8qgX2HFqRS4C')
      ON CONFLICT (doctor_id) DO NOTHING
    `);

    await client.query(`
      INSERT INTO medical_reports
      (health_id, report_name, doctor_name, hospital_name, date, file_path)
      VALUES 
      ('HV123456789', 'Blood Test', 'Dr. Sarah', 'City Hospital', '2024-01-10', 'sample1.pdf'),
      ('HV123456789', 'X-Ray Chest', 'Dr. John', 'Health Center', '2024-02-14', 'sample2.png')
    `);

    console.log("✅ Sample data inserted!");

    // Commit transaction
    await client.query("COMMIT");
    console.log("🎉 Database initialization complete!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Error initializing database:", err.message);
  } finally {
    client.release();
    await pool.end();
  }
}

initDatabase();
