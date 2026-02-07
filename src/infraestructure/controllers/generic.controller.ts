import { IGetGenericUseCase } from "../../application/use-cases/generic/get-generic.usecase.interfaces";

export class GenericController {
  constructor(
    private readonly getGenericUseCase: IGetGenericUseCase
  ) {}

    getGeneric = async (_req: any, res: any) => {
    const result = await this.getGenericUseCase.execute();
    res.json(result);
  }
}