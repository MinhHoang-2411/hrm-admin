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

const headCells = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: false,
    label: '',
    width: '40px',
  },
  {
    id: 'assetModel',
    align: 'left',
    disablePadding: false,
    label: 'Asset Model',
  },
  {
    id: 'serialNumber',
    align: 'left',
    disablePadding: false,
    label: 'Serial Number',
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'note',
    align: 'left',
    disablePadding: true,
    label: 'Note',
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

export default function TableAssets({
  data = [],
  setIdAsset,
  handleOpen,
  setTypeOpenModal,
  handleDelete,
}) {
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

  const renderList = useCallback(
    () =>
      Array.isArray(data) &&
      data?.map((row, index) => (
        <TableRow
          hover
          role='checkbox'
          sx={{'&:last-child td, &:last-child th': {border: 0}}}
          tabIndex={-1}
          key={row.id}
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
          <TableCell align='left'>{row?.assetModel?.modelName}</TableCell>
          <TableCell align='left'>{row?.serialNumber}</TableCell>
          <TableCell align='left'>{row?.description}</TableCell>
          <TableCell align='left'>{row?.note}</TableCell>
          <TableCell align='left'>{row?.status}</TableCell>
          <TableCell>
            <Box>
              <IconButton
                aria-label='delete'
                onClick={() => {
                  setIdAsset(row?.id);
                  setTypeOpenModal('edit-asset');
                  handleOpen();
                }}
              >
                <EditFilled />
              </IconButton>
              <IconButton
                aria-label='delete'
                onClick={() =>
                  handleDelete({...row, name: row?.serialNumber}, 'Asset', 'deleteAsset')
                }
              >
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
                <TableCell colSpan={7} scope='full' align='center'>
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
