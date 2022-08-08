import { Box, LinearProgress, Pagination } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Order } from '../../../models';
import OrderFilter from '../components/OrderFilter';
import OrderTable from '../components/OrderTable';
import {
  orderActions,
  selectIsLoading,
  selectOrderFilter,
  selectOrderList,
  selectOrderPagination,
} from '../orderSlice';

export default function AdminListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectIsLoading);
  const orderList = useAppSelector(selectOrderList);
  const filter = useAppSelector(selectOrderFilter);
  const pagination = useAppSelector(selectOrderPagination);

  useEffect(() => {
    dispatch(orderActions.fetchOrderManager(filter));
  }, [dispatch, filter]);

  const handleDetailOrder = (order: Order) => {
    navigate(`${order._id}`);
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
        <OrderTable orderList={orderList} onView={handleDetailOrder} />
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
