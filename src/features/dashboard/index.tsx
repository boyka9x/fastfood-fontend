import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import StatisticItem from './components/StatisticItem';
import {
  dashboardActions,
  selectDashboardStatistics,
  selectIsLoading,
  selectOrderList,
  selectTransactionList,
} from './dashboardSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import TaskTable from './components/TaskTable';
import { Order } from '../../models';
import { useNavigate } from 'react-router-dom';
import EmptyTask from '../../components/Common/EmptyTask';
import MoodIcon from '@mui/icons-material/Mood';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const statistics = useAppSelector(selectDashboardStatistics);
  const orderList = useAppSelector(selectOrderList);
  const transactionList = useAppSelector(selectTransactionList);

  useEffect(() => {
    dispatch(dashboardActions.fetchData());
  }, [dispatch]);

  const handleTaskClick = (order: Order) => {
    navigate(`/admin/orders/${order._id}`);
  };

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
            top: '3px',
            width: '100%',
          }}
        />
      )}

      {/* Statistic Section */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<ShoppingCartCheckoutIcon fontSize='large' color='secondary' />}
            label='Order'
            value={statistics.orderCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<CompareArrowsIcon fontSize='large' color='primary' />}
            label='Transaction'
            value={statistics.transactionCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<LocalShippingIcon fontSize='large' color='success' />}
            label='Shipping'
            value={statistics.shippingCount}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <StatisticItem
            icon={<CardGiftcardIcon fontSize='large' color='primary' />}
            label='Complete'
            value={statistics.completeCount}
          />
        </Grid>
      </Grid>

      {/* Order Section */}
      <Box mt={2}>
        <Typography variant='h5'>Task list</Typography>

        <Box mt={2}>
          <Grid container spacing={2}>
            {/* Status: order */}
            <Grid item xs={12} lg={6}>
              {orderList.length > 0 && <TaskTable rows={orderList} onClick={handleTaskClick} />}
            </Grid>

            {/* Status: transaction */}
            <Grid item xs={12} lg={6}>
              {transactionList.length > 0 && (
                <TaskTable rows={transactionList} onClick={handleTaskClick} />
              )}
            </Grid>
          </Grid>

          {orderList.length <= 0 && transactionList.length <= 0 && (
            <EmptyTask icon={<MoodIcon color='primary' />} message='Không còn đơn đặt hàng!' />
          )}
        </Box>
      </Box>
    </Box>
  );
}
