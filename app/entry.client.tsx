import './styles/reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import router from './routes/routes';
import './app.css';
import './styles/global.css';

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
