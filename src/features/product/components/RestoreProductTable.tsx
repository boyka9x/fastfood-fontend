import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Category, Product } from '../../../models';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import { useState } from 'react';

export interface IRestoreProductTableProps {
  productList: Product[];
  categoryMap?: {
    [key: string]: Category;
  };
  onRemove?: (product: Product) => void;
  onRestore?: (product: Product) => void;
}

export default function RestoreProductTable({
  productList,
  categoryMap,
  onRemove,
  onRestore,
}: IRestoreProductTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRestoreClick = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleRestoreConfirm = (product: Product) => {
    onRestore?.(product);
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Image</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='right'>Price</TableCell>
              <TableCell align='right'>Discount</TableCell>
              <TableCell align='right'>Category</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productList.map((product, index) => (
              <TableRow hover key={product._id}>
                <TableCell align='left'>{index + 1}</TableCell>
                <TableCell align='left'>
                  <CardMedia component='img' src={product.image} height='50px' />
                </TableCell>
                <TableCell align='left'>{product.name}</TableCell>
                <TableCell align='right'>{product.price}</TableCell>
                <TableCell align='right'>{product.priceDiscount}</TableCell>
                <TableCell align='right'>{(product.type as Category)?.name}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='restore'
                    size='small'
                    color='primary'
                    onClick={() => handleRestoreClick(product)}
                  >
                    <RestoreFromTrashIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='small'
                    color='error'
                    onClick={() => onRemove?.(product)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
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
        <DialogTitle id='alert-dialog-title'>{'Restore this product?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to restore product{' '}
            <Typography color='primary' component='span'>
              {selectedProduct?.name}
            </Typography>
            . This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleRestoreConfirm(selectedProduct as Product)}
            autoFocus
            variant='contained'
          >
            Restore
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
