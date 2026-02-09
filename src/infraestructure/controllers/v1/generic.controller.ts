import { GenericResponseDto } from "../../../application/dto/get-generic.dto";
import { IGetGenericUseCase } from "../../../application/use-cases/generic/get-generic.usecase.interfaces";

export class GenericController {
  constructor(
    private readonly getGenericUseCase: IGetGenericUseCase
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
    res.status(201).json(_req.body);
  }
}