import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Avatar, Box, IconButton, ListItemButton, ListItemText } from '@mui/material';
import * as React from 'react';
import { Category } from '../../../models';

export interface CategorySearchProps {
  initialValues?: string;
  categoryList: Category[];
  onChange?: (category: Category) => void;
}

export default function CategorySearch({
  categoryList,
  onChange,
  initialValues,
}: CategorySearchProps) {
  const [selectedCategory, setSelectedCategory] = React.useState(initialValues);
  const contentWrapper = React.useRef<HTMLOListElement>(null);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    category: Category
  ) => {
    setSelectedCategory(category._id);

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
        }}
        ref={contentWrapper}
      >
        {categoryList.map((category) => {
          return (
            <ListItemButton
              key={category._id}
              sx={{
                flex: '0 0 120px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'background.paper',
                borderRadius: '4px',
                maxHeight: '78px',
                mr: 2,
              }}
              selected={selectedCategory === category._id}
              onClick={(event) => handleListItemClick(event, category)}
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
