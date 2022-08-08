import { Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { ChangeEvent, useRef, useState } from 'react';
import { ListParams } from '../../../models';

export interface IOrderFilterProps {
  filter: ListParams;
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function OrderFilter({ filter, onChange, onSearchChange }: IOrderFilterProps) {
  const [status, setStatus] = useState('');
  const [date, setDate] = useState<Date | null>(new Date());

  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      id: e.target.value,
    };

    onSearchChange(newFilter);
  };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value);
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      status: e.target.value,
    };

    onChange(newFilter);
  };

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      order_date: moment(newDate).format(),
    };

    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      status: '',
      id: undefined,
      order_date: undefined,
    };

    if (searchRef.current) {
      searchRef.current.value = '';
    }
    setStatus('');

    onChange(newFilter);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        {/* Text */}
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth variant='outlined' size='small'>
            <InputLabel htmlFor='searchByID'>Search by Id</InputLabel>
            <OutlinedInput
              id='searchByID'
              label='Search by ID'
              endAdornment={<Search />}
              defaultValue={filter?.id}
              onChange={handleSearchChange}
              inputRef={searchRef}
            />
          </FormControl>
        </Grid>

        {/* Date */}
        <Grid item xs={6} md={6} lg={2}>
          <FormControl fullWidth size='small'>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label='Order date'
                inputFormat='DD/MM/YYYY'
                value={date}
                onChange={handleDateChange}
                renderInput={(params) => <TextField size='small' {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        {/* Status */}
        <Grid item xs={6} md={6} lg={2}>
          <FormControl fullWidth size='small'>
            <InputLabel id='filterByStatus'>Status</InputLabel>
            <Select
              labelId='filterByStatus'
              id='filterByStatus'
              label='Status'
              value={status}
              onChange={handleStatusChange}
            >
              <MenuItem value=''>
                <em>All</em>
              </MenuItem>
              <MenuItem value='order'>Order</MenuItem>
              <MenuItem value='transaction'>Transaction</MenuItem>
              <MenuItem value='shipping'>Shipping</MenuItem>
              <MenuItem value='complete'>Complete</MenuItem>
              <MenuItem value='cancel'>Cancel</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Clear filter */}
        <Grid item xs={12} md={6} lg={2}>
          <Button sx={{ height: '100%' }} fullWidth variant='outlined' onClick={handleClearFilter}>
            View all
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
