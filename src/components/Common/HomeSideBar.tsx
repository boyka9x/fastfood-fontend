import ArticleIcon from '@mui/icons-material/Article';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import PaymentIcon from '@mui/icons-material/Payment';
import { Box, IconButton, List, ListItem, styled, Tooltip } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from '../../features/auth/authSlice';

const NavLinkCustomize = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',

  '&.active button > svg': {
    color: theme.palette.primary.main,
  },
}));

export function HomeSideBar() {
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(authActions.logout());
  };

  return (
    <Box
      sx={{
        display: { xs: 'none', sm: 'flex' },
        px: 1,
        minHeight: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <nav aria-label='main mailbox folders'>
        <List>
          <ListItem disablePadding>
            <NavLinkCustomize to='/'>
              <Tooltip title='Home' placement='right'>
                <IconButton>
                  <HomeIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </NavLinkCustomize>
          </ListItem>

          <ListItem disablePadding>
            <NavLinkCustomize to='/favorite'>
              <Tooltip title='Favorite food' placement='right'>
                <IconButton>
                  <FavoriteIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </NavLinkCustomize>
          </ListItem>

          <ListItem disablePadding>
            <NavLinkCustomize to='/my-order'>
              <Tooltip title='My order' placement='right'>
                <IconButton>
                  <ArticleIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </NavLinkCustomize>
          </ListItem>

          <ListItem disablePadding>
            <NavLinkCustomize to='/payment'>
              <Tooltip title='Payment' placement='right'>
                <IconButton>
                  <PaymentIcon fontSize='large' />
                </IconButton>
              </Tooltip>
            </NavLinkCustomize>
          </ListItem>
        </List>
        <Tooltip title='Logout' placement='right'>
          <IconButton onClick={handleLogoutClick}>
            <LogoutIcon fontSize='large' />
          </IconButton>
        </Tooltip>
      </nav>
    </Box>
  );
}
