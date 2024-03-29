import React from 'react';
import {Link as RouterLink} from 'react-router-dom';

// material-ui
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';

// third party
import {Formik} from 'formik';
import * as Yup from 'yup';

// project import
import AnimateButton from 'components/extended/AnimateButton';

// assets
import {EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import {useAppDispatch} from 'app/hooks';
import {useNavigate} from 'react-router-dom';
import {authActions} from 'store/auth/authSlice';

// ============================|| FIREBASE - LOGIN ||============================ //

const AuthLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(false);

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          username: '',
          password: '',
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(50).required('Please enter Username'),
          password: Yup.string().max(60).required('Please enter Password'),
        })}
        onSubmit={async (values, {setErrors, setStatus, setSubmitting}) => {
          try {
            setStatus({success: false});
            setSubmitting(false);
            dispatch(
              authActions.login({
                username: values.username,
                password: values.password,
                rememberMe: checked,
                onNavigate: () => navigate('/'),
              })
            );
          } catch (err) {
            setStatus({success: false});
            setErrors({submit: err.message});
            setSubmitting(false);
          }
        }}
      >
        {({errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values}) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='email-login'>Username</InputLabel>
                  <OutlinedInput
                    id='email-login'
                    type='text'
                    value={values.username}
                    name='username'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder='Enter your Username'
                    fullWidth
                    error={Boolean(touched.username && errors.username)}
                  />
                  {touched.username && errors.username && (
                    <FormHelperText error id='standard-weight-helper-text-email-login'>
                      {errors.username}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor='password-login'>Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id='-password-login'
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name='password'
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                          size='large'
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder='Enter your Password'
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id='standard-weight-helper-text-password-login'>
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              <Grid item xs={12} sx={{mt: -1}}>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  spacing={2}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name='checked'
                        color='primary'
                        size='small'
                      />
                    }
                    label={<Typography variant='h6'>Remember me</Typography>}
                  />
                  <Link variant='h6' component={RouterLink} to='' color='text.primary'>
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12}>
                                <Divider>
                                    <Typography variant="caption"> Login with</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <FirebaseSocial />
                            </Grid> */}
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AuthLogin;
