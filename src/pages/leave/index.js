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
import {InputSearch} from 'components/filter/input-search';
import MainCard from 'components/MainCard';
import {STATUS_LEAVE, TYPE_LEAVE} from 'constants/index';
import useGetAllList from 'hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {leaveActions} from 'store/leave/leaveSlice';
import {modalActions} from 'store/modal/modalSlice';
import {nameMatching} from 'utils/format/name';
import {formatTimeStampToDate} from 'utils/index';

const styleTitle = {
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '10px',
  marginTop: '10px',
};
const styleName = {
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

export default function LeavePage() {
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
  const {listData: listLeave} = useGetAllList(paramsAll, leaveActions, 'leave');
  const listOtherLeave = listLeave?.filter((item) => item?.status !== 'WAITING');
  const listLeaveWaiting = useAppSelector((state) => state.leave.listDataWaiting);
  const reloadList = useAppSelector((state) => state.leave.reloadList);
  const isLeaveWaiting = (status) => status == 'WAITING';

  const showStatusLeave = (status) => {
    let color = '';
    switch (status) {
      case 'CONFIRMED':
        color = '#1890ff';
        break;
      case 'APPROVED':
        color = '#04AA6D';
        break;
      case 'REJECTED':
        color = '#ff4d4f';
        break;
      case 'CANCELED':
        color = '#ff8000';
        break;
      case 'WAITING':
        color = '#6666ff';
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
          Do you want to <b>{text}</b>{' '}
          <b>{nameMatching(data?.employee?.user?.firstName, data?.employee?.user?.lastName)}'s</b>{' '}
          request?
        </span>
      ),
      onAction: () => dispatch(leaveActions.changeStatus({id: data?.id, status: action})),
    };
    dispatch(modalActions.showModal(params));
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value, type) =>
        type == 'waiting'
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
    if (type == 'waiting') setSearchListWaiting(value);
    else setSearch(value);
    debounceSearch(value, type);
  };

  const handleFilter = (key, value, type) => {
    if (type == 'waiting') {
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
            <Box sx={styleTitle}>
              <span style={{color: '#1890ff', marginRight: '10px', fontSize: '20px'}}>
                #{row?.id}
              </span>
              {row?.title}
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4}>
                  <Box sx={styleName}>
                    {nameMatching(row?.employee?.user?.firstName, row?.employee?.user?.lastName)}
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Chip
                    sx={{fontWeight: 'bold'}}
                    variant='outlined'
                    label={row?.type}
                    color='primary'
                  />
                </Grid>
                <Grid item xs={4}>
                  {showStatusLeave(row?.status)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={4}>
                  <span style={{fontWeight: 'bold'}}>Created Date:</span>{' '}
                  {formatTimeStampToDate(row?.createdDate)}
                </Grid>
                <Grid item xs={4}>
                  <span style={{fontWeight: 'bold'}}>Start Date:</span>{' '}
                  {formatTimeStampToDate(row?.startDate)}
                </Grid>
                <Grid item xs={4}>
                  <span style={{fontWeight: 'bold'}}>End Date:</span>{' '}
                  {formatTimeStampToDate(row?.endDate)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <span style={{fontWeight: 'bold'}}>Reason:</span>&nbsp; {row?.reason}
            </Box>
            {isLeaveWaiting(row?.status) && (
              <Box sx={{margin: '10px 10px 12px 0px'}}>
                <Button
                  sx={{marginRight: '15px'}}
                  variant='outlined'
                  color='error'
                  startIcon={<CloseOutlined />}
                  onClick={() => handleAction(row, 'Reject', 'REJECTED')}
                >
                  REJECT
                </Button>
                <Button
                  variant='contained'
                  color='primary'
                  startIcon={<CheckOutlined />}
                  onClick={() => handleAction(row, 'Approve', 'APPROVED')}
                >
                  APPROVE
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      )),
    [listLeave, listLeaveWaiting]
  );

  useEffect(() => {
    dispatch(leaveActions.getListWaiting(paramsWaiting));
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
              <Box sx={{padding: '10px 20px', overflowX: 'auto', height: '90vh'}}>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                  <h3 style={styleLabel}>
                    PENDING LEAVE <span style={styleCount}>{listLeaveWaiting?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '15px'}}>
                    <InputSearch
                      width={250}
                      search={searchListWaiting}
                      handleSearch={(value) => handleSearch(value, 'waiting')}
                      placeholder='Search title...'
                    />
                    <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
                      <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={paramsAll?.['type.equals']}
                        onChange={(e) => handleFilter('type.equals', e.target.value, 'waiting')}
                        label='Type'
                      >
                        <MenuItem value={'all'}>All</MenuItem>
                        {TYPE_LEAVE?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box>{listLeaveWaiting?.length ? renderList(listLeaveWaiting) : <div></div>}</Box>
              </Box>
            </Grid>
            <Grid xs={7}>
              <Box sx={{padding: '10px 20px', overflowX: 'auto', height: '90vh'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingRight: '5px',
                  }}
                >
                  <h3 style={styleLabel}>
                    OTHER LEAVE <span style={styleCount}>{listOtherLeave?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <InputSearch
                      width={250}
                      search={search}
                      handleSearch={handleSearch}
                      placeholder='Search title...'
                    />
                    <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
                      <InputLabel id='demo-simple-select-label'>Type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={paramsAll?.['type.equals']}
                        onChange={(e) => handleFilter('type.equals', e.target.value)}
                        label='Type'
                      >
                        <MenuItem value={'all'}>All</MenuItem>
                        {TYPE_LEAVE?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
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
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{overflowX: 'auto', height: '90vh'}}>
                  {listOtherLeave?.length ? renderList(listOtherLeave) : <div></div>}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
