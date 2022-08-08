import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/FormFields/InputField';
import { Customer } from '../../../models/customer';
import { phoneRegex } from '../../../utils';

export interface RegisterFormProps {
  initialValues?: Customer;
  onSubmit?: (formValues: Customer) => void;
}

const schema = yup
  .object({
    username: yup
      .string()
      .required('Please enter username.')
      .min(4, 'Username contains at least 4 characters')
      .max(100, 'Username contains maximum 100 characters')
      .trim('No spaces at the beginning and end ')
      .test('two-words', 'Please enter name at least two words', (value) => {
        if (!value) return true;
        const parts = value?.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    phoneNumber: yup
      .string()
      .required('Please enter phone number.')
      .matches(phoneRegex, 'Invalid phone number.'),
    password: yup
      .string()
      .required('Please enter password.')
      .min(4, 'Password contains at least 4 characters')
      .max(30, 'Password contains maximum 30 characters'),
    confirmPassword: yup
      .string()
      .required('Please enter password.')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    address: yup.string().required('Please enter address.'),
  })
  .required();

export default function CustomerRegisterForm({ initialValues, onSubmit }: RegisterFormProps) {
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Customer>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Customer) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box sx={{ maxWidth: '360px', mt: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Form field */}
        <InputField name='username' control={control} label='Username' />
        <InputField name='phoneNumber' control={control} label='Phone number' />
        <InputField name='password' type='password' control={control} label='Password' />
        <InputField
          name='confirmPassword'
          type='password'
          control={control}
          label='Confirm password'
        />
        <InputField name='address' control={control} label='Address' />

        {error && <Alert severity='error'>{error}</Alert>}

        <Box mt={2} textAlign='center'>
          <Button fullWidth type='submit' variant='contained'>
            {isSubmitting && <CircularProgress size='small' />} Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}
