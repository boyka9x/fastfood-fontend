import { Box, Button, LinearProgress, Pagination, Typography } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import employeeApi from '../../../api/employeeApi';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { DataResponse, Employee } from '../../../models';
import EmployeeTable from '../components/EmployeeTable';
import {
  employeeActions,
  selectEmployeeFilter,
  selectEmployeeList,
  selectEmployeePagination,
  selectIsLoading,
} from '../employeeSlice';

export default function ListPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectIsLoading);
  const employeeList = useAppSelector(selectEmployeeList);
  const filter = useAppSelector(selectEmployeeFilter);
  const pagination = useAppSelector(selectEmployeePagination);

  useEffect(() => {
    dispatch(employeeActions.fetchEmployee(filter));
  }, [dispatch, filter]);

  const handlePageChange = (e: ChangeEvent<unknown>, page: number) => {
    dispatch(
      employeeActions.setFilters({
        ...filter,
        _page: page,
      })
    );
  };

  const handleEditEmployee = (employee: Employee) => {
    navigate(`${employee._id}`);
  };

  const handleBlockEmployee = async (employee: Employee) => {
    try {
      const res: DataResponse<null> = await employeeApi.delete(employee._id as string);
      toast.success(res.message);
      employeeActions.setFilters({
        ...filter,
      });
    } catch (error) {
      toast.error('Error ...');
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Loading */}
      {loading && <LinearProgress sx={{ position: 'absolute', width: '100%', top: '-8px' }} />}

      {/* Heading */}
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant='h4' color='primary'>
          Employee
        </Typography>
        <Link to='add' style={{ textDecoration: 'none' }}>
          <Button variant='contained'>Add new employee</Button>
        </Link>
      </Box>

      {/* Table */}
      <Box>
        <EmployeeTable
          employeeList={employeeList}
          onEdit={handleEditEmployee}
          onBlock={handleBlockEmployee}
        />
      </Box>

      {/* Pagination */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 2,
        }}
      >
        <Pagination
          color='primary'
          count={Math.ceil(pagination._totalRecords / pagination._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
