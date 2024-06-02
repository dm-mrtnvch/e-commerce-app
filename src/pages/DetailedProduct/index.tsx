import { Navigate, useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid, Stack } from '@mui/material';
import Slider from 'react-slick';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useGetProductByKeyQuery } from '../../redux/services/products.ts';
import Breadcrumbs from '../Catalog/components/Breadcrumbs.tsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MouseEventHandler } from 'react';
import { PAGE_404 } from '../../routes/routes.tsx';

function NextArrow({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
    >
      <ArrowForwardIosIcon style={{ color: 'gray' }} />
    </div>
  );
}

function PrevArrow({ onClick }: { onClick?: MouseEventHandler<HTMLDivElement> }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        zIndex: 1,
      }}
    >
      <ArrowBackIosNewIcon style={{ color: 'gray' }} />
    </div>
  );
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  adaptiveHeight: true,
};

const DetailedProduct = () => {
  const { key = '' } = useParams();
  const { data: product, isFetching, error } = useGetProductByKeyQuery(key);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (!product || error) {
    return <Navigate to={PAGE_404.path} />;
  }

  const { name, description, masterVariant } = product.masterData.current;
  const images = masterVariant.images;
  const price = masterVariant?.prices?.[0];
  const regularPrice = (price?.value.centAmount ?? 0) / 100;
  const discountedPrice = price?.discounted ? (price.discounted.value.centAmount ?? 0) / 100 : null;

  return (
    <Container maxWidth='lg' sx={{ paddingBottom: '5rem' }}>
      <Breadcrumbs />
      <Grid container spacing={4} alignItems='center' sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
            <Slider {...settings}>
              {images?.length &&
                images.map((image, index) => (
                  <Box
                    key={index}
                    component='img'
                    sx={{ width: '100%', height: 400, objectFit: 'contain' }}
                    src={image.url}
                    alt={`Product Image ${index}`}
                  />
                ))}
            </Slider>
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
    </Container>
  );
};

export default DetailedProduct;
