// assets
import {SecurityScanOutlined, UnorderedListOutlined, InfoCircleOutlined} from '@ant-design/icons';

// icons
const icons = {
  SecurityScanOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const policy = {
  id: 'utilities',
  title: 'Workspace Policy',
  type: 'group',
  children: [
    {
      id: 'util-rule',
      title: 'Work Rule',
      type: 'item',
      url: '/workrule',
      icon: icons.UnorderedListOutlined,
    },
    {
      id: 'util-policy',
      title: 'Policy',
      type: 'item',
      url: '/policy',
      icon: icons.InfoCircleOutlined,
    },
    {
      id: 'util-security',
      title: 'Security',
      type: 'item',
      url: '/security',
      icon: icons.SecurityScanOutlined,
    },
  ],
};

export default policy;
