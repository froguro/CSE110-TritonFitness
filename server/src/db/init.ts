import { Database } from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';


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
      password TEXT,
      google_id TEXT UNIQUE,
      name TEXT,
      picture TEXT
    );
  `);

  
  // Create exercises table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS exercises (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      force TEXT,
      level TEXT,
      mechanic TEXT,
      equipment TEXT,
      primaryMuscles TEXT,
      secondaryMuscles TEXT,
      instructions TEXT,
      category TEXT
    );
  `);

  // Try reading and parsing the exercises.json file
  let exercisesData = [];
  try {
    const rawData = fs.readFileSync('./data/exercises.json', 'utf-8');
    const parsedData = JSON.parse(rawData);
    
    // Check if exercises is an array
    if (Array.isArray(parsedData.exercises)) {
      exercisesData = parsedData.exercises;
    } else {
      throw new Error('exercises.json does not contain an exercises array.');
    }
  } catch (error) {
    console.error('Failed to read or parse exercises.json:', error);
    return;
  }

  // Insert exercises data into the exercises table
  const insertExercise = await db.prepare(`
    INSERT INTO exercises (name, force, level, mechanic, equipment, primaryMuscles, secondaryMuscles, instructions, category)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const exercise of exercisesData) {
    await insertExercise.run(
      exercise.name,
      exercise.force || null,
      exercise.level || null,
      exercise.mechanic || null,
      exercise.equipment || null,
      exercise.primaryMuscles.join(', ') || null,  // Join array into a string
      exercise.secondaryMuscles.join(', ') || null,  // Join array into a string
      exercise.instructions.join(' ') || null,  // Join instructions array into a single string
      exercise.category || null
    );
  }

  console.log('Emotions, users, and exercises tables have been initialized and populated.');
  
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