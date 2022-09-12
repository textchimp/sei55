import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';

import HistoryEraser from './HistoryEraser';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HistoryEraser />
  </React.StrictMode>
);
