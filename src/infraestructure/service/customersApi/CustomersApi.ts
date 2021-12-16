import { injectable } from 'tsyringe';
import { AxiosResponse } from 'axios';
import { Endpoints } from './Endpoints';
import { Customer } from '../../../domain/enties/Customer';
import { CustomersRepository } from '../../../application/interfaces/repositories/CustomersRepository';
import { HttpClient } from '../HttpClient';
import { Constants } from '../../../application/helpers/Constants';

type RandomUser = {
  id: {
    value: string;
  };
  name: {
    first: string;

    last: string;
  };
  phone: string;
};

@injectable()
export class CustomersApi implements CustomersRepository {
  async findByFilter(customer: Customer): Promise<Customer[]> {
    const { getUsers } = Endpoints;

    try {
      const result: AxiosResponse = await HttpClient(Constants.baseUrl).request(
        getUsers(100)
      );
      return result.data.results
        .filter((item: RandomUser) =>
          item.name.first.toLowerCase().startsWith(customer.name.toLowerCase())
        )
        .map(
          (item: RandomUser) =>
            new Customer({
              id: item.id.value,
              name: item.name.first,
              lastName: item.name.last,
              phone: item.phone,
            })
        );
    } catch (error: any) {
      return [];
    }
  }
}
