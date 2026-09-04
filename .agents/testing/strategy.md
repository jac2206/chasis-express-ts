# Estrategia de pruebas

## Pirámide

| Nivel | Objetivo | Herramientas |
| --- | --- | --- |
| Dominio/aplicación | Reglas, invariantes, errores y orquestación | Vitest + dobles |
| Infraestructura | SQL mapeado, HTTP client, JWT, adaptadores | Vitest + mocks del borde |
| HTTP | Ruta, validación, auth, scope, respuesta y error | Vitest + Supertest |

Todo criterio de aceptación de una spec debe poder rastrearse a una o más pruebas. Prioriza pruebas de caso de uso para acumulación/redención: saldo insuficiente, monto inválido, duplicado/idempotencia, expiración, reverso y concurrencia, según lo que la spec determine.

## Cobertura

La configuración excluye deliberadamente composición, interfaces, entidades y rutas de las métricas. La exclusión no elimina la necesidad de probarlas cuando haya comportamiento. No persigas porcentaje por sí solo: cubre decisiones y resultados observables.

