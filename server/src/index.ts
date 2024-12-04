import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './db/init';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize database connection
let db: any;
(async () => {
  try {
    db = await initializeDatabase();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
})();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Get all emotions
app.get('/api/emotions', async (req, res) => {
  try {
    const emotions = await db.all('SELECT * FROM emotions');
    res.json(emotions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch emotions' });
  }
});

// User registration route
app.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;

  try {
    // Check if user already exists
    const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await db.run(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, hashedPassword, name || email.split('@')[0]]
    );

    res.status(201).json({
      message: 'User registered successfully',
      userId: result.lastID
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      error: 'Failed to register user',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // First check if user exists
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // If user exists but has no password (Google user), reject password login
    if (!user.password) {
      return res.status(401).json({ error: 'Please use Google login for this account' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Return user data
    res.json({
      userId: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'An error occurred during login',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Add Google login route with better error handling
app.post('/api/google-login', async (req, res) => {
  const { email, googleId, name, picture } = req.body;

  try {
    // Check if user exists
    let user = await db.get('SELECT * FROM users WHERE google_id = ?', [googleId]);

    if (!user) {
      // Create new user if doesn't exist
      const result = await db.run(
        'INSERT INTO users (email, google_id, name, picture) VALUES (?, ?, ?, ?)',
        [email, googleId, name, picture]
      );
      
      user = {
        id: result.lastID,
        email,
        google_id: googleId,
        name,
        picture
      };
    } else {
      // Update the user's picture if it has changed
      await db.run(
        'UPDATE users SET picture = ? WHERE google_id = ?',
        [picture, googleId]
      );
      user.picture = picture;
    }

    res.json({ 
      message: 'Login successful',
      userId: user.id,
      picture: user.picture
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ 
      error: 'An error occurred during Google login',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.post('/api/recommend-exercises', async (req, res) => {
  const { level, muscleGroup, exerciseType, equipment } = req.body;

  try {
    const query = `
      SELECT DISTINCT name, primaryMuscles, secondaryMuscles, level, category, equipment, instructions
      FROM (
        SELECT *,
          (CASE WHEN primaryMuscles LIKE ? THEN 3 ELSE 0 END) + 
          (CASE WHEN level = ? THEN 2 ELSE 0 END) +
          (CASE WHEN category = ? THEN 1 ELSE 0 END) AS score
        FROM exercises
        WHERE primaryMuscles LIKE ?
          AND equipment = ?
        ORDER BY score DESC
        LIMIT 10
      ) AS filtered
      LIMIT 3;
    `;

    const params = [
      `%${muscleGroup}%`, // Scoring for primaryMuscles
      level,             // Scoring for level
      exerciseType,      // Scoring for category
      `%${muscleGroup}%`, // Filtering for primaryMuscles
      equipment          // Filtering for equipment
    ];

    const exercises = await db.all(query, params);

    if (exercises.length === 0) {
      return res.status(200).json({ exercises: [], message: 'No matching exercises found for the desired criteria.' });
    }

    res.json({ exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});

app.post('/metrics', async (req, res) => {
  console.log('Received data:', req.body); // Log incoming data

  const { userId, weight, shoulders, chest, waist, glutes, rightThigh, leftThigh } = req.body;

  try {
    const result = await db.run(
      `INSERT INTO metrics (userId, weight, shoulders, chest, waist, glutes, rightThigh, leftThigh)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, weight, shoulders, chest, waist, glutes, rightThigh, leftThigh]
    );
    res.status(201).json({ id: result.lastID, message: 'Metrics saved successfully' });
  } catch (err) {
    console.error('Database error:', err); // Log SQL error
    res.status(500).json({ error: 'Failed to save metrics' });
  }
});


app.get('/metrics', async (req, res) => {
  try {
    const metrics = await db.all(`SELECT * FROM metrics`);
    res.status(204).json(metrics);
  } catch (err) {
    res.status(500).json({ error: "Failed to Track Metrics" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 