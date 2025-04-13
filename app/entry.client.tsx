import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import routes from './routes';
import type { ExtendedRouteObject } from './routes';
// Recursive function to render routes with nested children
const renderRoutes = (routes: ExtendedRouteObject[]): JSX.Element[] =>
  routes.map(({ path, element, errorElement, children }, index) => (
    <Route
      key={path || index}
      path={path}
      element={element}
      errorElement={errorElement}
    >
      {children ? renderRoutes(children as ExtendedRouteObject[]) : null}
    </Route>
  ));

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>{renderRoutes(routes)}</Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
