import {TableCell, TableRow} from '@mui/material';
import Empty from 'components/Empty';

export function RowTableEmpty({title = null, col = 5}) {
  return (
    <TableRow>
      <TableCell colSpan={col} scope='full' align='center'>
        <Empty title={title} />
      </TableCell>
    </TableRow>
  );
}
