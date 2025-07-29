// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';  // Changed from .jsx to .js
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
