import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../CustomersController';
import { CustomersService } from '../../../application/interfaces/services/CustomersService';

describe('CustomersController', () => {
  describe('findByFilter', () => {
    it('should return customers', async () => {
      // Prepare
      const service = {
        findByFilter: jest.fn(() =>
          Promise.resolve([
            {
              id: 'customerId',
              name: 'name',
              lastName: 'lastName',
              email: 'email',
            },
          ])
        ),
      } as unknown as CustomersService;

      const controller = new CustomersController(service);

      // Execute
      const response = await controller.findByFilter({
        httpMethod: 'GET',
        resource: '/customers',
        queryStringParameters: {
          name: 'A',
        },
      } as unknown as APIGatewayProxyEvent);

      // Validate
      expect(response).toEqual([
        {
          id: 'customerId',
          name: 'name',
          lastName: 'lastName',
          email: 'email',
        },
      ]);
      expect(service.findByFilter).toBeCalledWith({
        name: 'A',
      });
    });
  });
});