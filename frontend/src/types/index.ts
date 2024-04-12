export interface QueryOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export interface InfinitePaginatorInfo<T> {
  pageParams: Array<{ page: number }>;
  pages: Array<{
    data: T[];
    meta: {
      total: number;
      lastPage: number;
      currentPage: number;
      perPage: number;
      prev: number | null;
      next: number | null;
    };
  }>;
}

export interface IQueryResultInfo<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export interface PaginatorInfo<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export interface TUseQueryListResult<T> {
  data: T[];
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  isLoadingMore: boolean;
  loadMore: () => void;
  hasMore: boolean;
}

export interface TUseQueryOneResult<T> {
  data?: T;
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
}
