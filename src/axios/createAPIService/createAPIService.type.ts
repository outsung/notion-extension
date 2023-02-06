export interface BaseListQueryParams {
  page?: number; // 1;
  limit?: number; // 10;
  sort?: 'createdAt' | 'updatedAt' | 'id'; // createdAt;
  dir?: 'ASC' | 'DESC'; // desc
}

export interface BaseListResponse<T> {
  count: number;
  rows: T[];
}
