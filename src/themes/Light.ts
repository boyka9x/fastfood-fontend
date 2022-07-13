import { cyan, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
export const LightTheme = createTheme({
  palette: {
    primary: {
      main: yellow[700],
      dark: yellow[800],
      light: yellow[500],
      contrastText: '#fff',
    },
    secondary: {
      main: cyan[500],
      dark: cyan[400],
      light: cyan[300],
      contrastText: '#fff',
    },
    background: {
      default: '#f7f6f3',
      paper: '#fff',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: yellow[700],
            color: '#fff',
          },
          '&.Mui-selected:hover': {
            backgroundColor: yellow[700],
          },
        },
      },
    },
  },
});
