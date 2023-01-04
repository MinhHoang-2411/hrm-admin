import {SearchOutlined, SettingOutlined, PlusCircleOutlined} from '@ant-design/icons';
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
  Pagination,
} from '@mui/material';
import styled from '@emotion/styled';
import {useAppDispatch, useAppSelector} from 'app/hooks';
import MainCard from 'components/MainCard';
import useGetAllList from '../../hooks/useGetAllList';
import _ from 'lodash';
import {useCallback, useEffect, useState} from 'react';
import {assetActions} from 'store/asset/assetSlice';
import SliderList from './Slider/index';
import '../../assets/style/asset.scss';
import TableAssets from './Table/index';
import Modal from '@mui/material/Modal';

import {STYLE_MODAL} from 'constants/style';
import ModalSettingCategory from './Modal/model-setting-category';
import ModalSettingModel from './Modal/model-setting-model';
import IconLaptop from '../../assets/images/icons/laptop.png';
import ModalCreateAsset from './Modal/model-asset';
import {modalActions} from 'store/modal/modalSlice';
import {totalPagePagination} from 'utils/pagination';

const styleChipCategory = {
  padding: '7px',
  fontSize: '14px',
  height: '35px',
  borderRadius: '10px',
  marginRight: '15px',
  cursor: 'pointer',
  border: '1.5px solid #bfbfbf',
  transition: '0.2s',
  transitionTimingFunction: 'ease-in',
  '&:hover': {
    borderColor: '#1890ff',
    color: '#1890ff',
  },
};
const styleCardModel = {
  width: '270px',
  height: '270px',
  marginRight: '20px',
  cursor: 'pointer',
  transition: '0.2s',
  transitionTimingFunction: 'ease-in',
  '&:hover': {
    color: '#1890ff',
  },
};

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

