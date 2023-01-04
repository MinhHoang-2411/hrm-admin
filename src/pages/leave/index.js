import {CheckOutlined, CloseOutlined, EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons';
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
  IconButton,
  Tooltip,
  Modal,
  Stack,
  TextField,
} from '@mui/material';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import Empty from 'components/Empty';
import {InputSearch} from 'components/filter/input-search';
import MainCard from 'components/MainCard';
import {STATUS_LEAVE, TYPE_LEAVE} from 'constants/index';
import useGetAllList from 'hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {leaveActions} from 'store/leave/leaveSlice';
import {modalActions} from 'store/modal/modalSlice';
import {
  formatDateMaterial,
  formatDateMaterialToTimeStamp,
  formatTimeStampToDate,
} from 'utils/index';
import DateRangePickerValue from './DatePicker';
import ModalLeaveDetail from './Modal/ModalLeaveDetail';
import {STYLE_MODAL} from 'constants/style';

const styleTitle = {
  fontSize: '27px',
  fontWeight: 'bold',
  marginBottom: '10px',
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};
const styleName = {
  fontSize: '16px',
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
    page: 0,
    size: 20,
  });
  const [paramsPending, setParamsPending] = useState({
    page: 0,
    size: 20,
  });
  const [search, setSearch] = useState('');
  const [searchListPending, setSearchListPending] = useState('');
  const {listData: listLeave} = useGetAllList(paramsAll, leaveActions, 'leave');
  const listOtherLeave = listLeave?.filter((item) => item?.status !== 'CONFIRMED');
  const listLeavePending = useAppSelector((state) => state.leave.listDataPending);
  const reloadList = useAppSelector((state) => state.leave.reloadList);
  const isLeavePending = (status) => status == 'CONFIRMED';
  const [open, setOpen] = useState(false);
  const [leaveId, setLeaveId] = useState(null);

  const showStatusLeave = (status) => {
    let color = '';
    switch (status) {
      case 'CONFIRMED':
        color = '#6666ff';
        break;
      case 'APPROVED':
        color = '#04AA6D';
        break;
      case 'REJECTED':
        color = '#ff4d4f';
        break;
      case 'CANCELED':
        color = '#b3b3b3';
        break;
      case 'WAITING':
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
          Do you want to <b>{text}</b> this leave request?
        </span>
      ),
      onAction: () => dispatch(leaveActions.changeStatus({id: data?.id, status: action})),
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
                newState['title.contains'] = value.trim();
                newState['applicantName.contains'] = value.trim();
              } else {
                delete newState['title.contains'];
                delete newState['applicantName.contains'];
              }
              return {...newState, page: 0};
            })
          : setParamsAll((prevState) => {
              const newState = {...prevState};
              if (value && value.trim() !== '') {
                newState['title.contains'] = value.trim();
                newState['applicantName.contains'] = value.trim();
              } else {
                delete newState['title.contains'];
                delete newState['applicantName.contains'];
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
          sx={{fontSize: '15px', marginBottom: '15px', cursor: 'pointer'}}
          onClick={() => {
            setOpen(true);
            setLeaveId(row?.id);
          }}
        >
          <Box sx={{display: 'flex', flexDirection: 'column', padding: '10px 30px'}}>
            <Box sx={styleTitle}>
              {row?.title}
              <Tooltip title='Hide'>
                <IconButton
                  sx={{fontSize: '25px'}}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {<EyeInvisibleOutlined /> || <EyeOutlined />}
                </IconButton>
              </Tooltip>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <Box sx={styleName}>{row?.applicantName}</Box>
                </Grid>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Time submitted:</span>&nbsp;{' '}
                  {formatTimeStampToDate(row?.createdDate)}
                </Grid>
              </Grid>
            </Box>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Leave type:</span>&nbsp;{' '}
                  <Chip
                    sx={{fontWeight: 'bold'}}
                    variant='outlined'
                    label={row?.type}
                    color='primary'
                  />
                </Grid>
                <Grid item xs={6}>
                  <span style={{fontWeight: 'bold'}}>Status:</span>&nbsp;{' '}
                  {showStatusLeave(row?.status)}
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
                  REJECT
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
                  APPROVE
                </Button>
              </Box>
            )}
          </Box>
        </Card>
      )),
    [listLeave, listLeavePending]
  );

  useEffect(() => {
    dispatch(leaveActions.getListPending(paramsPending));
  }, [paramsPending, reloadList]);

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
            <Grid item xs={9}>
              <Box sx={{padding: '10px 10px'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '10px',
                  }}
                >
                  <h3 style={styleLabel}>
                    PENDING LEAVE <span style={styleCount}>{listLeavePending?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'flex-start', marginBottom: '15px'}}>
                    <Stack direction='row' alignItems='center'>
                      <InputSearch
                        width={'25 0px'}
                        search={searchListPending}
                        handleSearch={(value) => handleSearch(value, 'pending')}
                        placeholder='Search title...'
                      />
                      <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
                        <InputLabel id='demo-simple-select-label'>Leave Type</InputLabel>
                        <Select
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          value={paramsAll?.['type.equals']}
                          onChange={(e) => handleFilter('type.equals', e.target.value, 'pending')}
                          label='Leave type'
                        >
                          <MenuItem value={'all'}>ALL</MenuItem>
                          {TYPE_LEAVE?.map((item, index) => (
                            <MenuItem key={index} value={item}>
                              {item}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Stack>
                    <DateRangePickerValue params={paramsPending} handleFilter={handleFilter} />
                  </Box>
                </Box>
                <Box sx={{overflowX: 'auto', height: '90vh', padding: '10px'}}>
                  {listLeavePending?.length ? renderList(listLeavePending) : <Empty />}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box sx={{padding: '10px 10px'}}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '10px',
                    paddingBottom: '15px',
                  }}
                >
                  <h3 style={styleLabel}>
                    OTHER LEAVES <span style={styleCount}>{listOtherLeave?.length || 0}</span>
                  </h3>
                  <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <InputSearch
                      width={200}
                      search={search}
                      handleSearch={handleSearch}
                      placeholder='Search...'
                    />
                    <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
                      <InputLabel id='demo-simple-select-label'>Leave type</InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={paramsAll?.['type.equals']}
                        onChange={(e) => handleFilter('type.equals', e.target.value)}
                        label='Leave type'
                      >
                        <MenuItem value={'all'}>ALL</MenuItem>
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
                        <MenuItem value={'all'}>ALL</MenuItem>
                        {STATUS_LEAVE?.map((item, index) => (
                          <MenuItem key={index} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label='Date from'
                        value={formatDateMaterial(paramsAll?.['startDate.equals'])}
                        onChange={(newValue) => {
                          handleFilter('startDate.equals', formatDateMaterialToTimeStamp(newValue));
                        }}
                        inputFormat='DD/MM/YYYY'
                        renderInput={(params) => (
                          <TextField sx={{marginLeft: '15px', width: '170px'}} {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box sx={{overflowX: 'auto', height: '90vh', padding: '10px'}}>
                  {listOtherLeave?.length ? renderList(listOtherLeave) : <Empty />}
                </Box>
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
        <Box sx={STYLE_MODAL}>
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
