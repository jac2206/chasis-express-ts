import { createContainer, asClass, InjectionMode } from "awilix";

import { HealthService } from "../infraestructure/services/health.service";
import { HealthController } from "../infraestructure/controllers/health.controller";
import { GenericController } from "../infraestructure/controllers/v1/generic.controller";
import { GetGenericUseCase } from "../application/use-cases/generic/get-generic.usecase";
import { CreateGenericUseCase } from "../application/use-cases/generic/create-generic.usecase";
import { UpdateGenericUseCase } from "../application/use-cases/generic/update-generic.usecase";
import { WinstonLogger } from "../infraestructure/logger/wiston.logger";
import { JwtAuthService } from "../infraestructure/security/jwt-auth.service";
import { GenericRepository } from "../infraestructure/database/repositories/generic.repository";
import { GetXIdGenericUseCase } from "../application/use-cases/generic/getxid-generic.usecase";
import { HttpClient } from "../infraestructure/http/http-client";
import { GetPokemonXNameUseCase } from "../application/use-cases/generic/get-pokemonxname.usecase";
import { PokeApiAdapter } from "../infraestructure/adapters/poke-api.adapter";
import { LoginUserUseCase } from "../application/use-cases/users/login-user.usecase";
import { RegisterUserUseCase } from "../application/use-cases/users/register-user.usecase";
import { GetMeUseCase } from "../application/use-cases/users/get-me-user.usecase";
import { GetAllUsersUseCase } from "../application/use-cases/users/get-all-users.usecase";
import { UsersController } from "../infraestructure/controllers/v1/users.controller";
import { UserRepository } from "../infraestructure/database/repositories/user.repository";
import { UserPrismaRepository } from "../infraestructure/database/repositories/user-prisma.repository";
import { RefreshTokenUseCase } from "../application/use-cases/users/refresh-token.usecase";
import { ClientCredentialsUseCase } from "../application/use-cases/auth/client-credentials.usecase";
import { AuthController } from "../infraestructure/controllers/v1/auth.controller";
import { ServiceClientPrismaRepository } from "../infraestructure/database/repositories/service-client-prisma.repository";
import { ManageServiceClientUseCase } from "../application/use-cases/auth/manage-service-client.usecase";

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});

container.register({
  // Use cases
  getGenericUseCase: asClass(GetGenericUseCase).scoped(),
  createGenericUseCase: asClass(CreateGenericUseCase).scoped(),
  updateGenericUseCase: asClass(UpdateGenericUseCase).scoped(),
  getXIdGenericUseCase: asClass(GetXIdGenericUseCase).scoped(),
  getPokemonXNameUseCase: asClass(GetPokemonXNameUseCase).scoped(),
  loginUserUseCase: asClass(LoginUserUseCase).scoped(),
  registerUserUseCase: asClass(RegisterUserUseCase).scoped(),
  getMeUseCase: asClass(GetMeUseCase).scoped(),
  getAllUsersUseCase: asClass(GetAllUsersUseCase).scoped(),
  refreshTokenUseCase: asClass(RefreshTokenUseCase).scoped(),
  clientCredentialsUseCase: asClass(ClientCredentialsUseCase).scoped(),
  manageServiceClientUseCase: asClass(ManageServiceClientUseCase).scoped(),

  // Services
  healthService: asClass(HealthService).singleton(),
  authService: asClass(JwtAuthService).singleton(),

  // Adapter
  pokeApiAdapter: asClass(PokeApiAdapter).singleton(),

  // Controllers
  healthController: asClass(HealthController).scoped(),
  genericController: asClass(GenericController).scoped(),
  usersController: asClass(UsersController).scoped(),
  authController: asClass(AuthController).scoped(),

  httpClient: asClass(HttpClient).singleton(),
});

container.register({
  logger: asClass(WinstonLogger).singleton(),
});

container.register({
  genericRepository: asClass(GenericRepository).scoped(),
  // userRepository: asClass(UserRepository).scoped(),
  userRepository: asClass(UserPrismaRepository).scoped(),
  serviceClientRepository: asClass(ServiceClientPrismaRepository).scoped(),
});
