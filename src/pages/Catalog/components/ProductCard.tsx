import { Card, CardContent, CardMedia, Skeleton, styled, Typography } from '@mui/material';
import { Product } from '../../../types/product';
import { useEffect, useState } from 'react';

interface Props {
  loading?: boolean;
  product?: Product;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
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

const ProductCard = ({ product, loading }: Props) => {
  const [image, setImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (product) {
      const image = product?.masterData?.current?.masterVariant?.images[0]?.url;
      setImage(image);
    }
  }, [product]);

  const handleMouseEnter = () => {
    if (product && product.masterData.current.masterVariant.images[1]) {
      const image = product.masterData.current.masterVariant.images[1].url;
      setImage(image);
    }
  };

  const handleMouseLeave = () => {
    if (product) {
      const image = product?.masterData?.current?.masterVariant?.images[0]?.url;
      setImage(image);
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
    return (
      <StyledCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <StyledCardMedia component='div' image={image} title={product.masterData.current.name['en-US']} />
        <StyledCardContent>
          <Typography gutterBottom variant='subtitle1'>
            {product?.masterData?.current?.name['en-US']}
          </Typography>
          <Typography variant='h6'>
            ${product?.masterData?.current?.masterVariant?.prices[0]?.value?.centAmount / 100}
          </Typography>
        </StyledCardContent>
      </StyledCard>
    );
  }
};

export default ProductCard;
