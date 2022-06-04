export default interface IFindCustomerDTO {
  search_name?: string;
  search_email?: string;
  search_cellphone?: string;
  sort_field?: string;
  sort_order?: string;
  page?: number;
  rowsperpage?: number;
}
