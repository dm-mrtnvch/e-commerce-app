import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { Page } from '../../components';
import RegistrationForm from './components/RegistrationForm.tsx';
import { Box } from '@mui/material';
import { HOME, REGISTRATION } from '../../routes/routes';
import registrationIllustration from '../../assets/images/register.svg';
import styles from './styles.module.scss';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { credentials } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (credentials) {
      navigate(HOME.path, { replace: true });
    }
  }, [credentials, navigate]);

  return (
    <Page title={REGISTRATION.title} className={styles.registration}>
      <Box className={styles.registrationLeft}>
        <img src={registrationIllustration} alt='Registration' />
      </Box>
      <Box className={styles.registrationRight}>
        <RegistrationForm />
      </Box>
    </Page>
  );
};

export default RegistrationPage;
