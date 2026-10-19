import type { Request, Response } from "express";
import type {
  ClientCredentialsRequestDTO,
  ClientCredentialsResponseDTO,
} from "../../../application/dto/client-credentials.dto";
import type { LoginUserResponseDTO } from "../../../application/dto/login-user.dto";
import type { RefreshTokenResponseDTO } from "../../../application/dto/refresh-token.dto";
import type { IClientCredentialsUseCase } from "../../../domain/interfaces/use-cases/auth/client-credentials.usecase.interface";
import type { ILoginUserUseCase } from "../../../domain/interfaces/use-cases/users/login-user.usecase.interface";
import type { IRefreshTokenUseCase } from "../../../domain/interfaces/use-cases/users/refresh-token.usecase.interface";
import type { IManageServiceClientUseCase } from "../../../domain/interfaces/use-cases/auth/manage-service-client.usecase.interface";
import type {
  CreateServiceClientResponseDTO,
  RotateServiceClientResponseDTO,
  ServiceClientStatusResponseDTO,
} from "../../../application/dto/service-client.dto";

export class AuthController {
  constructor(
    private readonly loginUserUseCase: ILoginUserUseCase,
    private readonly refreshTokenUseCase: IRefreshTokenUseCase,
    private readonly clientCredentialsUseCase: IClientCredentialsUseCase,
    private readonly manageServiceClientUseCase: IManageServiceClientUseCase,
  ) {}

  login = async (req: Request, res: Response<LoginUserResponseDTO>): Promise<void> => {
    res.status(200).json(await this.loginUserUseCase.execute(req.body));
  };

  refresh = async (
    req: Request,
    res: Response<RefreshTokenResponseDTO>,
  ): Promise<void> => {
    res.status(200).json(await this.refreshTokenUseCase.execute(req.body));
  };

  clientCredentials = async (
    req: Request,
    res: Response<ClientCredentialsResponseDTO>,
  ): Promise<void> => {
    const data: ClientCredentialsRequestDTO = req.body;
    res.status(200).json(await this.clientCredentialsUseCase.execute(data));
  };

  createServiceClient = async (
    req: Request,
    res: Response<CreateServiceClientResponseDTO>,
  ): Promise<void> => {
    res.status(201).json(await this.manageServiceClientUseCase.create(req.body));
  };

  rotateServiceClientSecret = async (
    req: Request,
    res: Response<RotateServiceClientResponseDTO>,
  ): Promise<void> => {
    const clientId = getClientId(req);
    res.status(200).json(await this.manageServiceClientUseCase.rotateSecret(clientId));
  };

  disableServiceClient = async (
    req: Request,
    res: Response<ServiceClientStatusResponseDTO>,
  ): Promise<void> => {
    const clientId = getClientId(req);
    res.status(200).json(await this.manageServiceClientUseCase.disable(clientId));
  };
}

const getClientId = (req: Request): string => {
  const { clientId } = req.params;
  return Array.isArray(clientId) ? clientId[0] : clientId;
};
