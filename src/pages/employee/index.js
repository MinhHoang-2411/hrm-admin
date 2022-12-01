import MainCard from 'components/MainCard';
import Search from 'layout/MainLayout/Header/HeaderContent/Search';
import {useState} from 'react';
import TableEmployee from './Table/index';
import {Box, Button, FormControl, OutlinedInput, InputAdornment, Pagination} from '@mui/material';
import {SearchOutlined, PlusCircleOutlined} from '@ant-design/icons';
import styled from '@emotion/styled';
import {totalPagePagination} from 'utils';

const BoxPagination = styled(Box)(({theme}) => ({
  padding: '20px 0px',
  display: 'flex',
  justifyContent: 'left',
}));

const EmployeeDefault = () => {
  const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');
  const [data, setData] = useState([
    {
      id: 1,
      fullName: 'Nam',
      gender: 'MALE',
      dataOfBirth: '2022-10-30',
      phoneNumber: '01299321567',
      joinedDate: '2022-10-30',
      position: 'member',
      employeeBranch: 'Hue',
      employeeTeam: 'Say Yes',
    },
    {
      id: 2,
      fullName: 'Nam',
      gender: 'MALE',
      dataOfBirth: '2022-10-30',
      phoneNumber: '01299321567',
      joinedDate: '2022-10-30',
      position: 'member',
      employeeBranch: 'Hue',
      employeeTeam: 'Say Yes',
    },
    {
      id: 3,
      fullName: 'Nam',
      gender: 'MALE',
      dataOfBirth: '2022-10-30',
      phoneNumber: '01299321567',
      joinedDate: '2022-10-30',
      position: 'member',
      employeeBranch: 'Hue',
      employeeTeam: 'Say Yes',
    },
  ]);
  const [pagination, setPagination] = useState({
    _limit: 10,
    _page: 1,
    _totalRows: 50,
  });

  const [params, setParams] = useState({
    _limit: 10,
    _page: 1,
    _sort: '',
    _order: 'asc',
    search: null,
  });

  const handlePagination = (event) => {
    setParams((prevState) => {
      return {...prevState, _page: value};
    });
  };

  return (
    <MainCard sx={{mt: 2}} content={false}>
      <Box
        sx={{
          padding: '20px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FormControl sx={{width: {xs: '100%', md: 224}}}>
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
            placeholder='Search Employee'
          />
        </FormControl>
        <Button
          variant='contained'
          startIcon={<PlusCircleOutlined />}
          sx={{textTransform: 'capitalize', marginLeft: '8px'}}
        >
          Add new Employee
        </Button>
      </Box>
      <TableEmployee data={data} />
      <BoxPagination>
        <Pagination
          count={totalPagePagination(pagination)}
          page={pagination._page}
          onChange={handlePagination}
        />
      </BoxPagination>
    </MainCard>
  );
};

export default EmployeeDefault;
