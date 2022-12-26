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
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {InputSearch} from 'components/filter/input-search';
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
}) => {
  return (
    <TableRow>
      <TableCell align='left'>
        <Avatar sx={{bgcolor: '#1890ff'}} src={imagePreview} {...getRootProps()}>
          <CameraFilled />
        </Avatar>
        <input {...getInputProps()} />
      </TableCell>
      <TableCell align='left'>
        <TextField
          error={!value?.name || value?.name == ''}
          sx={{width: 220}}
          required
          id='outlined-required'
          defaultValue={value?.name}
          onChange={(e) => handleSetData('name', e.target.value)}
        />
      </TableCell>
      <TableCell align='left'>
        <TextField
          error={!value?.description || value?.description == ''}
          sx={{width: 220}}
          required
          id='outlined-required'
          defaultValue={value?.description}
          onChange={(e) => handleSetData('description', e.target.value)}
        />
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

export default function ModalSettingCategory({handleDelete}) {
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector((state) => state.asset.listCategoryFilter);
  const reloadListCategory = useAppSelector((state) => state.asset.reloadListCategory);
  const {getRootProps, getInputProps, imagePreview, avatarBase64} = useUploadImg();

  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({});
  const [dataForm, setDataForm] = useState({
    type: '',
    show: false,
    name: '',
    description: '',
  });

  const handleSetData = (key, value) => {
    const tmpData = {...dataForm};
    tmpData[key] = value;
    setDataForm(tmpData);
  };

  const handleSubmit = (data) => {
    if (data?.name && data?.description && data?.name != '' && data?.description != '') {
      if (dataForm?.type == 'create')
        dispatch(assetActions.createCategory({...data, imageUrl: avatarBase64 || ''}));
      else if (dataForm?.type == 'edit')
        dispatch(assetActions.editCategory({...data, imageUrl: avatarBase64 || data?.imageUrl}));
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
            newState['name.contains'] = value.trim();
          } else delete newState['name.contains'];
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
                key={index}
              />
            ) : (
              <TableRow
                hover
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                tabIndex={-1}
                key={index}
              >
                <TableCell align='left'>
                  <Avatar alt='Category' src={row?.imageUrl} />
                </TableCell>
                <TableCell align='left'>{row?.name}</TableCell>
                <TableCell align='left'>{row?.description}</TableCell>
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
                      onClick={() => handleDelete(row, 'Category', 'deleteCategory')}
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
    [listCategory, dataForm]
  );

  useEffect(() => {
    dispatch(assetActions.getCategory({...params, typeGet: 'all'}));
  }, [params, reloadListCategory]);

  return (
    <>
      <Box
        sx={{
          padding: '5px 20px 20px 20px',
          display: 'flex-column',
        }}
      >
        <h2>Categories</h2>
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
            Add New Category
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
                />
              )}

              {listCategory?.length ? renderList(listCategory) : <RowTableEmpty col={4} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
