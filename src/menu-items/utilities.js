// assets
import {CoffeeOutlined, DollarCircleOutlined} from '@ant-design/icons';

// icons
const icons = {
  CoffeeOutlined,
  DollarCircleOutlined,
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'util-bar',
      title: 'Bar',
      type: 'item',
      url: '/bar',
      icon: icons.CoffeeOutlined,
    },
    {
      id: 'util-charity',
      title: 'Charity',
      type: 'item',
      url: '/charity',
      icon: icons.DollarCircleOutlined,
    },
  ],
};

export default utilities;
