import { TextField } from '@mui/material';
import * as React from 'react';
import { useController } from 'react-hook-form';

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  label?: string;
}

export default function InputField({ name, control, label, ...inputProps }: InputFieldProps) {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      size='small'
      margin='normal'
      variant='outlined'
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
