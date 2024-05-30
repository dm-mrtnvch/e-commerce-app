import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import Layout from '../layouts';
import * as PAGES from '../pages';
import * as ROUTES from './routes';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      <Route element={<Layout />}>
        <Route index path={ROUTES.HOME.path} element={<PAGES.Home />} />
        <Route path={ROUTES.LOGIN.path} element={<PAGES.Login />} />
        <Route path={ROUTES.REGISTRATION.path} element={<PAGES.Registration />} />
        <Route path={ROUTES.ABOUT_US.path} element={<PAGES.AboutUs />} />
        <Route path={ROUTES.CATALOG.path}>
          <Route index element={<PAGES.Catalog />} />
          <Route path=':key' element={<PAGES.DetailedProduct />} />
        </Route>
        <Route path={ROUTES.CART.path} element={<PAGES.Cart />} />
        <Route path={ROUTES.USER.path} element={<PAGES.User />} />
        <Route path={ROUTES.PAGE_404.path} element={<PAGES.Page404 />} />
        <Route path='*' element={<Navigate to='/404' replace />} />
      </Route>
    </ReactRouterRoutes>
  );
};

export default Routes;
