import { Customer } from '../../../domain/enties/Customer';

export interface CustomersRepository {
  findByFilter(customer: Customer): Promise<Customer[]>;
}
