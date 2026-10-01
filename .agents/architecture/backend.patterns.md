# Patrones de implementación

## Flujo HTTP

`route → middlewares → controller → use case → port → adapter`.

La ruta define validación/autorización y documentación. El controlador solo convierte la llamada HTTP en una llamada al caso de uso. El caso de uso aplica reglas y usa puertos. Los adaptadores implementan detalles técnicos.

## Errores de negocio

Declara errores estables en `src/domain/errors/<context>/` con `code`, `message` y `statusCode`. Lánzalos mediante `DomainException`; el middleware global formatea la respuesta. Para conflictos usa normalmente 409; para ausencia 404; para regla de negocio inválida 422. No uses `Error` genérico para una condición esperada.

## Puertos y adaptadores

El contrato describe la necesidad del dominio, por ejemplo `I<Aggregate>Repository`. La implementación debe vivir en `infraestructure/database/repositories` y mapear explícitamente entre persistencia y dominio. Para modelos Prisma, usa `src/infraestructure/database/prisma.ts` y el cliente generado en `src/generated/prisma/`. El repositorio `generic` legacy usa `pg` y debe emplear placeholders `$1`, `$2`, etc.

## Awilix

El proyecto usa inyección clásica: los nombres de parámetros del constructor deben coincidir con las claves de `container.register`. Usa `.scoped()` para casos de uso, controladores y repositorios dependientes de petición; usa `.singleton()` para clientes sin estado como logger, HTTP y servicios de configuración.

## HTTP y seguridad

- Rutas bajo `/chasis/v1`; health bajo `/chasis/health`; Swagger en `/docs`.
- Valida `body`, `params` y `query` con el middleware `validate` antes del controlador.
- Protege rutas con `authenticateJWT` y después `authorizeScopes([...])` cuando corresponda.
- Usa códigos HTTP explícitos y respuestas DTO, nunca hashes o campos internos.

## Prisma y migraciones

- Mantén los modelos en `prisma/models/*.prisma` y el generador/datasource en `prisma/schema.prisma`.
- Revisa `prisma.config.ts` antes de ejecutar comandos; allí se definen la ruta del schema, migraciones y `DATABASE_URL`.
- Después de cambiar un modelo ejecuta `npm run prisma:validate`, crea/aplica una migración con `npm run prisma:migrate -- --name <nombre>` y regenera con `npm run prisma:generate`.
- Versiona las migraciones de `prisma/migrations/`. No edites `src/generated/prisma/` manualmente.
- `prisma:reset` es únicamente para desarrollo y borra datos; nunca lo uses en producción.

