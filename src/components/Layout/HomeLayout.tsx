import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { HomeSideBar } from '../SideBar/HomeSideBar';
import MainBar from '../Header/MainBar';

export interface IHomeLayoutProps {}

export default function HomeLayout(props: IHomeLayoutProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        gridTemplateColumns: 'auto 1fr',
        gridTemplateAreas: `"header header" "sidebar main"`,
        minHeight: '100vh',
      }}
    >
      <Box sx={{ gridArea: 'header' }}>
        <MainBar />
      </Box>
      <Box sx={{ gridArea: 'sidebar' }}>
        <HomeSideBar />
      </Box>
      <Box sx={{ gridArea: 'main', margin: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}
