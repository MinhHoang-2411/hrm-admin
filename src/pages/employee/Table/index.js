import {useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Switch from '@mui/material/Switch';

// material-ui
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'fullName',
    align: 'left',
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'gender',
    align: 'left',
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'dataOfBirth',
    align: 'left',
    disablePadding: false,
    label: 'Birthday',
  },
  {
    id: 'phoneNumber',
    align: 'left',
    disablePadding: false,
    label: 'Phone Number',
  },
  {
    id: 'joinedDate',
    align: 'left',
    disablePadding: false,
    label: 'Joined Date',
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
    id: 'active',
    align: 'left',
    disablePadding: false,
    label: 'Active',
  },
];

function OrderTableHead({order, orderBy}) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableEmployee({data}) {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;
  const label = {inputProps: {'aria-label': 'Switch demo'}};

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
        <Table
          aria-labelledby='tableTitle'
          sx={{
            '& .MuiTableCell-root:first-child': {
              pl: 2,
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3,
            },
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {data?.length > 0 &&
              data.map((row, index) => {
                const isItemSelected = isSelected(row.trackingNo);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell component='th' id={labelId} scope='row' align='left'>
                      <Link color='secondary' component={RouterLink} to=''>
                        {row.id}
                      </Link>
                    </TableCell>
                    <TableCell align='left'>{row.fullName}</TableCell>
                    <TableCell align='left'>{row.gender}</TableCell>
                    <TableCell align='left'>{row.dataOfBirth}</TableCell>
                    <TableCell align='left'>{row.phoneNumber}</TableCell>
                    <TableCell align='left'>{row.joinedDate}</TableCell>
                    <TableCell align='left'>{row.position}</TableCell>
                    <TableCell align='left'>{row.employeeBranch}</TableCell>
                    <TableCell align='left'>{row.employeeTeam}</TableCell>
                    <TableCell align='left'>
                      <Switch {...label} defaultChecked />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
