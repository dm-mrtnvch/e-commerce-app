import CloseIcon from '@mui/icons-material/Close';
import { Box, Container, Dialog, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import Page from '../../components/Page.tsx';
import { useGetProductByKeyQuery } from '../../redux/services/products.ts';
import { PAGE_404 } from '../../routes/routes.tsx';
import Breadcrumbs from '../Catalog/components/Breadcrumbs.tsx';
import ImageSlider from './components/ImageSlider.tsx';

const DetailedProduct = () => {
  const { key = '' } = useParams();
  const { state } = useLocation();

  const { data: product, isFetching, error } = useGetProductByKeyQuery(key);
  const [open, setOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleOpen = (index: number) => {
    setActiveSlide(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      </Container>
    </Page>
  );
};

export default DetailedProduct;
