import 'reflect-metadata';
import 'source-map-support/register';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersController } from '../Framework/controller/CustomersController';
import { diContainer } from '../Framework/utils/DIRegister';

export const customersHandler = async (event: APIGatewayProxyEvent) => {
  const customersController: CustomersController = diContainer.resolve(
    'CustomersController'
  );
  if (event.resource === '/customers' && event.httpMethod === 'GET') {
    return customersController.findByFilter(event);
  }
  return customersController.apiResponseBadRequestError();
};
