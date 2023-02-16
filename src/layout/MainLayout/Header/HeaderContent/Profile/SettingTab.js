import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

// material-ui
import {useTheme} from '@mui/material/styles';
import {List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

// assets
import {
  CommentOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const SettingTab = ({handleClosePopup}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const {pathname} = location;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index, path = '/underconstruction') => {
    setSelectedIndex(index);
    navigate(path);
    handleClosePopup();
  };

  return (
    <List
      component='nav'
      sx={{p: 0, '& .MuiListItemIcon-root': {minWidth: 32, color: theme.palette.grey[500]}}}
    >
      <ListItemButton
        // selected={selectedIndex === 0}
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary='Support' />
      </ListItemButton>
      <ListItemButton
        selected={pathname === '/settings'}
        onClick={(event) => handleListItemClick(event, 1, '/settings')}
      >
        <ListItemIcon>
          <UserOutlined />
        </ListItemIcon>
        <ListItemText primary='Account Settings' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText primary='Privacy Center' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 3}
        onClick={(event) => handleListItemClick(event, 3)}
      >
        <ListItemIcon>
          <CommentOutlined />
        </ListItemIcon>
        <ListItemText primary='Feedback' />
      </ListItemButton>
      <ListItemButton
        selected={selectedIndex === 4}
        onClick={(event) => handleListItemClick(event, 4)}
      >
        <ListItemIcon>
          <UnorderedListOutlined />
        </ListItemIcon>
        <ListItemText primary='History' />
      </ListItemButton>
    </List>
  );
};

export default SettingTab;
