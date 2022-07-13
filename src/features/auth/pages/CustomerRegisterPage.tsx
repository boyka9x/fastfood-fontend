import { Box, Link, Paper, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import customerApi from '../../../api/customerApi';
import { Customer } from '../../../models/customer';
import CustomerRegisterForm from '../components/CustomerRegisterForm';
import { toast } from 'react-toastify';

const initialValues: Customer = {
  username: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  address: '',
};

export default function CustomerRegisterPage() {
  const handleLoginFormSubmit = async (formValues: Customer) => {
    // TODO: Register customer api
    console.log('Register customer::', formValues);
    const response = await customerApi.register(formValues);

    if (response.status === 'success') {
      toast.success(response.message);
    }
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

        <CustomerRegisterForm initialValues={initialValues} onSubmit={handleLoginFormSubmit} />
        <Box mt={2}>
          <Typography variant='body1' component='div' align='center'>
            Đã có tài khoản? &nbsp;
            <Link component={RouterLink} to='/login'>
              Đăng nhập ngay
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
