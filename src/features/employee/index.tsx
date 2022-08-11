import { Route, Routes } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';

export default function Employee() {
  return (
    <Routes>
      <Route index element={<ListPage />} />
      <Route path='add' element={<AddEditPage />} />
      <Route path=':employeeId' element={<AddEditPage />} />
    </Routes>
  );
}
