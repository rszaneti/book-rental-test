export default interface ICreateBookDTO {
  files_id: string;
  title: string;
  description: string;
  author: string;
  year_edition: number;
  number_edition: number;
  year: number;
  language: string;
  country: string;
  pages: number;
  weight: number;
  lease_value: number;
  status: boolean;
}
