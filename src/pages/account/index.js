import {DeleteFilled, ExportOutlined, PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Pagination,
  Select,
} from '@mui/material';
import {useAppDispatch} from 'app/hooks';
import DropdownBtn from 'components/button/dropdown';
import MainCard from 'components/MainCard';
import {optionsSelect} from 'components/select/index';
import {STATUS_ACCOUNT_USER} from 'constants/index';
import {BtnAction, STYLE_MODAL} from 'constants/style';
import {useCallback, useState} from 'react';
import {accountActions} from 'store/account/accountSlice';
import {modalActions} from 'store/modal/modalSlice';
import {totalPagePagination} from 'utils';
import {nameMatching} from 'utils/format/name';
import useGetAllList from '../../hooks/useGetAllList';
import ModalCreateAccount from './Modal/create-account';
import TableAccount from './Table/index';
import _ from 'lodash';

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

const AccountDefault = () => {
  const dispatch = useAppDispatch();
  const [params, setParams] = useState({
    size: 10,
    page: 0,
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [idAccount, setIdAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const [typeOpenModal, setTypeOpenModal] = useState('');

  const {listData: listAccount, pagination} = useGetAllList(params, accountActions, 'account');

  const debounceSearch = useCallback(
    _.debounce(
      (value) =>
        setParams((prevState) => {
          const newState = {...prevState};
          if (value && value.trim() !== '') {
            newState['login.contains'] = value.trim();
          } else {
            delete newState['login.contains'];
          }
          return {...newState, page: 0};
        }),
      500
    ),
    []
  );
  const handleSearch = (e) => {
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };

  const handleFilter = (key, value) => {
    setParams((prevState) => {
      const newState = {...prevState};
      if (value == 'all') delete newState[key];
      else newState[key] = value == 1 ? true : false;
      return {...newState, page: 0};
    });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIdAccount(null);
    setTypeOpenModal('');
    dispatch(accountActions.clearData());
    setOpen(false);
  };

  const handleRemove = (data) => {
    const params = {
      type: 'modalConfirm',
      title: 'Confirm',
      content: (
        <span>
          Do you want to remove an account <b>{nameMatching(data?.firstName, data?.lastName)}</b>?
        </span>
      ),
      onAction: () => dispatch(accountActions.remove(data?.id)),
    };
    dispatch(modalActions.showModal(params));
  };

  const handlePagination = (e, value) => {
    setPage(value);
  };

  const groupBtnAction = () => {
    return (
      <Box>
        <BtnAction>
          <DeleteFilled />
          &nbsp; Delete
        </BtnAction>
        <BtnAction>
          <ExportOutlined />
          &nbsp; Export
        </BtnAction>
      </Box>
    );
  };
  return (
    <>
      <MainCard sx={{mt: 2}} content={false}>
        <Box
          sx={{
            padding: '20px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <FormControl sx={{width: {xs: '100%', md: 200}}}>
              <OutlinedInput
                size='small'
                id='header-search'
                startAdornment={
                  <InputAdornment position='start' sx={{mr: -0.5}}>
                    <SearchOutlined />
                  </InputAdornment>
                }
                aria-describedby='header-search-text'
                inputProps={{
                  'aria-label': 'weight',
                }}
                placeholder='Search username...'
                value={search}
                onChange={handleSearch}
              />
            </FormControl>
            <FormControl sx={{minWidth: 150, marginLeft: '15px'}}>
              <InputLabel id='demo-simple-select-label'>Status</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={params.team}
                label='Team'
                onChange={(e) => handleFilter('activated.equals', e?.target?.value)}
              >
                <MenuItem value={'all'}>ALL</MenuItem>
                {optionsSelect(STATUS_ACCOUNT_USER)}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <DropdownBtn title='Multiple Action' content={groupBtnAction()} />
            <Button
              variant='contained'
              startIcon={<PlusCircleOutlined />}
              sx={{textTransform: 'capitalize', marginLeft: '8px'}}
            >
              Add new Account
            </Button>
          </Box>
        </Box>
        {/* Start Table */}
        <TableAccount
          data={listAccount}
          setIdAccount={setIdAccount}
          handleOpen={handleOpen}
          setTypeOpenModal={setTypeOpenModal}
          handleRemove={handleRemove}
        />
        {/* End Table */}
        {pagination && listAccount?.length > 0 && (
          <BoxPagination>
            <Pagination
              count={totalPagePagination(pagination)}
              page={page}
              onChange={handlePagination}
            />
          </BoxPagination>
        )}
      </MainCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={STYLE_MODAL}>
          <ModalCreateAccount
            idAccount={idAccount}
            typeOpenModal={typeOpenModal}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default AccountDefault;
