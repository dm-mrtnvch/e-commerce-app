import { Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Cart } from '../../../types/cart';
import { Pagination } from '../../../types/common';

interface Props {
  userCart: Pagination<Cart> | undefined;
  isLoading?: boolean;
}

const OrderSummary = ({ userCart, isLoading }: Props) => {
  const lineItems = userCart?.results?.[0]?.lineItems;
  const subtotal = lineItems?.reduce((acc, item) => acc + (item.price.value.centAmount * item?.quantity ?? 0) / 100, 0);
  const discount = lineItems?.reduce(
    (acc, item) =>
      acc +
      (item?.price?.discounted
        ? ((item.price.value.centAmount - item.price.discounted.value.centAmount) * item?.quantity) / 100
        : 0),
    0,
  );
  const total = (userCart?.results?.[0]?.totalPrice?.centAmount ?? 0) / 100 || 0;

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
      </Table>
    </TableContainer>
  );
};

export default OrderSummary;
