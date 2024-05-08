import { Box } from '@mui/material';
import loginIllustration from '../../assets/images/login.svg';
import { Page } from '../../components';
import LoginForm from './components/LoginForm';
import styles from './styles.module.scss';

const LoginPage = () => {
  return (
    <Page title='Login' className={styles.login}>
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
