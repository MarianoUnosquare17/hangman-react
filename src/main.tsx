import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { makeWordProvider } from './lib/wordProvider.ts';

const wordProvider = makeWordProvider();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App wordProvider={wordProvider} />
  </React.StrictMode>,
);
