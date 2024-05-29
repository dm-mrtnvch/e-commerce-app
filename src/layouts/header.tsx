import React, { useEffect, useState } from 'react';
import { Logout, Menu as MenuIcon, Person2 } from '@mui/icons-material';
import {
  AppBar,
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { HOME, LOGIN, USER } from '../routes/routes';
import navConfig from './config-navigation';
import styles from './header.module.scss';
import { resetCredentials } from '../redux/features/authSlice';

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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const { credentials } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      if (!mdUp) {
        handleMenuClose();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mdUp]);

  const onLogout = () => {
    dispatch(resetCredentials());
    navigate(LOGIN.path, { replace: true });
    handleMenuClose();
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

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
            <>
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                sx={{ mt: '45px' }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem component={NavLink} to={USER.path} onClick={handleMenuClose}>
                  <Person2 fontSize='small' sx={{ mr: 1 }} />
                  User Profile
                </MenuItem>
                <MenuItem onClick={onLogout}>
                  <Logout fontSize='small' sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
      );
    }

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
        {credentials && (
          <ListItemButton
            key={USER.title}
            component={NavLink}
            to={USER.path}
            className={styles.drawerLink}
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemIcon>{USER.icon}</ListItemIcon>
            {USER.title}
          </ListItemButton>
        )}
        <Divider />
        {credentials && (
          <ListItemButton onClick={onLogout} className={styles.drawerLink}>
            Logout
          </ListItemButton>
        )}
      </List>
    );
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
            <MenuIcon />
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
