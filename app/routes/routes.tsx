import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Auth from './Auth';
import GuestContent from '../components/GuestContent';
import OnboardingPage from './Onboarding';
import StudioPage from './Studio';
// import StudioModePage from './studio-mode';
import LessonsRequests from '../components/LessonsRequests';

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
     
      // {
      //   path: 'studio-mode',
      //   element: <StudioModePage />,
      // },
      {
        path: 'lessons-requests',
        element: <LessonsRequests />,
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
  {
    path: 'studio',
    element: <StudioPage />,
  },
]);

export default router; 