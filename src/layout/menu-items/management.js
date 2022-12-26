// assets
import {
  AntDesignOutlined,
  CalendarOutlined,
  CodeOutlined,
  EyeOutlined,
  FundProjectionScreenOutlined,
  LockOutlined,
  ProjectOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

// icons
const icons = {
  AntDesignOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  ProjectOutlined,
  CalendarOutlined,
  CodeOutlined,
  UsergroupAddOutlined,
  LockOutlined,
  EyeOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const management = {
  id: 'management',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee',
      type: 'item',
      url: '/employee',
      icon: icons.UserOutlined,
    },
    {
      id: 'account',
      title: 'Account',
      type: 'item',
      url: '/account',
      icon: icons.LockOutlined,
    },
    {
      id: 'candidate',
      title: 'Candidate',
      type: 'item',
      url: '/candidate',
      icon: icons.UsergroupAddOutlined,
    },
    {
      id: 'project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.ProjectOutlined,
    },
    {
      id: 'skill',
      title: 'Skill',
      type: 'item',
      url: '/skill',
      icon: icons.CodeOutlined,
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: icons.CalendarOutlined,
    },
    {
      id: 'asset',
      title: 'Asset',
      type: 'item',
      url: '/asset',
      icon: icons.FundProjectionScreenOutlined,
    },
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      url: '/review',
      icon: icons.EyeOutlined,
    },
    {
      id: 'work-organization',
      title: 'Work Organization',
      type: 'item',
      url: '/work-organization',
      icon: icons.AntDesignOutlined,
    },
  ],
};

export default management;
