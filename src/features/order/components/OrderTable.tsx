import { IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Order } from '../../../models';
import { formatDate } from '../../../utils';
import PageviewIcon from '@mui/icons-material/Pageview';

export interface CollapsibleTableProps {
  orderList: Order[];
  onView?: (order: Order) => void;
}

export default function OrderTable({ orderList, onView }: CollapsibleTableProps) {
  const handleViewClick = (order: Order) => {
    if (!onView) return;

    onView(order);
  };
  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='collapsible table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align='right'>Order</TableCell>
            <TableCell align='right'>Shipment</TableCell>
            <TableCell align='right'>Payment</TableCell>
            <TableCell align='right'>Total price</TableCell>
            <TableCell align='right'>Status</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderList.map((order, index) => (
            <TableRow hover key={order._id}>
              <TableCell align='left'>{order._id}</TableCell>
              <TableCell align='right'>{formatDate(order.createdAt)}</TableCell>
              <TableCell align='right'>{formatDate(order.shipmentDate)}</TableCell>
              <TableCell align='right'>{formatDate(order.paymentDate)}</TableCell>
              <TableCell align='right'>{order.totalPrice}</TableCell>
              <TableCell align='right'>{order.status}</TableCell>
              <TableCell align='right'>
                <IconButton size='small' color='primary' onClick={() => handleViewClick(order)}>
                  <PageviewIcon fontSize='inherit' color='inherit' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
