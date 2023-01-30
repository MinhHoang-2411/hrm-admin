import {MenuItem} from '@mui/material';

export const optionsSelect = (list) =>
  Array.isArray(list) &&
  list?.map((item, index) => (
    <MenuItem key={index} value={item?.id || item?.name}>
      {item?.name}
    </MenuItem>
  ));
