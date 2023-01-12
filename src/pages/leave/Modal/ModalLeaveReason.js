import {useState} from 'react';
import {TextField} from '@mui/material';

const ModalLeaveReason = ({setRejectReason}) => {
  const [reason, setReason] = useState('');

  return (
    <TextField
      label='Reasons for reject'
      variant='outlined'
      value={reason}
      onChange={(e) => {
        setReason(e.target.value);
        setRejectReason(e.target.value.trim());
      }}
      sx={{marginTop: 3}}
      inputProps={{style: {fontSize: '16px'}, maxLength: 255}}
      InputLabelProps={{style: {fontSize: '16px'}}}
      fullWidth
      multiline
      helperText={`${reason.length}/255`}
    />
  );
};

export default ModalLeaveReason;
