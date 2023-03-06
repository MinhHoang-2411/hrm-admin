import {useState} from 'react';
import {TextField, Grid} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {formatDateMaterial} from 'utils/index';

const convertDateTime = (date) => {
  const endDate = date ? new Date(date) : null;
  endDate && endDate.setDate(endDate.getDate() - 1);
  return formatDateMaterial(endDate);
};

export default function DuoDatePicker({params, handleFilter, width = '150px', type = null}) {
  const [invalidFromTime, setInvalidFromTime] = useState(false);
  const [invalidToTime, setInvalidToTime] = useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DatePicker
            label='From'
            closeOnSelect={true}
            maxDate={convertDateTime(params?.['endDate.lessThan'])}
            value={formatDateMaterial(params?.['startDate.greaterThanOrEqual'])}
            onChange={(newValue) => handleFilter(newValue, type, 'startDate')}
            inputFormat='DD/MM'
            onError={(reason, value) => {
              if (reason) {
                setInvalidFromTime(true);
              } else {
                setInvalidFromTime(false);
              }
            }}
            renderInput={(params) => (
              <TextField
                sx={{
                  width: '100%',
                }}
                {...params}
                helperText={invalidFromTime ? 'Please choose valid Time' : null}
              />
            )}
          />
        </Grid>

        <Grid item xs={6}>
          <DatePicker
            label='To'
            closeOnSelect={true}
            minDate={formatDateMaterial(params?.['startDate.greaterThanOrEqual'])}
            value={convertDateTime(params?.['endDate.lessThan'])}
            onChange={(newValue) => handleFilter(newValue, type, 'endDate')}
            onError={(reason, value) => {
              if (reason) {
                setInvalidToTime(true);
              } else {
                setInvalidToTime(false);
              }
            }}
            inputFormat='DD/MM'
            renderInput={(params) => (
              <TextField
                sx={{
                  width: '100%',
                }}
                {...params}
                helperText={invalidToTime ? 'Please choose valid Time' : null}
              />
            )}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
