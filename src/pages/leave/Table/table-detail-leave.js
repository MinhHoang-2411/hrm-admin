import {useCallback} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {formatTimeStampToDate} from 'utils/index';
import {RowTableEmpty} from 'components/table/table-empty';
import {TYPE_DETAIL_LEAVE} from 'constants/index';

const headCells = [
  {
    id: 'leaveDate',
    align: 'left',
    disablePadding: false,
    label: 'Leave Date',
  },
  {
    id: 'type',
    align: 'left',
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'note',
    align: 'left',
    disablePadding: false,
    label: 'Note',
  },
];

export default function TableDetailLeave({data, leaveType}) {
  const renderList = useCallback(
    () =>
      Array.isArray(data) &&
      data?.map((row) => (
        <TableRow
          hover
          role='checkbox'
          sx={{'&:last-child td, &:last-child th': {border: 0}}}
          tabIndex={-1}
          key={row.id}
        >
          <TableCell align='left'>{formatTimeStampToDate(row?.leaveDate)}</TableCell>
          <TableCell align='left'>{TYPE_DETAIL_LEAVE[row?.dateType]}</TableCell>
          <TableCell align='left'>{row.note}</TableCell>
        </TableRow>
      )),
    [data]
  );

  return (
    <Paper variant='outlined' square>
      <TableContainer>
        <Table sx={{width: '100%'}} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{backgroundColor: 'secondary.light'}}>
              {headCells?.map((headCell) => (
                <TableCell
                  key={headCell?.id}
                  align={headCell?.align}
                  padding={headCell?.disablePadding ? 'none' : 'normal'}
                  sx={{width: headCell?.width || 'auto'}}
                >
                  {headCell?.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length ? (
              renderList()
            ) : (
              <RowTableEmpty
                col={3}
                title={leaveType == 'MATERNITY' ? 'There is no detail for Maternity type' : null}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
