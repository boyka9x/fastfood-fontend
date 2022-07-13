import { Box, Grid, LinearProgress, Pagination, Typography } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Category, Product } from '../../../models';
import { cartActions } from '../../cart/cartSlice';
import { selectCategoryList } from '../../category/categorySlice';
import CategorySearch from '../../category/components/CategorySearch';
import ProductCard from '../components/ProductCard';
import {
  productActions,
  selectIsLoading,
  selectProductFilter,
  selectProductList,
  selectProductPagination,
} from '../productReducer';

export default function CardsPage() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(selectIsLoading);
  const productList = useAppSelector(selectProductList);
  const filter = useAppSelector(selectProductFilter);
  const categoryList = useAppSelector(selectCategoryList);
  const pagination = useAppSelector(selectProductPagination);

  React.useEffect(() => {
    dispatch(productActions.fetchProduct(filter));
  }, [dispatch, filter]);

  const handleCategoryChange = (category: Category) => {
    dispatch(productActions.setFilters({ ...filter, type: category._id }));
  };

  const handleProductSelect = (product: Product) => {
    dispatch(cartActions.addProduct(product));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(productActions.setFilters({ ...filter, _page: value }));
  };

  return (
    <Box
      sx={{
        position: 'relative',
        minWidth: '100%',
      }}
    >
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

      {/* Header */}
      <Typography variant='h5' component='h1'>
        Menu Category
      </Typography>

      {/* Filter */}
      <CategorySearch categoryList={categoryList} onChange={handleCategoryChange} />

      <Grid mt={1} container spacing={2}>
        {productList.map((product) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={product._id}>
              <ProductCard product={product} onSelect={handleProductSelect} />
            </Grid>
          );
        })}
      </Grid>

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
