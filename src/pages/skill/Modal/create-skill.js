import {CameraOutlined, CloseOutlined, SaveOutlined} from '@ant-design/icons';
import {Box, Button, Grid, TextField, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {Form, Formik} from 'formik';
import {useEffect} from 'react';
import Avatar from 'react-avatar';
import {ThreeDots} from 'react-loader-spinner';
import {skillActions} from 'store/skill/skillSlice';
import * as Yup from 'yup';
import '../../../assets/style/employee.scss';
import useUploadImg from '../../../hooks/useUploadImg';

export const CreateSkillSchema = Yup.object().shape({
  name: Yup.string().required('Please enter Name Skill.'),
});

export default function ModalCreateSkill({id, typeOpenModal, handleClose}) {
  const dispatch = useAppDispatch();
  const dataSkill = useAppSelector((state) => state.skill.dataSkill);
  const isLoading = useAppSelector((state) => state.skill.loadingEdit);
  const {getRootProps, getInputProps, imagePreview, avatarBase64} = useUploadImg();

  const onCreateSkill = async (values) => {
    try {
      let params = {
        name: values?.name,
        description: values?.description,
        imageUrl: avatarBase64,
      };
      if (typeOpenModal == 'create') dispatch(skillActions.create(params));
      else dispatch(skillActions.edit({...params, id: id}));
    } catch (error) {
      console.error({error});
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (typeOpenModal == 'edit' && id) dispatch(skillActions.getById(id));
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <Formik
          initialValues={{
            name: dataSkill?.name || '',
            description: dataSkill?.description || '',
            imageUrl: dataSkill?.imageUrl || '',
          }}
          validationSchema={CreateSkillSchema}
          onSubmit={onCreateSkill}
        >
          {({errors, touched, values, handleChange}) => (
            <Form>
              <Box sx={{padding: '25px'}}>
                <Typography component='div' variant='h4' className='two-lines'>
                  {typeOpenModal == 'create' ? 'Create new skill' : 'Edit skill information'}
                </Typography>
                <Grid container spacing={2} columns={12} sx={{marginTop: '15px'}}>
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      name='name'
                      id='full_name-required'
                      label='Name*'
                      className='field-full-name'
                      defaultValue={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                    <TextField
                      sx={{marginTop: '30px'}}
                      fullWidth
                      id='outlined-multiline-static'
                      label='Description'
                      name='description'
                      defaultValue={values.description}
                      onChange={handleChange}
                      multiline
                      rows={5}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <div className='item-center container-avatar'>
                      {imagePreview || values?.imageUrl ? (
                        <Avatar
                          src={imagePreview || values?.imageUrl}
                          round={true}
                          size={130}
                        ></Avatar>
                      ) : (
                        <Avatar
                          name={values?.firstName ? values?.firstName : `Avatar`}
                          maxInitials={3}
                          round={true}
                          size={130}
                          color={`#ee392a`}
                          fgColor={`#fff`}
                        />
                      )}
                      <Button
                        sx={{marginTop: '10px', width: '90px'}}
                        variant='outlined'
                        size='small'
                        startIcon={<CameraOutlined />}
                        {...getRootProps()}
                      >
                        Upload
                      </Button>
                      <input {...getInputProps()} />
                    </div>
                  </Grid>
                </Grid>
              </Box>
              <div className='group-footer'>
                <Button
                  variant='outlined'
                  color='error'
                  className='button-submit-member'
                  startIcon={<CloseOutlined />}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant='outlined'
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
