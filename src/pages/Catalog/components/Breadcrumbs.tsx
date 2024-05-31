import { Home } from '@mui/icons-material';
import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { useGetCategoriesQuery } from '../../../redux/services/category';
import { CATALOG } from '../../../routes/routes';
import { Category } from '../../../types/category';

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

const Breadcrumbs = () => {
  const { categoryKey } = useParams();
  const { data, isLoading, isFetching } = useGetCategoriesQuery();
  const breadcrumbs = getBreadcrumbs(data?.results ?? [], categoryKey ?? '');

  return (
    <MuiBreadcrumbs separator='-'>
      {categoryKey ? (
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
        : null}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
