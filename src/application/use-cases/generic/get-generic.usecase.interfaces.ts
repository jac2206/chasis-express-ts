import { Generic } from "../../../domain/entities/generic.entity";

// export interface IGenericUseCase<Input, Output> {
//   execute(input: Input): Promise<Output>;

export interface IGetGenericUseCase {
  execute(): Promise<Generic>;
}
