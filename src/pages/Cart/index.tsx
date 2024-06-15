import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CART, CATALOG } from '../../routes/routes';
import { Box, Button, Container, Grid, Typography, IconButton, Paper, Snackbar, Alert } from '@mui/material';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useGetUserCartQuery, useUpdateCartMutation } from '../../redux/services/cart';
import { Page } from '../../components';
import placeholderImage from '../../assets/images/no-image.webp';

const Cart = () => {
  const { data: userCart, isLoading, error, refetch } = useGetUserCartQuery();
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (!isUpdating) {
      refetch();
    }
  }, [isUpdating, refetch]);

  const handleRemoveFromCart = async (lineItemId: string) => {
    if (!userCart?.results?.[0]) {
      setSnackbarMessage('Cart not found');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await updateCart({
        id: userCart.results[0].id,
        version: userCart.results[0].version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      }).unwrap();
      refetch();
      setSnackbarMessage('Product removed from cart');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to remove product from cart');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    if (!userCart?.results?.[0]) {
      setSnackbarMessage('Cart not found');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      await updateCart({
        id: userCart.results[0].id,
        version: userCart.results[0].version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      }).unwrap();
      refetch();
      setSnackbarMessage('Product quantity updated');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Failed to update product quantity');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (isLoading || isUpdating) {
    return (
      <Page title={CART.title}>
        <Container>
          <Typography variant='h4' component='h1' gutterBottom>
            Loading...
          </Typography>
        </Container>
      </Page>
    );
  }

  if (error || !userCart?.results?.length || userCart.results[0].lineItems.length === 0) {
    return (
      <Page title={CART.title}>
        <Container>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '80vh',
              textAlign: 'center',
            }}
          >
            <Typography variant='h4' component='h1' gutterBottom>
              Your Shopping Cart is empty
            </Typography>
            <Typography variant='body1' component='p' gutterBottom sx={{ marginTop: 2 }}>
              Looks like you haven`t added anything to your cart yet.
            </Typography>
            <Button variant='contained' color='primary' component={Link} to={CATALOG.path} sx={{ marginTop: 5 }}>
              Go to Catalog
            </Button>
          </Box>
        </Container>
      </Page>
    );
  }

  const cart = userCart.results[0];

  return (
    <Page title={CART.title}>
      <Container>
        <Typography variant='h4' component='h1' gutterBottom>
          Your Shopping Cart
        </Typography>
        <Grid container spacing={2}>
          {cart.lineItems.map((item) => (
            <Grid item xs={12} key={item.id}>
              <Paper
                elevation={3}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  padding: '16px',
                  marginBottom: '16px',
                  gap: 2,
                }}
              >
                <img
                  src={item.variant.images?.[0]?.url || placeholderImage}
                  alt={item.name['en-US']}
                  style={{ width: '150px', height: 'auto', marginRight: '16px' }}
                />
                <Box
                  sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  <Typography variant='h6' component='h2' sx={{ mt: { xs: 2, sm: 0 } }}>
                    {item.name['en-US']}
                  </Typography>
                  <Typography variant='body1' component='p' sx={{ mt: 2 }}>
                    Price: ${(item.price.value.centAmount / 100).toFixed(2)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant='body1' component='p' sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>
                      <AddIcon />
                    </IconButton>
                  </Box>
                  <Typography variant='body1' component='p' sx={{ mt: 1 }}>
                    Total: ${(item.totalPrice.centAmount / 100).toFixed(2)}
                  </Typography>
                  <IconButton color='error' onClick={() => handleRemoveFromCart(item.id)} sx={{ mt: 2 }}>
                    <RemoveShoppingCartIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant='filled'>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};

export default Cart;
