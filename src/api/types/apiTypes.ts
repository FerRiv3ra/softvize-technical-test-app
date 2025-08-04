export type ApiResponse<T> = {
  statusCode: number;
  message: string;
  data: T;
};

export type PaginatedData<T> = {
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
};

export type LoadingType = 'idle' | 'loading' | 'success' | 'error';

export type ApiPaginatedResponse<T> = ApiResponse<PaginatedData<T>>;

export type Undefinedable<T> = {
  [P in keyof T]?: T[P] | undefined;
};

export type Nullable<T> = {
  [P in keyof T]?: T[P] | null;
};

export type NullableProp<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P];
};
