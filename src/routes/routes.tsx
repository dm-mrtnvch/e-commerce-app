import { Home, Login, PersonAdd, ShoppingCart, PersonSearch } from '@mui/icons-material';

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
  title: 'AboutUs',
  icon: <PersonSearch />,
};

export const CATALOG = {
  path: '/catalog',
  title: 'Catalog',
  icon: <PersonAdd />,
};

export const CART = {
  path: '/cart',
  title: 'Cart',
  icon: <ShoppingCart />,
};

export const PAGE_404 = {
  path: '/404',
  title: 'Sorry, page not found',
};
