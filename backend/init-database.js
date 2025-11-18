const pool = require("./database");

async function init() {
  try {
    console.log("🔄 Creating tables...");

    /* ----------------------- PATIENTS TABLE ----------------------- */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS patients (
        health_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        gender TEXT,
        age INT,
        phone TEXT,
        email TEXT UNIQUE,
        address TEXT,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    /* ---------------- MEDICAL CONDITIONS TABLE -------------------- */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_conditions (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        condition TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    /* ----------------------- ALLERGIES TABLE ---------------------- */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS allergies (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        allergy TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    /* ----------------------- HOSPITALS TABLE ---------------------- */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hospitals (
        hospital_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        phone TEXT,
        email TEXT UNIQUE,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    /* ------------------- DOCTOR LOGINS TABLE ---------------------- */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS doctor_logins (
        doctor_id TEXT PRIMARY KEY,
        password TEXT NOT NULL
      );
    `);

    // Add missing doctor columns safely
    await pool.query(`ALTER TABLE doctor_logins ADD COLUMN IF NOT EXISTS name TEXT;`);
    await pool.query(`ALTER TABLE doctor_logins ADD COLUMN IF NOT EXISTS speciality TEXT;`);
    await pool.query(`ALTER TABLE doctor_logins ADD COLUMN IF NOT EXISTS hospital_id TEXT;`);
    await pool.query(`ALTER TABLE doctor_logins ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();`);
    await pool.query(`ALTER TABLE doctor_logins ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT NOW();`);

    /* ---------------------- MEDICAL REPORTS ------------------------ */
    await pool.query(`
      CREATE TABLE IF NOT EXISTS medical_reports (
        id SERIAL PRIMARY KEY,
        health_id TEXT,
        report_name TEXT,
        report_date TEXT,
        hospital_name TEXT,
        doctor_name TEXT,
        status TEXT,
        file_path TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("📌 Inserting sample (demo) data...");

    /* ----------------------- SAMPLE PATIENT ------------------------ */
    await pool.query(`
      INSERT INTO patients (health_id, name, gender, age, phone, address, password)
      VALUES (
        'HV123456789',
        'John Doe',
        'Male',
        34,
        '9999999999',
        'India',
        '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO'
      )
      ON CONFLICT (health_id) DO NOTHING;
    `);

    /* ----------------------- SAMPLE HOSPITAL ----------------------- */
    await pool.query(`
      INSERT INTO hospitals (hospital_id, name, address, password)
      VALUES (
        'HOSP12345',
        'City Hospital',
        'Bangalore',
        '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO'
      )
      ON CONFLICT (hospital_id) DO NOTHING;
    `);

    /* ----------------------- SAMPLE DOCTOR ------------------------- */
    await pool.query(`
      INSERT INTO doctor_logins (doctor_id, password)
      VALUES (
        'DOC999',
        '$2b$10$A9I6MoZ7M1QkQ0bHoQ.3BuH0vuVEspe6Kcdxk11lHxaHQkEKfQhHO'
      )
      ON CONFLICT (doctor_id) DO NOTHING;
    `);

    // Add doctor details
    await pool.query(`
      UPDATE doctor_logins
      SET name = 'Dr. Smith',
          speciality = 'General Medicine'
      WHERE doctor_id = 'DOC999';
    `);

    console.log("✅ PostgreSQL initialization complete!");
    process.exit(0);

  } catch (err) {
    console.error("❌ Error initializing database:", err);
    process.exit(1);
  }
}

module.exports = init;
