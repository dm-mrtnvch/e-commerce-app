/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useUpdateCartMutation } from '../../../redux/services/cart';
import { Cart } from '../../../types/cart';
import { Pagination } from '../../../types/common';
import { Dispatch, useState } from 'react';

interface Props {
  userCart: Pagination<Cart> | undefined;
  isLoading?: boolean;
  refetch?: () => void;
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

const OrderSummary = ({ userCart, isLoading, refetch, snackbarState, setSnackbarState }: Props) => {
  const [code, setCode] = useState('');
  const [updateCart, { isLoading: isUpdating }] = useUpdateCartMutation();

  const lineItems = userCart?.results?.[0]?.lineItems;
  const subtotal = lineItems?.reduce((acc, item) => acc + (item.price.value.centAmount * item?.quantity ?? 0) / 100, 0);
  const discount =
    (lineItems?.reduce(
      (acc, item) =>
        acc +
        (item?.price?.discounted
          ? ((item.price.value.centAmount - item.price.discounted.value.centAmount) * item?.quantity) / 100
          : 0),
      0,
    ) ?? 0) +
    (userCart?.results?.[0]?.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0) / 100;
  const total = (userCart?.results?.[0]?.totalPrice?.centAmount ?? 0) / 100 || 0;

  const handleApplyPromoCode = async () => {
    await updateCart({
      id: userCart?.results?.[0]?.id ?? '',
      version: userCart?.results?.[0]?.version ?? 0,
      actions: [
        {
          action: 'addDiscountCode',
          code,
        },
      ],
    })
      .unwrap()
      .then(() => {
        refetch?.();
        setSnackbarState({ ...snackbarState, open: true, message: 'Promo code applied', severity: 'success' });
      })
      .catch(() => {
        setSnackbarState({ ...snackbarState, open: true, message: 'Failed to apply promo code', severity: 'error' });
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>Order summary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            <>
              <TableRow>
                <TableCell>Subtotal</TableCell>
                <TableCell align='right'>${subtotal?.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Discount</TableCell>
                <TableCell align='right'>${discount?.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell align='right'>${total?.toFixed(2)}</TableCell>
              </TableRow>
            </>
          ) : (
            <>
              <TableRow>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
                <TableCell>
                  <Skeleton variant='text' />
                </TableCell>
              </TableRow>
            </>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>
              <TextField
                fullWidth
                size='small'
                placeholder='Enter promo code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <Button
                      size='small'
                      variant='contained'
                      color='primary'
                      onClick={() => handleApplyPromoCode()}
                      disabled={isUpdating || isLoading}
                    >
                      Apply
                    </Button>
                  ),
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default OrderSummary;
