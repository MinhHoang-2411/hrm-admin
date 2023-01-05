import {CheckOutlined, CloseOutlined} from '@ant-design/icons';
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import Empty from 'components/Empty';
import {InputSearch} from 'components/filter/input-search';
import MainCard from 'components/MainCard';
import SkeletonLoading from 'components/SkeletonLoading';
import {STATUS_ASSET_REQUEST} from 'constants/index';
import useGetAllList from 'hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {assetRequestActions} from 'store/asset-request/assetRequestSlice';
import {modalActions} from 'store/modal/modalSlice';
import {nameMatching} from 'utils/format/name';
import {formatTimeStampToDate} from 'utils/index';

const styleTitle = {
  fontSize: '22px',
  fontWeight: 'bold',
  marginBottom: '20px',
  marginTop: '10px',
};
const styleName = {
  marginLeft: '10px',
  fontSize: '16px',
  cursor: 'pointer',
  '&:hover': {
    color: '#1890ff',
  },
};
const styleLabel = {
  marginRight: '10px',
  display: 'flex',
  alignItems: 'center',
};
const styleCount = {
  padding: '2px 5px',
  background: '#e6e6e6',
  borderRadius: '8px',
  marginLeft: '7px',
  fontSize: '14px',
};

export default function RequestPage() {
  const dispatch = useAppDispatch();
  const [paramsAll, setParamsAll] = useState({
    page: 0,
    size: 20,
  });
  const [paramsWaiting, setParamsWaiting] = useState({
    page: 0,
    size: 20,
  });
  const [search, setSearch] = useState('');
  const [searchListWaiting, setSearchListWaiting] = useState('');
  const {listData: listRequest, loading} = useGetAllList(
    paramsAll,
    assetRequestActions,
    'assetRequest'
  );
  const listOtherRequest = listRequest?.filter((item) => item?.status !== 'PENDING');
  const listRequestPending = useAppSelector((state) => state.assetRequest.listDataWaiting);
  const loadingWaiting = useAppSelector((state) => state.assetRequest.loadingWaiting);
  const reloadList = useAppSelector((state) => state.assetRequest.reloadList);
  const isRequestWaiting = (status) => status == 'PENDING';

  const showStatusRequest = (status) => {
    let color = '';
    switch (status) {
      case 'PENDING':
        color = '#6666ff';
        break;
      case 'RECEIVED':
        color = '#04AA6D';
        break;
      case 'REJECTED':
        color = '#ff4d4f';
        break;
      case 'CANCELED':
        color = '#b3b3b3';
        break;
      case 'PROCESSING':
        color = '#ff8000';
        break;
    }
    return (
      <Chip label={status} sx={{fontWeight: 'bold', backgroundColor: color, color: '#ffff'}} />
    );
  };

  const handleAction = (data, text, action) => {
    const params = {
      type: 'modalConfirm',
      title: 'Confirm',
      content: (
        <span>
          Do you want to <b>{text}</b> this asset request?
        </span>
      ),
      onAction: () => dispatch(assetRequestActions.changeStatus({id: data?.id, status: action})),
    };
    dispatch(modalActions.showModal(params));
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value, type) =>
        type == 'pending'
          ? setParamsWaiting((prevState) => {
              const newState = {...prevState};
              if (value && value.trim() !== '') {
                newState['title.contains'] = value.trim();
              } else delete newState['title.contains'];
              return {...newState, page: 0};
            })
          : setParamsAll((prevState) => {
              const newState = {...prevState};
              if (value && value.trim() !== '') {
                newState['title.contains'] = value.trim();
              } else delete newState['title.contains'];
              return {...newState, page: 0};
            }),
      500
    ),
    []
  );
  const handleSearch = (value, type) => {
    if (type == 'pending') setSearchListWaiting(value);
    else setSearch(value);
    debounceSearch(value, type);
  };

  const handleFilter = (key, value, type) => {
    if (type == 'pending') {
      setParamsWaiting((preState) => {
        const state = {...preState};
        if (value === 'all') delete state[key];
        else state[key] = value;
        return state;
      });
    } else {
      setParamsAll((preState) => {
        const state = {...preState};
        if (value === 'all') delete state[key];
        else state[key] = value;
        return state;
      });
    }
  };

  const renderList = useCallback(
    (data) =>
      Array.isArray(data) &&
      data?.map((row, index) => (
        <Card key={index} sx={{fontSize: '15px', marginBottom: '15px'}}>
          <Box sx={{display: 'flex', flexDirection: 'column', padding: '10px 30px'}}>
            <Box sx={styleTitle}>{row?.title}</Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>Request By:</span>{' '}
                  <Box sx={styleName}>
                    {nameMatching(row?.employee?.user?.firstName, row?.employee?.user?.lastName)}
                  </Box>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>Status:</span>{' '}
                  <Box sx={styleName}>{showStatusRequest(row?.status)}</Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>Asset Model:</span>{' '}
                  <Box sx={styleName}>{row?.assetModel?.modelName}</Box>
                </Grid>
                <Grid item xs={6} sx={{display: 'flex', alignItems: 'center'}}>
                  <span style={{fontWeight: 'bold'}}>Serial Number:</span>{' '}
                  <Box sx={styleName}>{row?.receivedAsset?.serialNumber}</Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4}>
                  <span style={{fontWeight: 'bold'}}>Request Date:</span>{' '}
                  {formatTimeStampToDate(row?.requestDate)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <span style={{fontWeight: 'bold'}}>Description:</span>&nbsp; {row?.description}
            </Box>
            {isRequestWaiting(row?.status) && (
              <Box sx={{margin: '10px 10px 12px 0px'}}>
                <Button
                  sx={{marginRight: '15px'}}
                  variant='outlined'
                  color='error'
                  startIcon={<CloseOutlined />}
                  onClick={() => handleAction(row, 'reject', 'REJECTED')}
                >
                  REJECT
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CheckOutlined />}
                  onClick={() => handleAction(row, 'received', 'RECEIVED')}
                >
                  RECEIVED
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      )),
    [listRequest, listRequestPending]
  );

  useEffect(() => {
    dispatch(assetRequestActions.getListWaiting(paramsWaiting));
  }, [paramsWaiting, reloadList]);

  return (
    <>
      <MainCard sx={{mt: 2}} content={false}>
        <Box
          sx={{
            padding: '20px 20px',
            display: 'flex-column',
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid xs={9}>
              <Box sx={{padding: '10px 10px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', padding: '0px 0px 10px 5px'}}>
                  <h3 style={styleLabel}>
                    PENDING ASSET REQUESTS{' '}
                    <span style={styleCount}>{listRequestPending?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                    <InputSearch
                      width={250}
                      search={searchListWaiting}
                      handleSearch={(value) => handleSearch(value, 'pending')}
                      placeholder='Search...'
                    />
                  </Box>
                </Box>
                <Box sx={{overflowX: 'auto', height: '90vh', padding: '5px'}}>
                  {loadingWaiting ? (
                    [...Array(2).keys()].map((value) => (
                      <SkeletonLoading
                        key={value}
                        sx={{marginBottom: '15px', minHeight: '290px'}}
                      />
                    ))
                  ) : listRequestPending?.length ? (
                    renderList(listRequestPending)
                  ) : (
                    <Empty />
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid xs={7}>
              <Box sx={{padding: '10px 10px'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '0px 10px 5px 10px',
                  }}
                >
                  <h3 style={styleLabel}>
                    OTHER REQUEST <span style={styleCount}>{listOtherRequest?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <InputSearch
                      width={250}
                      search={search}
                      handleSearch={handleSearch}
                      placeholder='Search...'
                    />
                    <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
                      <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={paramsAll?.['status.equals']}
                        onChange={(e) => handleFilter('status.equals', e.target.value)}
                        label='Status'
                      >
                        <MenuItem value={'all'}>ALL</MenuItem>
                        {STATUS_ASSET_REQUEST?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{overflowX: 'auto', height: '90vh', padding: '10px'}}>
                  {loading ? (
                    [...Array(2).keys()].map((value) => (
                      <SkeletonLoading
                        key={value}
                        sx={{marginBottom: '15px', minHeight: '290px'}}
                      />
                    ))
                  ) : listOtherRequest?.length ? (
                    renderList(listOtherRequest)
                  ) : (
                    <Empty />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
