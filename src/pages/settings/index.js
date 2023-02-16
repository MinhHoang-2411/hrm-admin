import React from 'react';
import {Card, CardHeader, Divider, Grid, Alert, CardContent, AlertTitle} from '@mui/material';
import ChangePwdForm from './ChangePwdForm';

const SettingsPage = () => {
  return (
    <Card
      sx={{backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(97, 97, 97)', borderRadius: '6px'}}
    >
      <CardHeader sx={{p: 3}} title='Account Settings' />
      <Divider />
      <CardContent sx={{p: 3}}>
        <Grid container>
          <Grid item xs={12}>
            <Alert
              variant='outlined'
              severity='warning'
              sx={{fontSize: '1rem', border: '1px dashed #ffc107', alignItems: 'center'}}
            >
              <AlertTitle sx={{fontSize: '1rem'}}>Alert!</AlertTitle>
              Please enter password between 8 and 60 characters. <b>Do not share your password</b>
            </Alert>
          </Grid>
          <Grid item xs={12} sx={{mt: '20px'}}>
            <Card>
              <CardHeader sx={{p: 3}} title='Change Password' />
              <Divider />
              <CardContent sx={{p: 3}}>
                <ChangePwdForm />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
