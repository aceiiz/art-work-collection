export class BasePageList<T> {
  data: T[];
  pagination: Pagination;

  constructor(pageList: BasePageList<T>) {
    if (pageList) {
      this.data = pageList.data || this.data;
      this.pagination = pageList.pagination || this.pagination;
    }
  }
}

export class Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}
