import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

export interface BannerProps {
  image?: string;
  title?: string;
  desc?: string;
  discount?: string;
}

export default function Banner({ image, title, desc, discount }: BannerProps) {
  return (
    <>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography mr={1} component='span' variant='h5'>
          Today menu
        </Typography>
        <RamenDiningIcon color='primary' />
      </Box>

      {/* Content */}
      <Card sx={{ display: 'flex', my: 3 }}>
        <CardMedia
          component='img'
          sx={{ width: 200, height: 200 }}
          image='/static/images/cards/live-from-space.jpg'
          alt='Banner image'
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CardContent>
            <Typography component='div' variant='h5'>
              Special Burger
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='div' gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adip Lorem ipsum dolor sit amet, consectetur
              adip
            </Typography>
            <Button size='small' variant='contained' color='primary'>
              More
            </Button>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
