export default interface IFindUserDTO {
  search_username?: string;
  search_name?: string;
  sort_field?: string;
  sort_order?: string;
  page?: number;
  rowsperpage?: number;
}
