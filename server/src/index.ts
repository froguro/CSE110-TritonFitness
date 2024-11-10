import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './db/init';

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

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 