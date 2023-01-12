import _ from 'lodash';
export const checkAllCondition = (data, listChecked) => {
  return data?.length > 0 && data?.every((item) => listChecked?.includes(item?.id));
};
export const handleCheckAll = (data, listChecked, setListChecked) => {
  if (checkAllCondition(data, listChecked)) {
    setListChecked(listChecked.filter((id) => !data?.map((item) => item?.id)?.includes(id)));
  } else setListChecked(_.uniq([...listChecked, ...data?.map((item) => item?.id)]));
};