export default function AssetPage() {
  const dispatch = useAppDispatch();

  //STATE
  const [search, setSearch] = useState('');
  const [params, setParams] = useState({
    size: 20,
    page: 0,
    sort: '',
    order: 'asc',
    category: null,
    model: null,
  });
  const [paramsModels, setParamsModels] = useState({});
  const [open, setOpen] = useState(false);
  const [typeOpenModal, setTypeOpenModal] = useState('');
  const [idAsset, setIdAsset] = useState(null);

  // GET DATA
  const listCategory = useAppSelector((state) => state.asset.listCategory);
  const listModels = useAppSelector((state) => state.asset.listModels);
  const reloadListCategory = useAppSelector((state) => state.asset.reloadListCategory);
  const reloadListModel = useAppSelector((state) => state.asset.reloadListModel);
  const {listData: litsAssets, pagination, loading} = useGetAllList(params, assetActions, 'asset');

  //FUNCTION ACTION
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTypeOpenModal('');
  };

  const debounceSearch = useCallback(
    _.debounce(
      (value) =>
        setParams((prevState) => {
          const newState = {...prevState};
          if (value && value.trim() !== '') {
            newState['serialNumber.contains'] = value.trim();
          } else delete newState['serialNumber.contains'];
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

  const handleFilter = (key, value) => {
    if (key === 'model') {
      setParams((preState) => {
        const state = {...preState};
        if (state['assetModelId.equals'] == value?.id) delete state['assetModelId.equals'];
        else state['assetModelId.equals'] = value?.id;
        return state;
      });
    } else if (key === 'category') {
      setParamsModels((preState) => {
        const state = {...preState};
        if (state['assetCategoryId.equals'] == value?.id) delete state['assetCategoryId.equals'];
        else {
          state['assetCategoryId.equals'] = value?.id;
          // change category -> remove filter model
          setParams((preState) => {
            const state = {...preState};
            delete state['assetModelId.equals'];
            return state;
          });
        }
        return state;
      });
    }
  };

  const handlePagination = (event, value) => {
    setParams((prevState) => {
      return {...prevState, page: Number(value - 1)};
    });
  };

  const showCategory = (data) => {
    return (
      <Chip
        className={paramsModels?.['assetCategoryId.equals'] == data?.id ? 'active' : ''}
        sx={styleChipCategory}
        avatar={
          <Avatar
            sx={{img: {objectFit: 'contain'}}}
            alt='Category'
            src={data?.imageUrl || IconLaptop}
          />
        }
        label={data?.name}
        variant='outlined'
        onClick={() => handleFilter('category', data)}
      />
    );
  };
  const showModels = (data) => {
    return (
      <Card
        className={params?.['assetModelId.equals'] == data?.id ? 'active' : ''}
        sx={styleCardModel}
        onClick={() => handleFilter('model', data)}
      >
        <CardMedia
          sx={{objectFit: 'contain'}}
          component='img'
          height='140'
          image={data?.imageUrl || IconLaptop}
          alt='Model'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {data?.modelName}
          </Typography>
          <Typography variant='body2' color='text.secondary' className='two-lines'>
            {data?.description}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  const switchModal = (type) => {
    switch (type) {
      case 'category':
        return (
          <Box sx={{...STYLE_MODAL, width: 900}}>
            <ModalSettingCategory handleDelete={handleDelete} />
          </Box>
        );
      case 'model':
        return (
          <Box sx={{...STYLE_MODAL, width: 900}}>
            <ModalSettingModel listCategory={listCategory} handleDelete={handleDelete} />
          </Box>
        );
      case 'create-asset':
      case 'edit-asset':
        return (
          <Box sx={{...STYLE_MODAL, width: 750}}>
            <ModalCreateAsset id={idAsset} typeOpenModal={type} handleClose={handleClose} />
          </Box>
        );
      default:
        return <Box sx={{...STYLE_MODAL, width: 750}}></Box>;
    }
  };

  const handleDelete = (data, type, action) => {
    const params = {
      type: 'modalConfirm',
      title: 'Confirm',
      content: (
        <span>
          Do you want to remove {type} <b>{data.name}</b>?
        </span>
      ),
      onAction: () => dispatch(assetActions[action](data?.id)),
    };
    dispatch(modalActions.showModal(params));
  };

  useEffect(() => {
    dispatch(assetActions.getCategory({}));
  }, [reloadListCategory]);

  useEffect(() => {
    dispatch(assetActions.getModels(paramsModels));
  }, [paramsModels, reloadListModel]);

  return (
    <>
      <MainCard sx={{mt: 2}} content={false}>
        <Box
          sx={{
            padding: '20px 20px',
            display: 'flex-column',
          }}
        >
          <Box>
            <FormControl sx={{width: {xs: '100%', md: 300}}}>
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
                placeholder='Search Asset...'
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>Categories</h3>
            <Button
              variant='contained'
              startIcon={<SettingOutlined />}
              onClick={() => {
                handleOpen();
                setTypeOpenModal('category');
              }}
            >
              Setting Categories
            </Button>
          </Box>
          <Box sx={{marginTop: '15px'}} className='slider-list'>
            <Box sx={{width: '99%'}}>
              <SliderList data={listCategory} content={(data) => showCategory(data)} />
            </Box>
          </Box>

          {listModels?.length > 0 && (
            <>
              <Box
                sx={{
                  marginTop: '35px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h3>Models</h3>
                <Button
                  variant='contained'
                  startIcon={<SettingOutlined />}
                  onClick={() => {
                    handleOpen();
                    setTypeOpenModal('model');
                  }}
                >
                  Setting Models
                </Button>
              </Box>
              <Box sx={{marginTop: '15px'}} className='slider-list'>
                <Box sx={{width: '99%'}}>
                  <SliderList data={listModels} content={(data) => showModels(data)} />
                </Box>
              </Box>
            </>
          )}

          <Box
            sx={{
              marginTop: '35px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>Assets</h3>
            <Button
              variant='contained'
              startIcon={<PlusCircleOutlined />}
              onClick={() => {
                setTypeOpenModal('create-asset');
                handleOpen();
              }}
            >
              Add New Asset
            </Button>
          </Box>
          <Box>
            {/* Start Table */}
            <TableAssets
              data={litsAssets}
              setIdAsset={setIdAsset}
              handleOpen={handleOpen}
              setTypeOpenModal={setTypeOpenModal}
              handleDelete={handleDelete}
              isLoading={loading}
            />
            {/* End Table */}
          </Box>
          {pagination && litsAssets?.length > 0 && (
            <BoxPagination>
              <Pagination
                count={totalPagePagination(pagination)}
                page={pagination?.page + 1 || 1}
                onChange={handlePagination}
              />
            </BoxPagination>
          )}
        </Box>
      </MainCard>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {switchModal(typeOpenModal)}
      </Modal>
    </>
  );
}
