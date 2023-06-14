import { SortOrder } from 'mongoose';

export type IQuery = {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type IPaginationOptions = {
  page: number;
  limit: number;
  skip: number;
  sort: {
    [key: string]: SortOrder;
  };
};

export type IPaginationGenericResult<T> = {
  data: T | null;
  meta: {
    total: number;
    limit: number;
    page: number;
  };
};
