import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function PaymentCard() {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea>
        <CardMedia
          component='img'
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNQWmUdl8fH1bcYko24B-2eA_GDjo7pnzPaQ&usqp=CAU'
          alt='green iguana'
        />
      </CardActionArea>
    </Card>
  );
}
