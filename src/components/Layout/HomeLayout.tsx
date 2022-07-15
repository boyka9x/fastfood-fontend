import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import CartPage from '../../features/cart/pages/CartPage';
import HomePage from '../../features/home/pages/HomePage';
import CustomerOrderPage from '../../features/order/pages/CustomerOrderPage';
import { HomeSideBar } from '../Common/HomeSideBar';
import MainBar from '../Common/MainBar';

export interface IHomeLayoutProps {}

export default function HomeLayout(props: IHomeLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: '100vh',
      }}
    >
      <Box sx={{ gridArea: 'header' }}>
        <MainBar />
      </Box>
      <Box sx={{ gridArea: 'sidebar' }}>
        <HomeSideBar />
      </Box>
      <Box sx={{ gridArea: 'main', margin: 2 }}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='cart' element={<CartPage />} />
          <Route path='my-order' element={<CustomerOrderPage />} />
        </Routes>
      </Box>
    </Box>
  );
}
