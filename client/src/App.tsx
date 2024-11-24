import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './homepage/HomePage';
import MetricsPage from './metricsPageFolder/metricsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/metrics" element={<MetricsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
