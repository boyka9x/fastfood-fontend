import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, LinearProgress, Pagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '../../../api/productApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Product } from '../../../models';
import { selectCategoryList } from '../../category/categorySlice';
import ProductFilter from '../components/ProductFilter';
import RestoreProductTable from '../components/RestoreProductTable';
import {
  productActions,
  selectDeletedProductList,
  selectIsLoading,
  selectProductFilter,
  selectProductPagination,
} from '../productSlice';

export default function RestoreListPage() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectIsLoading);
  const deletedList = useAppSelector(selectDeletedProductList);
  const filter = useAppSelector(selectProductFilter);
  const pagination = useAppSelector(selectProductPagination);
  const categoryList = useAppSelector(selectCategoryList);

  useEffect(() => {
    dispatch(productActions.fetchDeletedProduct({ ...filter, _limit: 5 }));
  }, [filter, dispatch]);

  const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    dispatch(productActions.setFilters({ ...filter, _page: page }));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilters(newFilter));
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(productActions.setFiltersWithDebounce(newFilter));
  };

  const handleProductRestore = async (product: Product) => {
    try {
      await productApi.restore(product._id as string);
      const newFilter = { ...filter };
      dispatch(productActions.setFilters(newFilter));
    } catch (error) {
      toast.error('Failed to restore product');
    }
  };

  const handleProductRemove = async (product: Product) => {
    // try {
    //   await productApi.delete(product._id as string);
    //   const newFilter = { ...filter };
    //   dispatch(productActions.setFilters(newFilter));
    // } catch (error) {
    //   toast.error('Failed to remove product');
    // }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Loading */}
      {loading && (
        <LinearProgress
          sx={{
            position: 'absolute',
            width: '100%',
            top: '-16px',
          }}
        />
      )}

      {/* Header */}

      <Link to='/admin/products' style={{ textDecoration: 'none' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <ArrowBackIcon fontSize='small' color='primary' />
          <Typography variant='subtitle1' color='primary' component='span'>
            Back to product list
          </Typography>
        </Box>
      </Link>

      {/* Filter */}
      <Box mt={2}>
        <ProductFilter
          filter={filter}
          categoryList={categoryList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* Table */}
      <Box mt={2}>
        <RestoreProductTable
          productList={deletedList}
          onRestore={handleProductRestore}
          onRemove={handleProductRemove}
        />
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Pagination
          color='primary'
          count={Math.ceil(pagination._totalRecords / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
