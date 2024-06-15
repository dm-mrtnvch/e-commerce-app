import { Container, Grid, Typography } from '@mui/material';
import { Page } from '../../components';
import { CART } from '../../routes/routes';
import LineItemsTable from './components/LineItemsTable';
import OrderSummary from './components/OrderSummary';
import { useGetUserCartQuery } from '../../redux/services/cart';

const Cart = () => {
  const { data: userCart, isLoading, refetch } = useGetUserCartQuery();

  return (
    <Page title={CART.title}>
      <Container>
        <Typography variant='h5' component='h2' sx={{ my: 3 }}>
          Your Shopping Cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <LineItemsTable userCart={userCart} isLoading={isLoading} refetch={refetch} />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary userCart={userCart} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Cart;
