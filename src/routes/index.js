import {useRoutes} from 'react-router-dom';

// project import
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  const switchRoutes = isLoggedIn ? [MainRoutes] : [LoginRoutes];
  return useRoutes(switchRoutes);
}
