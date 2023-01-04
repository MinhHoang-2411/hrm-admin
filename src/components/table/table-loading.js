import {TableBody, TableCell, TableRow} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function TableLoading({col = 10}) {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={col} align='left' sx={{borderBottom: 'unset'}}>
          <Skeleton sx={{width: '100%'}} animation='wave' />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={col} align='left' sx={{borderBottom: 'unset'}}>
          <Skeleton sx={{width: '100%'}} animation='wave' />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={col} align='left' sx={{borderBottom: 'unset'}}>
          <Skeleton sx={{width: '100%'}} animation='wave' />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={col} align='left' sx={{borderBottom: 'unset'}}>
          <Skeleton sx={{width: '100%'}} animation='wave' />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={col} align='left' sx={{borderBottom: 'unset'}}>
          <Skeleton sx={{width: '100%'}} animation='wave' />
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
