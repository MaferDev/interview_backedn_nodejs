import { Customer } from '../../../domain/enties/Customer';

export interface CustomersService {
  findByFilter(customer: Customer): Promise<Customer[]>;
}
