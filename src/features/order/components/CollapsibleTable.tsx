import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { Order } from '../../../models';
import CollapsibleRow from './CollapsibleRow';

export interface CollapsibleTableProps {
  orderList: Order[];
  onRemove?: (order: Order) => void;
}

export default function CollapsibleTable({ orderList, onRemove }: CollapsibleTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (order: Order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleRemoveConfirm = (order: Order) => {
    onRemove?.(order);
    setOpen(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table size='small' aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
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
            {orderList.map((order) => (
              <CollapsibleRow key={order._id} row={order} onRemove={handleRemoveClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Remove this order?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to remove order ID&nbsp;
            <Typography color='primary' component='span'>
              {selectedOrder?._id}
            </Typography>
            . This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            autoFocus
            variant='contained'
            onClick={() => handleRemoveConfirm(selectedOrder as Order)}
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
