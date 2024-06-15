import { Container, Typography } from '@mui/material';
import { Page } from '../../components';
import { CART } from '../../routes/routes';
import LineItemsTable from './components/LineItemsTable';

const Cart = () => {
  return (
    <Page title={CART.title}>
      <Container>
        <Typography variant='h5' component='h2' sx={{ my: 3 }}>
          Your Shopping Cart
        </Typography>
        <LineItemsTable />
      </Container>
    </Page>
  );
};

export default Cart;
