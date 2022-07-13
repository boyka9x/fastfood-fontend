import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import OrderMenu from '../../cart/pages/OrderMenu';
import { categoryActions } from '../../category/categorySlice';
import CardsPage from '../../product/pages/CardsPage';

export default function HomePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(categoryActions.fetchCategory());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateAreas: `"main cart"`,
        minWidth: '100%',
      }}
    >
      <Box sx={{ gridArea: 'main' }}>
        <CardsPage />
      </Box>
      <Box sx={{ gridArea: 'cart', mr: -1, height: '85vh' }}>
        <OrderMenu />
      </Box>
    </Box>
  );
}
