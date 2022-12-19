import Avatar from '@mui/material/Avatar';
import {useCallback, useState} from 'react';

// material-ui
import {DeleteFilled, EditFilled} from '@ant-design/icons';
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
import {OrderTableHead} from 'components/table/table-head';
import {nameMatching} from 'utils/format/name';
import {formatTimeStampToDate} from 'utils/index';

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
    id: 'employeeCode',
    align: 'left',
    disablePadding: false,
    label: 'Employee Code',
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
    label: 'Date of birth',
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
    label: 'Joined Date',
  },
  {
    id: 'department',
    align: 'left',
    disablePadding: false,
    label: 'Department',
  },
  {
    id: 'employeeBranch',
    align: 'left',
    disablePadding: false,
    label: 'Branch',
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
}) {
  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  const isCheckAll = data?.length > 0 && listChecked?.length === data?.length;

  const handleChecked = (e) => {
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    const index = tmpList.indexOf(id);
    if (index > -1) tmpList.splice(index, 1);
    else tmpList.push(id);
    setListChecked(tmpList);
  };

  const handleCheckAll = () => {
    if (isCheckAll) setListChecked([]);
    else setListChecked(data?.map((item) => item?.id));
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
            <Avatar alt={row?.fullName} src={row?.avatar} sx={{width: 40, height: 40}} />
          </TableCell>
          <TableCell align='left'>{row?.employeeCode}</TableCell>
          <TableCell align='left'>
            {nameMatching(row?.user?.firstName, row?.user?.lastName)}
          </TableCell>
          <TableCell align='left'>{formatTimeStampToDate(row?.dateOfBirth)}</TableCell>
          <TableCell align='left'>{row?.gender}</TableCell>
          <TableCell align='left'>{row?.phoneNumber}</TableCell>
          <TableCell align='left'>{row?.user?.email}</TableCell>
          <TableCell align='left'>{row?.address?.city}</TableCell>
          <TableCell align='left'>{formatTimeStampToDate(row?.joinedDate)}</TableCell>
          <TableCell align='left'>{row?.department}</TableCell>
          <TableCell align='left'>{row?.branch?.name}</TableCell>
          <TableCell>
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
          <OrderTableHead
            headCells={headCells}
            order={order}
            orderBy={orderBy}
            handleCheckAll={handleCheckAll}
            checked={isCheckAll}
          />

          <TableBody>
            {data?.length ? (
              renderList()
            ) : (
              <TableRow>
                <TableCell colSpan={12} scope='full' align='center'>
                  <h3>There is currently no data available</h3>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
