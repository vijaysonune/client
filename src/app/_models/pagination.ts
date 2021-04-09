export interface Pagination {
    currentPage : number;
    itmesPerPage : number;
    totalPages : number;
    totalItems : number;
}

export class PaginationResult<T>
{
    result : T;
    pagination : Pagination;
}