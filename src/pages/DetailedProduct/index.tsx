import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Alert, Box, Button, Container, Dialog, Grid, IconButton, Snackbar, Stack, Typography } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import { PAGE_404 } from '../../routes/routes.tsx';
import Page from '../../components/Page.tsx';
import Breadcrumbs from '../Catalog/components/Breadcrumbs.tsx';
import ImageSlider from './components/ImageSlider.tsx';
import { useGetUserCartQuery, useCreateCartMutation, useUpdateCartMutation } from '../../redux/services/cart';
import { useGetProductByKeyQuery } from '../../redux/services/products.ts';
import { CartUpdateAction } from '../../types/cart';

const DetailedProduct = () => {
  const { key = '' } = useParams();
  const { state } = useLocation();

  const { data: product, isFetching, error } = useGetProductByKeyQuery(key);
  const { data: userCart, refetch } = useGetUserCartQuery();
  const [createCart] = useCreateCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [isInCart, setIsInCart] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (userCart?.results && product) {
      const cart = userCart.results[0];
      if (cart) {
        const productInCart = cart.lineItems.find((item) => item.productId === product.id);
        setIsInCart(!!productInCart);
      }
    }
  }, [userCart, product]);

  const handleOpen = (index: number) => {
    setActiveSlide(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleAddToCart = async () => {
    if (!product || !product.id || !product.masterData.current.masterVariant.id) {
      setSnackbarMessage('Product or required product fields are missing');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    let cart;
    if (userCart?.results && userCart.results.length > 0) {
      cart = userCart.results[0];
    } else {
      const response = await createCart({ currency: 'USD' }).unwrap();
      cart = response;
    }

    if (cart) {
      try {
        await updateCart({
          id: cart.id,
          version: cart.version,
          actions: [
            {
              action: 'addLineItem',
              productId: product.id,
              variantId: product.masterData.current.masterVariant.id,
              quantity: 1,
            },
          ] as CartUpdateAction[],
        }).unwrap();

        setSnackbarMessage('Product added to cart');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        refetch();
      } catch (error) {
        setSnackbarMessage('Failed to add product to cart');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    }
  };

  const handleRemoveFromCart = async () => {
    if (!userCart?.results || !product) {
      return;
    }

    const cart = userCart.results[0];
    if (cart) {
      const lineItem = cart.lineItems.find((item) => item.productId === product.id);
      if (lineItem) {
        try {
          await updateCart({
            id: cart.id,
            version: cart.version,
            actions: [
              {
                action: 'removeLineItem',
                lineItemId: lineItem.id,
              },
            ] as CartUpdateAction[],
          }).unwrap();

          setSnackbarMessage('Product removed from cart');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          refetch();
        } catch (error) {
          setSnackbarMessage('Failed to remove product from cart');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        }
      }
    }
  };

  if (isFetching) {
    return <div style={{ position: 'absolute', top: '50%', left: '50%' }}>Loading...</div>;
  }

  if (!product || error) {
    return <Navigate to={PAGE_404.path} />;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const images = masterVariant.images || [];
  const price = masterVariant?.prices?.[0];
  const regularPrice = (price?.value.centAmount ?? 0) / 100;
  const discountedPrice = price?.discounted ? (price.discounted.value.centAmount ?? 0) / 100 : null;

  return (
    <Page title={name['en-US'] ?? 'Detailed product page'}>
      <Container maxWidth='lg' sx={{ paddingBottom: '5rem' }}>
        <Breadcrumbs detailedPage categoryId={state.categoryKey} productKey={key} />
        <Grid container spacing={4} alignItems='center' sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
              <ImageSlider images={images} onImageClick={handleOpen} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' component='h1' gutterBottom sx={{ fontWeight: 'bold' }}>
              {name['en-US']}
            </Typography>
            <Stack direction='row' spacing={2} sx={{ marginBottom: '0.5rem' }} alignItems='center'>
              {discountedPrice ? (
                <>
                  <Typography variant='h5' color='text.secondary' sx={{ textDecoration: 'line-through' }}>
                    ${regularPrice.toFixed(2)}
                  </Typography>
                  <Typography variant='h5' color='primary'>
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <Typography variant='h5' color='primary'>
                  ${regularPrice.toFixed(2)}
                </Typography>
              )}
            </Stack>
            <Typography variant='body1' paragraph sx={{ fontSize: '1rem' }}>
              {description && description['en-US']}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {isInCart ? (
                  <Button
                    variant='contained'
                    color='error'
                    onClick={handleRemoveFromCart}
                    fullWidth
                    startIcon={<RemoveShoppingCartIcon />}
                  >
                    Remove from Cart
                  </Button>
                ) : (
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleAddToCart}
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Dialog fullScreen open={open} onClose={handleClose}>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 16,
              top: 16,
              zIndex: 2,
              color: 'black',
            }}
          >
            <CloseIcon />
          </IconButton>
          <ImageSlider images={images} initialSlide={activeSlide} fullScreen />
        </Dialog>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} variant='filled'>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Page>
  );
};

export default DetailedProduct;
