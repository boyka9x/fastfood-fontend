import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { useAppThemeContext } from '../../contexts/ThemeContext';
import { selectCurrentUser } from '../../features/auth/authSlice';
import CustomizeMenu from '../Common/CustomizeMenu';

export default function AdminBar() {
  const { themeName, toggleTheme } = useAppThemeContext();

  const user = useAppSelector(selectCurrentUser);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            AnyaFood
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Notification */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <IconButton size='large' onClick={toggleTheme} color='inherit'>
              {themeName === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <IconButton size='large' aria-label='show 17 new notifications' color='inherit'>
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* User */}
            {user ? (
              <CustomizeMenu user={user} />
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Link component={RouterLink} to='/login' color='inherit' underline='none'>
                  Login
                </Link>
                |
                <Link component={RouterLink} to='/register' color='inherit' underline='none'>
                  Sign up
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
