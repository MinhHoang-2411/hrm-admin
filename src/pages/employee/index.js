import {PlusCircleOutlined, SearchOutlined, DeleteFilled, ExportOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Pagination,
  Select,
  MenuItem,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import {useAppDispatch} from 'app/hooks';
import DropdownBtn from 'components/button/dropdown';
import MainCard from 'components/MainCard';
import useGetAllList from '../../hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useState} from 'react';
import {branchesActions} from 'store/branches/branchesSlice';
import {employeeActions} from 'store/employee/employeeSlice';
import {teamActions} from 'store/team/teamSlice';
import {totalPagePagination} from 'utils';
import ModalCreateEmployee from './Modal/create-employee';
import TableEmployee from './Table/index';
import {optionsSelect} from 'components/select/index';
import {modalActions} from 'store/modal/modalSlice';
import {nameMatching} from 'utils/format/name';
import {BtnAction, STYLE_MODAL} from 'constants/style';

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

const EmployeeDefault = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    size: 10,
    page: 0,
    sort: '',
    order: 'asc',
    branch: undefined,
    team: undefined,
  });
  const [open, setOpen] = useState(false);

  const [idEmployee, setIdEmployee] = useState(null);
  const [typeOpenModal, setTypeOpenModal] = useState('');

  // GET ALL DATA
  const {listData: listEmployee, pagination} = useGetAllList(params, employeeActions, 'employee');
  const {listData: listTeam} = useGetAllList(null, teamActions, 'team');
  const {listData: listBranches} = useGetAllList(null, branchesActions, 'branches');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIdEmployee(null);
    setTypeOpenModal('');
    dispatch(employeeActions.clearData());
    setOpen(false);
  };

  const handlePagination = (event, value) => {
    setParams((prevState) => {
      return {...prevState, page: Number(value - 1)};
    });
  };

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

  const handleRemove = (data) => {
    const params = {
      type: 'modalConfirm',
      title: 'Confirm',
      content: (
        <span>
          Do you want to remove an employee{' '}
          <b>{nameMatching(data?.user?.firstName, data?.user?.lastName)}</b>?
        </span>
      ),
      onAction: () => dispatch(employeeActions.remove(data?.id)),
    };
    dispatch(modalActions.showModal(params));
  };

  const handleFilter = (key, value) => {
    setParams((preState) => {
      const state = {...preState};
      if (value === 'all') delete state[key];
      else state[key] = value;
      return state;
    });
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
                placeholder='Employee Name...'
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
              <InputLabel id='demo-simple-select-label'>Branch</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={params.branch}
                onChange={(e) => handleFilter('branchId.equals', e.target.value)}
                label='Branch'
              >
                <MenuItem value={'all'}>All</MenuItem>
                {optionsSelect(listBranches)}
              </Select>
            </FormControl>
            <FormControl sx={{minWidth: 120, marginLeft: '15px'}}>
              <InputLabel id='demo-simple-select-label'>Team</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={params.team}
                onChange={(e) => handleFilter('teamId.equals', e.target.value)}
                label='Team'
              >
                <MenuItem value={'all'}>All</MenuItem>
                {optionsSelect(listTeam)}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <DropdownBtn title='Multiple Action' content={groupBtnAction()} />
            <Button
              variant='contained'
              startIcon={<PlusCircleOutlined />}
              sx={{textTransform: 'capitalize', marginLeft: '8px'}}
              onClick={() => {
                handleOpen();
                setTypeOpenModal('create');
              }}
            >
              Add new Employee
            </Button>
          </Box>
        </Box>
        {/* Start Table */}
        <TableEmployee
          data={listEmployee}
          setIdEmployee={setIdEmployee}
          handleOpen={handleOpen}
          setTypeOpenModal={setTypeOpenModal}
          handleRemove={handleRemove}
        />
        {/* End Table */}
        {pagination && listEmployee?.length > 0 && (
          <BoxPagination>
            <Pagination
              count={totalPagePagination(pagination)}
              page={pagination?.page + 1 || 1}
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
          <ModalCreateEmployee
            idEmployee={idEmployee}
            typeOpenModal={typeOpenModal}
            listTeam={listTeam}
            listBranches={listBranches}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default EmployeeDefault;
