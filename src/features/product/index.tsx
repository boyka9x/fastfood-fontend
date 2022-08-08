import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { categoryActions } from '../category/categorySlice';

export default function Product() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(categoryActions.fetchCategory());
  }, [dispatch]);

  return <Outlet />;
}
