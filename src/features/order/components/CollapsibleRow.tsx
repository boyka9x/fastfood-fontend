import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Order } from '../../../models';
import { formatDate } from '../../../utils';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export interface CollapsibleRowProps {
  row: Order;
  onRemove?: (order: Order) => void;
}

export default function CollapsibleRow({ row, onRemove }: CollapsibleRowProps) {
  const [open, setOpen] = React.useState(false);

  const handleRemoveClick = () => {
    if (!onRemove) return;
    onRemove(row);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row._id}
        </TableCell>
        <TableCell align='right'>{formatDate(row.createdAt)}</TableCell>
        <TableCell align='right'>{formatDate(row.shipmentDate)}</TableCell>
        <TableCell align='right'>{formatDate(row.paymentDate)}</TableCell>
        <TableCell align='right'>{row.totalPrice}</TableCell>
        <TableCell align='right'>{row.status}</TableCell>
        <TableCell align='right'>
          {
            <IconButton size='small' color='secondary' disabled={Boolean(row.shipmentDate)}>
              <PaidIcon />
            </IconButton>
          }
          {
            <IconButton
              disabled={row.status !== 'order'}
              size='small'
              color='default'
              onClick={handleRemoveClick}
            >
              <RemoveShoppingCartIcon />
            </IconButton>
          }
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.products.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell component='th' scope='row'>
                        {index + 1}
                      </TableCell>
                      <TableCell>{product.name || ''}</TableCell>
                      <TableCell align='right'>{product.price}</TableCell>
                      <TableCell align='right'>{product.quantity}</TableCell>
                      <TableCell align='center'>
                        <Link component={RouterLink} to={`/products/${product.productId.slug}`}>
                          <IconButton size='small'>
                            <InfoIcon fontSize='inherit' color='primary' />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {row.comments && (
                <Typography mt={1} variant='body2' component='div'>
                  <strong>Note:</strong> {row.comments}
                </Typography>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
