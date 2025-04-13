import React from 'react';
import type { RouteObject, IndexRouteObject } from 'react-router-dom';
import AppLayout from "./layouts/AppLayout";
import { ErrorBoundary } from "./root";
import GuestPage from "./routes/guestPage";
import Dashboard from "./routes/dashboard";
import NotFound from "./routes/notFound";

export type ExtendedRouteObject = RouteObject & {
  file?: string;
  children?: Array<ExtendedRouteObject | (IndexRouteObject & { file?: string })>;
};

const routes: ExtendedRouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorBoundary error={null} params={{}} />,
    file: "layouts/AppLayout.tsx",
    children: [
      {
        index: true,
        element: <GuestPage />,
        file: "routes/guestPage.tsx"
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        file: "routes/dashboard.tsx"
      }
    ]
  },
  {
    path: "*",
    element: <NotFound />,
    file: "routes/notFound.tsx"
  }
];

export default routes;
