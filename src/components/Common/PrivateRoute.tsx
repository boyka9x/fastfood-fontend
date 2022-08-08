import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../../features/auth/authSlice';

export interface PrivateRouteProps {
  allowedRoles: string[];
}

export function PrivateRoute({ allowedRoles }: PrivateRouteProps) {
  const user = useAppSelector(selectCurrentUser);

  if (!user) {
    if (allowedRoles.includes('customer')) {
      return <Navigate to='/login' />;
    }
    if (allowedRoles.includes('admin')) {
      return <Navigate to='/admin/login' />;
    }
    if (allowedRoles.includes('staff')) {
      return <Navigate to='/admin/login' />;
    }
  }

  return user?.type && allowedRoles.includes(user.type) ? (
    <Outlet />
  ) : (
    <Navigate to='/unauthorized' />
  );
}
