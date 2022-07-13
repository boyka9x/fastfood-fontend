import { useNavigate } from 'react-router-dom';
import { Paper, Button, Box, Typography } from '@mui/material';

export function Unauthorized() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        sx={{
          p: '24px',
        }}
      >
        <Typography variant='h5' component='h1' color='primary'>
          Unauthorized
        </Typography>

        <Typography my={2}>You do not have access to the requested page.</Typography>
        <Button size='small' variant='contained' color='primary' onClick={goBack}>
          Go back
        </Button>
      </Paper>
    </Box>
  );
}
