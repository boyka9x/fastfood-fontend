import ClearAllIcon from '@mui/icons-material/ClearAll';
import { Box, Button, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import PaymentCard from '../../../components/Common/PaymentCard';
import { cartActions, CartProduct, selectCartMap, selectTotalPrice } from '../cartSlice';
import ProductCart from '../components/ProductCart';

export default function OrderMenu() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const cartMap = useAppSelector(selectCartMap);
  const totalPrice = useAppSelector(selectTotalPrice);

  const handleRemoveProduct = (product: CartProduct) => {
    if (product._id === undefined) return;
    dispatch(cartActions.removeProduct(product._id));
  };

  const handleClearAll = () => {
    dispatch(cartActions.clearAll());
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'none', lg: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: '320px',
        minHeight: '100%',
        p: 1,
      }}
    >
      <PaymentCard />
      <Paper
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          maxHeight: '360px',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexGrow: 1,
          mt: 2,
          p: 1,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant='h5' color='primary' component='div'>
            Order Menu
          </Typography>
          <Tooltip title='Clear all' placement='bottom'>
            <IconButton onClick={handleClearAll}>
              <ClearAllIcon color='primary' />
            </IconButton>
          </Tooltip>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: 'auto', minWidth: '100%' }}>
          {cartMap.map((cart) => {
            return <ProductCart key={cart._id} product={cart} onRemove={handleRemoveProduct} />;
          })}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: '100%',
            my: 1,
          }}
        >
          <Typography color='primary'>Total price:</Typography>
          <Typography>{totalPrice}</Typography>
        </Box>
        <Button variant='contained' onClick={() => navigate('/cart')}>
          Check out
        </Button>
      </Paper>
    </Box>
  );
}
