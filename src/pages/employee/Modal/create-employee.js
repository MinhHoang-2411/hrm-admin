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

  const onCreateAsset = async (values) => {
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
          streetAddress: values?.address,
        },
        joinedDate: formatDateMaterialToTimeStamp(values?.joinedDate),
        user: {
          firstName: values?.firstName || dataEmployee?.user?.firstName,
          lastName: values?.lastName || dataEmployee?.user?.lastName,
          email: values?.email || dataEmployee?.user?.email,
          imageUrl: avatarBase64 || dataEmployee?.user?.imageUrl,
        },
      };
      const userParams = {
        login: values?.login,
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        activated: true,
        langKey: 'en',
        authorities: [values?.authorities],
        imageUrl: avatarBase64 || null,
      };
      if (typeOpenModal == 'edit' && idEmployee) dispatch(employeeActions.edit(params));
      else {
        delete params.user;
        delete params.id;
        delete params.address.id;
        dispatch(employeeActions.create({params, userParams}));
      }
    } catch (error) {
      console.error({error});
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (typeOpenModal == 'edit' && idEmployee) dispatch(employeeActions.getById(idEmployee));
  }, [idEmployee]);
  useEffect(() => {
    if (dataEmployee?.phoneNumber) setPhoneNumber(dataEmployee?.phoneNumber);
  }, [dataEmployee?.phoneNumber]);

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
            gender: dataEmployee?.gender,
            department: dataEmployee?.department,
            position: dataEmployee?.position,
            teamId: dataEmployee?.team?.id,
            branchId: dataEmployee?.branch?.id,
            nationality: dataEmployee?.nationality,
            address: dataEmployee?.address?.streetAddress || '',
            joinedDate: formatDateMaterial(dataEmployee?.joinedDate) || '',
            login: dataEmployee?.user?.login || '',
            authorities: dataEmployee?.user?.authorities || 'ROLE_USER',
          }}
          validationSchema={CreateEmployeeSchema(typeOpenModal)}
          onSubmit={onCreateAsset}
        >
          {({errors, touched, values, setFieldValue, handleChange}) => (
            <Form>
              <div className='container-create-member d-flex'>
                <div className='group-avatar-member'>
                  <div className='div-avatar-member'>
                    <span className='label-modal-create'>
                      {typeOpenModal == 'create'
                        ? 'Add new employee'
                        : 'Update employee information'}
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
                            label='Date of birth'
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
                                value={values.gender}
                                onChange={(e) => setFieldValue('gender', e.target.value)}
                              >
                                <MenuItem value='MALE'>MALE</MenuItem>
                                <MenuItem value='FEMALE'>FEMALE</MenuItem>
                              </Select>
                              <FormHelperText>{touched.gender && errors.gender}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              name='address'
                              label='Address*'
                              defaultValue={values.address}
                              onChange={handleChange}
                              error={touched.address && Boolean(errors.address)}
                              helperText={touched.address && errors.address}
                            />
                          </Grid>
                        </Grid>
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

                      <Box sx={{marginTop: '25px'}}>
                        <span className='label-modal-create'>Account information</span>
                        <Box sx={{width: '100%', marginTop: '15px'}}>
                          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                            <Grid item xs={4}>
                              <TextField
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
                  onClick={() => handleClose()}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  size='large'
                  type='submit'
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
