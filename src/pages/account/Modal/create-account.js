import {CloseOutlined} from '@ant-design/icons';
import {Button, Divider, Grid} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {useEffect} from 'react';
import {ThreeDots} from 'react-loader-spinner';
import {accountActions} from 'store/account/accountSlice';
import {employeeActions} from 'store/employee/employeeSlice';
import {formatTimeStampToDate} from 'utils/index';

import '../../../assets/style/employee.scss';
import FieldData from './FieldData';

export default function ModalCreateAccount({idAccount, idEmployee, typeOpenModal, handleClose}) {
  const dispatch = useAppDispatch();

  //DATA
  const dataAccount = useAppSelector((state) => state.account.dataAccount);
  const dataEmployee = useAppSelector((state) => state.employee.dataEmployee);
  const isLoading = useAppSelector((state) => state.account.loadingEdit);

  useEffect(() => {
    if (typeOpenModal == 'edit' && idAccount) {
      dispatch(employeeActions.getById(idEmployee));
      dispatch(accountActions.getById(idAccount));
    }
  }, [idAccount]);

  return (
    <>
      {isLoading ? (
        <div className={`text-center`}>
          <ThreeDots height='60' width='60' color='#339cff' />
        </div>
      ) : (
        <>
          <div style={{padding: '15px'}}>
            <span style={{fontSize: '20px', fontWeight: 700, color: '#000'}}>
              Employee Infomation
            </span>
          </div>
          <Divider />
          <div style={{padding: '20px'}}>
            <Grid container>
              <Grid item xs={6}>
                <FieldData label='First name' value={dataAccount?.firstName || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Last name' value={dataAccount?.lastName || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData
                  label='Date of birth'
                  value={formatTimeStampToDate(dataEmployee?.dateOfBirth || '')}
                />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Phone number' value={dataEmployee?.phoneNumber || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Gender' value={dataEmployee?.gender || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Address' value={dataEmployee?.address?.streetAddress || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Department' value={dataEmployee?.department || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Position' value={dataEmployee?.position || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Team' value={dataEmployee?.team?.name || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Branch' value={dataEmployee?.branch?.name || ''} />
              </Grid>
              <Grid item xs={6}>
                <FieldData label='Nation' value={dataEmployee?.nationality || 'none'} />
              </Grid>
              <Grid item xs={6}>
                <FieldData
                  label='Join date'
                  value={formatTimeStampToDate(dataEmployee?.joinedDate || '')}
                />
              </Grid>
            </Grid>
          </div>
          <Divider />
          <div style={{padding: '20px', display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              variant='outlined'
              color='error'
              className='button-submit-member'
              startIcon={<CloseOutlined />}
              onClick={() => handleClose()}
              sx={{marginLeft: 'auto'}}
            >
              Close
            </Button>
          </div>
          <Divider />
        </>
      )}
    </>
  );
}
