import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {
  Alert,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Skeleton,
  Snackbar,
  styled,
  Tooltip,
  Typography,
} from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateCartMutation, useGetUserCartQuery, useUpdateCartMutation } from '../../../redux/services/cart';
import { CATALOG } from '../../../routes/routes';
import { Cart } from '../../../types/cart';
import { ProductProjection } from '../../../types/product-projection';

interface Props {
  loading?: boolean;
  product?: ProductProjection;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  '&:hover': {
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
    transition: 'box-shadow 0.3s',

    '& > .MuiIconButton-root': {
      opacity: 1,
    },
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  margin: theme.spacing(1),
  height: 254,
  borderRadius: theme.spacing(1.5),
})) as typeof CardMedia;

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 3, 2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  borderRadius: theme.spacing(1.25),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(26),
  right: theme.spacing(2),
  opacity: 0,
  backgroundColor: 'var(--mui-palette-primary-main)',
  color: 'var(--mui-palette-primary-contrastText)',
  transition: theme.transitions.create(['opacity', 'backgroundColor'], {
    duration: theme.transitions.duration.short,
  }),
  '&:hover': {
    backgroundColor: 'var(--mui-palette-primary-dark)',
  },
}));

const StyledShortDescription = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '1rem',
  color: 'var(--mui-palette-text-secondary)',
}));

const ProductCard = ({ product, loading }: Props) => {
  const navigate = useNavigate();
  const { categoryKey } = useParams();

  const [image, setImage] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);

  const { data: userCard, isFetching, isLoading, refetch } = useGetUserCartQuery();
  const [createCart, { isLoading: isLoadingCreate }] = useCreateCartMutation();
  const [updateCart, { isLoading: isLoadingUpdate }] = useUpdateCartMutation();

  useEffect(() => {
    if (product) {
      const image = product?.masterVariant?.images?.[0]?.url;
      setImage(image);
    }
  }, [product]);

  const handleMouseEnter = () => {
    if (product && product?.masterVariant.images?.[1]) {
      const image = product?.masterVariant.images?.[1].url;
      setImage(image);
    }
  };

  const handleMouseLeave = () => {
    if (product) {
      const image = product?.masterVariant?.images?.[0]?.url;
      setImage(image);
    }
  };

  const handleClick = () => {
    if (product) {
      navigate(`${CATALOG.path}/details/${product.key}` ?? '', { state: { categoryKey: categoryKey ?? '' } });
    }
  };

  const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  if (!product && loading) {
    return (
      <StyledCard>
        <Skeleton variant='rectangular' width='100%' height={254} />
        <CardContent>
          <Skeleton variant='text' width='75%' />
          <Skeleton variant='text' width='25%' />
        </CardContent>
      </StyledCard>
    );
  } else if (product && !loading) {
    const name = product?.name['en-US'];
    const price = product?.masterVariant?.prices?.[0];

    return (
      <>
        <StyledCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
          {price?.discounted && <StyledChip label='Sale' color='primary' />}
          <StyledCardMedia component='div' image={image} title={name} />
          <Tooltip arrow title='Add to card'>
            <StyledIconButton
              size='large'
              onClick={async (e) => {
                e.stopPropagation();

                let cart: Cart | undefined;
                if (userCard?.results && userCard.results.length > 0) {
                  cart = userCard.results[0];
                } else {
                  await createCart({ currency: 'USD' })
                    .unwrap()
                    .then((response) => {
                      cart = response;
                    });
                }

                if (cart) {
                  await updateCart({
                    id: cart.id,
                    version: cart.version,
                    actions: [
                      {
                        action: 'addLineItem',
                        productId: product.id,
                        variantId: product.masterVariant.id,
                        quantity: 1,
                      },
                    ],
                  })
                    .unwrap()
                    .then(() => {
                      setOpen(true);
                      refetch();
                    });
                }
              }}
              disabled={
                isFetching ||
                isLoading ||
                isLoadingCreate ||
                isLoadingUpdate ||
                !!userCard?.results?.find((cart) =>
                  cart?.lineItems?.find((lineItem) => lineItem.productId === product?.id),
                )
              }
            >
              <AddShoppingCartIcon />
            </StyledIconButton>
          </Tooltip>
          <StyledCardContent>
            <Typography gutterBottom variant='subtitle1'>
              {name}
            </Typography>
            <StyledShortDescription variant='caption'>
              {product?.description?.['en-US'] || 'No description available'}
            </StyledShortDescription>
            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
              <Typography variant='h6' sx={{ display: 'flex', gap: 1 }}>
                {price?.discounted ? (
                  <Typography component='span' sx={{ textDecoration: 'line-through' }} color='text.secondary'>
                    ${((price?.value?.centAmount ?? 0) / 100).toFixed(2)}
                  </Typography>
                ) : null}
                <Typography component='span'>
                  $
                  {price?.discounted
                    ? ((price.discounted.value.centAmount ?? 0) / 100).toFixed(2)
                    : ((price?.value?.centAmount ?? 0) / 100).toFixed(2)}
                </Typography>
              </Typography>
            </div>
          </StyledCardContent>
        </StyledCard>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity='success' variant='filled'>
            Product added to cart
          </Alert>
        </Snackbar>
      </>
    );
  }
};

export default ProductCard;
