import {TableCell, TableRow} from '@mui/material';

export function RowTableEmpty({title = null, col = 5}) {
  return (
    <TableRow>
      <TableCell colSpan={col} scope='full' align='center'>
        <h4 style={{color: '#738bab'}}>{title || 'There is currently no data available'}</h4>
      </TableCell>
    </TableRow>
  );
}
