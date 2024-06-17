import { Home, Login, PersonAdd, ShoppingCart, PersonSearch, Apps, AccountCircle } from '@mui/icons-material';

export const HOME = {
  path: '/',
  title: 'Home',
  icon: <Home />,
};

export const LOGIN = {
  path: '/login',
  title: 'Login',
  icon: <Login />,
};

export const REGISTRATION = {
  path: '/registration',
  title: 'Registration',
  icon: <PersonAdd />,
};

export const ABOUT_US = {
  path: '/about-us',
  title: 'About Us',
  icon: <PersonSearch />,
};

export const CATALOG = {
  path: '/catalog',
  title: 'Catalog',
  icon: <Apps />,
};

export const CART = {
  path: '/cart',
  title: 'Cart',
  icon: <ShoppingCart />,
};

export const USER = {
  path: '/user',
  title: 'User',
  icon: <AccountCircle />,
};

export const PAGE_404 = {
  path: '/404',
  title: 'Sorry, page not found',
};
