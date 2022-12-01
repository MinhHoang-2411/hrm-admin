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
  TeamOutlined,
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
  TeamOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const management = {
  id: 'utilities',
  title: 'Management',
  type: 'group',
  children: [
    {
      id: 'util-employee',
      title: 'Employee',
      type: 'item',
      url: '/employee',
      icon: icons.UserOutlined,
    },
    {
      id: 'util-branch',
      title: 'Branch',
      type: 'item',
      url: '/branch',
      icon: icons.HomeOutlined,
    },
    {
      id: 'util-asset',
      title: 'Asset',
      type: 'item',
      url: '/asset',
      icon: icons.FundProjectionScreenOutlined,
    },
    {
      id: 'util-project',
      title: 'Project',
      type: 'item',
      url: '/project',
      icon: icons.ProjectOutlined,
    },
    {
      id: 'util-leave',
      title: 'Leave',
      type: 'item',
      url: '/leave',
      icon: icons.CalendarOutlined,
    },
    {
      id: 'util-skill',
      title: 'Skill',
      type: 'item',
      url: '/skill',
      icon: icons.CodeOutlined,
    },
    {
      id: 'util-review',
      title: 'Review',
      type: 'item',
      url: '/review',
      icon: icons.AntDesignOutlined,
    },
    {
      id: 'util-candidate',
      title: 'Candidate',
      type: 'item',
      url: '/candidate',
      icon: icons.AntDesignOutlined,
    },
    {
      id: 'util-candidate',
      title: 'Work Organization',
      type: 'item',
      url: '/workorganization',
      icon: icons.TeamOutlined,
    },
  ],
};

export default management;
