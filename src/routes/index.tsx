import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import * as PAGES from '../pages';
import * as ROUTES from './routes';

const Routes = () => {
  return (
    <ReactRouterRoutes>
      {/* TODO: add layout */}
      <Route index path={ROUTES.HOME.path} element={<PAGES.Home />} />
      <Route path={ROUTES.LOGIN.path} element={<PAGES.Login />} />
      <Route path={ROUTES.PAGE_404.path} element={<PAGES.Page404 />} />
      <Route path='*' element={<Navigate to='/404' replace />} />
    </ReactRouterRoutes>
  );
};

export default Routes;
