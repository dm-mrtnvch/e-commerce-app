import { Container, Grid, Pagination, Stack } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '../../components';
import { useGetProductProjectionsSearchQuery } from '../../redux/services/product-projections';
import { CATALOG } from '../../routes/routes';
import { Option } from '../../types/common';
import { AttributePlainEnumValue } from '../../types/product-type';
import generateFilter from '../../utils/filter';
import Breadcrumbs from './components/Breadcrumbs';
import Categories from './components/Categories';
import Filter from './components/Filter';
import ProductCard from './components/ProductCard';
import Search from './components/Search';
import Sort from './components/Sort';

const sortOptions = [
  {
    label: 'Newest',
    value: 'createdAt desc',
  },
  {
    label: 'Oldest',
    value: 'createdAt asc',
  },
  {
    label: 'Price: Low to High',
    value: 'price asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price desc',
  },
];

const Catalog = () => {
  const { categoryKey } = useParams();
  const [page, setPage] = useState<number>(1);
  const [activeSortType, setActiveSortType] = useState<Option>(sortOptions[0]);
  const [searchText, setSearchText] = useState<string>('');

  const [selectedProductTypes, setSelectedProductTypes] = useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = useState<{ [key: string]: AttributePlainEnumValue[] }>({});

  useEffect(() => {
    setPage(1);
  }, [selectedProductTypes, selectedAttributes, searchText, activeSortType, categoryKey]);

  const { data, isLoading, isFetching } = useGetProductProjectionsSearchQuery({
    offset: (page - 1) * 20,
    filter: generateFilter({
      productTypes: selectedProductTypes,
      attributes: selectedAttributes,
      category: categoryKey ?? '',
    }),
    sort: activeSortType.value,
    search: searchText,
  });

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Page title={CATALOG.title}>
      <Container sx={{ py: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Breadcrumbs />
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
            <Search searchText={searchText} setSearchText={setSearchText} />

            <Stack direction='row' gap={1}>
              <Sort activeSortType={activeSortType} setActiveSortType={setActiveSortType} options={sortOptions} />
              <Filter
                selectedAttributes={selectedAttributes}
                setSelectedAttributes={setSelectedAttributes}
                selectedProductTypes={selectedProductTypes}
                setSelectedProductTypes={setSelectedProductTypes}
              />
              <Categories />
            </Stack>
          </Grid>
          {data?.results?.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
          {(isLoading || isFetching) &&
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
    </Page>
  );
};

export default Catalog;
