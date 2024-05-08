import { Box } from '@mui/material';
import loginIllustration from '../../assets/images/login.svg';
import { Page } from '../../components';
import { LOGIN } from '../../routes/routes';
import LoginForm from './components/LoginForm';
import styles from './styles.module.scss';

const LoginPage = () => {
  return (
    <Page title={LOGIN.title} className={styles.login}>
      <Box className={styles.loginLeft}>
        <img src={loginIllustration} alt='Login' />
      </Box>
      <Box className={styles.loginRight}>
        <LoginForm />
      </Box>
    </Page>
  );
};

export default LoginPage;
