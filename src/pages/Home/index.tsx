import { Page } from '../../components';
import { HOME } from '../../routes/routes';
import { NavLink } from 'react-router-dom';
import * as ROUTES from '../../routes/routes';
import styles from './Home.module.scss';

const Home = () => {
  const navLinks = [
    { ...ROUTES.ABOUT_US, className: styles.aboutUsIcon },
    { ...ROUTES.CATALOG, className: styles.catalogIcon },
    { ...ROUTES.CART, className: styles.cartIcon },
    { ...ROUTES.REGISTRATION, className: styles.registrationIcon },
    { ...ROUTES.LOGIN, className: styles.loginIcon },
  ];

  return (
    <Page title={HOME.title}>
      <div className={styles.navLinksContainer}>
        {navLinks.map((link) => (
          <NavLink key={link.title} to={link.path} className={styles.navLink}>
            <span className={`${styles.icon} ${link.className}`}>{link.icon}</span>
            {link.title}
          </NavLink>
        ))}
      </div>
    </Page>
  );
};

export default Home;
