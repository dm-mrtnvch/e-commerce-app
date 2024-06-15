import { Alert, Container, Grid, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { Page } from '../../components';
import { useGetUserCartQuery } from '../../redux/services/cart';
import { CART } from '../../routes/routes';
import LineItemsTable from './components/LineItemsTable';
import OrderSummary from './components/OrderSummary';

const Cart = () => {
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const { data: userCart, isLoading, refetch } = useGetUserCartQuery();

  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Page title={CART.title}>
      <Container>
        <Typography variant='h5' component='h2' sx={{ my: 3 }}>
          Your Shopping Cart
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <LineItemsTable
              userCart={userCart}
              isLoading={isLoading}
              refetch={refetch}
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <OrderSummary
              userCart={userCart}
              isLoading={isLoading}
              refetch={refetch}
              snackbarState={snackbarState}
              setSnackbarState={setSnackbarState}
            />
          </Grid>
        </Grid>

        <Snackbar
          open={snackbarState.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity} variant='filled'>
            {snackbarState.message}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};

export default Cart;
