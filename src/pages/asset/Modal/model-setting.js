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
    label: 'Name Category',
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

export default function ModalSetting({typeOpenModal}) {
  const dispatch = useAppDispatch();
  const listCategory = useAppSelector((state) => state.asset.listCategoryFilter);

  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    page: 0,
    size: 20,
  });
  const [create, setCreate] = useState({
    show: false,
    imageUrl: '',
    name: '',
    description: '',
  });

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
      data?.map((row, index) => (
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
              <IconButton aria-label='delete'>
                <EditFilled />
              </IconButton>
              <IconButton aria-label='delete'>
                <DeleteFilled />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      )),
    [listCategory]
  );

  useEffect(() => {
    dispatch(assetActions.getCategory({...params, typeGet: 'all'}));
  }, [params]);

  return (
    <>
      <Box
        sx={{
          padding: '20px 20px',
          display: 'flex-column',
        }}
      >
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <InputSearch search={search} handleSearch={handleSearch} placeholder='Search name...' />
          <Button
            disabled={create?.show}
            variant='contained'
            startIcon={<PlusCircleOutlined />}
            onClick={() =>
              !create?.show &&
              setCreate((prevState) => {
                return {...prevState, show: true};
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
              {create?.show && (
                <TableRow>
                  <TableCell align='left'>
                    <Avatar sx={{bgcolor: '#1890ff'}}>
                      <CameraFilled />
                    </Avatar>
                  </TableCell>
                  <TableCell align='left'>
                    <TextField sx={{width: 220}} required id='outlined-required' defaultValue='' />
                  </TableCell>
                  <TableCell align='left'>
                    <TextField sx={{width: 220}} required id='outlined-required' defaultValue='' />
                  </TableCell>
                  <TableCell align='left'>
                    <Box>
                      <IconButton
                        sx={{fontSize: '20px'}}
                        aria-label='delete'
                        onClick={() =>
                          create?.show &&
                          setCreate((prevState) => {
                            return {...prevState, show: false};
                          })
                        }
                      >
                        <CloseCircleFilled />
                      </IconButton>
                      <IconButton sx={{fontSize: '20px'}} aria-label='delete'>
                        <SaveFilled />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {listCategory?.length ? renderList(listCategory) : <RowTableEmpty col={4} />}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
