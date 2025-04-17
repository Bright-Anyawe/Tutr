import React from 'react';
import type { RouteObject, IndexRouteObject } from 'react-router-dom';
import AppLayout from "./layouts/AppLayout";
import { ErrorBoundary } from "./root";
import GuestPage from "./components/guestContent";
import NotFound from "./routes/notFound";
import StudioPage from "./routes/studio";
import StudioModePage from "./routes/studio-mode";

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
        path: "studio",
        element: <StudioPage />,
        file: "routes/studio.tsx"
      },
      {
        path: "studio-mode",
        element: <StudioModePage />,
        file: "routes/studio-mode.tsx"
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
