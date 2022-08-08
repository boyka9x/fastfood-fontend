import { Box, Typography } from '@mui/material';
import * as React from 'react';

export interface IEmptyTaskProps {
  icon?: React.ReactElement;
  message?: string;
}

export default function EmptyTask({ icon, message }: IEmptyTaskProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      {icon}
      <Typography variant='subtitle1' component='div'>
        {message}
      </Typography>
    </Box>
  );
}
