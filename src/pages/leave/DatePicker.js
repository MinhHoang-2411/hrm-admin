import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {formatDateMaterial, formatDateMaterialToTimeStamp} from 'utils/index';

export default function BasicDatePicker({params, handleFilter}) {
  const [fromError, setFromError] = useState(null);
  const [toError, setError] = useState(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label='From'
        value={formatDateMaterial(params?.['startDate.equals'])}
        onChange={(newValue) => {
          handleFilter('startDate.equals', formatDateMaterialToTimeStamp(newValue), 'pending');
        }}
        inputFormat='DD/MM/YYYY'
        onError={(newError) => setFromError(newError)}
        renderInput={(params) => (
          <TextField
            sx={{marginLeft: '15px', width: '180px'}}
            {...params}
            helperText={fromError ? 'Invalid Date' : ''}
          />
        )}
      />

      <DatePicker
        label='To'
        value={formatDateMaterial(params?.['endDate.equals'])}
        onChange={(newValue) => {
          handleFilter('endDate.equals', formatDateMaterialToTimeStamp(newValue), 'pending');
        }}
        inputFormat='DD/MM/YYYY'
        onError={(newError) => setError(newError)}
        minDate={params?.dateFrom}
        renderInput={(params) => (
          <TextField
            sx={{marginLeft: '15px', width: '180px'}}
            {...params}
            helperText={toError ? 'Invalid Date' : ''}
          />
        )}
      />
    </LocalizationProvider>
  );
}
