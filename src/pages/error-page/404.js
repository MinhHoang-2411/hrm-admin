import React from 'react';
import {Grid, Box, Stack, Typography, Button} from '@mui/material';
import error404 from 'assets/images/maintainance/404.png';
import {useNavigate} from 'react-router-dom';

const ErrorPage404 = () => {
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
          <img src={error404} alt='error404' style={{width: '100%', height: 'auto'}} />
        </Box>
      </Grid>
      <Grid item>
        <Stack alignItems='center' spacing={2}>
          <Typography variant='h1' align='center'>
            Page Not Found
          </Typography>
          <Typography
            variant='body1'
            align='center'
            sx={{color: 'rgb(140, 140, 140)', width: '85%'}}
          >
            The page you are looking was moved, removed, renamed, or might never exist!
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

export default ErrorPage404;
