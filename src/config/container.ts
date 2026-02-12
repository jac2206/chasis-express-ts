import {
  createContainer,
  asClass,
  InjectionMode
} from "awilix";

import { HealthService } from "../infraestructure/service/health.service";
import { HealthController } from "../infraestructure/controllers/health.controller";
import { GenericController } from "../infraestructure/controllers/v1/generic.controller";
import { GetGenericUseCase } from "../application/use-cases/generic/get-generic.usecase";
import { CreateGenericUseCase } from "../application/use-cases/generic/create-generic.usecase";
import { create } from "node:domain";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  // Use cases
  getGenericUseCase: asClass(GetGenericUseCase).scoped(),
  createGenericUseCase: asClass(CreateGenericUseCase).scoped(),
  // Services
  healthService: asClass(HealthService).singleton(),

  // Controllers
  healthController: asClass(HealthController).scoped(),
  genericController: asClass(GenericController).scoped()
});
