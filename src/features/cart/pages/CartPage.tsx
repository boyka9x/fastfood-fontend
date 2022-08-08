import ClearAllIcon from '@mui/icons-material/ClearAll';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Radio,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  cartActions,
  CartProduct,
  selectCartMap,
  selectIsLoading,
  selectTotalPrice,
} from '../cartSlice';
import ProductCart from '../components/ProductCart';

export default function CartPage() {
  const dispatch = useAppDispatch();

  const cartMap = useAppSelector(selectCartMap);
  const totalPrice = useAppSelector(selectTotalPrice);
  const loading = useAppSelector(selectIsLoading);

  const [comment, setComment] = useState('');

  const handleRemoveProduct = (product: CartProduct) => {
    if (product._id === undefined) return;
    dispatch(cartActions.removeProduct(product._id));
  };

  const handleIncreaseProduct = (product: CartProduct) => {
    if (product._id === undefined) return;
    dispatch(cartActions.increaseQuantity(product._id));
  };

  const handleDecreaseProduct = (product: CartProduct) => {
    if (product._id === undefined) return;
    dispatch(cartActions.decreaseQuantity(product._id));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const handleOrderSubmit = () => {
    if (cartMap.length < 1) return toast.error('Empty product!');
    dispatch(cartActions.order({ products: cartMap, comments: comment }));
  };

  const handleClearAll = () => {
    dispatch(cartActions.clearAll());
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Typography variant='h4' color='primary' component='h1'>
          Order Menu
        </Typography>
        <Tooltip title='Clear all' placement='bottom'>
          <IconButton onClick={handleClearAll}>
            <ClearAllIcon color='primary' />
          </IconButton>
        </Tooltip>
      </Box>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          minHeight: '140px',
          maxHeight: '280px',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          mt: 2,
          p: 1,
        }}
      >
        <Box sx={{ flexGrow: 1, overflowY: 'auto', minWidth: '100%' }}>
          {cartMap.map((cart) => {
            return (
              <ProductCart
                key={cart._id}
                product={cart}
                onRemove={handleRemoveProduct}
                onIncrease={handleIncreaseProduct}
                onDecrease={handleDecreaseProduct}
              />
            );
          })}
        </Box>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, ml: -1 }}>
        <Radio size='small' />
        <Typography>Pay on delivery</Typography>
      </Box>
      <TextField
        fullWidth
        id='filled-textarea'
        label='Comment'
        multiline
        variant='standard'
        color='primary'
        value={comment}
        onChange={handleCommentChange}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Typography variant='h6' color='primary'>
          Total price:
        </Typography>
        <Typography variant='h6' fontWeight='600' ml={2}>
          {totalPrice}
        </Typography>
      </Box>
      <Button variant='contained' onClick={handleOrderSubmit}>
        {loading && <CircularProgress size='small' color='inherit' />}Order
      </Button>
    </Box>
  );
}
