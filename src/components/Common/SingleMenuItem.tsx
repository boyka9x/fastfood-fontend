import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

export interface SingleMenuItemProps {
  icon?: React.ReactElement;
  link: string;
  title?: string;
  variant?: 'button' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | undefined;
}

const NavLinkCustomize = styled(NavLink)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',

  '&.active li div': {
    color: theme.palette.primary.main,
    backgroundColor: '#f6f7f1',
  },
}));

export default function SingleMenuItem({ icon, link, title, variant }: SingleMenuItemProps) {
  return (
    <NavLinkCustomize to={link} end>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText
            primary={variant ? <Typography variant={variant}>{title}</Typography> : title}
            color='inherit'
          />
        </ListItemButton>
      </ListItem>
    </NavLinkCustomize>
  );
}
