import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputField from '../../../components/FormFields/InputField';
import InputFileField from '../../../components/FormFields/InputFileField';
import SelectField from '../../../components/FormFields/SelectField';
import { Employee } from '../../../models';
import { phoneRegex } from '../../../utils';

export interface IEmployeeFormProps {
  initialValues?: Employee;
  onSubmit?: (formValues: Employee) => void;
}

const schema = yup.object({
  username: yup.string().required('Please enter name.'),
  email: yup.string().email('Invalid email').required('Please enter email'),
  phoneNumber: yup
    .string()
    .required('Please enter phone number.')
    .matches(phoneRegex, 'Invalid phone number.'),
  password: yup.string(),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  address: yup.string().required('Please enter address.'),
  type: yup.string().required('Please select a category'),
  image: yup.string().test('image-type', 'Incorrect image format', (value) => {
    if (!value) return true;

    const matchType = ['image/jpg', 'image/gif', 'image/png', 'image/jpeg'];
    const imageType = value.split(';')[0].split(':')[1];

    return matchType.includes(imageType);
  }),
});

export default function EmployeeForm({ initialValues, onSubmit }: IEmployeeFormProps) {
  const [error, setError] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Employee>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Employee) => {
    try {
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error?.message);
    }
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputFileField name='image' control={control} />
        <InputField name='username' control={control} label='Username' />
        <InputField name='email' control={control} label='Email' type='email' />
        <InputField name='phoneNumber' control={control} label='Phone number' />
        <InputField name='address' control={control} label='Address' />

        {initialValues?._id === '' && (
          <InputField name='password' control={control} label='Password' />
        )}
        {initialValues?._id === '' && (
          <InputField name='passwordConfirm' control={control} label='Confirm password' />
        )}

        <SelectField
          name='type'
          control={control}
          label='Type'
          options={[
            { label: 'Admin', value: 'admin' },
            { label: 'Staff', value: 'staff' },
          ]}
        />
        {error && <Alert severity='error'>{error}</Alert>}

        <Box mt={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button type='submit' variant='contained' sx={{ width: '120px' }}>
            {isSubmitting && <CircularProgress />}Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
