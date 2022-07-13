import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions, LoginPayload, selectIsLoading } from '../authSlice';
import AdminLoginForm from '../components/AdminLoginForm';

const initialValues: LoginPayload = {
  email: '',
  password: '',
};

export default function AdminLoginPage() {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoading);

  const handleLoginFormSubmit = (formValues: LoginPayload) => {
    // TODO: Get username and password from login form
    dispatch(authActions.login({ ...formValues, role: 'admin' }));
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

        <AdminLoginForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />
      </Paper>
      {isLoading && <CircularProgress sx={{ position: 'fixed', top: 0, right: 0 }} />}
    </Box>
  );
}
