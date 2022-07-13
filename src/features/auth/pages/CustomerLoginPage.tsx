import { Box, CircularProgress, Link, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions, LoginPayload, selectIsLoading } from '../authSlice';
import { Link as RouterLink } from 'react-router-dom';
import CustomerLoginForm from '../components/CustomerLoginForm';

const initialValues: LoginPayload = {
  phoneNumber: '',
  password: '',
};

export default function CustomerLoginPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const handleLoginFormSubmit = (formValues: LoginPayload) => {
    // TODO: Get username and password from login form
    dispatch(authActions.login({ ...formValues, role: 'customer' }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper sx={{ p: 4 }} elevation={3}>
        <Typography variant='h5' component='h1' align='center'>
          Welcome to &nbsp;
          <Typography variant='h5' component='span' color='primary'>
            AnyaFood
          </Typography>
        </Typography>

        <CustomerLoginForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />
        <Box mt={2}>
          <Typography variant='body1' component='div' align='center'>
            Chưa có tài khoản? &nbsp;
            <Link component={RouterLink} to='/register'>
              Đăng ký ngay
            </Link>
          </Typography>
        </Box>
      </Paper>
      {isLoading && <CircularProgress sx={{ position: 'fixed', top: 0, right: 0 }} />}
    </Box>
  );
}
