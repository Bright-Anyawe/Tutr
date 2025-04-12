import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import routes from './routes';
import type { RouteObject } from 'react-router-dom';

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {routes.map((route: RouteObject) =>
            route.path ? (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ) : null
          )}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
