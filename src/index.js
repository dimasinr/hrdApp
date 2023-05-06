import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './Context/AuthContext';

if (process.env.NODE_ENV !== "development")
    console.log = () => {};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
);