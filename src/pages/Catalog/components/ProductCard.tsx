import { Card, CardContent, CardMedia, Chip, Skeleton, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductProjection } from '../../../types/product-projection';
import { CATALOG } from '../../../routes/routes';

interface Props {
  loading?: boolean;
  product?: ProductProjection;
}

const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.spacing(2),
  height: '100%',
  '&:hover': {
    cursor: 'pointer',
    boxShadow: theme.shadows[4],
    transition: 'box-shadow 0.3s',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  margin: theme.spacing(1),
  height: 254,
  borderRadius: theme.spacing(1.5),
})) as typeof CardMedia;

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2, 3, 3),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
  borderRadius: theme.spacing(1.25),
}));

const StyledShortDescription = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '2rem',
  color: '#695d5d',
}));

const ProductCard = ({ product, loading }: Props) => {
  const { categoryKey } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState<string | undefined>(undefined);

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
      <StyledCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
        {price?.discounted && <StyledChip label='Sale' color='primary' />}
        <StyledCardMedia component='div' image={image} title={name} />
        <StyledCardContent>
          <Typography gutterBottom variant='subtitle1'>
            {name}
          </Typography>
          <StyledShortDescription variant='caption'>
            {product?.description?.['en-US'] || 'No description available'}
          </StyledShortDescription>
          <div style={{ position: 'absolute', bottom: '1rem' }}>
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
    );
  }
};

export default ProductCard;
