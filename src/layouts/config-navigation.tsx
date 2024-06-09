import * as ROUTES from '../routes/routes';

const navConfig = [{ ...ROUTES.HOME }, { ...ROUTES.ABOUT_US }, { ...ROUTES.CATALOG }, { ...ROUTES.CART }];
const authNavConfig = [{ ...ROUTES.LOGIN }, { ...ROUTES.REGISTRATION }];

export { authNavConfig, navConfig };
