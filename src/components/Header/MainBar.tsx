import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ChangeEvent, KeyboardEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useAppThemeContext } from '../../contexts/ThemeContext';
import { selectCurrentUser } from '../../features/auth/authSlice';
import { productActions, selectProductFilter } from '../../features/product/productSlice';
import { ListParams } from '../../models';
import CustomizeMenu from '../Common/CustomizeMenu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { selectCartMap } from '../../features/cart/cartSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function MainBar() {
  const { themeName, toggleTheme } = useAppThemeContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectCurrentUser);
  const filter = useAppSelector(selectProductFilter);
  const cartMap = useAppSelector(selectCartMap);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      name_like: e.target.value,
    };

    dispatch(productActions.setFiltersWithDebounce(newFilter));
  };

  const handleSearchEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      navigate('/');
    }
  };

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
          {/* Search input */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
              defaultValue={filter?.name_like}
              onChange={handleSearchChange}
              onKeyPress={handleSearchEnter}
            />
          </Search>

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
            <Link component={RouterLink} to='/cart' color='inherit' underline='none'>
              <IconButton size='large' color='inherit'>
                <Badge badgeContent={cartMap.length} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>

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
