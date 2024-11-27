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
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if ((error as any).code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: 'User already exists' });
    } else {
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    // Respond with success and the user's ID
    res.json({ 
      message: 'Login successful', 
      userId: user.id // Can be stored into front-end
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// Add Google login route with better error handling
app.post('/api/google-login', async (req, res) => {
  const { email, googleId, name, picture } = req.body;

  try {
    console.log('Received Google login request:', { email, googleId, name }); // Debug log

    // Check if user exists
    let user = await db.get('SELECT * FROM users WHERE google_id = ?', [googleId]);

    if (!user) {
      console.log('Creating new user with Google credentials'); // Debug log
      
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
      console.log('New user created:', user); // Debug log
    } else {
      console.log('Existing user found:', user); // Debug log
    }

    res.json({ 
      message: 'Login successful', 
      userId: user.id 
    });
  } catch (error) {
    console.error('Google login error:', error); // Debug log
    res.status(500).json({ 
      error: 'An error occurred during Google login',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.post('/api/recommend-exercises', async (req, res) => {
  const { level, muscleGroup, exerciseType, equipment } = req.body;

  try {
    // Build the query with scoring, selecting 3 random exercises from top 10 queried 
    let query = `
      SELECT * FROM (
        SELECT *,
          (CASE WHEN primaryMuscles LIKE ? THEN 3 ELSE 0 END) + 
          (CASE WHEN level = ? THEN 2 ELSE 0 END) +
          (CASE WHEN category = ? THEN 1 ELSE 0 END) AS score
        FROM exercises
        WHERE equipment = ?
        ORDER BY score DESC
        LIMIT 10
      ) AS filtered
      ORDER BY RANDOM()
      LIMIT 3;
    `;

    const params = [`%${muscleGroup}%`, level, exerciseType, equipment];
    const exercises = await db.all(query, params);

    res.json({ exercises });
  } catch (error) {
    console.error('Error fetching exercises:', error);
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 