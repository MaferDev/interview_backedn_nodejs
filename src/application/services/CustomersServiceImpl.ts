import { inject, injectable } from 'tsyringe';

import { CustomersService } from '../interfaces/services/CustomersService';
import { CustomersRepository } from '../interfaces/repositories/CustomersRepository';
import { Customer } from '../../domain/enties/Customer';

@injectable()
export class CustomersServiceImpl implements CustomersService {
  constructor(
    @inject('CustomersRepository') private repository: CustomersRepository
  ) {}

  async findByFilter(customer: Customer): Promise<Customer[]> {
    return (await this.repository.findByFilter(customer)).map(
      (item) =>
        new Customer({
          ...item,
          email: `${item.name.charAt(0)}${item.lastName}@miblum.com`,
        })
    );
  }
}
