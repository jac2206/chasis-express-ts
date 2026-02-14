import { describe, it, expect } from "vitest";
import { CreateGenericUseCase } from "../../../../src/application/use-cases/generic/create-generic.usecase";

describe("CreateGenericUseCase", () => {
  it("should return a Create Generic entity with expected data", async () => {
    // Arrange
    const useCase = new CreateGenericUseCase();
    const user = {
        name: "Julian",
        lastName: "Arango",
        age: 32
    }

    // Act
    const result = await useCase.execute(user);

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual({
      name: "Julian",
      lastName: "Arango",
      age: 32
    });
  });
});
