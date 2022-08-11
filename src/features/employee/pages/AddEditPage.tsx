import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import employeeApi from '../../../api/employeeApi';
import { DataResponse, Employee } from '../../../models';
import EmployeeForm from '../components/EmployeeForm';

export default function AddEditPage() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const isEdit = Boolean(employeeId);
  const [employee, setEmployee] = useState<Employee>();

  const initialValues: Employee = {
    _id: '',
    username: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    image: '',
    address: '',
    type: '',
    ...employee,
  };

  useEffect(() => {
    if (!employeeId) return;

    (async () => {
      try {
        const res: DataResponse<Employee> = await employeeApi.getById(employeeId as string);
        setEmployee(res.data);
      } catch (error) {
        toast.error('Failed to get employee');
      }
    })();
  }, [employeeId]);

  const handleEmployeeFormSubmit = async (formValues: Employee) => {
    if (isEdit) {
      await employeeApi.update(formValues);
    } else {
      await employeeApi.register(formValues);
    }

    toast.success('Done');
  };

  return (
    <Box>
      <Typography
        variant='h4'
        color='primary'
        gutterBottom
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {isEdit ? 'Update employee info' : 'Add new employee'}
      </Typography>

      {(!isEdit || Boolean(employee)) && (
        <EmployeeForm initialValues={initialValues} onSubmit={handleEmployeeFormSubmit} />
      )}
    </Box>
  );
}
