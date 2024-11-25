import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './db/init';
import bcrypt from 'bcryptjs';

const app = express();
const port = 3001; 

app.use(cors());
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