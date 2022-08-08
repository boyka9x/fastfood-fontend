import EuroIcon from '@mui/icons-material/Euro';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Button, Card, IconButton, LinearProgress, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import customerApi from '../../../api/customerApi';
import orderApi from '../../../api/orderApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Customer, DataResponse, Order } from '../../../models';
import { formatDate } from '../../../utils';
import FoodCard from '../components/FoodCard';
import StepStatus from '../components/StepStatus';
import { orderActions, selectCurrentOrder, selectIsLoading } from '../orderSlice';

export default function AdminDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const [customer, setCustomer] = useState<Customer>();

  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const order = useAppSelector(selectCurrentOrder);

  useEffect(() => {
    if (!orderId) return;

    dispatch(orderActions.fetchOrderById(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (!order.customerId) return;

    (async () => {
      try {
        const res: DataResponse<Customer> = await customerApi.getById(order.customerId as string);
        setCustomer(res.data);
      } catch (error) {
        toast.error('Error to fetch order info');
      }
    })();
  }, [order.customerId]);

  const handleConfirmOrder = () => {
    dispatch(orderActions.confirmOrder(order._id as string));
  };

  const handleTransportOrder = () => {
    dispatch(orderActions.transportOrder(order._id as string));
  };

  const handleCompleteOrder = async () => {
    try {
      const res: DataResponse<Order> = await orderApi.payment(order._id as string);
      if (res.status === 'success') {
        dispatch(orderActions.completeOrder(order._id as string));
      }
    } catch (error) {
      toast.error('Fail to complete order');
    }
  };

  const handleCancelOrder = () => {};

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: '-5px',
            width: '100%',
          }}
        />
      )}
      {/* Step order */}
      {/* <Typography variant='h6' component='div' gutterBottom>
        Task status
      </Typography> */}
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
        }}
      >
        <StepStatus label='Confirm' value={Boolean(order?.confirmDate)} />
        <StepStatus label='Payment' value={Boolean(order?.paymentDate)} />
        <StepStatus label='Shipping' value={Boolean(order?.shipmentDate)} />
        <StepStatus label='Complete' value={Boolean(order?.status === 'complete')} />
      </Card>

      {/* Task info */}
      <Typography variant='h6' component='div' my={1}>
        Task info
      </Typography>
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          p: 2,
        }}
      >
        {/* Time order */}
        <Box>
          <Typography variant='subtitle1' component='div'>
            Time order
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} component='div'>
            {formatDate(order?.createdAt)}
          </Typography>
        </Box>
        {/* Address */}
        <Box>
          <Typography variant='subtitle1' component='div'>
            Address
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }} component='div'>
            {customer?.address}
          </Typography>
        </Box>
        {/* Phone number */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box mr={2}>
            <Typography variant='subtitle1' component='div'>
              {customer?.username}
            </Typography>
            <Typography sx={{ fontWeight: 'bold' }} component='div'>
              {customer?.phoneNumber}
            </Typography>
          </Box>
          <IconButton color='primary'>
            <PhoneIcon color='inherit' />
          </IconButton>
        </Box>
      </Card>

      {/* Product list */}
      <Card>
        <Box sx={{ maxHeight: '220px', overflow: 'auto' }}>
          {order?.products.map((product) => (
            <FoodCard key={product.productId._id} row={product} />
          ))}
        </Box>

        {/* Total price */}
        <Typography
          variant='h6'
          component='div'
          align='right'
          sx={{
            m: 2,
            fontWeight: 'bold',
          }}
        >
          <EuroIcon sx={{ fontSize: '12px' }} />
          {order.totalPrice}
        </Typography>

        {/* Date */}
        <Box sx={{ display: 'flex', mr: 2, flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Typography mr={4}>Confirm:</Typography>
            <Typography sx={{ flex: '0 0 127px' }} align='right'>
              {formatDate(order.confirmDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Typography mr={4}>Payment:</Typography>
            <Typography sx={{ flex: '0 0 127px' }} align='right'>
              {formatDate(order.paymentDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
            <Typography mr={4}>Shipping:</Typography>
            <Typography sx={{ flex: '0 0 127px' }} align='right'>
              {formatDate(order.shipmentDate)}
            </Typography>
          </Box>
        </Box>

        {/* Button */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          {!order.confirmDate && (
            <Button variant='contained' color='primary' onClick={handleConfirmOrder}>
              Accept order
            </Button>
          )}

          {!order.shipmentDate && order.status === 'transaction' && (
            <Button variant='contained' color='primary' onClick={handleTransportOrder}>
              Transport
            </Button>
          )}

          {order.status === 'shipping' && (
            <Button variant='contained' color='primary' onClick={handleCompleteOrder}>
              Complete
            </Button>
          )}

          {order.status !== 'order' && (
            <Button sx={{ ml: 1 }} variant='contained' color='primary' onClick={handleCancelOrder}>
              Cancel
            </Button>
          )}
        </Box>
      </Card>
    </Box>
  );
}
