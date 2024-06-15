import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Button,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import placeholderImage from '../../../assets/images/no-image.webp';
import { useUpdateCartMutation } from '../../../redux/services/cart';
import { CATALOG } from '../../../routes/routes';
import { Cart } from '../../../types/cart';
import { Pagination } from '../../../types/common';
import { Dispatch } from 'react';

interface Props {
  userCart: Pagination<Cart> | undefined;
  isLoading?: boolean;
  refetch: () => void;
  snackbarState: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  };
  setSnackbarState: Dispatch<
    React.SetStateAction<{
      open: boolean;
      message: string;
      severity: 'success' | 'error' | 'warning' | 'info';
    }>
  >;
}

const LineItemsTable = ({ userCart, isLoading, refetch, snackbarState, setSnackbarState }: Props) => {
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();
  const lineItems = userCart?.results?.[0]?.lineItems;

  const handleRemoveFromCart = async (lineItemId: string) => {
    if (!userCart?.results?.[0]) {
      setSnackbarState({ ...snackbarState, open: true, message: 'Cart not found', severity: 'error' });
      return;
    }

    try {
      await updateCart({
        id: userCart.results[0].id,
        version: userCart.results[0].version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      }).unwrap();
      refetch();
      setSnackbarState({ ...snackbarState, open: true, message: 'Product removed from cart', severity: 'success' });
    } catch (error) {
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: 'Failed to remove product from cart',
        severity: 'error',
      });
    }
  };

  const handleUpdateQuantity = async (lineItemId: string, quantity: number) => {
    if (!userCart?.results?.[0]) {
      setSnackbarState({ ...snackbarState, open: true, message: 'Cart not found', severity: 'error' });
      return;
    }

    try {
      await updateCart({
        id: userCart.results[0].id,
        version: userCart.results[0].version,
        actions: [
          {
            action: 'changeLineItemQuantity',
            lineItemId,
            quantity,
          },
        ],
      }).unwrap();
      refetch();
      setSnackbarState({ ...snackbarState, open: true, message: 'Product quantity updated', severity: 'success' });
    } catch (error) {
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: 'Failed to update product quantity',
        severity: 'error',
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lineItems?.map((lineItem) => (
            <TableRow key={lineItem?.id}>
              <TableCell>
                <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                  <img
                    src={lineItem?.variant.images?.[0]?.url || placeholderImage}
                    alt={lineItem?.name['en-US']}
                    style={{ width: '64px', height: 'auto', marginRight: '16px', borderRadius: '16px' }}
                  />
                  <Typography variant='subtitle2' fontSize='inherit'>
                    {lineItem?.name['en-US']}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction='column' spacing={1}>
                  {lineItem?.price?.discounted ? (
                    <Typography fontSize='inherit' sx={{ textDecoration: 'line-through' }} color='text.secondary'>
                      ${((lineItem?.price?.value?.centAmount ?? 0) / 100).toFixed(2)}
                    </Typography>
                  ) : null}
                  $
                  {lineItem?.price?.discounted
                    ? ((lineItem?.price.discounted.value.centAmount ?? 0) / 100).toFixed(2)
                    : ((lineItem?.price?.value?.centAmount ?? 0) / 100).toFixed(2)}
                </Stack>
              </TableCell>
              <TableCell>
                <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                  <IconButton
                    size='small'
                    disabled={lineItem.quantity === 1 || isUpdating || isLoading}
                    onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity - 1)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography fontSize='inherit'>{lineItem?.quantity}</Typography>
                  <IconButton
                    size='small'
                    disabled={isUpdating || isLoading}
                    onClick={() => handleUpdateQuantity(lineItem.id, lineItem.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Stack>
              </TableCell>
              <TableCell>${(lineItem?.totalPrice.centAmount / 100).toFixed(2)}</TableCell>
              <TableCell>
                <IconButton
                  size='small'
                  disabled={isUpdating || isLoading}
                  onClick={() => handleRemoveFromCart(lineItem.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {lineItems?.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Stack direction='column' spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography variant='h6' align='center' gutterBottom>
                    Your cart is empty
                  </Typography>
                  <Button variant='contained' color='primary' size='small' component={Link} to={CATALOG.path}>
                    Continue Shopping
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          )}
          {isLoading &&
            Array.from({ length: 3 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                    <Skeleton variant='rounded' width={64} height={64} sx={{ borderRadius: '16px' }} />
                    <Skeleton variant='text' width={200} />
                  </Stack>
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' width={100} />
                </TableCell>
                <TableCell>
                  <Skeleton variant='circular' />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LineItemsTable;
