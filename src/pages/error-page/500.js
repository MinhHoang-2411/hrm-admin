import React from 'react';
import {Grid, Box, Stack, Typography, Button} from '@mui/material';
import error500 from 'assets/images/maintainance/500.png';
import {useNavigate} from 'react-router-dom';

const ErrorPage500 = () => {
  const navigate = useNavigate();
  return (
    <Grid
      container
      direction='column'
      spacing={4}
      sx={{justifyContent: 'center', alignItems: 'center', height: '100vh'}}
    >
      <Grid item>
        <Box sx={{width: '480px'}}>
          <img src={error500} alt='error500' style={{width: '100%', height: 'auto'}} />
        </Box>
      </Grid>
      <Grid item>
        <Stack alignItems='center' spacing={2}>
          <Typography variant='h1' align='center'>
            Internal Server Error
          </Typography>
          <Typography
            variant='body1'
            align='center'
            sx={{color: 'rgb(140, 140, 140)', width: '85%'}}
          >
            Server error 500. we fixing the problem. please try again at a later stage.
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

export default ErrorPage500;
