import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { Category } from '../../../models';

export interface CategorySearchProps {
  categoryList: Category[];
  onChange?: (category: Category) => void;
}

export default function CategorySearch({ categoryList, onChange }: CategorySearchProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const contentWrapper = React.useRef<HTMLOListElement>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: Category,
    index: number
  ) => {
    setSelectedIndex(index);

    if (!onChange) return;
    onChange(category);
  };

  const scroll = (scrollOffset: number) => {
    contentWrapper.current!.scrollLeft += scrollOffset;
  };

  return (
    <Box
      sx={{
        position: 'relative',
        my: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          overflowX: 'hidden',
          p: 0,
        }}
        ref={contentWrapper}
      >
        {categoryList.map((category, index) => {
          return (
            <ListItemButton
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: '4px',
                maxHeight: '78px',
                flex: '0 0 120px',
                mr: 2,
              }}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, category, index)}
            >
              <Avatar sx={{ width: 30, height: 30 }} src={category.image} />
              <ListItemText primary={category.name} />
            </ListItemButton>
          );
        })}
      </Box>
      <IconButton
        size='large'
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'primary.light',
        }}
        onClick={() => scroll(-120)}
      >
        <ChevronLeftIcon />
      </IconButton>

      <IconButton
        size='large'
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: 'primary.light',
        }}
        onClick={() => scroll(120)}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
}
