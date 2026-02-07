import { describe, it, expect } from "vitest";
import { GetGenericUseCase } from "../../../../src/application/use-cases/generic/get-generic.usecase";

describe("GetGenericUseCase", () => {
  it("should return a Generic entity with expected data", async () => {
    // Arrange
    const useCase = new GetGenericUseCase();

    // Act
    const result = await useCase.execute();

    // Assert
    expect(result).toBeDefined();
    expect(result.toPrimitives()).toEqual({
      nombre: "Julian",
      apellido: "Arango",
      edad: 30
    });
  });
});
