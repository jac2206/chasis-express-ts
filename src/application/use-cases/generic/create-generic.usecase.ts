import { GenericRequestDto, GenericResponseDto } from "../../dto/get-generic.dto";
import { ICreateGenericUseCase } from "./create-generic.usecase.interface";

export class CreateGenericUseCase implements ICreateGenericUseCase{
    constructor(){
    }

    async execute(genericRequest: GenericRequestDto): Promise<GenericResponseDto> {
        const response = {
            name: genericRequest.name,
            lastName: genericRequest.lastName,
            age: genericRequest.age
        } as GenericResponseDto;
        return response;
    }
}