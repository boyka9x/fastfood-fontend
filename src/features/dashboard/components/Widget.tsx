import { Box, Card, Typography } from '@mui/material';

export interface IWidgetProps {
  title: string;
  children: any;
}

export default function Widget({ title, children }: IWidgetProps) {
  return (
    <Card>
      <Typography variant='button'>{title}</Typography>
      <Box mt={2}>{children}</Box>
    </Card>
  );
}
