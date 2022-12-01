import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';

// material-ui
import {Box, Toolbar, useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material/styles';

// project import
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import navigation from '../../components/menu-items';
import Drawer from './Drawer';
import Header from './Header';

// types
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {menuActions} from 'store/menu/menuSlice';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
  const dispatch = useAppDispatch();

  const drawerOpen = useAppSelector((state) => state.menu.drawerOpen);

  // drawer toggler
  const [open, setOpen] = useState(drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch(
      menuActions.openDrawer({
        drawerOpen: !open,
      })
    );
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch(
      menuActions.openDrawer({
        drawerOpen: !matchDownLG,
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== drawerOpen) setOpen(drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerOpen]);

  return (
    <Box sx={{display: 'flex', width: '100%'}}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component='main' sx={{width: '100%', flexGrow: 1, p: {xs: 2, sm: 3}}}>
        <Toolbar />
        <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
