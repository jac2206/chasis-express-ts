# Contexto del chasis

## Propósito

API base reutilizable para distintos dominios de negocio. El código actual contiene módulos de ejemplo `generic`, usuarios/autenticación, health y un adaptador externo; los módulos del producto se agregan siguiendo las convenciones de este chasis.

## Stack real

| Área | Decisión actual |
| --- | --- |
| Runtime | Node.js + TypeScript 5, modo estricto |
| HTTP | Express 5; prefijo `/chasis`; versión `/v1` |
| DI | Awilix, `InjectionMode.CLASSIC`, scope por petición |
| Persistencia | PostgreSQL con `pg`; el esquema se define según el producto |
| Validación y docs | Zod + `@asteasolutions/zod-to-openapi`; Swagger UI en `/docs` |
| Seguridad | JWT y scopes mediante middlewares |
| Observabilidad | Winston |
| Pruebas | Vitest, Supertest, cobertura V8 y Stryker |

## Árbol de código

```text
src/
  domain/           Entidades, errores, excepciones y puertos
  application/      DTOs y casos de uso
  infraestructure/  Adaptadores: HTTP, DB, seguridad, logger, docs y servicios
  config/           Entorno y composición Awilix
  server.ts         Ensamblaje de Express
  main.ts           Bootstrap y apagado
test/               Espejo de pruebas por capa
```

## Convenciones vigentes

- Nombres de archivos: `kebab-case`, con sufijos `.entity.ts`, `.usecase.ts`, `.interface.ts`, `.repository.ts`, `.controller.ts`, `.schema.ts` y `.spec.ts`.
- Los casos de uso exponen `execute(...)` y sus contratos están en `src/domain/interfaces/use-cases/`.
- Los repositorios reciben/devuelven entidades de dominio, no DTOs HTTP.
- El middleware global convierte `DomainException` a `{ code, message }`; la validación Zod responde 422 con `VALIDATION_ERROR`.
- Las rutas de usuarios ya son la referencia completa de validación + documentación con `registerRoute`.

## Límites y decisiones pendientes

- Las reglas del producto no forman parte del chasis: cada agregado nuevo debe tener una especificación antes de implementarse.
- No asumir unidades, fórmulas, vigencias, idempotencia ni políticas de reverso sin especificación aprobada.
- `JWT_SECRET` tiene fallback para desarrollo actual; en producción debe estar configurado de forma explícita y segura.

