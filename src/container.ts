import {
  createContainer,
  asClass,
  InjectionMode
} from "awilix";

import { HealthService } from "./service/health.service";
import { HealthController } from "./controller/health.controller";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  healthService: asClass(HealthService).singleton(),
  healthController: asClass(HealthController).scoped()
});
