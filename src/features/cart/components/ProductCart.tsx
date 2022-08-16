import ClearIcon from '@mui/icons-material/Clear';
import EuroIcon from '@mui/icons-material/Euro';
import { Avatar, Box, IconButton } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { CartProduct } from '../cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export interface ProductCartProps {
  product: CartProduct;
  onRemove?: (product: CartProduct) => void;
  onIncrease?: (product: CartProduct) => void;
  onDecrease?: (product: CartProduct) => void;
}

export default function ProductCart({
  product,
  onRemove,
  onIncrease,
  onDecrease,
}: ProductCartProps) {
  const handleRemoveClick = () => {
    if (!onRemove) return;
    onRemove(product);
  };

  const handleIncreaseClick = () => {
    if (!onIncrease) return;
    onIncrease(product);
  };

  const handleDecreaseClick = () => {
    if (!onDecrease) return;
    onDecrease(product);
  };
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        my: 1,
        maxHeight: '56px',
        width: '100%',
      }}
    >
      <Box sx={{ p: 1, bgcolor: 'primary.main' }}>
        <Avatar src={product.image} />
      </Box>

      {/* Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', px: '4px', maxWidth: '200px' }}>
        <Typography noWrap>{product.name}</Typography>
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
            <EuroIcon sx={{ width: '10px', height: '10px' }} /> {product.price}
          </Typography>
        )}
      </Box>
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
        }}
      >
        <IconButton size='small' onClick={handleRemoveClick}>
          <ClearIcon fontSize='inherit' />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {onDecrease && (
            <IconButton size='small' color='primary' onClick={handleDecreaseClick}>
              <RemoveIcon fontSize='inherit' />
            </IconButton>
          )}
          {!onDecrease && (
            <Typography fontSize='12px' color='primary'>
              x
            </Typography>
          )}
          <Typography mx={1}>{product.quantity}</Typography>
          {onIncrease && (
            <IconButton size='small' color='primary' onClick={handleIncreaseClick}>
              <AddIcon fontSize='inherit' />
            </IconButton>
          )}
        </Box>
      </Box>
    </Card>
  );
}
