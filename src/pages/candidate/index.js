import {DeleteFilled, ExportOutlined, PlusCircleOutlined, SearchOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  Modal,
  OutlinedInput,
  Pagination,
} from '@mui/material';
import {useAppDispatch} from 'app/hooks';
import DropdownBtn from 'components/button/dropdown';
import MainCard from 'components/MainCard';
import {BtnAction} from 'constants/style';
import _ from 'lodash';
import {useCallback, useState} from 'react';
import {candidateActions} from 'store/candidate/candidateSlice';
import {modalActions} from 'store/modal/modalSlice';
import {totalPagePagination} from 'utils';
import {nameMatching} from 'utils/format/name';
import useGetAllList from '../../hooks/useGetAllList';
import ModalCreateCandidate from './Modal/create-candidate';
import TableCandidate from './Table/index';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  maxHeight: 700,
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
};

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

const CandidateDefault = () => {
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

  const [idCandidate, setIdCandidate] = useState(null);
  const [typeOpenModal, setTypeOpenModal] = useState('');

  // GET ALL DATA
  const {
    listData: listCandidate,
    pagination,
    loading,
  } = useGetAllList(params, candidateActions, 'candidate');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTypeOpenModal('');
    dispatch(candidateActions.clearData());
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
            newState['firstName.contains'] = value.trim();
          } else delete newState['firstName.contains'];
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
          Do you want to remove an candidate <b>{nameMatching(data?.firstName, data?.lastName)}</b>?
        </span>
      ),
      onAction: () => dispatch(candidateActions.remove(data?.id)),
    };
    dispatch(modalActions.showModal(params));
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
                placeholder='Candidate Name...'
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
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
              Add new Candidate
            </Button>
          </Box>
        </Box>
        {/* Start Table */}
        <TableCandidate
          data={listCandidate}
          handleRemove={handleRemove}
          handleOpen={handleOpen}
          setIdCandidate={setIdCandidate}
          setTypeOpenModal={setTypeOpenModal}
          isLoading={loading}
        />
        {/* End Table */}
        {pagination && listCandidate?.length > 0 && (
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
        <Box sx={style}>
          <ModalCreateCandidate
            id={idCandidate}
            typeOpenModal={typeOpenModal}
            handleClose={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CandidateDefault;
