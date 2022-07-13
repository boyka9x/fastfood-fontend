import { FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useController } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: number | string;
}

export interface ISelectFieldProps {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
}

export default function SelectField({
  name,
  control,
  label,
  disabled,
  options,
}: ISelectFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl fullWidth size='small' disabled={disabled} error={invalid}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        id={`${name}_label`}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
