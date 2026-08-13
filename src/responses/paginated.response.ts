export interface Pagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface PaginatedResponse<T> {
    pagination: Pagination;
    items: T[];
}