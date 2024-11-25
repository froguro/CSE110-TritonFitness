import { Database } from 'sqlite3';
import { open } from 'sqlite';

export async function initializeDatabase() {
  const db = await open({
    filename: './database.db',
    driver: Database
  });

  // Create emotions table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS emotions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    );

    -- Insert some default emotions if table is empty
    INSERT OR IGNORE INTO emotions (name, description) VALUES 
      ('Happy', 'Feeling of joy and contentment'),
      ('Sad', 'Feeling of sorrow or unhappiness'),
      ('Angry', 'Feeling of strong displeasure or hostility'),
      ('Anxious', 'Feeling of worry or unease'),
      ('Excited', 'Feeling of great enthusiasm and eagerness'),
      ('Tired', 'Feeling of physical or mental fatigue');
  `);
  
  // create user login table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS metrics (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT NOT NULL,
        weight REAL NOT NULL,
        shoulders REAL,
        chest REAL,
        waist REAL,
        glutes REAL,
        rightThigh REAL,
        leftThigh REAL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Metrics table created successfully.');
  } catch (error) {
    console.error('Error creating metrics table:');
  }


  return db;

} 