const pool = require("./database");

async function init() {
  try {
    console.log("🔄 Creating tables...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        health_id TEXT PRIMARY KEY,
        name TEXT,
        gender TEXT,
        age INT,
        phone TEXT,
        address TEXT,
        password TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_conditions (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        condition TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS allergies (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        allergy TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS hospitals (
        hospital_id TEXT PRIMARY KEY,
        name TEXT,
        address TEXT,
        password TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS doctor_logins (
        doctor_id TEXT PRIMARY KEY,
        password TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_reports (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        report_name TEXT,
        report_date TEXT,
        hospital_name TEXT,
        doctor_name TEXT,
        status TEXT,
        file_path TEXT
      );
    `);

    console.log("📌 Creating sample data...");

    await pool.query(`
      INSERT INTO patients (health_id, name, gender, age, phone, address, password)
      VALUES ('HV123456789', 'John Doe', 'Male', 34, '9999999999', 'India', '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO')
      ON CONFLICT (health_id) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO hospitals (hospital_id, name, address, password)
      VALUES ('HOSP12345', 'City Hospital', 'Bangalore', '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO')
      ON CONFLICT (hospital_id) DO NOTHING;
    `);

    await pool.query(`
      INSERT INTO doctor_logins (doctor_id, password)
      VALUES ('DOC999', '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO')
      ON CONFLICT (doctor_id) DO NOTHING;
    `);

    console.log("✅ PostgreSQL initialization complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error initializing database:", err);
    process.exit(1);
  }
}

init();
