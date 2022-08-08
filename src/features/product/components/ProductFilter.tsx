import { Search } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent, useRef } from 'react';
import { Category, ListParams } from '../../../models';

export interface IProductFilterProps {
  filter: ListParams;
  categoryList: Category[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProductFilter({
  filter,
  categoryList,
  onChange,
  onSearchChange,
}: IProductFilterProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    onSearchChange({
      ...filter,
      name_like: e.target.value,
      _page: 1,
    });
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    if (!onChange) return;

    onChange({
      ...filter,
      type: e.target.value,
      _page: 1,
    });
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      type: undefined,
      name_like: undefined,
    };

    if (searchRef.current) {
      searchRef.current.value = '';
    }

    onChange(newFilter);
  };

  return (
    <Grid container spacing={2}>
      {/* Search text */}
      <Grid item xs={12} md={12} lg={6}>
        <FormControl fullWidth variant='outlined' size='small'>
          <InputLabel htmlFor='searchByName'>Search by name</InputLabel>
          <OutlinedInput
            id='searchByName'
            label='Search by name'
            endAdornment={<Search />}
            defaultValue={filter?.name_like}
            onChange={handleSearchChange}
            inputRef={searchRef}
          />
        </FormControl>
      </Grid>

      {/* Category */}
      <Grid item xs={6} md={6} lg={4}>
        <FormControl fullWidth size='small'>
          <InputLabel id='filterByCity'>Category</InputLabel>
          <Select
            labelId='filterByCity'
            id='filterByCity'
            label='City'
            value={filter.type || ''}
            onChange={handleCategoryChange}
          >
            <MenuItem value=''>
              <em>All</em>
            </MenuItem>
            {categoryList.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Clear filter */}
      <Grid item xs={6} md={6} lg={2}>
        <Button fullWidth variant='outlined' onClick={handleClearFilter} sx={{ height: '100%' }}>
          Clear
        </Button>
      </Grid>
    </Grid>
  );
}
