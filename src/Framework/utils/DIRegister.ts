import 'reflect-metadata';

import { container } from 'tsyringe';
import { CustomersController } from '../controller/CustomersController';
import { CustomersServiceImpl } from '../../application/services/CustomersServiceImpl';

// import { CustomersRepositoryImpl } from '../../infraestructure/repository/CustomersRepositoryImpl';

import { CustomersApi } from '../../infraestructure/service/customersApi/CustomersApi';

// singletons

// mappers

// services
container.register('CustomersService', CustomersServiceImpl);

// repositories
// container.register('CustomersRepository', CustomersRepositoryImpl);

// controllers
container.register('CustomersController', CustomersController);

// servicios externos
container.register('CustomersRepository', CustomersApi);

export const diContainer = container;
