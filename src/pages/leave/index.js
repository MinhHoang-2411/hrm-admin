import {CheckOutlined, CloseOutlined, EyeInvisibleOutlined, EyeOutlined} from '@ant-design/icons';
import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  Tooltip,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import DuoDatePicker from 'components/date-picker/DatePicker';
import Empty from 'components/Empty';
import {InputSearch} from 'components/filter/input-search';
import MainCard from 'components/MainCard';
import SkeletonLoading from 'components/SkeletonLoading';
import {STATUS_LEAVE, TYPE_LEAVE} from 'constants/index';
import {STYLE_MODAL} from 'constants/style';
import useGetAllList from 'hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {leaveActions} from 'store/leave/leaveSlice';
import {modalActions} from 'store/modal/modalSlice';
import {
  fetchMoreCondition,
  formatDateMaterialToTimeStamp,
  formatTimeStampGetTime,
  formatTimeStampToDate,
} from 'utils/index';
import ModalLeaveDetail from './Modal/ModalLeaveDetail';
import ModalLeaveReason from './Modal/ModalLeaveReason';

const styleTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '10px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const styleName = {
  fontWeight: 'bold',
  cursor: 'pointer',
  textTransform: 'uppercase',
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

export default function LeavePage() {
  const dispatch = useAppDispatch();
  const [paramsAll, setParamsAll] = useState({
    size: 10,
    page: 0,
    sort: 'lastModifiedDate,DESC',
  });

  const [paramsPending, setParamsPending] = useState({
    size: 10,
    page: 0,
    sort: 'lastModifiedDate,DESC',
  });
  const [page, setPage] = useState(0);

  const [pagePending, setPagePending] = useState(0);
  const [search, setSearch] = useState('');
  const [searchListPending, setSearchListPending] = useState('');
  const {listData: listLeave} = useGetAllList(paramsAll, leaveActions, 'leave');

  const {
    listDataPending: listLeavePending,
    loadMorePending,
    loadMore,
    reloadList,
    reloadListPending,
    loadingPending,
    loadingChangeStatus,
    loading,
    pagination,
    paginationPending,
  } = useAppSelector((state) => state.leave);

  const isLeavePending = (status) => status == 'CONFIRMED';
  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);

  const showStatusLeave = (status) => {
    let color = '';
    switch (status) {
      case 'confirmed':
        color = '#6666ff';
        break;
      case 'approved':
        color = '#04AA6D';
        break;
      case 'rejected':
        color = '#ff4d4f';
        break;
      case 'canceled':
        color = '#b3b3b3';
        break;
      case 'waiting':
        color = '#ff8000';
        break;
    }
    return (
      <Chip
        label={status}
        sx={{
          fontWeight: 'bold',
          backgroundColor: color,
          color: '#ffff',
          textTransform: 'capitalize',
        }}
      />
    );
  };

  const handleAction = (data, text, action) => {
    let rejectReason = null;
    const params = {
      type: 'modalConfirm',
      title: 'Confirm',
      content: (
        <>
          <span>
            Are you sure to <b>{text}</b> this leave request?
          </span>
          {action === 'REJECTED' && (
            <ModalLeaveReason setRejectReason={(value) => (rejectReason = value)} />
          )}
        </>
      ),
      onAction: () => {
        if (action === 'REJECTED') {
          dispatch(leaveActions.changeStatus({id: data?.id, status: action, rejectReason}));
        } else {
          dispatch(leaveActions.changeStatus({id: data?.id, status: action}));
        }
      },
    };
    dispatch(modalActions.showModal(params));
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value, type) =>
        type == 'pending'
          ? setParamsPending((prevState) => {
              const newState = {...prevState};
              if (value && value.trim() !== '') {
                newState['titleOrPersonOnLeave.contains'] = value.trim();
              } else {
                delete newState['titleOrPersonOnLeave.contains'];
              }
              return {...newState, page: 0};
            })
          : setParamsAll((prevState) => {
              const newState = {...prevState};
              if (value && value.trim() !== '') {
                newState['titleOrPersonOnLeave.contains'] = value.trim();
              } else {
                delete newState['titleOrPersonOnLeave.contains'];
              }
              return {...newState, page: 0};
            }),
      500
    ),
    []
  );
  const handleSearch = (value, type) => {
    if (type == 'pending') setSearchListPending(value);
    else setSearch(value);
    debounceSearch(value, type);
  };

  const handleFilter = (key, value, type) => {
    if (type == 'pending') {
      setParamsPending((preState) => {
        const state = {...preState, page: 0};
        if (value === 'all' || !value) delete state[key];
        else state[key] = value;
        return state;
      });
    } else {
      setParamsAll((preState) => {
        const state = {...preState, page: 0};
        if (value === 'all' || !value) delete state[key];
        else state[key] = value;
        return state;
      });
    }
  };

  const handleFilterDate = (date, type, time) => {
    if (time == 'startDate') {
      handleFilter('startDate.greaterThanOrEqual', formatDateMaterialToTimeStamp(date), type);
    } else if (time == 'endDate') {
      const nextDate = date ? new Date(date) : null;
      nextDate && nextDate.setDate(nextDate.getDate() + 1);

      handleFilter('endDate.lessThan', formatDateMaterialToTimeStamp(nextDate), type);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setLeaveId(null);
    dispatch(leaveActions.clearData());
  };

  const renderList = useCallback(
    (data) =>
      Array.isArray(data) &&
      data?.map((row, index) => (
        <Card
          key={index}
          sx={{
            fontSize: '14px',
            marginBottom: '15px',
            cursor: 'pointer',
            border: '1px solid #ccc',
          }}
          onClick={() => {
            setOpen(true);
            setLeaveId(row?.id);
            console.log('createDate', row?.createdDate);
          }}
        >
          <Box sx={{display: 'flex', flexDirection: 'column', padding: '10px 30px'}}>
            <Box sx={styleTitle}>
              <Box sx={styleName}>{row?.personOnLeave}</Box>
              {/* <Tooltip title='Hide'>
                <IconButton
                  sx={{fontSize: '25px'}}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {<EyeInvisibleOutlined /> || <EyeOutlined />}
                </IconButton>
              </Tooltip> */}
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Title:</span>&nbsp; {row?.title}
                </Grid>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Submitted time:</span>&nbsp;{' '}
                  {formatTimeStampToDate(row?.createdDate)}
                  &ensp;
                  {formatTimeStampGetTime(row?.createdDate)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Leave type:</span>&nbsp;{' '}
                  <Chip
                    sx={{fontWeight: 'bold', textTransform: 'capitalize'}}
                    variant='outlined'
                    label={row?.type?.toLowerCase()}
                    color='primary'
                  />
                </Grid>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Status:</span>
                  &nbsp; {showStatusLeave(row?.status?.toLowerCase())}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>From:</span>&nbsp;{' '}
                  {formatTimeStampToDate(row?.startDate)}
                </Grid>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>To:</span>&nbsp;{' '}
                  {formatTimeStampToDate(row?.endDate)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <span style={{fontWeight: 'bold'}}>Reason:</span>&nbsp; {row?.reason}
            </Box>
            {row?.rejectReason ? (
              <Box sx={{display: 'flex', marginBottom: '20px'}}>
                <span>
                  <b>Reject Reason: </b>
                  {row?.rejectReason}
                </span>
              </Box>
            ) : null}
            {isLeavePending(row?.status) && (
              <Box sx={{margin: '10px 10px 12px 0px'}}>
                <Button
                  sx={{marginRight: '15px'}}
                  variant='outlined'
                  color='error'
                  startIcon={<CloseOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(row, 'reject', 'REJECTED');
                  }}
                >
                  Reject
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CheckOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAction(row, 'approve', 'APPROVED');
                  }}
                >
                  Approve
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      )),
    [listLeave, listLeavePending]
  );

  const handleFetchMorePendingLeave = () => {
    if (fetchMoreCondition(pagePending, paginationPending, paramsPending)) {
      dispatch(leaveActions.loadMorePending({...paramsPending, page: pagePending + 1}));
      setPagePending(pagePending + 1);
    }
  };

  const handleFetchMoreLeave = () => {
    if (fetchMoreCondition(page, pagination, paramsAll))
      dispatch(leaveActions.loadMore({...paramsAll, page: page + 1}));
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(0);
  }, [reloadList, paramsAll]);

  useEffect(() => {
    dispatch(leaveActions.getListPending(paramsPending));
    setPagePending(0);
  }, [reloadListPending, paramsPending]);

  return (
    <>
      <MainCard sx={{mt: 2}} content={false}>
        <Box
          sx={{
            padding: '5px 20px',
            display: 'flex-column',
          }}
        >
          <Grid container spacing={2} columns={16}>
            <Grid item xs={9}>
              <Box sx={{padding: '10px 10px'}}>
                <Box sx={{display: 'flex', flexDirection: 'column', paddingLeft: '5px'}}>
                  <h3 style={styleLabel}>
                    PENDING LEAVE REQUESTS{' '}
                    <span style={styleCount}>{paginationPending?.totalCount || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: '10px'}}>
                    <Stack direction='row' alignItems='center'>
                      <InputSearch
                        width={'470px'}
                        search={searchListPending}
                        handleSearch={(value) => handleSearch(value, 'pending')}
                        placeholder='Search...'
                      />
                    </Stack>
                    <Box>
                      <FormControl sx={{minWidth: 150, marginRight: '10px', marginTop: '10px'}}>
                        <InputLabel id='demo-simple-select-label'>Leave type</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={paramsAll?.['type.equals']}
                          onChange={(e) => handleFilter('type.equals', e.target.value, 'pending')}
                          label='Leave type'
                        >
                          <MenuItem value={'all'}>All</MenuItem>
                          {TYPE_LEAVE?.map((item, index) => (
                            <MenuItem key={index} value={item?.toUpperCase()}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <DuoDatePicker
                        params={paramsPending}
                        handleFilter={handleFilterDate}
                        type='pending'
                      />
                    </Box>
                  </Box>
                </Box>
                <InfiniteScroll
                  loader={
                    loadMorePending ? (
                      <SkeletonLoading sx={{marginBottom: '15px', minHeight: '270px'}} />
                    ) : null
                  }
                  height='100vh'
                  hasMore={fetchMoreCondition(pagePending, paginationPending, paramsPending)}
                  dataLength={listLeavePending.length}
                  next={handleFetchMorePendingLeave}
                  scrollThreshold='1px'
                >
                  {loadingPending || loadingChangeStatus ? (
                    [...Array(2).keys()].map((value) => (
                      <SkeletonLoading
                        key={value}
                        sx={{marginBottom: '15px', minHeight: '270px'}}
                      />
                    ))
                  ) : listLeavePending?.length ? (
                    renderList(listLeavePending)
                  ) : (
                    <Empty
                      title={
                        paramsPending['titleOrPersonOnLeave.contains'] &&
                        paramsPending['titleOrPersonOnLeave.contains'] !== ''
                          ? 'No results matched your search'
                          : 'There are currently no pending leave requests'
                      }
                    />
                  )}
                </InfiniteScroll>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box sx={{padding: '10px 10px'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '5px',
                  }}
                >
                  <h3 style={styleLabel}>
                    OTHER LEAVE REQUESTS{' '}
                    <span style={styleCount}>{pagination?.totalCount || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', flexDirection: 'column', marginBottom: '10px'}}>
                    <Box>
                      <InputSearch
                        width={'470px'}
                        search={search}
                        handleSearch={handleSearch}
                        placeholder='Search...'
                      />
                    </Box>
                    <Box>
                      <FormControl sx={{minWidth: 120, marginRight: '10px', marginTop: '10px'}}>
                        <InputLabel id='demo-simple-select-label'>Leave type</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={paramsAll?.['type.equals']}
                          onChange={(e) => handleFilter('type.equals', e.target.value)}
                          label='Leave type'
                        >
                          <MenuItem value={'all'}>All</MenuItem>
                          {TYPE_LEAVE?.map((item, index) => (
                            <MenuItem key={index} value={item?.toUpperCase()}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{minWidth: 120, marginRight: '10px', marginTop: '10px'}}>
                        <InputLabel id='demo-simple-select-label'>Status</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={paramsAll?.['status.equals']}
                          onChange={(e) => handleFilter('status.equals', e.target.value)}
                          label='Status'
                        >
                          <MenuItem value={'all'}>All</MenuItem>
                          {STATUS_LEAVE?.map((item, index) => (
                            <MenuItem key={index} value={item?.toUpperCase()}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <DuoDatePicker
                        params={paramsAll}
                        handleFilter={handleFilterDate}
                        width='110px'
                      />
                    </Box>
                  </Box>
                </Box>
                <InfiniteScroll
                  loader={
                    loadMore ? (
                      <SkeletonLoading sx={{marginBottom: '15px', minHeight: '270px'}} />
                    ) : null
                  }
                  height='100vh'
                  hasMore={fetchMoreCondition(page, pagination, paramsAll)}
                  dataLength={listLeave.length}
                  next={handleFetchMoreLeave}
                  scrollThreshold='1px'
                >
                  {loading || loadingChangeStatus ? (
                    [...Array(2).keys()].map((value) => (
                      <SkeletonLoading
                        key={value}
                        sx={{marginBottom: '15px', minHeight: '270px'}}
                      />
                    ))
                  ) : listLeave?.length ? (
                    renderList(listLeave)
                  ) : (
                    <Empty
                      title={
                        paramsAll['titleOrPersonOnLeave.contains'] &&
                        paramsAll['titleOrPersonOnLeave.contains'] !== ''
                          ? 'No results matched your search'
                          : 'There are currently no other leave requests'
                      }
                    />
                  )}
                </InfiniteScroll>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{...STYLE_MODAL, width: 800}}>
          <ModalLeaveDetail
            leaveId={leaveId}
            handleClose={handleClose}
            showStatusLeave={showStatusLeave}
          />
        </Box>
      </Modal>
    </>
  );
}
