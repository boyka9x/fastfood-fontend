import { Box, Button, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export function PageNotFound() {
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
          Page not found
        </Typography>

        <Typography my={2}>The page was not found or in development.</Typography>
        <Button size='small' variant='contained' color='primary' onClick={goBack}>
          Go back
        </Button>
      </Paper>
    </Box>
  );
}
