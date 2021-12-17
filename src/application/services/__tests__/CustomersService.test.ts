import 'reflect-metadata'
import { container } from 'tsyringe';
import { CustomersServiceImpl } from '../CustomersServiceImpl';
import { Customer } from '../../../domain/enties/Customer';
import { CustomersRepository } from '../../interfaces/repositories/CustomersRepository';

describe('CustomersServiceImpl', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const repository = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
            },
          ])
        ),
      } as unknown as CustomersRepository;

      container.register<CustomersRepository>("CustomersRepository", {useValue: repository});
      const service = container.createChildContainer().resolve(CustomersServiceImpl);

      // Execute
      const response = await service.findByFilter(new Customer({ name: 'A' }));

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'nlastName@miblum.com',
        },
      ]);
      expect(repository.findByFilter).toBeCalledWith({
        name: 'A',
      });
      
      //Clear container
      container.clearInstances()
    });
  });
});
