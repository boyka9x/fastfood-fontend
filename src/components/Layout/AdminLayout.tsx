import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import AdminBar from '../Header/AdminBar';
import { AdminSideBar } from '../SideBar/AdminSideBar';

export default function AdminLayout() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: 'auto 1fr',
        gridTemplateAreas: `'header header' 'sidebar main'`,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box sx={{ gridArea: 'header', position: 'sticky' }}>
        <AdminBar />
      </Box>
      <Box
        sx={{
          gridArea: 'sidebar',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '7px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'primary.main',
            borderRadius: '4px',
          },
        }}
      >
        <AdminSideBar />
      </Box>
      <Box sx={{ gridArea: 'main', overflowY: 'auto', m: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
