import {CloseOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useEffect, useRef, useState} from 'react';
import Avatar from 'react-avatar';
import {ThreeDots} from 'react-loader-spinner';
import {accountActions} from 'store/account/accountSlice';
import {alertActions} from 'store/alert/alertSlice';
import {employeeActions} from 'store/employee/employeeSlice';
import {formatDateMaterial} from 'utils';
import '../../../assets/style/employee.scss';

export default function ModalCreateAccount({idAccount, typeOpenModal, handleClose}) {
  const dispatch = useAppDispatch();
  const pwdRef = useRef(null);

  //FAKE_DATA
  const dataAccount = useAppSelector((state) => state.account.dataAccount);
  const dataEmployee = useAppSelector((state) => state.employee.dataEmployee);
  const isLoading = useAppSelector((state) => state.account.loadingEdit);
  //STATE
  const [openNewPwdInput, setOpenNewPwdInput] = useState(false);
  const [pwd, setPwd] = useState(dataAccount?.password);
  const [newPwd, setNewPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [newPwdError, setNewPwdError] = useState(false);
  //HANDLE

  const handleChangePwd = (pwd, newPwd) => {
    //bla bla
    if (!newPwd || !(newPwd === pwd)) {
      setNewPwdError(true);
      return;
    }
    dispatch(
      alertActions.showAlert({
        text: 'Updated Password',
        type: 'success',
      })
    );
    setNewPwd('');
    setOpenNewPwdInput(false);
  };
  const openNewPwd = () => {
    setOpenNewPwdInput(true);
    pwdRef.current.focus();
  };

  useEffect(() => {
    if (typeOpenModal == 'edit' && idAccount) {
      dispatch(employeeActions.getById(1));
      dispatch(accountActions.getById(idAccount));
    }
  }, [idAccount]);

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <div className='container-create-member d-flex'>
          <div className='group-avatar-member'>
            <div className='div-avatar-member'>
              <span className='label-modal-create'>Employee Infomation</span>
              <div className='upload-img'>
                <div className='item-center container-avatar'>
                  {dataAccount?.imageUrl ? (
                    <Avatar src={dataAccount?.imageUrl} round={true} size={135}></Avatar>
                  ) : (
                    <Avatar
                      name={`${dataAccount?.firstName}` || `Avatar`}
                      maxInitials={3}
                      round={true}
                      size={135}
                      color={`#ee392a`}
                      fgColor={`#fff`}
                    />
                  )}
                </div>
                <div className='d-flex main-info'>
                  <div className='field-info-member'>
                    <TextField
                      name='firstName'
                      id='full_name-required'
                      label='First Name*'
                      className='field-full-name'
                      defaultValue={dataAccount?.firstName}
                      InputProps={{readOnly: true}}
                    />
                  </div>
                  <div className='field-info-member'>
                    <TextField
                      name='lastName'
                      id='full_name-required'
                      label='Last Name*'
                      className='field-full-name'
                      defaultValue={dataAccount?.lastName}
                      InputProps={{readOnly: true}}
                    />
                  </div>
                  <div className='field-info-member'>
                    <TextField
                      sx={{width: '250px'}}
                      id='date'
                      label='Date of birth'
                      name='dateOfBirth'
                      type='date'
                      defaultValue={formatDateMaterial(dataEmployee?.dateOfBirth)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='group-info-member'>
            <div className='div-info-member'>
              <Box sx={{marginBottom: '25px'}}>
                <span className='label-modal-create'>Account information</span>
                <Box sx={{width: '100%', marginTop: '15px'}}>
                  <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={4}>
                      <TextField
                        name='login'
                        type='string'
                        label='Login'
                        defaultValue={dataAccount?.login}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name='email'
                        label='Email*'
                        defaultValue={dataAccount?.email}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <TextField
                        fullWidth
                        name='password'
                        label='Password'
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        type={showPwd ? 'string' : 'password'}
                        InputProps={{
                          readOnly: openNewPwdInput ? false : true,
                          endAdornment: (
                            <InputAdornment position='end'>
                              <Tooltip title={showPwd ? 'Un show password' : 'Show password'}>
                                <IconButton
                                  aria-label='password'
                                  edge='end'
                                  onClick={() => setShowPwd(!showPwd)}
                                >
                                  {showPwd ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          ),
                        }}
                        inputRef={pwdRef}
                      />
                    </Grid>
                    {/* <Grid item xs={4}>
                      <Button
                        onClick={() => handleResetPwd(dataAccount)}
                        sx={{padding: '7.5px'}}
                        variant='outlined'
                      >
                        Reset Password
                      </Button>
                    </Grid> */}
                    <Grid item xs={4}>
                      <Button
                        onClick={openNewPwd}
                        sx={{padding: '7.5px'}}
                        variant='outlined'
                        startIcon={<EditOutlined />}
                      >
                        Change Password
                      </Button>
                    </Grid>
                    <Grid
                      item
                      container
                      columnSpacing={{xs: 1, sm: 2, md: 3}}
                      rowSpacing={2}
                      sx={{display: openNewPwdInput ? 'flex' : 'none'}}
                    >
                      <Grid item xs={8}>
                        <TextField
                          fullWidth
                          type={showPwd ? 'string' : 'password'}
                          name='confirmNewPwd'
                          label='Confirm new password'
                          value={newPwd}
                          onChange={(e) => {
                            setNewPwd(e.target.value);
                            if (e.target.value.length > 0) {
                              setNewPwdError(false);
                            }
                          }}
                          error={newPwdError}
                          helperText={newPwdError ? 'Password does not match' : null}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Stack direction='row' spacing={1}>
                          <Button
                            variant='outlined'
                            sx={{padding: '7.5px'}}
                            onClick={() => handleChangePwd(pwd, newPwd)}
                          >
                            Ok
                          </Button>
                          <Button
                            variant='outlined'
                            color='error'
                            sx={{padding: '7.5px'}}
                            onClick={() => {
                              setNewPwd('');
                              setPwd(dataAccount?.password);
                              setNewPwdError(false);
                              setOpenNewPwdInput(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <span className='label-modal-create'>Personal information</span>
              <div className='group-input-member'>
                <Box sx={{width: '100%', marginTop: '15px'}}>
                  <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={4}>
                      <TextField
                        name='phoneNumber'
                        type='string'
                        pattern='[0-9]*'
                        id='phone-required'
                        label='Phone Number'
                        value={dataEmployee?.phoneNumber || 'none'}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl sx={{width: '192px'}}>
                        <TextField
                          label='Gender'
                          value={dataEmployee?.gender}
                          InputProps={{readOnly: true}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name='address'
                        label='Address*'
                        defaultValue={dataEmployee?.address || ''}
                        InputProps={{readOnly: true}}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{width: '100%', marginTop: '40px'}}>
                  <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={4}>
                      <FormControl sx={{width: '192px'}}>
                        <TextField
                          label='Department'
                          value={dataEmployee?.department}
                          InputProps={{readOnly: true}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl sx={{width: '192px'}}>
                        <TextField
                          label='Position'
                          value={dataEmployee?.position}
                          InputProps={{readOnly: true}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl sx={{width: '192px'}}>
                        <TextField
                          label='Team'
                          value={dataEmployee?.team?.name}
                          InputProps={{readOnly: true}}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{width: '100%', marginTop: '40px'}}>
                  <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                    <Grid item xs={4}>
                      <FormControl sx={{width: '192px'}}>
                        <TextField
                          label='Branch'
                          value={dataEmployee?.branch?.name}
                          InputProps={{readOnly: true}}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        name='nationality'
                        type='string'
                        label='Nation'
                        defaultValue={dataEmployee?.nationality || 'none'}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <TextField
                        sx={{width: '192px'}}
                        id='date'
                        label='Join Date'
                        type='date'
                        name='joinedDate'
                        defaultValue={formatDateMaterial(dataEmployee?.joinedDate)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <div className='group-footer'>
                  <Button
                    variant='outlined'
                    color='error'
                    className='button-submit-member'
                    startIcon={<CloseOutlined />}
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
