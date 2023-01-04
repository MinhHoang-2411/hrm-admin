import {CloseOutlined, SaveOutlined} from '@ant-design/icons';
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
import {STATUS_ASSET} from 'constants/index';
import {Form, Formik} from 'formik';
import useGetAllList from 'hooks/useGetAllList';
import {useEffect} from 'react';
import {ThreeDots} from 'react-loader-spinner';
import {assetActions} from 'store/asset/assetSlice';
import {employeeActions} from 'store/employee/employeeSlice';
import {nameMatching} from 'utils/format/name';
import {CreateAssetSchema} from 'utils/validate/create-asset-schema';
import '../../../assets/style/employee.scss';

export default function ModalCreateAsset({id, typeOpenModal, handleClose}) {
  const dispatch = useAppDispatch();
  const dataAsset = useAppSelector((state) => state.asset.dataAsset);
  const isLoading = useAppSelector((state) => state.asset.loadingModelAsset);
  const listModel = useAppSelector((state) => state.asset.listModelsFilter);

  const {listData: listEmployee} = useGetAllList(null, employeeActions, 'employee');

  const onCreateAsset = async (values) => {
    try {
      let params = {
        description: values?.description,
        status: values?.status,
        note: values?.note,
        serialNumber: values?.serialNumber,
        usingBy: values?.usingBy,
        assetModel: {
          id: values?.assetModel,
        },
      };
      if (typeOpenModal == 'edit-asset')
        dispatch(assetActions.editAsset({...params, id: dataAsset?.id}));
      else dispatch(assetActions.createAsset(params));
    } catch (error) {
      console.error({error});
    } finally {
      handleClose();
    }
  };

  useEffect(() => {
    if (typeOpenModal == 'edit-asset' && id) dispatch(assetActions.getAssetById(id));
  }, [id]);

  useEffect(() => {
    dispatch(assetActions.getModels({typeGet: 'all'}));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <Formik
          initialValues={{
            description: dataAsset?.description || '',
            status: dataAsset?.status || '',
            note: dataAsset?.note || '',
            serialNumber: dataAsset?.serialNumber || '',
            usingBy: dataAsset?.usingBy || '',
            assetModel: dataAsset?.assetModel?.id || null,
          }}
          validationSchema={CreateAssetSchema(typeOpenModal)}
          onSubmit={onCreateAsset}
        >
          {({errors, touched, values, setFieldValue, handleChange}) => (
            <Form>
              <div className='container-create-member d-flex'>
                <div className='group-avatar-member'>
                  <div className='div-avatar-member'>
                    <span className='label-modal-create'>
                      {typeOpenModal == 'create-asset' ? 'Add new asset' : 'Edit information asset'}
                    </span>
                  </div>
                </div>
                <div className='group-info-member'>
                  <div className='div-info-member'>
                    <div className='group-input-member' sx={{marginTop: '10px'}}>
                      <Box sx={{width: '100%'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <TextField
                              name='serialNumber'
                              label='Serial Number*'
                              defaultValue={values?.serialNumber}
                              onChange={handleChange}
                              error={touched.serialNumber && Boolean(errors.serialNumber)}
                              helperText={touched.serialNumber && errors.serialNumber}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <TextField
                              name='description'
                              label='Description*'
                              defaultValue={values?.description}
                              onChange={handleChange}
                              error={touched.description && Boolean(errors.description)}
                              helperText={touched.description && errors.description}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl sx={{width: '192px'}}>
                              <InputLabel id='sex-select-label'>Status*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values?.status}
                                onChange={(e) => setFieldValue('status', e.target.value)}
                                error={touched.status && Boolean(errors.status)}
                              >
                                {STATUS_ASSET?.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText sx={{color: '#ff4d4f'}}>
                                {touched.status && errors.status}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{width: '100%', marginTop: '40px'}}>
                        <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                          <Grid item xs={4}>
                            <TextField
                              name='note'
                              label='Note'
                              defaultValue={values?.note}
                              onChange={handleChange}
                              error={touched.note && Boolean(errors.note)}
                              helperText={touched.note && errors.note}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl sx={{width: '192px'}}>
                              <InputLabel id='sex-select-label'>Using By</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values?.usingBy}
                                onChange={(e) => setFieldValue('usingBy', e.target.value)}
                              >
                                {listEmployee?.map((item, index) => (
                                  <MenuItem key={index} value={item?.id || ''}>
                                    {nameMatching(item?.user?.firstName, item?.user?.lastName)}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl sx={{width: '192px'}}>
                              <InputLabel id='sex-select-label'>Asset Model*</InputLabel>
                              <Select
                                labelId='sex-select-label'
                                id='demo-simple-select'
                                value={values?.assetMode}
                                onChange={(e) => setFieldValue('assetModel', e.target.value)}
                                error={touched?.assetModel && Boolean(errors?.assetModel)}
                              >
                                {listModel?.map((item, index) => (
                                  <MenuItem key={index} value={item?.id || ''}>
                                    {item?.modelName}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText sx={{color: '#ff4d4f'}}>
                                {touched?.assetModel && errors?.assetModel}
                              </FormHelperText>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Box>
                    </div>
                  </div>
                </div>
              </div>
              <div className='group-footer' sx={{marginTop: '40px'}}>
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
