import {useState} from 'react';
import {EditOutlined, UndoOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
import {Form, Formik} from 'formik';
import {TextField, Button, Stack, InputAdornment, IconButton} from '@mui/material';
import * as Yup from 'yup';
import {settingsActions} from './../../store/settings/settingsSlice';
import {useAppDispatch} from './../../app/hooks';

const ChangePwdForm = () => {
  const [pwds, setPwds] = useState([]);
  const dispatch = useAppDispatch();

  const onChangePwd = async (values, {resetForm}) => {
    try {
      const params = {
        currentPassword: values.currentPwd,
        newPassword: values.newPwd,
      };
      dispatch(settingsActions.changePwd(params));
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };
  const toggleShowPwds = (field) => {
    if (pwds.includes(field)) {
      setPwds((prev) => prev.filter((item) => item != field));
    } else {
      setPwds([...pwds, field]);
    }
  };
  return (
    <Formik
      initialValues={{
        currentPwd: '',
        newPwd: '',
        confirmNewPwd: '',
      }}
      validationSchema={Yup.object().shape({
        currentPwd: Yup.string()
          .required('Please enter Current Password')
          .min(8, ' Please enter at least 8 characters')
          .max(60, 'Please enter no more than 60 characters'),
        newPwd: Yup.string()
          .required('Please enter New Password')
          .notOneOf([Yup.ref('currentPwd'), null], 'New password is the same with current password')
          .min(8, ' Please enter at least 8 characters')
          .max(60, 'Please enter no more than 60 characters'),
        confirmNewPwd: Yup.string()
          .required('Please enter Confirm Password')
          .oneOf([Yup.ref('newPwd'), null], 'Passwords must match')
          .min(8, ' Please enter at least 8 characters')
          .max(60, 'Please enter no more than 60 characters'),
      })}
      onSubmit={onChangePwd}
    >
      {({errors, touched, values, handleReset, handleChange}) => (
        <Form>
          <Stack spacing={2}>
            <Stack spacing={2}>
              <TextField
                type={pwds.includes('currentPwd') ? 'text' : 'password'}
                name='currentPwd'
                label='Current Password'
                value={values.currentPwd}
                onChange={handleChange}
                error={touched.currentPwd && Boolean(errors.currentPwd)}
                helperText={touched.currentPwd && errors.currentPwd}
                sx={{width: '40%'}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          toggleShowPwds('currentPwd');
                        }}
                      >
                        {!pwds.includes('currentPwd') ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type={pwds.includes('newPwd') ? 'text' : 'password'}
                name='newPwd'
                label='New Password'
                value={values.newPwd}
                onChange={handleChange}
                error={touched.newPwd && Boolean(errors.newPwd)}
                helperText={touched.newPwd && errors.newPwd}
                sx={{width: '40%'}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          toggleShowPwds('newPwd');
                        }}
                      >
                        {!pwds.includes('newPwd') ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type={pwds.includes('confirmNewPwd') ? 'text' : 'password'}
                name='confirmNewPwd'
                label='Confirm New Password'
                value={values.confirmNewPwd}
                onChange={handleChange}
                error={touched.confirmNewPwd && Boolean(errors.confirmNewPwd)}
                helperText={touched.confirmNewPwd && errors.confirmNewPwd}
                sx={{width: '40%'}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          toggleShowPwds('confirmNewPwd');
                        }}
                      >
                        {!pwds.includes('confirmNewPwd') ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack direction='row' spacing={2}>
              <Button
                onClick={() => {
                  handleReset();
                  console.log('Minhhh');
                }}
                variant='outlined'
                size='large'
                startIcon={<UndoOutlined />}
              >
                Clear
              </Button>
              <Button
                variant='contained'
                color='primary'
                size='large'
                type='submit'
                startIcon={<EditOutlined />}
              >
                Change Password
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ChangePwdForm;
