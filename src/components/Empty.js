import React from 'react';
import Stack from '@mui/material/Stack';
import BoxEmptyImg from '../assets/images/emptyData/box.png';
import useResponsive from '../hooks/useResponsive';

const Empty = ({title = null}) => {
  const isMobile = useResponsive('mobile');
  return (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{height: isMobile ? '350px' : '500px', width: '100%'}}
    >
      <img src={BoxEmptyImg} alt='empty data' width='200' />
      <h3 style={{color: '#738bab', textAlign: 'center'}}>
        {' '}
        {title || 'There is currently no data available'}
      </h3>
    </Stack>
  );
};

export default Empty;
