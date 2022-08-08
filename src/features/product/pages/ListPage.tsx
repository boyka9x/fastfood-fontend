import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '../../../api/productApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ListParams, Product } from '../../../models';
import { selectCategoryList } from '../../category/categorySlice';
import ProductFilter from '../components/ProductFilter';
import ProductTable from '../components/ProductTable';
import {
  productActions,
  selectIsLoading,
  selectProductFilter,
  selectProductList,
  selectProductPagination,
} from '../productSlice';

export default function ListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectIsLoading);
  const productList = useAppSelector(selectProductList);
  const filter = useAppSelector(selectProductFilter);
  const pagination = useAppSelector(selectProductPagination);
  const categoryList = useAppSelector(selectCategoryList);

  useEffect(() => {
    dispatch(productActions.fetchProduct({ ...filter, _limit: 5 }));
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

  const handleProductEdit = (product: Product) => {
    navigate(`${product.slug}`);
  };

  const handleProductRemove = async (product: Product) => {
    try {
      await productApi.delete(product._id as string);
      const newFilter = { ...filter };
      dispatch(productActions.setFilters(newFilter));
    } catch (error) {
      toast.error('Failed to remove product');
    }
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
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <Typography variant='h4' color='primary'>
          Products
        </Typography>
        <Link to='restore' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Restore</Button>
        </Link>
      </Box>

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
        <ProductTable
          productList={productList}
          onEdit={handleProductEdit}
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
