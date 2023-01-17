import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout/index';
import {Navigate} from 'react-router-dom';

// render - dashboard
const ErrorPage500 = Loadable(lazy(() => import('pages/error-page/500')));
const ErrorPage404 = Loadable(lazy(() => import('pages/error-page/404')));

// ==============================|| MAIN ROUTING ||============================== //

const ErrorRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: 'login',
      element: <Navigate to='/' />,
    },
    {
      path: '*',
      element: <ErrorPage404 />,
    },
    {
      path: '/500',
      element: <ErrorPage500 />,
    },
  ],
};

export default ErrorRoutes;
