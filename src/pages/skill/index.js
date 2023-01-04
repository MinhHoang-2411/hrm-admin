import {PlusCircleTwoTone} from '@ant-design/icons';
import styled from '@emotion/styled';
import {Box, Grid, Modal} from '@mui/material';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import {InputSearch} from 'components/filter/input-search';
import MainCard from 'components/MainCard';
import {STYLE_MODAL} from 'constants/style';
import useGetAllList from 'hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useState} from 'react';
import {modalActions} from 'store/modal/modalSlice';
import {skillActions} from 'store/skill/skillSlice';
import {totalPagePagination} from 'utils/pagination';
import {Pagination} from '../../../node_modules/@mui/lab/index';
import CardSkill from './Card/index';
import ModalCreateSkill from './Modal/create-skill';
import SkeletonLoading from './../../components/SkeletonLoading';

const styleCard = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '30px',
  width: '300px',
  height: '175px',
};

const styleCreateSkill = (create) => {
  return {
    ...styleCard,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px dashed #1890ff',
    borderRadius: '8px',
    cursor: create ? 'not-allowed' : 'pointer',
    background: create ? '#cccccca6' : 'unset',
    opacity: create ? '0.7' : 'unset',
  };
};

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '10px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

export default function SkillPage() {
  const loading = useAppSelector((state) => state.skill.loading);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    page: 0,
    size: 20,
  });
  const [create, setCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [typeOpenModal, setTypeOpenModal] = useState('');
  const [idSkill, setIdSkill] = useState(null);

  // DATA
  const {listData: listSkill, pagination} = useGetAllList(params, skillActions, 'skill');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(skillActions.clearData());
  };
  const handleOpenEdit = (id) => {
    setIdSkill(id);
    setTypeOpenModal('edit');
    setOpen(true);
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
          Do you want to remove the <b>{data?.name}</b> skill?
        </span>
      ),
      onAction: () => dispatch(skillActions.remove(data?.id)),
    };
    dispatch(modalActions.showModal(params));
  };

  const renderList = useCallback(
    () =>
      Array.isArray(listSkill) &&
      listSkill?.map((row, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <CardSkill
            data={row}
            styleCard={styleCard}
            handleOpenEdit={handleOpenEdit}
            handleRemove={handleRemove}
          />
        </Grid>
      )),
    [listSkill]
  );

  return (
    <>
      <MainCard sx={{mt: 2}} content={false}>
        <Box
          sx={{
            padding: '20px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{marginBottom: '30px'}}>
            <InputSearch
              search={search}
              handleSearch={handleSearch}
              placeholder='Search name skill...'
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 16}}>
              <Grid item xs={2} sm={4} md={4}>
                <Box
                  sx={styleCreateSkill(create)}
                  onClick={() => {
                    handleOpen();
                    setTypeOpenModal('create');
                  }}
                >
                  <PlusCircleTwoTone style={{fontSize: '60px', color: '#1890ff'}} />
                </Box>
              </Grid>
              {loading
                ? [...Array(7).keys()].map((data) => (
                    <Grid item xs={2} sm={4} md={4} key={data}>
                      <SkeletonLoading sx={styleCard} />
                    </Grid>
                  ))
                : listSkill?.length > 0
                ? renderList()
                : null}
            </Grid>
          </Box>
          {pagination && listSkill?.length > 0 && (
            <BoxPagination>
              <Pagination
                count={totalPagePagination(pagination)}
                page={pagination?.page + 1 || 1}
                onChange={handlePagination}
              />
            </BoxPagination>
          )}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={{...STYLE_MODAL, width: 570}}>
            <ModalCreateSkill
              setOpenModalCreate={setOpen}
              id={idSkill}
              typeOpenModal={typeOpenModal}
              setTypeOpenModal={setTypeOpenModal}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </MainCard>
    </>
  );
}
