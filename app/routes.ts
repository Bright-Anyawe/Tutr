import React from "react";
import type { RouteObject } from "react-router-dom";
import GuestPage from "./routes/guestPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: React.createElement(GuestPage),
  },
];

export default routes;
