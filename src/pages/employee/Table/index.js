import Avatar from '@mui/material/Avatar';
import {useCallback, useState} from 'react';

import {DeleteFilled, EditFilled, FilePdfOutlined} from '@ant-design/icons';
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import useGetAllList from 'hooks/useGetAllList';
import {departmentsActions} from 'store/departments/departmentsSlice';
import {positionsActions} from 'store/positions/positionsSlice';
import {OrderTableHead} from 'components/table/table-head';
import {nameMatching} from 'utils/format/name';
import {formatTimeStampToDate} from 'utils/index';
import Empty from 'components/Empty';
import TableLoading from 'components/table/table-loading';
import {checkAllCondition, handleCheckAll} from 'utils/helper/handleCheckAll';
import user from 'assets/images/users/user.png';

const headCells = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: false,
    label: '',
    width: '40px',
  },
  {
    id: 'avatar',
    align: 'left',
    disablePadding: false,
    label: 'Avatar',
  },
  {
    id: 'fullName',
    align: 'left',
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'dataOfBirth',
    align: 'left',
    disablePadding: false,
    label: 'Date of Birth',
  },
  {
    id: 'gender',
    align: 'left',
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'phoneNumber',
    align: 'left',
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'address',
    align: 'left',
    disablePadding: false,
    label: 'Address',
  },
  {
    id: 'joinedDate',
    align: 'left',
    disablePadding: false,
    label: 'Joining Date',
  },
  {
    id: 'department',
    align: 'left',
    disablePadding: false,
    label: 'Department',
  },
  {
    id: 'position',
    align: 'left',
    disablePadding: false,
    label: 'Position',
  },
  {
    id: 'employeeBranch',
    align: 'left',
    disablePadding: false,
    label: 'Branch',
  },
  {
    id: 'employeeTeam',
    align: 'left',
    disablePadding: false,
    label: 'Team',
  },
  {
    id: 'resumeUrl',
    align: 'left',
    disablePadding: false,
    label: 'CV',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Actions',
  },
];

export default function TableEmployee({
  data,
  setIdEmployee,
  setTypeOpenModal,
  handleOpen,
  handleRemove,
  isLoading,
}) {
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [listChecked, setListChecked] = useState([]);
  const listDepartment = useGetAllList(null, departmentsActions, 'departments')?.listData;
  const listPositions = useGetAllList(null, positionsActions, 'positions')?.listData;

  const isCheckAll = checkAllCondition(data, listChecked);

  const handleChecked = (e) => {
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    const index = tmpList.indexOf(id);
    if (index > -1) tmpList.splice(index, 1);
    else tmpList.push(id);
    setListChecked(tmpList);
  };

  const handleEdit = (id) => {
    setIdEmployee(id);
    setTypeOpenModal('edit');
    handleOpen();
  };

  const renderList = useCallback(
    () =>
      Array.isArray(data) &&
      data?.map((row, index) => (
        <TableRow
          hover
          role='checkbox'
          sx={{'&:last-child td, &:last-child th': {border: 0}}}
          aria-checked={isSelected(row?.trackingNo)}
          tabIndex={-1}
          key={row.id}
          selected={isSelected(row?.trackingNo)}
        >
          <TableCell
            component='th'
            id={`enhanced-table-checkbox-${index}`}
            scope='row'
            align='left'
          >
            <Checkbox
              value={row?.id}
              checked={listChecked?.includes(row?.id)}
              onChange={handleChecked}
            />
          </TableCell>
          <TableCell align='left'>
            <Avatar alt={row?.fullName} src={row?.avatar || user} sx={{width: 40, height: 40}} />
          </TableCell>
          <TableCell align='left'>
            {nameMatching(row?.user?.firstName, row?.user?.lastName)}
          </TableCell>
          <TableCell align='left'>{formatTimeStampToDate(row?.dateOfBirth)}</TableCell>
          <TableCell align='left'>{`${row.gender[0]}${row.gender
            .substring(1)
            .toLowerCase()
            .replace('_', ' ')}`}</TableCell>
          <TableCell align='left'>{row?.phoneNumber}</TableCell>
          <TableCell align='left'>{row?.user?.email}</TableCell>
          <TableCell align='left'>{row?.address?.streetAddress}</TableCell>
          <TableCell align='left'>{formatTimeStampToDate(row?.joinedDate)}</TableCell>
          <TableCell align='left'>{listDepartment[row?.department]}</TableCell>
          <TableCell align='left'>{listPositions[row?.position]}</TableCell>
          <TableCell align='left'>{row?.branch?.name}</TableCell>
          <TableCell align='left'>{row?.team?.name?.replace('_', ' ')}</TableCell>
          <TableCell align='left'>
            <IconButton aria-label='edit' onClick={() => window.open(row?.resumeUrl)}>
              <FilePdfOutlined style={{color: '#1890ff'}} />
            </IconButton>
          </TableCell>
          <TableCell align='left'>
            <Box>
              <IconButton aria-label='edit' onClick={() => handleEdit(row?.id)}>
                <EditFilled />
              </IconButton>
              <IconButton aria-label='delete' onClick={() => handleRemove(row)}>
                <DeleteFilled />
              </IconButton>
            </Box>
          </TableCell>
        </TableRow>
      )),
    [data, listChecked]
  );

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': {whiteSpace: 'nowrap'},
        }}
      >
        <Table aria-labelledby='tableTitle'>
          {isLoading ? (
            <TableLoading col={15} />
          ) : (
            <>
              <OrderTableHead
                headCells={headCells}
                order={order}
                orderBy={orderBy}
                handleCheckAll={() => handleCheckAll(data, listChecked, setListChecked)}
                checked={isCheckAll}
              />
              <TableBody>
                {data?.length ? (
                  renderList()
                ) : (
                  <TableRow>
                    <TableCell colSpan={15} scope='full' align='center'>
                      <Empty />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
