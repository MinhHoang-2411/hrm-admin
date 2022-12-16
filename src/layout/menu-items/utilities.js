// assets
import {CoffeeOutlined, HeartOutlined} from '@ant-design/icons';

// icons
const icons = {
  CoffeeOutlined,
  HeartOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'bar',
      title: 'Bar',
      type: 'item',
      url: '/bar',
      icon: icons.CoffeeOutlined,
    },
    {
      id: 'charity',
      title: 'Charity',
      type: 'item',
      url: '/charity',
      icon: icons.HeartOutlined,
    },
  ],
};

export default utilities;
