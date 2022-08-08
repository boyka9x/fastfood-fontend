import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Typography } from '@mui/material';

export interface StepStatusProps {
  label?: string;
  value: boolean;
}

export default function StepStatus({ label, value }: StepStatusProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        //     justifyContent: 'center',
      }}
    >
      {value ? <CheckCircleIcon color='primary' /> : <CancelIcon color='disabled' />}
      <Typography ml={1} variant='subtitle1' component='span'>
        {label}
      </Typography>
    </Box>
  );
}
