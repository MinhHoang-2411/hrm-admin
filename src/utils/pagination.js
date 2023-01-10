export const totalPagePagination = (pagination) => {
  const totelPage = Math.ceil(pagination?.totalCount / pagination?.size);
  if (isNaN(totelPage)) return 0;
  return Number(totelPage ?? 0);
};

export const fetchMoreCondition = (page, pagination, params) => {
  return page + 1 < pagination?.totalCount / params?.size;
};
