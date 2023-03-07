import {Box, Button, Chip, Divider, Grid} from '@mui/material';
import {useEffect} from 'react';
import {ThreeDots} from 'react-loader-spinner';
import {leaveActions} from 'store/leave/leaveSlice';
import {formatTimeStampGetTime, formatTimeStampToDate} from 'utils/index';
import TableDetailLeave from '../Table/table-detail-leave';
import {useAppDispatch, useAppSelector} from './../../../app/hooks';
import ErrorIcon from '../../../assets/images/emptyData/error.png';
import Stack from '@mui/material/Stack';
import useResponsive from '../../../hooks/useResponsive';

const styleTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ModalLeaveDetail = ({leaveId, handleClose, showStatusLeave}) => {
  const isMobile = useResponsive('mobile');

  const dispatch = useAppDispatch();
  const dataLeave = useAppSelector((state) => state.leave.dataLeave);
  const loadingDetail = useAppSelector((state) => state.leave.loadingDetail);

  useEffect(() => {
    dispatch(leaveActions.getById(leaveId));
  }, [leaveId]);

  return (
    <>
      {loadingDetail ? (
        <div style={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Box sx={{...styleTitle, p: isMobile ? '10px' : '20px'}}>Leave Detail</Box>
          <Divider />
          <Box sx={{padding: isMobile ? '10px' : '20px'}}>
            {dataLeave ? (
              <>
                <Box sx={{display: 'flex', marginBottom: '20px'}}>
                  <Grid container spacing={isMobile ? 1 : 2} columns={12}>
                    <Grid item md={2.5} xs={5}>
                      <b>Title:</b>
                    </Grid>
                    <Grid item md={9} xs={7}>
                      {dataLeave?.title}
                    </Grid>
                    <Grid item md={2.5} xs={5}>
                      <b>Creator:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      {dataLeave?.creatorName}
                    </Grid>
                    <Grid item md={2.5} xs={5}>
                      <b>Person on leave:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      {dataLeave?.personOnLeave}
                    </Grid>
                    {dataLeave?.status !== 'canceled' && (
                      <>
                        <Grid item md={2.5} xs={5}>
                          <b>Confirmed by:</b>
                        </Grid>
                        <Grid item md={3.5} xs={7}>
                          {dataLeave?.confirmerName}
                        </Grid>
                      </>
                    )}
                    {!isMobile && ['CONFIRMED', 'WAITING'].includes(dataLeave?.status) && (
                      <>
                        <Grid item md={6}></Grid>
                      </>
                    )}
                    {dataLeave?.status == 'APPROVED' && (
                      <>
                        <Grid item md={2.5} xs={5}>
                          <b>Approved by:</b>
                        </Grid>
                        <Grid item md={3.5} xs={7}>
                          {dataLeave?.approverName}
                        </Grid>
                      </>
                    )}
                    {dataLeave?.status == 'REJECTED' && (
                      <>
                        <Grid item md={2.5} xs={5}>
                          <b>Rejected by:</b>
                        </Grid>
                        <Grid item md={3.5} xs={7}>
                          {dataLeave?.rejecterName}
                        </Grid>
                      </>
                    )}
                    <Grid item md={2.5} xs={5}>
                      <b>Submitted time:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      {formatTimeStampToDate(dataLeave?.createdDate)}
                      &ensp;
                      {formatTimeStampGetTime(dataLeave?.createdDate)}
                    </Grid>

                    <Grid item md={2.5} xs={5}>
                      <b>Duration:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      {formatTimeStampToDate(dataLeave?.startDate)} -{' '}
                      {formatTimeStampToDate(dataLeave?.endDate)}
                    </Grid>

                    <Grid sx={{display: 'flex', alignItems: 'center'}} item md={2.5} xs={5}>
                      <b>Leave type:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      <Chip
                        sx={{fontWeight: 'bold', textTransform: 'capitalize'}}
                        variant='outlined'
                        label={dataLeave?.type?.toLowerCase()}
                        color='primary'
                      />
                    </Grid>
                    <Grid sx={{display: 'flex', alignItems: 'center'}} item md={2.5} xs={5}>
                      <b>Status:</b>
                    </Grid>
                    <Grid item md={3.5} xs={7}>
                      {showStatusLeave(dataLeave?.status?.toLowerCase())}
                    </Grid>

                    <Grid item xs={12}>
                      <b>Reason: </b>
                      {dataLeave?.reason}
                    </Grid>

                    {dataLeave?.rejectReason ? (
                      <>
                        <Grid item md={2.5} xs={5}>
                          <b>Reject reason:</b>
                        </Grid>
                        <Grid item md={9.5} xs={7}>
                          {dataLeave?.rejectReason}
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                </Box>
                <TableDetailLeave data={dataLeave?.detail} leaveType={dataLeave?.type} />
              </>
            ) : (
              <Stack
                justifyContent='center'
                alignItems='center'
                sx={{width: '100%', margin: '10px'}}
              >
                <img src={ErrorIcon} alt='empty data' width='150' />
                <h4 style={{color: '#738bab'}}>An error occurred, please try again!</h4>
              </Stack>
            )}
          </Box>
          <Divider />
          <Box sx={{padding: isMobile ? '10px' : '20px', marginLeft: 'auto'}}>
            <Button variant='contained' onClick={handleClose}>
              Close
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ModalLeaveDetail;
