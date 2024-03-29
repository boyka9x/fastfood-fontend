import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import OrderMenu from '../../cart/pages/OrderMenu';
import { categoryActions } from '../../category/categorySlice';
import CardsPage from '../../product/pages/CardsPage';
import Banner from '../components/Banner';

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
        <Banner />
        <CardsPage />
      </Box>
      <Box
        sx={{
          gridArea: 'cart',
          height: '85vh',
          position: 'sticky',
          right: '0',
          top: '0',
        }}
      >
        <OrderMenu />
      </Box>
    </Box>
  );
}
