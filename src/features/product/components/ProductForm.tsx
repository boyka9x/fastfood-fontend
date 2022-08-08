import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAppSelector } from '../../../app/hooks';
import InputField from '../../../components/FormFields/InputField';
import InputFileField from '../../../components/FormFields/InputFileField';
import SelectField from '../../../components/FormFields/SelectField';
import { Product } from '../../../models';
import { selectCategoryOptions } from '../../category/categorySlice';

export interface IProductFormProps {
  initialValues?: Product;
  onSubmit?: (formValues: Product) => void;
}

const schema = yup
  .object({
    name: yup.string().required('Please enter food name.'),
    price: yup
      .number()
      .required('Please enter price')
      .min(0, 'Min 0')
      .typeError('Please enter a valid number.'),
    priceDiscount: yup
      .number()
      .required('Please enter price')
      .min(0, 'Min 0')
      .max(yup.ref('price'), 'Discount less than price')
      .typeError('Please enter a valid number.'),
    type: yup.string().required('Please select a category'),
    image: yup.string().test('image-type', 'Incorrect image format', (value) => {
      if (!value) return true;

      const matchType = ['image/jpg', 'image/gif', 'image/png', 'image/jpeg'];
      const imageType = value.split(';')[0].split(':')[1];

      return matchType.includes(imageType);
    }),
  })
  .required();

export default function ProductForm({ initialValues, onSubmit }: IProductFormProps) {
  const [error, setError] = useState<string>('');
  const categoryOptions = useAppSelector(selectCategoryOptions);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Product>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: Product) => {
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
        <InputField name='name' control={control} label='Name' />
        <InputField name='price' control={control} label='Price' type='number' />
        <InputField name='priceDiscount' control={control} label='Price discount' type='number' />
        <SelectField name='type' control={control} label='Category' options={categoryOptions} />
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
