import { SortOrder, SortValues } from 'mongoose';
import { IPaginationOptions, IQuery } from '../../interfaces/pagination';

const preparePaginationOptions = (options: IQuery): IPaginationOptions => {
  const page: number = options.page ? parseInt(options.page) : 1;
  const limit: number = options.limit ? parseInt(options.limit) : 10;
  const skip: number = (page - 1) * limit;

  const sortBy: string = options.sortBy ? options.sortBy : 'createdAt';
  const sortOrder: SortOrder = options.sortOrder
    ? (options.sortOrder as SortValues)
    : 'desc';

  const paginationOptions = {
    page,
    limit,
    skip,
    sort: {
      [sortBy]: sortOrder,
    },
  };

  return paginationOptions;
};

export default preparePaginationOptions;
