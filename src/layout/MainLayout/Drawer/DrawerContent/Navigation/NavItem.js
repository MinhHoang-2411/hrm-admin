import PropTypes from 'prop-types';
import {forwardRef, memo, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DownOutlined, UpOutlined} from '@ant-design/icons';

// material-ui
import {
  Avatar,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  List,
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {menuActions} from 'store/menu/menuSlice';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

const NavItem = ({item, level}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.menu);
  const {drawerOpen, openItem, subMenu, countMenu} = menu;

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => (
      <Link
        ref={ref}
        {...props}
        to={item?.children?.length > 0 ? null : item.url}
        target={itemTarget}
      />
    )),
  };
  if (item?.external) {
    listItemProps = {component: 'a', href: item.url, target: itemTarget};
  }

  const itemHandler = (id) => {
    dispatch(menuActions.activeItem({openItem: [id]}));
  };

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{fontSize: drawerOpen ? '1rem' : '1.25rem'}} /> : false;

  const isSelected = openItem.findIndex((id) => id === item.id) > -1;

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(menuActions.activeItem({openItem: [item.id]}));
    }
    // eslint-disable-next-line
  }, [document.location.pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = 'primary.main';

  return (
    <>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        onClick={() => {
          item?.children?.length > 0
            ? dispatch(menuActions.activeSubMenu(item?.id))
            : itemHandler(item.id);
        }}
        selected={isSelected}
        sx={{
          zIndex: 1201,
          pl: drawerOpen ? `${level * 28}px` : 1.5,
          py: !drawerOpen && level === 1 ? 1.25 : 1,
          ...(drawerOpen && {
            '&:hover': {
              bgcolor: 'primary.lighter',
            },
            '&.Mui-selected': {
              bgcolor: 'primary.lighter',
              borderRight: `2px solid ${theme.palette.primary.main}`,
              color: iconSelectedColor,
              '&:hover': {
                color: iconSelectedColor,
                bgcolor: 'primary.lighter',
              },
            },
          }),
          ...(!drawerOpen && {
            '&:hover': {
              bgcolor: 'transparent',
            },
            '&.Mui-selected': {
              '&:hover': {
                bgcolor: 'transparent',
              },
              bgcolor: 'transparent',
            },
          }),
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: isSelected ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: 'secondary.lighter',
                },
              }),
              ...(!drawerOpen &&
                isSelected && {
                  bgcolor: 'primary.lighter',
                  '&:hover': {
                    bgcolor: 'primary.lighter',
                  },
                }),
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        {(drawerOpen || (!drawerOpen && level !== 1)) && (
          <ListItemText
            primary={
              <Typography variant='h6' sx={{color: isSelected ? iconSelectedColor : textColor}}>
                {item.title}
              </Typography>
            }
          />
        )}
        {item?.children &&
          item?.children?.length > 0 &&
          (subMenu.includes(item.id) ? <UpOutlined /> : <DownOutlined />)}

        {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item?.chip?.label || countMenu[item?.chip?.data]}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
      {item?.children?.length > 0 && (
        <Collapse in={subMenu?.includes(item.id)} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {item?.children?.map((menuItem) => {
              return <NavItem key={menuItem.id} item={menuItem} level={1.5} />;
            })}
          </List>
        </Collapse>
      )}
    </>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default memo(NavItem);
