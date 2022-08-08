import EuroIcon from '@mui/icons-material/Euro';
import { Box, CardMedia, Typography } from '@mui/material';
import { OrderProduct } from '../../../models';

export interface FoodCardProps {
  row?: OrderProduct;
}

export default function FoodCard({ row }: FoodCardProps) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <CardMedia
        component='img'
        sx={{ width: '55px', borderRadius: '5px' }}
        image={row?.productId.image}
        alt={row?.productId.name}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexGrow: 1,
          mx: 2,
          height: '55px',
          borderBottom: '1px solid #ebebe0',
        }}
      >
        <Typography sx={{ width: '40%' }} noWrap>
          {row?.productId.name}
        </Typography>
        <Typography>x{row?.quantity}</Typography>
        <Typography sx={{ width: '20%' }} align='right'>
          <EuroIcon sx={{ fontSize: '11px' }} />
          {row?.price}
        </Typography>
      </Box>
    </Box>
  );
}
