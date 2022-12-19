import {TableCell, TableRow} from '@mui/material';

export function RowTableEmpty({title = null, col = 5}) {
  return (
    <TableRow>
      <TableCell colSpan={col} scope='full' align='center'>
        <h3>{title || 'There is currently no data available'}</h3>
      </TableCell>
    </TableRow>
  );
}
