import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import illustration404 from '../../assets/images/404.svg';
import { Page } from '../../components';
import { HOME, PAGE_404 } from '../../routes/routes';
import styles from './styles.module.scss';

const Page404 = () => {
  return (
    <Page title={PAGE_404.title} className={styles.page404}>
      <img src={illustration404} alt='404' />
      <Typography variant='h1' hidden>
        404
      </Typography>
      <Typography variant='subtitle1'>{PAGE_404.title}</Typography>
      <Button variant='contained' color='primary' component={Link} to={HOME.path}>
        Back Home
      </Button>
    </Page>
  );
};

export default Page404;
