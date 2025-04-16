import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Auth from './auth';
import GuestContent from '../components/guestContent';
import OnboardingPage from './onboarding';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <GuestContent />,
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
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
]);

export default router; 