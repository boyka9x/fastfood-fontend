import { Box, Card, CardContent, Typography } from '@mui/material';

export interface StatisticItemProps {
  icon: React.ReactElement;
  label: string;
  value: string | number;
}

export default function StatisticItem({ icon, label, value }: StatisticItemProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        py: 1,
      }}
    >
      <Box>{icon}</Box>
      <CardContent>
        <Typography component='div' variant='h6'>
          {label}
        </Typography>
        <Typography variant='subtitle1' component='div' align='right'>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
