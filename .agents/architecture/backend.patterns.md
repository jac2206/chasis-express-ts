# Patrones de implementación

## Flujo HTTP

`route → middlewares → controller → use case → port → adapter`.

La ruta define validación/autorización y documentación. El controlador solo convierte la llamada HTTP en una llamada al caso de uso. El caso de uso aplica reglas y usa puertos. Los adaptadores implementan detalles técnicos.

## Errores de negocio

Declara errores estables en `src/domain/errors/<context>/` con `code`, `message` y `statusCode`. Lánzalos mediante `DomainException`; el middleware global formatea la respuesta. Para conflictos usa normalmente 409; para ausencia 404; para regla de negocio inválida 422. No uses `Error` genérico para una condición esperada.

## Puertos y adaptadores

El contrato describe la necesidad del dominio, por ejemplo `I<Aggregate>Repository`. La implementación PostgreSQL debe vivir en `infraestructure/database/repositories` y mapear entre columnas `snake_case` y campos de dominio. Emplea placeholders `$1`, `$2`, etc.

## Awilix

El proyecto usa inyección clásica: los nombres de parámetros del constructor deben coincidir con las claves de `container.register`. Usa `.scoped()` para casos de uso, controladores y repositorios dependientes de petición; usa `.singleton()` para clientes sin estado como logger, HTTP y servicios de configuración.

## HTTP y seguridad

- Rutas bajo `/chasis/v1`; health bajo `/chasis/health`; Swagger en `/docs`.
- Valida `body`, `params` y `query` con el middleware `validate` antes del controlador.
- Protege rutas con `authenticateJWT` y después `authorizeScopes([...])` cuando corresponda.
- Usa códigos HTTP explícitos y respuestas DTO, nunca hashes o campos internos.

