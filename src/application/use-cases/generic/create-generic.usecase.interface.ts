import {GenericRequestDto, GenericResponseDto} from '../../dto/get-generic.dto'

export interface ICreateGenericUseCase{
    execute(genericRequest: GenericRequestDto): Promise<GenericResponseDto>
}