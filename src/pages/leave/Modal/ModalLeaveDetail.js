import {Box, Button, Chip, Divider, Grid} from '@mui/material';
import {useEffect} from 'react';
import {ThreeDots} from 'react-loader-spinner';
import {leaveActions} from 'store/leave/leaveSlice';
import {formatTimeStampToDate} from 'utils/index';
import TableDetailLeave from '../Table/table-detail-leave';
import {useAppDispatch, useAppSelector} from './../../../app/hooks';

const styleTitle = {
  fontSize: '20px',
  fontWeight: 'bold',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const ModalLeaveDetail = ({leaveId, handleClose, showStatusLeave}) => {
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
          <Box sx={styleTitle}>Leave Detail</Box>
          <Divider />
          <Box sx={{padding: '20px'}}>
            <Box sx={{display: 'flex', marginBottom: '20px'}}>
              <Grid container spacing={2} columns={12}>
                <Grid item xs={3}>
                  <b>Title:</b>
                </Grid>
                <Grid item xs={9}>
                  {dataLeave?.title}
                </Grid>
                <Grid item xs={3}>
                  <b>Applicant:</b>
                </Grid>
                <Grid item xs={9}>
                  {dataLeave?.applicantName}
                </Grid>
                <Grid item xs={3}>
                  <b>Time submitted:</b>
                </Grid>
                <Grid item xs={9}>
                  {formatTimeStampToDate(dataLeave?.createdDate)}
                </Grid>

                <Grid sx={{display: 'flex', alignItems: 'center'}} item xs={3}>
                  <b>Date From:</b>
                </Grid>
                <Grid item xs={3}>
                  {formatTimeStampToDate(dataLeave?.startDate)}
                </Grid>
                <Grid sx={{display: 'flex', alignItems: 'center'}} item xs={3}>
                  <b>Date To:</b>
                </Grid>
                <Grid item xs={3}>
                  {formatTimeStampToDate(dataLeave?.endDate)}
                </Grid>

                <Grid item xs={3}>
                  <b>Reason:</b>
                </Grid>
                <Grid item xs={9}>
                  {dataLeave?.reason}
                </Grid>

                <Grid sx={{display: 'flex', alignItems: 'center'}} item xs={3}>
                  <b>Type leave:</b>
                </Grid>
                <Grid item xs={3}>
                  <Chip
                    sx={{fontWeight: 'bold'}}
                    variant='outlined'
                    label={dataLeave?.type}
                    color='primary'
                  />
                </Grid>
                <Grid sx={{display: 'flex', alignItems: 'center'}} item xs={3}>
                  <b>Status:</b>
                </Grid>
                <Grid item xs={3}>
                  {showStatusLeave(dataLeave?.status)}
                </Grid>
              </Grid>
            </Box>
            <TableDetailLeave data={dataLeave?.detail} />
          </Box>
          <Divider />
          <Box sx={{padding: '20px', marginLeft: 'auto'}}>
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
