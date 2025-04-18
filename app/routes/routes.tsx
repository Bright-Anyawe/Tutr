import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Auth from './auth';
import GuestContent from '../components/guestContent';
import OnboardingPage from './Onboarding';
import StudioPage from './Studio';
// import StudioModePage from './studio-mode';
import LessonsRequests from '../components/LessonsRequests';
import UserProfileLayout from '../components/userProfile/UserProfile-Layout';
import LessonLibrary from '../components/userProfile/LessonLibrary/LessonLibrary';
import ProfileSettings from '../components/userProfile/Profile/AccountSettings';
import Analytics from '../components/userProfile/Analytics/Analytics';
import Settings from '../components/userProfile/Settings/Settings';

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
     
      {
        path: 'lessons-requests',
        element: <LessonsRequests />,
      },
     
    ],

  },

  {
    path: 'my-lessons',
    element: (
      <UserProfileLayout currentPage="My Lessons">
        <LessonLibrary />
      </UserProfileLayout>
    ),
  },
  {
    path: 'analytics',
    element: (
      <UserProfileLayout currentPage="Analytics">
        <Analytics />
      </UserProfileLayout>
    ),
  },
  {
    path: 'profile-settings',
    element: (
      <UserProfileLayout currentPage="Profile Settings">
        <ProfileSettings />
      </UserProfileLayout>
    ),
  },
  {
    path: 'settings',
    element: (
      <UserProfileLayout currentPage="Settings">
        <Settings />
      </UserProfileLayout>
    ),
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