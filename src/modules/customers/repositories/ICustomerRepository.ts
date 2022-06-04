import Customer from '../infra/typeorm/entities/Customer';
import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';
import IFindCustomerDTO from '../dtos/IFindCustomerDTO';

export default interface ICustomerRepository {
  findAllCustomers({
    search_name,
    search_email,
    search_cellphone,
    sort_field,
    sort_order,
    page,
    rowsperpage,
  }: IFindCustomerDTO): Promise<Customer[] | undefined>;
  findTotalAllCustomers({
    search_name,
    search_email,
    search_cellphone,
  }: IFindCustomerDTO): Promise<number>;
  findById(id: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  create(data: ICreateCustomerDTO): Promise<Customer>;
  save(data: Customer): Promise<Customer>;
  updateFile(users_id: string, files_id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
