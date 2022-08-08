import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, CardMedia, FormControl, FormHelperText, Typography } from '@mui/material';
import { useState } from 'react';
import { useController } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';

export interface IInputFileFieldProps {
  label?: string;
  name: string;
  control: any;
}

export default function InputFileField({ label, name, control }: IInputFileFieldProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error, invalid },
  } = useController({
    control,
    name,
  });

  const [image, setImage] = useState(value);

  const convertToBase64 = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleInputChange = async (e: any) => {
    const file = e.target.files[0];
    if (file === undefined) return;
    const res = await convertToBase64(file);
    onChange(res);
    setImage(res);
  };

  return (
    <FormControl
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      error={invalid}
    >
      {image ? (
        <CardMedia
          component='img'
          image={image}
          sx={{ width: '100px', height: '100px', objectFit: 'contain' }}
        />
      ) : (
        <Box
          sx={{
            width: '100px',
            height: '100px',
            border: '1px dashed #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AddIcon />
        </Box>
      )}
      <label htmlFor='upload-photo'>
        <input
          style={{ display: 'none' }}
          id='upload-photo'
          name='upload-photo'
          type='file'
          onChange={handleInputChange}
          onBlur={onBlur}
        />
        <AddPhotoAlternateIcon color='primary' sx={{ cursor: 'pointer' }} />
      </label>
      <Typography variant='subtitle2'>{label}</Typography>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
