// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  HomeOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  ProjectOutlined,
  CalendarOutlined,
  CodeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BgColorsOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  HomeOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  ProjectOutlined,
  CalendarOutlined,
  CodeOutlined,
  UsergroupAddOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
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
      id: 'branch',
      title: 'Branch',
      type: 'item',
      url: '/branch',
      icon: icons.HomeOutlined,
    },
    {
      id: 'asset',
      title: 'Asset',
      type: 'item',
      url: '/asset',
      icon: icons.FundProjectionScreenOutlined,
    },
    {
      id: 'project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.ProjectOutlined,
    },
    {
      id: 'leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: icons.CalendarOutlined,
    },
    {
      id: 'skill',
      title: 'Skill',
      type: 'item',
      url: '/skill',
      icon: icons.CodeOutlined,
    },
    {
      id: 'review',
      title: 'Review',
      type: 'item',
      url: '/review',
      icon: icons.AntDesignOutlined,
    },
    {
      id: 'candidate',
      title: 'Candidate',
      type: 'item',
      url: '/candidate',
      icon: icons.AntDesignOutlined,
    },
  ],
};

export default utilities;
