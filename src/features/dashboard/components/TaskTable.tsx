import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Order } from '../../../models';
import { formatRelativeTime, formatDate } from '../../../utils';
import { IconButton } from '@mui/material';
import PageviewIcon from '@mui/icons-material/Pageview';

export interface TaskTableProps {
  rows: Order[];
  onClick?: (order: Order) => void;
}

export default function TaskTable({ rows, onClick }: TaskTableProps) {
  const handleClick = (order: Order) => {
    if (!onClick) return;

    onClick(order);
  };

  return (
    <TableContainer component={Paper}>
      <Table size='small' aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>ID</TableCell>
            <TableCell align='right'>Order </TableCell>
            <TableCell align='right'>Payment</TableCell>
            <TableCell align='right'>Total Price</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='left'>{index + 1}</TableCell>
              <TableCell align='right'>{formatRelativeTime(row.createdAt)}</TableCell>
              <TableCell align='right'>{formatDate(row.paymentDate)}</TableCell>
              <TableCell align='right'>{row.totalPrice}</TableCell>
              <TableCell align='right'>
                <IconButton size='small' color='primary' onClick={() => handleClick(row)}>
                  <PageviewIcon fontSize='medium' color='inherit' />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
