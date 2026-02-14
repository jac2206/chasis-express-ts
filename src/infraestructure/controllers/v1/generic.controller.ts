import { GenericResponseDto, GenericRequestDto } from "../../../application/dto/get-generic.dto";
import { IGetGenericUseCase } from "../../../domain/interfaces/use-cases/get-generic.usecase.interfaces";
import { ICreateGenericUseCase } from "../../../domain/interfaces/use-cases/create-generic.usecase.interface";

export class GenericController {
  constructor(
    private readonly getGenericUseCase: IGetGenericUseCase,
    private readonly createGenericUseCase: ICreateGenericUseCase
  ) {}

  getGeneric = async (_req: any, res: any) => {
    const result = await this.getGenericUseCase.execute();
    const response: GenericResponseDto = {
      name: result.name as string,
      lastName: result.lastName,
      age: result.age
    };
    res.status(200).json(response);
  }

  postGeneric = async (_req: any, res: any) => {
    const request = _req.body as GenericRequestDto;
    const result = await this.createGenericUseCase.execute(request);
    res.status(200).json(result);
  }

  patchGeneric = async (_req: any, res: any) => {
    const request = _req.body as GenericRequestDto;
    const id = _req.params.id;
    res.status(200).json({ message: "PATCH request received", id, request });
  }

}