import { Home } from '@mui/icons-material';
import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../redux/services/category';
import { CATALOG } from '../../../routes/routes';
import { Category } from '../../../types/category';
import { useGetProductByKeyQuery } from '../../../redux/services/products';

function getBreadcrumbs(categories: Category[], activeCategoryId: string): Category[] {
  const breadcrumbs: Category[] = [];
  let currentCategory = categories.find((category) => category.id === activeCategoryId);

  while (currentCategory) {
    breadcrumbs.unshift(currentCategory);
    if (currentCategory.parent) {
      currentCategory = categories.find((category) => category.id === currentCategory?.parent?.id);
    } else {
      currentCategory = undefined;
    }
  }

  return breadcrumbs;
}

interface Props {
  categoryId?: string;
  productKey?: string;
  detailedPage?: boolean;
}

const Breadcrumbs = ({ categoryId, productKey, detailedPage = false }: Props) => {
  const { categoryKey } = useParams();
  const { data, isLoading, isFetching } = useGetCategoriesQuery();
  const { data: product, isFetching: isFetchingProduct } = useGetProductByKeyQuery(productKey ?? '');
  const breadcrumbs = getBreadcrumbs(data?.results ?? [], categoryKey ?? categoryId ?? '');

  return (
    <MuiBreadcrumbs separator='-'>
      {categoryKey || detailedPage ? (
        <Link
          underline='hover'
          color='inherit'
          component={RouterLink}
          to={CATALOG.path}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Home sx={{ mr: 0.5 }} fontSize='inherit' />
          Home
        </Link>
      ) : (
        <Typography color='text.primary' sx={{ display: 'flex', alignItems: 'center' }}>
          <Home sx={{ mr: 0.5 }} fontSize='inherit' />
          Home
        </Typography>
      )}
      {!isLoading || !isFetching
        ? breadcrumbs.map((category) =>
            categoryKey !== category.id ? (
              <Link
                key={category.id}
                underline='hover'
                color='inherit'
                component={RouterLink}
                to={`${CATALOG.path}/${category.id}`}
              >
                {category.name['en-US']}
              </Link>
            ) : (
              <Typography key={category.id} color='text.primary'>
                {category.name['en-US']}
              </Typography>
            ),
          )
        : Array.from({ length: 3 }, (_, index) => (
            <Typography key={index} color='text.primary'>
              Loading...
            </Typography>
          ))}
      {productKey &&
        detailedPage &&
        (!isFetchingProduct ? (
          <Typography color='text.primary'>{product?.masterData.current.name['en-US']}</Typography>
        ) : (
          <Typography color='text.primary'>Loading...</Typography>
        ))}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
