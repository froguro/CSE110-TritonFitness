import React from 'react';
import './metricsPage.css';

const MetricsPage = () => {
  return (
    <div className="metrics-container">
      <h1>Metrics</h1>
      <p>Date: {new Date().toLocaleDateString()}</p>
      <form className="metrics-form">
        <div className="metrics-input-group">
          <label htmlFor="weight">Weight</label>
          <input type="number" id="weight" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="shoulders">Shoulders</label>
          <input type="number" id="shoulders" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="chest">Chest</label>
          <input type="number" id="chest" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="waist">Waist</label>
          <input type="number" id="waist" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="glutes">Glutes</label>
          <input type="number" id="glutes" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="right-thigh">Right Thigh</label>
          <input type="number" id="right-thigh" placeholder="Value" />
        </div>
        <div className="metrics-input-group">
          <label htmlFor="left-thigh">Left Thigh</label>
          <input type="number" id="left-thigh" placeholder="Value" />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default MetricsPage;