import { Container, Grid } from '@mui/material';
import { Page } from '../../components';
import { useGetProductsQuery } from '../../redux/services/products';
import { CATALOG } from '../../routes/routes';
import ProductCard from './components/ProductCard';

const Catalog = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <Page title={CATALOG.title}>
      <Container sx={{ py: 1 }}>
        <Grid container spacing={2}>
          {data?.results?.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
          {isLoading &&
            Array.from({ length: 12 }).map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <ProductCard loading />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Page>
  );
};

export default Catalog;
