export interface PaginationParams {
  _page: number;
  _limit: number;
  _totalRecords: number;
}

export interface ListResponse<T> {
  status?: string;
  message?: string;
  data: T[];
  pagination: PaginationParams;
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface DataResponse<T> {
  status?: string;
  message?: string;
  data: T;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
