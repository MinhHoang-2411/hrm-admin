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
  // {
  //   id: 'phoneNumber',
  //   align: 'left',
  //   disablePadding: false,
  //   label: 'Phone Number',
  // },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'note',
    align: 'left',
    disablePadding: false,
    label: 'Note',
  },
  {
    id: 'resumeUrl',
    align: 'left',
    disablePadding: false,
    label: 'Resume',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'action',
    align: 'left',
    disablePadding: false,
    label: 'Actions',
  },
];

export default function TableCandidate({
  data,
  handleRemove,
  setTypeOpenModal,
  setIdCandidate,
  handleOpen,
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
    setIdCandidate(id);
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
            <Avatar alt={row?.fullName} src={row?.imageUrl} sx={{width: 40, height: 40}} />
          </TableCell>
          <TableCell align='left'>{nameMatching(row?.firstName, row?.lastName)}</TableCell>
          {/* <TableCell align='left'>{row?.phoneNumber}</TableCell> */}
          <TableCell align='left'>{row?.email}</TableCell>
          <TableCell align='left'>{row?.note}</TableCell>
          <TableCell align='left'>{row?.resumeUrl}</TableCell>
          <TableCell align='left'>{row?.status}</TableCell>
          <TableCell>
            <Box>
              <IconButton aria-label='delete' onClick={() => handleEdit(row?.id)}>
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
