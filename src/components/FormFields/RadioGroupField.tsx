import { FormHelperText } from '@mui/material';
import { useController } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export interface RadioOption {
  label: string;
  value: number | string;
}

export interface IRadioGroupField {
  name: string;
  control: any;
  label?: string;
  disabled?: boolean;
  row?: boolean;
  options: RadioOption[];
}

export default function RadioGroupField({
  name,
  control,
  label,
  disabled,
  row,
  options,
}: IRadioGroupField) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl disabled={disabled} error={invalid}>
      <FormLabel id='demo-row-radio-buttons-group-label'>{label}</FormLabel>
      <RadioGroup row={row} name={name} value={value} onChange={onChange} onBlur={onBlur}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
