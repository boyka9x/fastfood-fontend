import { Box } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import productApi from '../../../api/productApi';
import { DataResponse, Product } from '../../../models';
import ProductDetail from '../components/ProductDetail';

export default function DetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const [product, setProduct] = React.useState<Product>();

  React.useEffect(() => {
    if (!productSlug) return;

    // IFFE
    (async () => {
      try {
        const res: DataResponse<Product> = await productApi.getBySlug(productSlug);
        setProduct(res.data);
      } catch (error: any) {
        toast.error(error.message);
      }
    })();
  }, [productSlug]);

  return (
    <Box>
      {/* Detail */}
      {product && <ProductDetail product={product} />}
    </Box>
  );
}
