export default interface IFindProductDTO {
  search_title?: string;
  search_author?: string;
  search_year_edition?: number;
  search_number_edition?: number;
  search_year?: number;
  search_language?: string;
  search_country?: string;
  search_status?: string;
  sort_field?: string;
  sort_order?: string;
  page?: number;
  rowsperpage?: number;
}
