export default interface IFindBookRentalDTO {
  search_customers?: string;
  search_books?: string;
  search_withdrawal_date_start?: string;
  search_withdrawal_date_end?: string;
  search_return_date_start?: string;
  search_return_date_end?: string;
  select_only_withdrawn_books?: string;
  select_only_returned_books?: string;
  sort_field?: string;
  sort_order?: string;
  page?: number;
  rowsperpage?: number;
}
