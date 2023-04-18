import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

export const EmployeeDatePicker = (value, setValue) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
        label="Working Date"
        value={value}
        onChange={(newValue) => {
            setValue(newValue);
        }}
        renderInput={(params) => <TextField fullWidth variant='outlined' {...params} />}
        />
    </LocalizationProvider>

  );
}