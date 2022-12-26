import {
  CameraFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditFilled,
  PlusCircleOutlined,
  SaveFilled,
} from '@ant-design/icons';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {InputSearch} from 'components/filter/input-search';
import {optionsSelect} from 'components/select/index';
import {RowTableEmpty} from 'components/table/table-empty';
import {OrderTableHead} from 'components/table/table-head';
import useUploadImg from 'hooks/useUploadImg';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {assetActions} from 'store/asset/assetSlice';

const headCells = [
  {
    id: 'imageUrl',
    align: 'left',
    disablePadding: false,
    label: 'Image',
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'assetCategory',
    align: 'left',
    disablePadding: false,
    label: 'Asset Category',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Action',
  },
];

const TableRowForm = ({
  imagePreview,
  value,
  getRootProps,
  getInputProps,
  handleSetData,
  clearForm,
  onSubmit,
  listCategory,
}) => {
  return (
    <TableRow>
      <TableCell align='left'>
        <Avatar
          sx={{bgcolor: '#1890ff', img: {objectFit: 'contain'}}}
          src={imagePreview}
          {...getRootProps()}
        >
          <CameraFilled />
        </Avatar>
        <input {...getInputProps()} />
      </TableCell>
      <TableCell align='left'>
        <TextField
          error={!value?.modelName || value?.modelName == ''}
          sx={{width: 200}}
          required
          id='outlined-required'
          defaultValue={value?.modelName}
          onChange={(e) => handleSetData('modelName', e.target.value)}
        />
      </TableCell>
      <TableCell align='left'>
        <TextField
          error={!value?.description || value?.description == ''}
          sx={{width: 200}}
          required
          id='outlined-required'
          defaultValue={value?.description}
          onChange={(e) => handleSetData('description', e.target.value)}
        />
      </TableCell>
      <TableCell align='left'>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Categories</InputLabel>
          <Select
            error={!value?.assetCategory?.id}
            sx={{width: 150}}
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={value?.assetCategory?.id}
            label='Categories'
            onChange={(e) => handleSetData('assetCategory', e.target.value)}
          >
            {optionsSelect(listCategory)}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align='left'>
        <Box>
          <IconButton
            sx={{fontSize: '20px'}}
            aria-label='delete'
            onClick={() => value?.show && clearForm()}
          >
            <CloseCircleFilled />
          </IconButton>
          <IconButton sx={{fontSize: '20px'}} aria-label='delete' onClick={() => onSubmit(value)}>
            <SaveFilled />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default function ModalSettingModel({listCategory, handleDelete}) {
  const dispatch = useAppDispatch();
  const listModel = useAppSelector((state) => state.asset.listModelsFilter);
  const reloadListModel = useAppSelector((state) => state.asset.reloadListModel);
  const {getRootProps, getInputProps, imagePreview, avatarBase64} = useUploadImg();

  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({});
  const [dataForm, setDataForm] = useState({
    type: '',
    show: false,
    modelName: '',
    description: '',
    assetCategory: null,
  });

  const handleSetData = (key, value) => {
    const tmpData = {...dataForm};
    if (key == 'assetCategory')
      tmpData.assetCategory = listCategory.find((item) => item.id == value);
    else tmpData[key] = value;
    setDataForm(tmpData);
  };

  const handleSubmit = (data) => {
    if (
      data?.modelName &&
      data?.description &&
      data?.assetCategory?.id &&
      data?.modelName != '' &&
      data?.descriptdescriptionion != ''
    ) {
      if (dataForm?.type == 'create')
        dispatch(assetActions.createModel({...data, imageUrl: avatarBase64 || ''}));
      else if (dataForm?.type == 'edit')
        dispatch(assetActions.editModel({...data, imageUrl: avatarBase64 || data?.imageUrl}));
      clearForm();
    }
  };

  const clearForm = () => {
    setDataForm({
      show: false,
      imageUrl: '',
      name: '',
      description: '',
    });
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value) =>
        setParams((prevState) => {
          const newState = {...prevState};
          if (value && value.trim() !== '') {
            newState['modelName.contains'] = value.trim();
          } else delete newState['modelName.contains'];
          return {...newState, page: 0};
        }),
      500
    ),
    []
  );
  const handleSearch = (value) => {
    setSearch(value);
    debounceSearch(value);
  };

  const renderList = useCallback(
    (data) =>
      Array.isArray(data) &&
      data?.map((row, index) => {
        return (
          <>
            {dataForm?.id == row?.id && dataForm?.show && dataForm?.type == 'edit' ? (
              <TableRowForm
                imagePreview={imagePreview}
                value={dataForm}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                handleSetData={handleSetData}
                clearForm={clearForm}
                onSubmit={handleSubmit}
                listCategory={listCategory}
              />
            ) : (
              <TableRow
                hover
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                tabIndex={-1}
                key={index}
              >
                <TableCell align='left'>
                  <Avatar alt='Model' src={row?.imageUrl} sx={{img: {objectFit: 'contain'}}} />
                </TableCell>
                <TableCell align='left'>{row?.modelName}</TableCell>
                <TableCell align='left'>{row?.description}</TableCell>
                <TableCell align='left'>{row?.assetCategory?.name}</TableCell>
                <TableCell align='left'>
                  <Box>
                    <IconButton
                      aria-label='edit'
                      onClick={() => setDataForm({...row, show: true, type: 'edit'})}
                    >
                      <EditFilled />
                    </IconButton>
                    <IconButton
                      aria-label='delete'
                      onClick={() =>
                        handleDelete({...row, name: row?.modelName}, 'Model', 'deleteModel')
                      }
                    >
                      <DeleteFilled />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </>
        );
      }),
    [listModel, dataForm]
  );

  useEffect(() => {
    dispatch(assetActions.getModels({...params, typeGet: 'all'}));
  }, [params, reloadListModel]);

  return (
    <>
      <Box
        sx={{
          padding: '5px 20px 20px 20px',
          display: 'flex-column',
        }}
      >
        <h2>Models</h2>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <InputSearch search={search} handleSearch={handleSearch} placeholder='Search name...' />
          <Button
            disabled={dataForm?.show}
            variant='contained'
            startIcon={<PlusCircleOutlined />}
            onClick={() =>
              !dataForm?.show &&
              dataForm?.type != 'create' &&
              setDataForm((prevState) => {
                return {
                  ...prevState,
                  show: true,
                  type: 'create',
                  id: null,
                };
              })
            }
          >
            Add New Model
          </Button>
        </Box>
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '100%',
            '& td, & th': {whiteSpace: 'nowrap'},
          }}
        >
          <Table aria-labelledby='tableTitle'>
            <OrderTableHead headCells={headCells} order={order} orderBy={orderBy} />

            <TableBody>
              {dataForm?.show && dataForm?.type == 'create' && (
                <TableRowForm
                  imagePreview={imagePreview}
                  value={dataForm}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  handleSetData={handleSetData}
                  clearForm={clearForm}
                  onSubmit={handleSubmit}
                  listCategory={listCategory}
                />
              )}

              {listModel?.length ? renderList(listModel) : <RowTableEmpty col={5} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
