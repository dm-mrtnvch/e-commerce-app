import { useState } from 'react';
import { useAppSelector } from '../hooks/reduxHooks.tsx';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import logoIcon from '../assets/icons/logo.png';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../routes/routes';
import styles from './Header.module.scss';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { credentials } = useAppSelector((state) => state.auth);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navLinks = [ROUTES.HOME, ROUTES.ABOUT_US, ROUTES.CATALOG, ROUTES.CART, ROUTES.REGISTRATION, ROUTES.LOGIN];

  const onLogout = () => {};

  return (
    <>
      <AppBar position='static' className={styles.header}>
        <Toolbar className={styles.toolbar}>
          <IconButton
            edge='start'
            className={styles.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <NavLink to={ROUTES.HOME.path} className={`${styles.title} ${styles.link}`}>
            <img src={logoIcon} alt='logo icon' className={styles.logo} />E Shop
          </NavLink>
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.path}
                className={({ isActive }) => (isActive ? `${styles.link} ${styles.activeLink}` : styles.link)}
              >
                <span className={styles.icon}>{link.icon}</span>
                {link.title}
              </NavLink>
            ))}
            {credentials && (
              <Button variant='outlined' onClick={onLogout} color='inherit' className={styles.link}>
                <LogoutIcon className={styles.icon} />
                Logout
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor='right' open={drawerOpen} onClose={handleDrawerToggle} className={styles.drawer}>
        <div className={styles.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </div>
        <List className={styles.list}>
          {navLinks.map((link) => (
            <ListItem key={link.title} component={NavLink} to={link.path} onClick={handleDrawerToggle}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.title} />
            </ListItem>
          ))}
          {credentials && (
            <ListItem onClick={onLogout} className={styles.logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Header;
