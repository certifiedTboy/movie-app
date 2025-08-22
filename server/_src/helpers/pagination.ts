const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_PAGE_LIMIT = 10;

export const getPagination = (query: { page: number; limit: number }) => {
  const page = query.page
    ? Math.round(Math.abs(query.page))
    : DEFAULT_PAGE_NUMBER;

  const limit = query.limit
    ? Math.round(Math.abs(query.limit))
    : DEFAULT_PAGE_LIMIT;

  const offset = (page - 1) * limit;

  return { offset, limit };
};
