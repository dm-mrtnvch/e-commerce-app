import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loginIllustration from '../../assets/images/login.svg';
import { Page } from '../../components';
import { useAppSelector } from '../../hooks/reduxHooks';
import { HOME, LOGIN } from '../../routes/routes';
import LoginForm from './components/LoginForm';
import styles from './styles.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const { credentials } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (credentials) {
      navigate(HOME.path, { replace: true });
    }
  }, [credentials, navigate]);

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
