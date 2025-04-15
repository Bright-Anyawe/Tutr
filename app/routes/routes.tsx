import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import Login from './login';

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: null,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
];

const router = createBrowserRouter(routes);

export default router; 