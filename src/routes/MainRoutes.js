import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import {Navigate} from 'react-router-dom';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const EmployeePage = Loadable(lazy(() => import('pages/employee/index')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'login',
      element: <Navigate to='/' />,
    },
    {
      path: '*',
      element: <Navigate to='/' />,
    },
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: '/employee',
      element: <EmployeePage />,
    },
  ],
};

export default MainRoutes;
