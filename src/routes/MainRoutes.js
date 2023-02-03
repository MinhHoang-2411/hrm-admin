import {lazy} from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
import {Navigate} from 'react-router-dom';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const EmployeePage = Loadable(lazy(() => import('pages/employee/index')));
const AssetPage = Loadable(lazy(() => import('pages/asset/index')));
const AssetRequestPage = Loadable(lazy(() => import('pages/asset/asset-request')));
const AccountPage = Loadable(lazy(() => import('pages/account/index')));
const Candidate = Loadable(lazy(() => import('pages/candidate/index')));
const ProjectPage = Loadable(lazy(() => import('pages/project/index')));
const SkillPage = Loadable(lazy(() => import('pages/skill/index')));
const LeavePage = Loadable(lazy(() => import('pages/leave/index')));
const ReviewPage = Loadable(lazy(() => import('pages/review/index')));
const WorkOrganizationPage = Loadable(lazy(() => import('pages/work-organization/index')));
const BarPage = Loadable(lazy(() => import('pages/bar/index')));
const CharityPage = Loadable(lazy(() => import('pages/charity/index')));
const WorkRulePage = Loadable(lazy(() => import('pages/work-rule/index')));
const PolicyPage = Loadable(lazy(() => import('pages/policy/index')));
const SecurityPage = Loadable(lazy(() => import('pages/security/index')));
const UnderConstructionPage = Loadable(lazy(() => import('pages/under-construction/index')));

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
      path: 'dashboard',
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
    {
      path: '/asset',
      element: <AssetPage />,
    },
    {
      path: '/asset-request',
      element: <AssetRequestPage />,
    },
    {
      path: '/candidate',
      element: <Candidate />,
    },

    {
      path: '/account',
      element: <AccountPage />,
    },
    {
      path: '/project',
      element: <ProjectPage />,
    },
    {
      path: '/skill',
      element: <SkillPage />,
    },
    {
      path: '/leave',
      element: <LeavePage />,
    },
    {
      path: '/review',
      element: <ReviewPage />,
    },
    {
      path: '/work-organization',
      element: <WorkOrganizationPage />,
    },
    {
      path: '/bar',
      element: <BarPage />,
    },
    {
      path: '/charity',
      element: <CharityPage />,
    },
    {
      path: '/work-rule',
      element: <WorkRulePage />,
    },
    {
      path: '/policy',
      element: <PolicyPage />,
    },
    {
      path: '/security',
      element: <SecurityPage />,
    },
    {
      path: '/underconstruction',
      element: <UnderConstructionPage />,
    },
  ],
};

export default MainRoutes;
