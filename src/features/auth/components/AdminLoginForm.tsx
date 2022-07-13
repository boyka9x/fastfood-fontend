import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/FormFields/InputText';
import { LoginPayload } from '../authSlice';

export interface LoginFormProps {
  initialValues?: LoginPayload;
  onSubmit?: (formValues: LoginPayload) => void;
}

const schema = yup
  .object({
    email: yup.string().email('Invalid email address').required('Please enter phone number.'),
    password: yup
      .string()
      .required('Please enter password.')
      .min(4, 'Password contains at least 4 characters')
      .max(30, 'Password contains maximum 30 characters'),
  })
  .required();

export default function AdminLoginForm({ initialValues, onSubmit }: LoginFormProps) {
  const [error, setError] = useState<string>('');

  const { control, handleSubmit } = useForm<LoginPayload>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (formValues: LoginPayload) => {
    try {
      // Clear previous submission error
      setError('');

      onSubmit?.(formValues);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box sx={{ maxWidth: '360px', mt: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form field */}
        <InputField name='email' control={control} label='Email' />
        <InputField name='password' type='password' control={control} label='Password' />

        {error && <Alert severity='error'>{error}</Alert>}

        <Box mt={2} textAlign='center'>
          <Button fullWidth type='submit' variant='contained'>
            Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
