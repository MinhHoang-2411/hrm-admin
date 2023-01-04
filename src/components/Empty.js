import React from 'react';
import Stack from '@mui/material/Stack';
import logo from '../assets/images/emptyData/box.png';

const Empty = ({title = null}) => {
  return (
    <Stack justifyContent='center' alignItems='center' sx={{height: '500px', width: '100%'}}>
      <img src={logo} alt='empty data' width='200' />
      <h3 style={{color: '#738bab'}}> {title || 'There is currently no data available'}</h3>
    </Stack>
  );
};

export default Empty;
