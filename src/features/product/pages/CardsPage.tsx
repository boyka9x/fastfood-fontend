import { Box, Grid, IconButton, LinearProgress, Pagination, Typography } from '@mui/material';
import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Category, Product } from '../../../models';
import { cartActions } from '../../cart/cartSlice';
import { selectCategoryList } from '../../category/categorySlice';
import CategorySearch from '../../category/components/CategorySearch';
import ProductCard from '../components/ProductCard';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  productActions,
  selectIsLoading,
  selectProductFilter,
  selectProductList,
  selectProductPagination,
} from '../productSlice';

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
    dispatch(productActions.setFilters({ ...filter, type: category._id, _page: 1 }));
  };

  const handleProductSelect = (product: Product) => {
    dispatch(cartActions.addProduct(product));
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(productActions.setFilters({ ...filter, _page: value }));
  };

  const handleFilterClear = () => {
    dispatch(productActions.setFilters({ _page: 1, _limit: 8 }));
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <Typography variant='h5' component='h1'>
          Menu Category
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='subtitle2' component='span' color='primary'>
            View all
          </Typography>

          <IconButton size='small' color='primary' onClick={handleFilterClear}>
            <CheckBoxIcon fontSize='inherit' />
          </IconButton>
        </Box>
      </Box>

      {/* Filter */}
      <CategorySearch
        initialValues={filter?.type}
        categoryList={categoryList}
        onChange={handleCategoryChange}
      />

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
