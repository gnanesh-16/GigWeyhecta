import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
export const runtime = "edge";

// Replace any occurrences of "http://localhost:5173/Gigwey-/" with "http://localhost:5173/"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
