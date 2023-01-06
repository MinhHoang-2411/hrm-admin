import {useCallback, useState} from 'react';

// material-ui
import {StopOutlined, SyncOutlined} from '@ant-design/icons';
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
} from '@mui/material';
import {OrderTableHead} from 'components/table/table-head';
import {nameMatching} from 'utils/format/name';
import Empty from 'components/Empty';
import TableLoading from 'components/table/table-loading';

const headCells = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: false,
    label: '',
    width: '40px',
  },

  {
    id: 'username',
    align: 'left',
    disablePadding: false,
    label: 'User name',
  },
  {
    id: 'fullName',
    align: 'left',
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'action',
    align: 'center',
    disablePadding: false,
    label: 'Actions',
  },
];

export default function TableAccount({
  data,
  setIdAccount,
  setTypeOpenModal,
  handleOpen,
  handleActivateOrDeactivateAccount,
  isLoading,
}) {
  //STATES
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('trackingNo');
  const [selected, setSelected] = useState([]);
  const [listChecked, setListChecked] = useState([]);

  //HANDLES
  const handleChecked = (e) => {
    e.stopPropagation();
    const id = Number(e.target.value);
    const tmpList = [...listChecked];
    const index = tmpList.indexOf(id);
    if (index > -1) tmpList.splice(index, 1);
    else tmpList.push(id);
    setListChecked(tmpList);
  };

  const isCheckAll = data?.length > 0 && listChecked?.length === data?.length;
  const handleCheckAll = () => {
    if (isCheckAll) setListChecked([]);
    else setListChecked(data?.map((item) => item?.id));
  };

  const handleEdit = (id) => {
    setIdAccount(id);
    setTypeOpenModal('edit');
    handleOpen();
  };
  const handleResetPwd = (data) => {};

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

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
              onClick={(e) => e.stopPropagation()}
            />
          </TableCell>
          <TableCell align='left'>{row?.login}</TableCell>
          <TableCell
            align='left'
            sx={{cursor: 'pointer', color: 'primary.main', fontWeight: '600'}}
            onClick={() => handleEdit(row?.id)}
          >
            {nameMatching(row?.firstName, row?.lastName)}
          </TableCell>
          <TableCell align='left'>{row?.email}</TableCell>
          <TableCell align='left'>{row?.activated ? 'ACTIVATED' : null}</TableCell>
          <TableCell align='center'>
            <Box>
              <Tooltip
                sx={{marginRight: '10px'}}
                title={row?.activated ? 'Deactivate account' : 'Active account'}
              >
                <IconButton
                  aria-label='delete'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleActivateOrDeactivateAccount(row);
                  }}
                >
                  {row?.activated ? <StopOutlined /> : <CheckCircleOutlined />}
                </IconButton>
              </Tooltip>
              <Tooltip title='Reset password'>
                <IconButton
                  aria-label='reset pwd'
                  onClick={() => {
                    handleResetPwd(row);
                  }}
                >
                  <SyncOutlined />
                </IconButton>
              </Tooltip>
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

          {isLoading ? (
            <TableLoading col={6} />
          ) : (
            <TableBody>
              {data?.length ? (
                renderList()
              ) : (
                <TableRow>
                  <TableCell colSpan={6} scope='full' align='center'>
                    <Empty />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
}
