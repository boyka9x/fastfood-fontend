import { Route, Routes } from 'react-router-dom';
import { PageNotFound } from './components/Common';
import { Unauthorized } from './components/Common';
import HomeLayout from './components/Layout/HomeLayout';
import AdminLoginPage from './features/auth/pages/AdminLoginPage';
import CustomerLoginPage from './features/auth/pages/CustomerLoginPage';
import CustomerRegisterPage from './features/auth/pages/CustomerRegisterPage';

// const Customer_Role = 'customer';
// const Staff_Role = 'staff';
// const Admin_Role = 'admin';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<CustomerLoginPage />} />
      <Route path='/register' element={<CustomerRegisterPage />} />

      {/* Home */}
      <Route path='/*' element={<HomeLayout />}></Route>
      <Route path='/admin/login' element={<AdminLoginPage />} />

      {/* Other */}
      <Route path='/unauthorized' element={<Unauthorized />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
