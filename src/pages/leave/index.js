import React, {useCallback, useState} from 'react';
import {
  Avatar,
  Box,
  Chip,
  FormControl,
  InputAdornment,
  OutlinedInput,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import MainCard from 'components/MainCard';
import useGetAllList from 'hooks/useGetAllList';
import {leaveActions} from 'store/leave/leaveSlice';
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

export default function LeavePage() {
  const [params, setParams] = useState({
    page: 0,
    size: 20,
  });
  const {listData: listLeave} = useGetAllList(params, leaveActions, 'leave');
  const liseLeaveWaiting = listLeave?.filter((item) => item?.status == 'WAITING');

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
                  <Chip label={row?.type} color='primary' />
                </Grid>
                <Grid item xs={4}>
                  <Chip label={row?.status} color='primary' />
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
          </Box>
        </Card>
      )),
    [listLeave]
  );

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
              <Box sx={{padding: '10px 20px'}}>
                <h3>ALL LEAVE</h3>
                <Box>{listLeave?.length ? renderList(listLeave) : <div></div>}</Box>
              </Box>
            </Grid>
            <Grid xs={7}>
              <Box sx={{padding: '10px 20px'}}>
                <h3>LEAVES WAITING</h3>
                <Box>{liseLeaveWaiting?.length ? renderList(liseLeaveWaiting) : <div></div>}</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </MainCard>
    </>
  );
}
