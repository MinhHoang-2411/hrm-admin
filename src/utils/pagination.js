export const totalPagePagination = (pagination) => {
  const totelPage = Math.ceil(pagination?._totalRows / pagination?._limit) ?? 0;
  return Number(totelPage);
};
