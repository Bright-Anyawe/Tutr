import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Auth from './auth';
import GuestPage from './guestPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <GuestPage />,
      },
      {
        path: 'dashboard',
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);

export default router; 