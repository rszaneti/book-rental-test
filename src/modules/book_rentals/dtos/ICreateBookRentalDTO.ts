export default interface ICreateBookRentalDTO {
  customers_id: string;
  books_id: string;
  withdrawal_date: Date;
  expected_return_date: Date;
  lease_value: number;
  total: number;
}
