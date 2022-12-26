export const totalPagePagination = (pagination) => {
  const totelPage = Math.ceil(pagination?.totalCount / pagination?.size);
  if (isNaN(totelPage)) return 0;
  return Number(totelPage ?? 0);
};
