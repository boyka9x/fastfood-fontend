import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Employee } from '../../../models';

export interface EmployeeTableProps {
  employeeList: Employee[];
  onEdit?: (employee: Employee) => void;
  onBlock?: (employee: Employee) => void;
}

export default function EmployeeTable({ employeeList, onEdit, onBlock }: EmployeeTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleBlockClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleRemoveConfirm = (employee: Employee) => {
    onBlock?.(employee);
    setOpen(false);
  };

  return (
    <>
      <TableContainer>
        <Table size='small' aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>ID</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='right'>Phone number</TableCell>
              <TableCell align='right'>Address</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeList.map((employee, index) => (
              <TableRow hover key={employee._id}>
                <TableCell align='left'>{index + 1}</TableCell>
                <TableCell align='left'>{employee.username}</TableCell>
                <TableCell align='left'>{employee.email}</TableCell>
                <TableCell align='right'>{employee.phoneNumber}</TableCell>
                <TableCell align='right'>{employee.address}</TableCell>
                <TableCell align='right'>{employee.type}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='edit'
                    size='small'
                    color='secondary'
                    onClick={() => onEdit?.(employee)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    size='small'
                    color='error'
                    onClick={() => handleBlockClick(employee)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Remove dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Remove this employee?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure to lock employee{' '}
            <Typography color='primary' component='span'>
              {selectedEmployee?.username}
            </Typography>
            . This action can&apos;t be undo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedEmployee as Employee)}
            autoFocus
            variant='contained'
          >
            Block
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
