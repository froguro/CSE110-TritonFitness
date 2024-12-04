import React, {useState} from 'react';
import './metricsPage.css';

interface MetricsPageProps {
  buttonBackgroundColor: string; // Add prop for button background color
}

const MetricsPage: React.FC<MetricsPageProps> = ({ buttonBackgroundColor }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      const form = e.currentTarget;
      const metricsData = {
        userId: 'exampleUserId',
        weight: (form.elements.namedItem('weight') as HTMLInputElement).value,
        shoulders: (form.elements.namedItem('shoulders') as HTMLInputElement).value,
        chest: (form.elements.namedItem('chest') as HTMLInputElement).value,
        waist: (form.elements.namedItem('waist') as HTMLInputElement).value,
        glutes: (form.elements.namedItem('glutes') as HTMLInputElement).value,
        rightThigh: (form.elements.namedItem('right-thigh') as HTMLInputElement).value,
        leftThigh: (form.elements.namedItem('left-thigh') as HTMLInputElement).value,
      };
    
      console.log('Sending data:', metricsData); // Log the data
    
      try {
        const response = await fetch('http://localhost:3001/metrics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(metricsData),
        });
    
        const result = await response.json();
        console.log('Response:', result); // Log the server response
    
        if (response.ok) {
          alert('Metrics saved successfully!');
          closeModal();
        } else {
          alert(`Failed to save metrics: ${result.error}`);
        }
      } catch (err) {
        console.error('Error submitting metrics:', err);
        alert('An error occurred while saving metrics.');
      }
    };  

  return (


    <div className="metrics-pop-up">
      <button className="metrics-button" onClick={openModal} style={{ backgroundColor: buttonBackgroundColor }}>
        Track Metrics
      </button>

      {isModalOpen &&( 

      <div className="overlay">

        <div className="metrics-container">
          <h1>Metrics</h1>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <form className="metrics-form"onSubmit={handleSubmit}>
            <div className="metrics-input-group">
              <label htmlFor="weight">Weight</label>
              <input type="number" id="weight" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="shoulders">Shoulders</label>
              <input type="number" id="shoulders" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="chest">Chest</label>
              <input type="number" id="chest" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="waist">Waist</label>
              <input type="number" id="waist" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="glutes">Glutes</label>
              <input type="number" id="glutes" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="right-thigh">Right Thigh</label>
              <input type="number" id="right-thigh" name="weight" placeholder="Value" />
            </div>
            <div className="metrics-input-group">
              <label htmlFor="left-thigh">Left Thigh</label>
              <input type="number" id="left-thigh" name="weight" placeholder="Value" />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      )}
      </div>
  );
};

export default MetricsPage;