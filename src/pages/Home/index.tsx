import { Container } from '@mui/material';
import { DiscountBanner, Page } from '../../components';
import { HOME } from '../../routes/routes';
import discount from '../../assets/images/discount.svg';

const Home = () => {
  return (
    <Page title={HOME.title}>
      <Container sx={{ my: 2 }}>
        <DiscountBanner
          title='Incredible Discount for all products!'
          description='Use the code below to get 20% off on your next purchase.'
          code='RS School'
          asset={discount}
        />
      </Container>
    </Page>
  );
};

export default Home;
