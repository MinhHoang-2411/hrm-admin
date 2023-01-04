import React from 'react';
import {Grid, Box, Stack, Typography, Button} from '@mui/material';
import maintainance from 'assets/images/maintainance/maintainance.svg';
import {useNavigate} from 'react-router-dom';

const Maintainance = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction='column'
      spacing={4}
      sx={{justifyContent: 'center', alignItems: 'center'}}
    >
      <Grid item>
        <Box sx={{width: '480px'}}>
          <img src={maintainance} alt='maintainance' style={{width: '100%', height: 'auto'}} />
        </Box>
      </Grid>
      <Grid item>
        <Stack alignItems='center' spacing={2}>
          <Typography variant='h1' align='center'>
            Under Construction
          </Typography>
          <Typography
            variant='body1'
            align='center'
            sx={{color: 'rgb(140, 140, 140)', width: '85%'}}
          >
            Hey! Please check out this site later. We are doing some maintenance on it right now.
          </Typography>
          <Button
            variant='contained'
            onClick={() => {
              navigate('/');
            }}
          >
            Back To Home
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Maintainance;
