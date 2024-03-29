import {CameraOutlined, CloseOutlined, SaveOutlined, FilePdfOutlined} from '@ant-design/icons';
import {
  Box,
  Button,
  IconButton,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormHelperText,
  Divider,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {STATUS_CANDIDATE} from 'constants/index';
import {Form, Formik} from 'formik';
import {useEffect, useState} from 'react';
import Avatar from 'react-avatar';
import {ThreeDots} from 'react-loader-spinner';
import {candidateActions} from 'store/candidate/candidateSlice';
import '../../../assets/style/employee.scss';
import useUploadImg from '../../../hooks/useUploadImg';
import {CreateCandidateSchema} from '../../../utils/validate/create-candidate-schema';
import user from 'assets/images/users/user.png';
import FieldData from 'components/FieldData';

export default function ModalCreateCandidate({id, typeOpenModal, handleClose}) {
  const dispatch = useAppDispatch();
  const dataCandidate = useAppSelector((state) => state.candidate.dataCandidate);
  const isLoading = useAppSelector((state) => state.candidate.loadingEdit);
  const {getRootProps, getInputProps, imagePreview, avatarBase64} = useUploadImg();
  const [phoneNumber, setPhoneNumber] = useState('');
  const NUMBER_REGEX = /^[0-9]+$/;

  const onCreateCandidate = async (values) => {
    try {
      let params = {
        firstName: values.firstName,
        lastName: values.lastName,
        imageUrl: avatarBase64 || '',
        phoneNumber: phoneNumber,
        email: values.email.trim(),
        note: values.note,
        resumeUrl: values.resumeUrl,
        status: values.status,
      };
      if (typeOpenModal == 'edit')
        dispatch(candidateActions.edit({...params, id: id, handleClose: () => handleClose()}));
      else dispatch(candidateActions.create({...params, handleClose: () => handleClose()}));
    } catch (error) {
      console.error({error});
    }
  };

  useEffect(() => {
    if ((typeOpenModal == 'detail' && id) || (typeOpenModal == 'edit' && id))
      dispatch(candidateActions.getById(id));
  }, [id]);
  useEffect(() => {
    if (dataCandidate?.phoneNumber) setPhoneNumber(dataCandidate?.phoneNumber);
  }, [dataCandidate?.phoneNumber]);

  if (typeOpenModal == 'detail') {
    return (
      <>
        {isLoading ? (
          <div className={`text-center`}>
            <ThreeDots height='60' width='60' color='#339cff' />
          </div>
        ) : (
          <>
            <div style={{padding: '15px'}}>
              <span style={{fontSize: '20px', fontWeight: 700, color: '#000'}}>
                Candidate Information
              </span>
            </div>
            <Divider />
            <div style={{padding: '20px'}}>
              <Grid container>
                <Grid item xs={6}>
                  <FieldData label='First name' value={dataCandidate?.firstName || ''} />
                </Grid>
                <Grid item xs={6}>
                  <FieldData label='Last name' value={dataCandidate?.lastName || ''} />
                </Grid>
                <Grid item xs={6}>
                  <FieldData label='Email' value={dataCandidate?.email || ''} />
                </Grid>
                <Grid item xs={6}>
                  <FieldData
                    label='Resume URL'
                    value={
                      <IconButton
                        aria-label='edit'
                        onClick={() => window.open(dataCandidate?.resumeUrl || '')}
                      >
                        <FilePdfOutlined style={{color: '#1890ff'}} />
                      </IconButton>
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <FieldData label='Note' value={dataCandidate?.note || ''} />
                </Grid>
                <Grid item xs={6}>
                  <FieldData
                    label='Status'
                    value={
                      `${dataCandidate?.status[0]}${dataCandidate?.status
                        .substring(1)
                        .toLowerCase()}` || ''
                    }
                  />
                </Grid>
              </Grid>
            </div>
            <Divider />
            <div style={{padding: '20px', display: 'flex', justifyContent: 'flex-end'}}>
              <Button
                variant='outlined'
                color='error'
                className='button-submit-member'
                startIcon={<CloseOutlined />}
                onClick={() => handleClose()}
                sx={{marginLeft: 'auto'}}
              >
                Close
              </Button>
            </div>
            <Divider />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <Formik
          initialValues={{
            firstName: dataCandidate?.firstName || '',
            lastName: dataCandidate?.lastName || '',
            imageUrl: dataCandidate?.imageUrl || '',
            phoneNumber: dataCandidate?.phoneNumber || phoneNumber || '',
            email: dataCandidate?.email || '',
            note: dataCandidate?.note || '',
            resumeUrl: dataCandidate?.resumeUrl || '',
            status: dataCandidate?.status,
          }}
          validationSchema={CreateCandidateSchema(typeOpenModal)}
          onSubmit={onCreateCandidate}
        >
          {({errors, touched, values, setFieldValue, handleChange}) => (
            <Form>
              <div className='container-create-member d-flex'>
                <div className='group-avatar-member'>
                  <div className='div-avatar-member'>
                    <span className='label-modal-create'>
                      {typeOpenModal == 'create' ? 'Add New Candidate' : 'Main information'}
                    </span>
                    <div className='upload-img'>
                      <div className='item-center container-avatar'>
                        {imagePreview || values?.imageUrl ? (
                          <Avatar
                            src={imagePreview || values?.imageUrl}
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
                        <div className=''>
                          <TextField
                            name='email'
                            label='Email*'
                            defaultValue={values.email}
                            className='field-full-name'
                            onChange={handleChange}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='group-info-member'>
                  <div className='div-info-member'>
                    <span className='label-modal-create'>Other Information</span>
                    <div className='group-input-member'>
                      <Box sx={{width: '100%', marginTop: '15px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <TextField
                              fullWidth
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
                            <TextField
                              fullWidth
                              name='resumeUrl'
                              label='Resume URL*'
                              defaultValue={values.resumeUrl}
                              onChange={handleChange}
                              error={touched.resumeUrl && Boolean(errors.resumeUrl)}
                              helperText={touched.resumeUrl && errors.resumeUrl}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl
                              sx={{width: '100%'}}
                              error={touched.status && errors.status}
                            >
                              <InputLabel id='sex-select-label'>Status*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values.status}
                                onChange={(e) => setFieldValue('status', e.target.value)}
                              >
                                {STATUS_CANDIDATE?.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {`${item[0]}${item.substring(1).toLowerCase()}`}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>{touched.status && errors.status}</FormHelperText>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              multiline
                              name='note'
                              label='Note'
                              defaultValue={values.note}
                              onChange={handleChange}
                              error={touched.note && Boolean(errors.note)}
                              helperText={touched.note && errors.note}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      {/*
                      <Box sx={{width: '100%', marginTop: '40px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}></Grid>
                      </Box> */}
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
                  Close
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
