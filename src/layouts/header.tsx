import { Logout, Menu } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { HOME, LOGIN } from '../routes/routes';
import navConfig from './config-navigation';
import styles from './header.module.scss';
import { resetCredentials } from '../redux/features/authSlice';
import { useState } from 'react';

interface Props {
  headerHeight: number;
}

const projectName = import.meta.env.VITE_PROJECT_NAME;

const Header = ({ headerHeight }: Props) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const { credentials } = useAppSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(resetCredentials());
    navigate(LOGIN.path, { replace: true });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderLogo = () => (
    <Stack direction='row' spacing={1} alignItems='center'>
      <Typography variant='h6' fontWeight={700} component={NavLink} to={HOME.path}>
        {projectName}
      </Typography>
      <Typography fontWeight={700}>
        <Chip component='span' label='RS School' color='primary' size='small' />
      </Typography>
    </Stack>
  );

  const renderNavLinks = (type: 'nav' | 'drawer') => {
    if (type === 'nav') {
      return (
        <Stack direction='row' spacing={3} alignItems='center'>
          {navConfig.map((navItem) => (
            <NavLink
              key={navItem.title}
              to={navItem.path}
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              {navItem.title}
            </NavLink>
          ))}
          {credentials && (
            <Button variant='outlined' onClick={onLogout} endIcon={<Logout />}>
              Logout
            </Button>
          )}
        </Stack>
      );
    } else {
      return (
        <List>
          {navConfig.map((navItem) => (
            <ListItemButton
              key={navItem.title}
              component={NavLink}
              to={navItem.path}
              className={styles.drawerLink}
              onClick={() => setDrawerOpen(false)}
            >
              <ListItemIcon>{navItem.icon}</ListItemIcon>
              {navItem.title}
            </ListItemButton>
          ))}
          <Divider />
          {credentials && (
            <ListItemButton onClick={onLogout} className={styles.drawerLink}>
              Logout
            </ListItemButton>
          )}
        </List>
      );
    }
  };

  return (
    <AppBar
      position='fixed'
      className={styles.header}
      sx={{
        height: headerHeight,
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderLogo()}

        <Box sx={{ flexGrow: 1 }} />

        {mdUp ? (
          renderNavLinks('nav')
        ) : (
          <IconButton onClick={toggleDrawer}>
            <Menu />
          </IconButton>
        )}

        <Drawer
          open={drawerOpen}
          onClose={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              padding: 2,
            },
          }}
        >
          {renderLogo()}

          {renderNavLinks('drawer')}
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
