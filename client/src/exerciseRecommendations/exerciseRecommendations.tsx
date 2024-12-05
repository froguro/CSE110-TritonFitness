import React, { useState } from "react";
import "./exerciseRecommendations.css";
import SavedExercises from "./savedExercises";
import { Muscle, Level, Equipment, Category } from "../types/exercises";
import { User } from "../types/user";

interface ExerciseRecommendationsProps {
  buttonBackgroundColor: string;
  user: User | null;
}

const ExerciseRecommendations: React.FC<ExerciseRecommendationsProps> = ({ buttonBackgroundColor, user }) => {
  const [isRecommendationModalOpen, setIsRecommendationModalOpen] = useState(false);
  const [isSavedExercisesModalOpen, setIsSavedExercisesModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openRecommendationModal = () => setIsRecommendationModalOpen(true);
  const closeRecommendationModal = () => {
    setIsRecommendationModalOpen(false);
    setRecommendations([]);
    setError(null);
  };

  const openSavedExercisesModal = () => setIsSavedExercisesModalOpen(true);
  const closeSavedExercisesModal = () => setIsSavedExercisesModalOpen(false);

  const handleSaveExercise = async (exerciseId: number) => {
    if (!user) {
      setError("You must be logged in to save exercises.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3001/api/save-exercise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, exerciseId }),
      });
  
      const result = await response.json();

      if (!response.ok) {
        // Handle the "Exercise already saved" case
        if (result.error === "Exercise already saved.") {
          alert("This exercise is already saved.");
        } else {
          throw new Error(result.error || "Failed to save exercise.");
        }
        return;
      }
  
      alert("Exercise saved successfully!");
    } catch (err: any) {
      console.error("Error saving exercise:", err);
      setError(err.message || "An unexpected error occurred.");
    }
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const recommendationData = {
      level: (form.elements.namedItem("level") as HTMLSelectElement).value,
      muscleGroup: (form.elements.namedItem("muscleGroup") as HTMLSelectElement).value,
      exerciseType: (form.elements.namedItem("exerciseType") as HTMLSelectElement).value,
      equipment: (form.elements.namedItem("equipment") as HTMLSelectElement).value,
    };

    try {
      const response = await fetch("http://localhost:3001/api/recommend-exercises", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(recommendationData),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recommendations: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.exercises.length === 0) {
        setError("No matching exercises found for the desired criteria.");
        setRecommendations([]);
      } else {
        setRecommendations(result.exercises);
      }
    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="exercise-popup">
      <div className="button-group">
        <button
          className="recommendation-button"
          onClick={openRecommendationModal}
          style={{ backgroundColor: buttonBackgroundColor }}
        >
          Recommend
        </button>
        <button
          className="recommendation-button"
          onClick={openSavedExercisesModal}
          style={{ backgroundColor: buttonBackgroundColor }}
        >
          View Saved
        </button>
      </div>

      {isRecommendationModalOpen && (
        <div className="overlay">
          <div className="exercise-container">
            <h1>Exercise Recommendations</h1>
            <form className="exercise-form" onSubmit={handleSubmit}>
              {/* Form Inputs */}
              <div className="input-group">
                <label htmlFor="level">Fitness Level</label>
                <select id="level" name="level" required>
                  {Object.values(Level).map((level) => (
                    <option key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="muscleGroup">Muscle Group</label>
                <select id="muscleGroup" name="muscleGroup" required>
                  {Object.values(Muscle).map((muscle) => (
                    <option key={muscle} value={muscle}>
                      {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="exerciseType">Exercise Type</label>
                <select id="exerciseType" name="exerciseType" required>
                  {Object.values(Category).map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="equipment">Equipment</label>
                <select id="equipment" name="equipment" required>
                  {Object.values(Equipment).map((equipment) => (
                    <option key={equipment} value={equipment}>
                      {equipment.charAt(0).toUpperCase() + equipment.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {recommendations.length > 0 && (
              <div className="recommendations">
                <h2>Recommended Exercises</h2>
                <ul>
                  {recommendations.map((exercise) => (
                    <li key={exercise.id}>
                      <strong>{exercise.name}</strong> - {exercise.category} ({exercise.level})
                      <p>{exercise.instructions}</p>
                      <button
                        className="save-button"
                        onClick={() => handleSaveExercise(exercise.id)}
                      > 
                        Save Exercise
                      </button>
                    </li>
                    
                  ))}
                </ul>
              </div>
            )}

            <button className="close-button" onClick={closeRecommendationModal}>
              Close
            </button>
          </div>
        </div>
      )}

{isSavedExercisesModalOpen && (
  <div className="overlay">
    <div className="exercise-container">
      <h1>Saved Exercises</h1>
      <SavedExercises user={user} />
      <button className="close-button" onClick={closeSavedExercisesModal}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default ExerciseRecommendations;
