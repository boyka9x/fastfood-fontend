import { Collapse, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import * as React from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SingleMenuItem, { SingleMenuItemProps } from './SingleMenuItem';

export interface IMultiMenuItemProps {
  icon?: React.ReactElement;
  label: string;
  items: SingleMenuItemProps[];
}

export default function MultiMenuItem({ icon, label, items }: IMultiMenuItemProps) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {items.map((child, key) => (
            <SingleMenuItem
              key={key}
              link={child.link}
              variant={child.variant}
              title={child.title}
            />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
}
