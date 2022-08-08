import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '../../../api/productApi';
import { DataResponse, Product } from '../../../models';
import ProductForm from '../components/ProductForm';

export default function AddEditPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const isEdit = Boolean(productSlug);
  const [product, setProduct] = useState<Product>();

  const initialValues: Product = {
    name: '',
    price: 0,
    priceDiscount: 0,
    image: '',
    type: '',
    ...product,
  };

  if (product !== undefined) {
    initialValues.type = typeof product.type === 'string' ? product.type : product.type._id || '';
  }

  useEffect(() => {
    if (!productSlug) return;

    // Call product api to get product
    (async () => {
      try {
        const res: DataResponse<Product> = await productApi.getBySlug(productSlug);
        setProduct(res.data);
      } catch (error) {
        toast.error('Failed to get product');
      }
    })();
  }, [productSlug]);

  const handleProductFormSubmit = async (formValues: Product) => {
    if (isEdit) {
      await productApi.update(formValues);
    } else {
      await productApi.create(formValues);
    }

    // Success
    toast.success('Product saved successfully');
  };

  return (
    <Box>
      <Typography
        variant='h4'
        color='primary'
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {isEdit ? 'Update product info' : 'Add new product'}
      </Typography>

      {(!isEdit || Boolean(product)) && (
        <ProductForm initialValues={initialValues} onSubmit={handleProductFormSubmit} />
      )}
    </Box>
  );
}
