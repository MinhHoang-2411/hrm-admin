// assets
import {
  FileProtectOutlined,
  OrderedListOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

// icons
const icons = {
  FileProtectOutlined,
  OrderedListOutlined,
  SafetyCertificateOutlined,
};

const workplace_policy = {
  id: 'workplace-policy',
  title: 'Workplace Policy',
  type: 'group',
  children: [
    {
      id: 'work-rule',
      title: 'Work rule',
      type: 'item',
      url: '/work-rule',
      icon: icons.OrderedListOutlined,
    },
    {
      id: 'policy',
      title: 'Policy',
      type: 'item',
      url: '/policy',
      icon: icons.FileProtectOutlined,
    },
    {
      id: 'security',
      title: 'Security',
      type: 'item',
      url: '/security',
      icon: icons.SafetyCertificateOutlined,
    },
  ],
};

export default workplace_policy;
