import { FilterList } from '@mui/icons-material';
import { Button, Container, Grid, Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { Page } from '../../components';
import { useGetProductProjectionsSearchQuery } from '../../redux/services/product-projections';
import { CATALOG } from '../../routes/routes';
import { AttributePlainEnumValue } from '../../types/product-type';
import Filter from './components/Filter';
import ProductCard from './components/ProductCard';

const Catalog = () => {
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);

  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: AttributePlainEnumValue[] }>({});

  let filter = '';
  if (selectedProductTypes.length > 0) {
    filter += `productType.id:"${selectedProductTypes.join('","')}"`;
  }
  if (Object.keys(selectedAttributes).length > 0) {
    const attributes = Object.entries(selectedAttributes)
      .map(([key, values]) =>
        values.length > 0
          ? `variants.attributes.${key.toLocaleLowerCase()}.key:"${values.map((value) => value.key).join('","')}"`
          : undefined,
      )
      .filter(Boolean)
      .join('&filter=');
    filter += filter ? `&filter=${attributes}` : attributes;
  }

  const { data, isLoading } = useGetProductProjectionsSearchQuery({
    offset: (page - 1) * 20,
    filter: filter ? filter : undefined,
  });

  const handleOpenFilter = () => {
    setOpen(true);
  };

  const handleCloseFilter = () => {
    setOpen(false);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Page title={CATALOG.title}>
      <Container sx={{ py: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant='text' color='inherit' endIcon={<FilterList />} onClick={handleOpenFilter}>
              Filters
            </Button>
          </Grid>
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
          {data && data?.results?.length > 0 ? (
            <Grid item xs={12} sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                shape='rounded'
                count={Math.ceil((data?.total ?? 0) / (data?.limit ?? 1))}
                page={page}
                onChange={handlePageChange}
              />
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
              No products found
            </Grid>
          )}
        </Grid>
      </Container>
      <Filter
        open={open}
        onClose={handleCloseFilter}
        selectedAttributes={selectedAttributes}
        setSelectedAttributes={setSelectedAttributes}
        selectedProductTypes={selectedProductTypes}
        setSelectedProductTypes={setSelectedProductTypes}
      />
    </Page>
  );
};

export default Catalog;
