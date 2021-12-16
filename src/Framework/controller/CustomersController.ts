import { inject, injectable } from 'tsyringe';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomersService } from '../../application/interfaces/services/CustomersService';
import { Customer } from '../../domain/enties/Customer';
import { ServiceStatus } from '../../domain/enumerations/ServiceStatus';

@injectable()
export class CustomersController {
  constructor(@inject('CustomersService') private service: CustomersService) {}

  async findByFilter(event: APIGatewayProxyEvent) {
    if (!event.queryStringParameters?.name) {
      return this.apiResponseBadRequestError();
    }
    const { name } = event.queryStringParameters;

    return this.service.findByFilter(new Customer({ name }))
    // return this.apiResponseSuccessRequest(
    //   await this.service.findByFilter(new Customer({ name }))
    // );
  }

  apiResponseBadRequestError() {
    return {
      statusCode: ServiceStatus.NotFound,
      isBase64Encoded: false,
    };
  }

  apiResponseSuccessRequest(list: Customer[]) {
    return {
      statusCode: ServiceStatus.Ok,
      body: list,
      isBase64Encoded: false,
    };
  }
}
