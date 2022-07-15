import { Box, Button, LinearProgress, Link, Pagination, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  orderActions,
  selectIsLoading,
  selectOrderFilter,
  selectOrderList,
  selectOrderPagination,
} from '../orderSlice';
import { Link as RouterLink } from 'react-router-dom';
import CollapsibleTable from '../components/CollapsibleTable';
import { ChangeEvent, useEffect } from 'react';
import { toast } from 'react-toastify';
import { DataResponse, ListParams, Order } from '../../../models';
import orderApi from '../../../api/orderApi';
import OrderFilter from '../components/OrderFilter';

export default function CustomerOrderPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectIsLoading);
  const orderList = useAppSelector(selectOrderList);
  const filter = useAppSelector(selectOrderFilter);
  const pagination = useAppSelector(selectOrderPagination);

  useEffect(() => {
    dispatch(orderActions.fetchOrder(filter));
  }, [dispatch, filter]);

  const handleRemoveOrder = async (order: Order) => {
    try {
      const response: DataResponse<null> = await orderApi.delete(order._id || '');
      if (response.status === 'success') {
        toast.success(response.message);
        const newFilter = { ...filter };
        dispatch(orderActions.setFilters(newFilter));
      }
    } catch (error) {
      toast.error('Failed to remove order');
    }
  };

  const handlePageChange = (e: ChangeEvent<unknown>, value: number) => {
    dispatch(
      orderActions.setFilters({
        ...filter,
        _page: value,
      })
    );
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(orderActions.setFiltersWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(orderActions.setFilters(newFilter));
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            top: '-10px',
            width: '100%',
          }}
        />
      )}

      {/* Heading */}
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' color='primary'>
          My Orders
        </Typography>
        <Link component={RouterLink} to='/' underline='none'>
          <Button variant='contained'>Order now</Button>
        </Link>
      </Box>

      {/* Filter */}
      <Box sx={{ mt: 2 }}>
        <OrderFilter
          filter={filter}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Order table */}
      <Box my={2}>
        <CollapsibleTable orderList={orderList} onRemove={handleRemoveOrder} />
      </Box>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(pagination._totalRecords / pagination._limit)}
          page={pagination._page}
          shape='rounded'
          color='primary'
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
