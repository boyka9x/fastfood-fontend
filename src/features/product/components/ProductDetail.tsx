import EuroIcon from '@mui/icons-material/Euro';
import { Box, Card, CardMedia, Rating, Typography } from '@mui/material';
import { Product } from '../../../models';

export interface ProductDetailProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <Card sx={{ display: 'flex', p: 1 }}>
      {/* Image */}
      <CardMedia
        component='img'
        sx={{ width: '450px' }}
        image={product?.image}
        alt={product?.name}
      />

      {/* Information */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, mx: 2 }}>
        <Typography variant='h5' component='div'>
          {product?.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            sx={{ borderBottom: '1px solid', mr: 1 }}
            color='primary'
            variant='subtitle1'
            component='span'
          >
            2
          </Typography>
          <Rating name='read-only' value={2} size='small' readOnly />
        </Box>

        <Box>
          {product?.priceDiscount ? (
            <Box>
              <Typography
                variant='subtitle1'
                component='span'
                sx={{
                  textDecorationLine: 'line-through',
                  fontWeight: 'bold',
                  color: '#666262',
                }}
              >
                <EuroIcon sx={{ width: '12px', height: '12px' }} /> {product.price}
              </Typography>
              &nbsp;
              <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>
                <EuroIcon sx={{ width: '12px', height: '12px' }} /> {product.priceDiscount}
              </Typography>
            </Box>
          ) : (
            <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
              <EuroIcon sx={{ width: '12px', height: '12px' }} /> {product?.price}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
}
