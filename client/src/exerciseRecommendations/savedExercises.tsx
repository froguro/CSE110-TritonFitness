import React, { useEffect, useState } from 'react';
import './savedExercises.css'; // Add CSS for styling
import { User } from '../types/user';

interface SavedExercisesProps {
  user: User | null;
}

const SavedExercises: React.FC<SavedExercisesProps> = ({ user }) => {
  const [savedExercises, setSavedExercises] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedExercises = async () => {
      if (!user) {
        setError('You must be logged in to view saved exercises.');
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/api/saved-exercises/${user.id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch saved exercises.');
        }

        const data = await response.json();
        setSavedExercises(data.savedExercises);
      } catch (err: any) {
        console.error('Error fetching saved exercises:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedExercises();
  }, [user]);

  if (!user) {
    return <p>Please log in to view your saved exercises.</p>;
  }

  return (
    <div className="saved-exercises">

      {isLoading && <p>Loading...</p>}

      {error && <p className="error-message">{error}</p>}

      {savedExercises.length > 0 ? (
        <ul>
          {savedExercises.map((exercise) => (
            <li key={exercise.id} className="exercise-item">
              <h3>{exercise.name}</h3>
              <p><strong>Category:</strong> {exercise.category}</p>
              <p><strong>Level:</strong> {exercise.level}</p>
              <p><strong>Primary Muscles:</strong> {exercise.primaryMuscles}</p>
              <p><strong>Instructions:</strong> {exercise.instructions}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved exercises found.</p>
      )}
    </div>
  );
};

export default SavedExercises;
