import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/Common';
import { Unauthorized } from './components/Common';
import { PrivateRoute } from './components/Common/PrivateRoute';
import AdminLayout from './components/Layout/AdminLayout';
import HomeLayout from './components/Layout/HomeLayout';
import AdminLoginPage from './features/auth/pages/AdminLoginPage';
import CustomerLoginPage from './features/auth/pages/CustomerLoginPage';
import CustomerRegisterPage from './features/auth/pages/CustomerRegisterPage';
import CartPage from './features/cart/pages/CartPage';
import HomePage from './features/home/pages/HomePage';
import CustomerOrderPage from './features/order/pages/CustomerOrderPage';
import Dashboard from './features/dashboard';
import AdminDetailPage from './features/order/pages/AdminDetailPage';
import DetailPage from './features/product/pages/DetailPage';
import AddEditPage from './features/product/pages/AddEditPage';
import Product from './features/product';
import ListPage from './features/product/pages/ListPage';
import RestoreListPage from './features/product/pages/RestoreListPage';
import AdminListPage from './features/order/pages/AdminListPage';

// const Customer_Role = 'customer';
// const Staff_Role = 'staff';
// const Admin_Role = 'admin';

function App() {
  return (
    <Routes>
      <Route path='login' element={<CustomerLoginPage />} />
      <Route path='register' element={<CustomerRegisterPage />} />
      <Route path='admin/login' element={<AdminLoginPage />} />

      {/* Home */}
      <Route element={<HomeLayout />}>
        <Route path='' element={<HomePage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='my-order' element={<CustomerOrderPage />} />
        <Route path='products/:productSlug' element={<DetailPage />} />
      </Route>

      {/* Admin + Staff */}
      <Route element={<PrivateRoute allowedRoles={['admin', 'staff']} />}>
        <Route path='admin' element={<AdminLayout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='orders' element={<AdminListPage />} />
          <Route path='orders/:orderId' element={<AdminDetailPage />} />
          <Route path='products' element={<Product />}>
            <Route path='' element={<ListPage />} />
          </Route>
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path='admin' element={<AdminLayout />}>
          <Route path='products' element={<Product />}>
            <Route path='add' element={<AddEditPage />} />
            <Route path='restore' element={<RestoreListPage />} />
            <Route path=':productSlug' element={<AddEditPage />} />
          </Route>
        </Route>
      </Route>

      {/* Other */}
      <Route path='unauthorized' element={<Unauthorized />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
