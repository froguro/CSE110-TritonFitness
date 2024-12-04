import React, { useState } from "react";
import "./exerciseRecommendations.css";

// Import enums for dropdown options
import { Muscle, Level, Equipment, Category } from "../types/exercises";


interface ExerciseRecommendationsProps {
buttonBackgroundColor: string; // Add prop for button background color
}

const ExerciseRecommendations: React.FC<ExerciseRecommendationsProps> = ({ buttonBackgroundColor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setRecommendations([]);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;
    const recommendationData = {
      level: (form.elements.namedItem("level") as HTMLSelectElement).value,
      muscleGroup: (form.elements.namedItem("muscleGroup") as HTMLSelectElement)
        .value,
      exerciseType: (form.elements.namedItem("exerciseType") as HTMLSelectElement)
        .value,
      equipment: (form.elements.namedItem("equipment") as HTMLSelectElement).value,
    };

    console.log("Sending data:", recommendationData);

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

        // Check if no exercises were returned
        if (result.exercises.length === 0) {
            setError("No matching exercises found for the desired criteria.");
            setRecommendations([]);
        } else {
            setRecommendations(result.exercises);
        }

      setRecommendations(result.exercises);
    } catch (err: any) {
      console.error("Error fetching recommendations:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="exercise-popup">
      <button className="recommendation-button" onClick={openModal} style={{ backgroundColor: buttonBackgroundColor }}>
        Recommend
      </button>

      {isModalOpen && (
        <div className="overlay">
          <div className="exercise-container">
            <h1>Exercise Recommendations</h1>
            <form className="exercise-form" onSubmit={handleSubmit}>
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
                  {recommendations.map((exercise, index) => (
                    <li key={index}>
                      <strong>{exercise.name}</strong> - {exercise.category} ({exercise.level})
                      <p>{exercise.instructions}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button className="close-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseRecommendations;
