import {CameraOutlined, CloseOutlined, SaveOutlined} from '@ant-design/icons';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  Popper,
  Paper,
  Stack,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import user from 'assets/images/users/user.png';
import {optionsSelect} from 'components/select/index';
import {LIST_AUTHORITIES} from 'constants/index';
import {Form, Formik} from 'formik';
import {useEffect, useState} from 'react';
import Avatar from 'react-avatar';
import {ThreeDots} from 'react-loader-spinner';
import {employeeActions} from 'store/employee/employeeSlice';
import {formatDateMaterial, formatDateMaterialToTimeStamp} from 'utils/index';
import {CreateEmployeeSchema} from 'utils/validate/create-employee-schema';
import '../../../assets/style/employee.scss';
import useUploadImg from '../../../hooks/useUploadImg';
import {currentDate} from 'utils/date/currentDate';

export default function ModalCreateAsset({
  idEmployee,
  typeOpenModal,
  listTeam,
  listBranches,
  listPositions,
  listDepartments,
  handleClose,
}) {
  const dispatch = useAppDispatch();
  const dataEmployee = useAppSelector((state) => state.employee.dataEmployee);
  const isLoading = useAppSelector((state) => state.employee.loadingEdit);
  const {getRootProps, getInputProps, imagePreview, avatarBase64} = useUploadImg();
  const [phoneNumber, setPhoneNumber] = useState('');
  const NUMBER_REGEX = /^[0-9]+$/;

  const onCreateEmployee = async (values) => {
    try {
      const params = {
        id: idEmployee || null,
        user: {
          id: null,
        },
        dateOfBirth: formatDateMaterialToTimeStamp(values?.dateOfBirth),
        phoneNumber: phoneNumber,
        department: values.department,
        position: values.position,
        team: {
          id: values.teamId,
        },
        branch: {
          id: values.branchId,
        },
        nationality: values.nationality,
        gender: values.gender,
        address: {
          id: dataEmployee?.address?.id,
          streetAddress: values?.streetAddress,
          city: values?.city,
          country: values?.country,
          stateProvince: values?.stateProvince,
          postalCode: values?.postalCode,
        },
        joinedDate: formatDateMaterialToTimeStamp(values?.joinedDate),
        user: {
          login: values?.login,
          firstName: values?.firstName,
          lastName: values?.lastName,
          email: values?.email.trim(),
          activated: true,
          langKey: 'en',
          authorities:
            values?.authorities == 'ROLE_ADMIN' ? ['ROLE_ADMIN', 'ROLE_USER'] : ['ROLE_USER'],
          imageUrl: avatarBase64 || null,
        },
        leaveDays: values.leaveDays,
        employeeCode: values.employeeCode,
        resumeUrl: values.resume,
      };
      if (typeOpenModal == 'edit' && idEmployee) {
        dispatch(employeeActions.edit({params, handleClose: () => handleClose()}));
      } else {
        delete params.id;
        delete params.address.id;
        delete params.employeeCode;
        dispatch(employeeActions.create({params, handleClose: () => handleClose()}));
      }
    } catch (error) {
      console.error({error});
    }
  };

  useEffect(() => {
    if (typeOpenModal == 'edit' && idEmployee) dispatch(employeeActions.getById(idEmployee));
  }, [idEmployee]);
  useEffect(() => {
    if (dataEmployee?.phoneNumber) setPhoneNumber(dataEmployee?.phoneNumber);
  }, [dataEmployee?.phoneNumber]);

  //test zone
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddressPopup, setOpenAddressPopup] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenAddressPopup(true);
  };

  const id = open ? 'simple-popper' : undefined;

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <Formik
          initialValues={{
            firstName: dataEmployee?.user?.firstName || '',
            lastName: dataEmployee?.user?.lastName || '',
            avatar: dataEmployee?.user?.imageUrl || '',
            dateOfBirth: formatDateMaterial(dataEmployee?.dateOfBirth) || '',
            phoneNumber: dataEmployee?.phoneNumber || phoneNumber || '',
            email: dataEmployee?.user?.email || '',
            gender: dataEmployee?.gender || 'MALE',
            department: dataEmployee?.department,
            position: dataEmployee?.position,
            teamId: dataEmployee?.team?.id,
            branchId: dataEmployee?.branch?.id,
            nationality: dataEmployee?.nationality,
            address: dataEmployee?.address?.streetAddress || '',
            streetAddress: dataEmployee?.address?.streetAddress || '',
            city: dataEmployee?.address?.city || '',
            country: dataEmployee?.address?.country || '',
            stateProvince: dataEmployee?.address?.stateProvince || '',
            postalCode: dataEmployee?.address?.postalCode || '',
            joinedDate: formatDateMaterial(dataEmployee?.joinedDate) || '',
            login: dataEmployee?.user?.login || '',
            authorities: dataEmployee?.user?.authorities?.includes('ROLE_ADMIN')
              ? 'ROLE_ADMIN'
              : 'ROLE_USER',
            employeeCode: dataEmployee?.employeeCode || '',
            leaveDays: dataEmployee?.leaveDays || 0,
            resume: dataEmployee?.resumeUrl || '',
          }}
          validationSchema={CreateEmployeeSchema(typeOpenModal)}
          onSubmit={onCreateEmployee}
        >
          {({errors, touched, values, setFieldValue, handleChange}) => (
            <Form>
              <div className='container-create-member d-flex'>
                <div className='group-avatar-member'>
                  <div className='div-avatar-member'>
                    <span className='label-modal-create'>
                      {typeOpenModal == 'create'
                        ? 'Add New Employee'
                        : 'Update Employee Information'}
                    </span>
                    <div className='upload-img'>
                      <div className='item-center container-avatar'>
                        {imagePreview || values?.avatar ? (
                          <Avatar
                            src={imagePreview || values?.avatar}
                            round={true}
                            size={135}
                          ></Avatar>
                        ) : (
                          <Avatar
                            src={user}
                            maxInitials={3}
                            round={true}
                            size={135}
                            color={`#1890ff`}
                            fgColor={`#fff`}
                          />
                        )}
                        {/* <Button
                          sx={{marginTop: '10px', width: '90px'}}
                          variant='outlined'
                          size='small'
                          startIcon={<CameraOutlined />}
                          {...getRootProps()}
                        >
                          Upload
                        </Button> */}
                        <input {...getInputProps()} />
                      </div>
                      <div className='d-flex main-info'>
                        <div className='field-info-member'>
                          <TextField
                            name='firstName'
                            id='full_name-required'
                            label='First Name*'
                            className='field-full-name'
                            defaultValue={values.firstName}
                            onChange={handleChange}
                            error={touched.firstName && Boolean(errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </div>
                        <div className='field-info-member'>
                          <TextField
                            name='lastName'
                            id='full_name-required'
                            label='Last Name*'
                            className='field-full-name'
                            defaultValue={values.lastName}
                            onChange={handleChange}
                            error={touched.lastName && Boolean(errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </div>
                        <div className='field-info-member'>
                          <TextField
                            sx={{width: '250px'}}
                            id='date'
                            label='Date of Birth'
                            type='date'
                            name='dateOfBirth'
                            defaultValue={values.dateOfBirth}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleChange}
                            error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
                            helperText={touched.dateOfBirth && errors.dateOfBirth}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='group-info-member'>
                  <div className='div-info-member'>
                    <span className='label-modal-create'>Personal Information</span>
                    <div className='group-input-member'>
                      <Box sx={{width: '100%', marginTop: '15px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <TextField
                              name='phoneNumber'
                              type='string'
                              pattern='[0-9]*'
                              id='phone-required'
                              label='Phone Number*'
                              value={phoneNumber}
                              onChange={(event) => {
                                const value = event.target.value;
                                if (value !== '' && !NUMBER_REGEX.test(value)) {
                                  return;
                                }
                                setPhoneNumber(value);
                                setFieldValue('phoneNumber', value);
                              }}
                              error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                              helperText={touched.phoneNumber && errors.phoneNumber}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '192px'}}
                              error={touched.gender && errors.gender}
                            >
                              <InputLabel id='demo-simple-select-error-label'>Gender</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select-error'
                                value={values?.gender}
                                onChange={(e) => setFieldValue('gender', e.target.value)}
                              >
                                <MenuItem value='MALE'>Male</MenuItem>
                                <MenuItem value='FEMALE'>Female</MenuItem>
                                <MenuItem value='UNKNOWN'>Unknown</MenuItem>
                              </Select>
                              <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                              }}
                              InputLabelProps={{shrink: values.address ? true : false}}
                              name='address'
                              label='Address*'
                              defaultValue={values.address}
                              value={values.address}
                              error={touched.address && Boolean(errors.address)}
                              helperText={touched.address && errors.address}
                              onClick={handleClick}
                            />
                          </Grid>
                        </Grid>
                        <Popper sx={{zIndex: '9999'}} open={openAddressPopup} anchorEl={anchorEl}>
                          <Paper sx={{padding: '4px', marginTop: '2px'}}>
                            <Stack spacing={1}>
                              <TextField
                                name='streetAddress'
                                type='string'
                                label='Street Address'
                                onChange={handleChange}
                                defaultValue={values.streetAddress}
                                error={touched.streetAddress && Boolean(errors.streetAddress)}
                                helperText={touched.streetAddress && errors.streetAddress}
                              />
                              <TextField
                                name='city'
                                type='string'
                                label='City'
                                onChange={handleChange}
                                defaultValue={values.city}
                                error={touched.city && Boolean(errors.city)}
                                helperText={touched.city && errors.city}
                              />
                              <TextField
                                name='stateProvince'
                                type='string'
                                label='Province/State'
                                onChange={handleChange}
                                defaultValue={values.stateProvince}
                                error={touched.stateProvince && Boolean(errors.stateProvince)}
                                helperText={touched.stateProvince && errors.stateProvince}
                              />
                              <TextField
                                name='country'
                                type='string'
                                label='Country'
                                onChange={handleChange}
                                defaultValue={values.country}
                                error={touched.country && Boolean(errors.country)}
                                helperText={touched.country && errors.country}
                              />
                              <TextField
                                name='postalCode'
                                type='string'
                                label='Postal Code'
                                onChange={handleChange}
                                defaultValue={values.postalCode}
                                error={touched.postalCode && Boolean(errors.postalCode)}
                                helperText={touched.postalCode && errors.postalCode}
                              />
                              <Button
                                variant='contained'
                                color='primary'
                                size='small'
                                onClick={() => {
                                  setOpenAddressPopup(false);
                                  setFieldValue('address', values.streetAddress);
                                  console.log('address', values.streetAddress);
                                }}
                              >
                                OK
                              </Button>
                            </Stack>
                          </Paper>
                        </Popper>
                      </Box>

                      <Box sx={{width: '100%', marginTop: '40px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '192px'}}
                              error={touched.department && errors.department}
                            >
                              <InputLabel id='sex-select-label'>Department*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values.department}
                                onChange={(e) => setFieldValue('department', e.target.value)}
                              >
                                {optionsSelect(listDepartments)}
                              </Select>
                              <FormHelperText>
                                {touched.department && errors.department}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '192px'}}
                              error={touched.position && errors.position}
                            >
                              <InputLabel id='sex-select-label'>Position*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values.position}
                                onChange={(e) => setFieldValue('position', e.target.value)}
                              >
                                {optionsSelect(listPositions)}
                              </Select>
                              <FormHelperText>{touched.position && errors.position}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '192px'}}
                              error={touched.teamId && errors.teamId}
                            >
                              <InputLabel id='sex-select-label'>Team*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values.teamId}
                                onChange={(e) => setFieldValue('teamId', e.target.value)}
                              >
                                {listTeam?.map((item, index) => (
                                  <MenuItem key={index} value={item?.id}>
                                    {item?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>{touched.teamId && errors.teamId}</FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{width: '100%', marginTop: '40px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '192px'}}
                              error={touched.branchId && errors.branchId}
                            >
                              <InputLabel id='demo-simple-select-error-label'>Branch*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select-error'
                                value={values.branchId}
                                onChange={(e) => setFieldValue('branchId', e.target.value)}
                              >
                                {listBranches?.map((item, index) => (
                                  <MenuItem key={index} value={item?.id}>
                                    {item?.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>{touched.branchId && errors.branchId}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              name='nationality'
                              type='string'
                              label='Nation'
                              onChange={handleChange}
                              defaultValue={values.nationality}
                              error={touched.nationality && Boolean(errors.nationality)}
                              helperText={touched.nationality && errors.nationality}
                            />
                          </Grid>

                          <Grid item xs={4}>
                            <TextField
                              sx={{width: '192px'}}
                              id='date'
                              label='Joining Date'
                              type='date'
                              name='joinedDate'
                              defaultValue={values.joinedDate}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              onChange={handleChange}
                              error={touched.joinedDate && Boolean(errors.joinedDate)}
                              helperText={touched.joinedDate && errors.joinedDate}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      <Box sx={{width: '100%', marginTop: '40px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <TextField
                              name='leaveDays'
                              type='number'
                              label='Leave Days'
                              onChange={handleChange}
                              defaultValue={values.leaveDays}
                              error={touched.leaveDays && Boolean(errors.leaveDays)}
                              helperText={touched.leaveDays && errors.leaveDays}
                            />
                          </Grid>
                          {typeOpenModal == 'edit' && (
                            <Grid item xs={4}>
                              <TextField
                                disabled
                                name='employeeCode'
                                type='string'
                                label='Employee code'
                                onChange={handleChange}
                                defaultValue={values.employeeCode}
                                error={touched.employeeCode && Boolean(errors.employeeCode)}
                                helperText={touched.employeeCode && errors.employeeCode}
                              />
                            </Grid>
                          )}

                          <Grid item xs={4}>
                            <TextField
                              name='resume'
                              type='string'
                              label='CV URL'
                              onChange={handleChange}
                              defaultValue={values.resume}
                              error={touched.resume && Boolean(errors.resume)}
                              helperText={touched.resume && errors.resume}
                            />
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{marginTop: '25px'}}>
                        <span className='label-modal-create'>Account Information</span>
                        <Box sx={{width: '100%', marginTop: '15px', marginBottom: '15px'}}>
                          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={4}>
                              <TextField
                                disabled={typeOpenModal == 'edit'}
                                // InputProps={{
                                //   readOnly: typeOpenModal == 'edit',
                                // }}
                                // inputProps={
                                //   typeOpenModal == 'edit'
                                //     ? {
                                //         style: {cursor: 'not-allowed'},
                                //       }
                                //     : {}
                                // }
                                name='login'
                                type='string'
                                label='Username*'
                                defaultValue={values.login}
                                onChange={handleChange}
                                error={touched.login && Boolean(errors.login)}
                                helperText={touched.login && errors.login}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                name='email'
                                label='Email*'
                                defaultValue={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                              />
                            </Grid>
                            <Grid item xs={4}>
                              <FormControl sx={{width: '192px'}}>
                                <InputLabel id='sex-select-label'>Authorities</InputLabel>
                                <Select
                                  labelId='sex-select-label'
                                  id='demo-simple-select'
                                  value={values?.authorities}
                                  onChange={(e) => setFieldValue('authorities', e.target.value)}
                                >
                                  {LIST_AUTHORITIES?.map((item, index) => (
                                    <MenuItem key={index} value={item?.name}>
                                      {item?.title}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                        {typeOpenModal !== 'edit' && (
                          <Alert severity='info'>
                            Default password is <b>"stdioasia"</b>, please change after adding new
                            employee successfully
                          </Alert>
                        )}
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <div className='group-footer'>
                <Button
                  variant='outlined'
                  size='error'
                  className='button-submit-member'
                  startIcon={<CloseOutlined />}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Close
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  // type='submit'
                  className='button-submit-member'
                  startIcon={<SaveOutlined />}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}
