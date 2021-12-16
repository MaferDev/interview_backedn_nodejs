import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../service/CustomersService';
import { Customer } from '../domain/Customer';

export class CustomersController {
  constructor(private service: CustomersService) {}

  findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return this.apiResponseBadRequestError();
    }
    const { name } = event.queryStringParameters;
    
    return this.service.findByFilter(new Customer({ name }))
  }

  apiResponseBadRequestError() {
    return {
      statusCode: 404,
      isBase64Encoded: false,
    };
  }
}
