# Patrones de pruebas

```ts
const repository: IUserRepository = {
  findByEmail: vi.fn().mockResolvedValue(null),
  save: vi.fn().mockImplementation(async (user) => user),
  findByDocument: vi.fn(),
  findAll: vi.fn()
};

const useCase = new RegisterUserUseCase(repository);
await expect(useCase.execute(input)).resolves.toMatchObject({ email: input.email });
expect(repository.save).toHaveBeenCalledOnce();
```

- Una prueba debe expresar una decisión de negocio o contrato.
- Prueba código, estado HTTP y cuerpo de los errores de dominio relevantes.
- Evita mocks que reproduzcan la misma implementación; modela el resultado del puerto.
- No conectes servicios reales en pruebas unitarias.
- Al probar autenticación y scopes, cubre éxito, falta de token, token inválido y scope insuficiente.

