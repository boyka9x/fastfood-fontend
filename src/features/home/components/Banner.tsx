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
          image='data:image/png;base64,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'
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
