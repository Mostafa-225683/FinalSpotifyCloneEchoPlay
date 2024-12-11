import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from "../App";
import '../src/styles/styles.css'; // Import global styles
import PlayerbarcontextProvider from './Context/Playerbarcontext';
// Global Css Style
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PlayerbarcontextProvider> {/* Correctly wraps App */}
      <App />
    </PlayerbarcontextProvider>
  </StrictMode>
);
