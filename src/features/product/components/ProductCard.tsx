import AddIcon from '@mui/icons-material/Add';
import EuroIcon from '@mui/icons-material/Euro';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, IconButton, Link, Rating } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Product } from '../../../models';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const handleProductClick = () => {
    if (!onSelect) return;
    onSelect(product);
  };

  const handleFavoriteClick = () => {
    toast.success('Features will be complete soon.');
  };

  return (
    <Card sx={{ px: 2, py: 1, position: 'relative' }}>
      <IconButton sx={{ position: 'absolute', top: 0, right: 0, color: '#e41a27' }}>
        <FavoriteBorderIcon fontSize='small' color='inherit' onClick={handleFavoriteClick} />
      </IconButton>
      <CardMedia
        sx={{
          objectFit: 'contain',
        }}
        component='img'
        alt={product.name}
        height='120'
        image={product.image}
      />
      <Link
        to={`/products/${product.slug}`}
        component={RouterLink}
        color='inherit'
        underline='none'
      >
        <Typography
          noWrap
          sx={{
            mt: 1,
            fontWeight: 'bold',
          }}
        >
          {product.name}
        </Typography>
      </Link>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Rating name='size-small' defaultValue={2} size='small' />
          {product.priceDiscount ? (
            <Box>
              <Typography
                variant='subtitle1'
                component='span'
                sx={{
                  textDecorationLine: 'line-through',
                  fontWeight: 'bold',
                  fontSize: '0.8rem',
                  color: '#666262',
                }}
              >
                <EuroIcon sx={{ width: '8px', height: '8px' }} /> {product.price}
              </Typography>
              &nbsp;
              <Typography variant='subtitle1' component='span' sx={{ fontWeight: 'bold' }}>
                <EuroIcon sx={{ width: '8px', height: '8px' }} /> {product.priceDiscount}
              </Typography>
            </Box>
          ) : (
            <Typography variant='subtitle1' sx={{ fontWeight: 'bold' }}>
              <EuroIcon sx={{ width: '8px', height: '8px' }} /> {product.price}
            </Typography>
          )}
        </Box>

        <IconButton
          sx={{
            backgroundColor: 'primary.dark',
            color: 'primary.contrastText',

            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
          size='small'
          onClick={handleProductClick}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Card>
  );
}
