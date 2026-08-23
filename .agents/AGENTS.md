# Guía de agentes — Chasis Express TS

Este repositorio es un chasis reutilizable para backends. Usa TypeScript estricto, Express 5, DDD, arquitectura hexagonal, Awilix, PostgreSQL, Zod/OpenAPI y Vitest.

## Orden obligatorio de trabajo (SDD)

1. Lee `.agents/context.md`, la arquitectura y el patrón aplicable.
2. Para cambios de negocio, crea o actualiza primero una especificación en `.agents/specs/`.
3. Define el comportamiento verificable: reglas, casos límite, contrato HTTP y errores.
4. Escribe o actualiza las pruebas que demuestren la especificación.
5. Implementa de dentro hacia fuera: dominio → aplicación → infraestructura → composición HTTP.
6. Actualiza Swagger en el mismo cambio que la ruta y ejecuta las verificaciones requeridas.

No inventes reglas de negocio, estados, vigencias, cálculos, límites ni reversos: documenta la decisión en la especificación y solicita definición si cambia el negocio.

## Reglas no negociables

- `domain` no importa Express, `pg`, Zod, Awilix, Axios, Winston ni variables de entorno.
- Los puertos pertenecen al dominio; sus implementaciones pertenecen a infraestructura.
- Un caso de uso orquesta una intención de negocio y depende de interfaces, nunca de repositorios concretos.
- Las entidades protegen invariantes; los DTOs exponen datos de entrada/salida, no entidades ni filas SQL.
- Los controladores son delgados: reciben HTTP, llaman un caso de uso y devuelven el estado correspondiente.
- Todas las rutas públicas se registran mediante `registerRoute` con schemas Zod para mantener OpenAPI sincronizado. Al modernizar rutas existentes, llévalas a este patrón.
- Usa `DomainErrors` + `DomainException` para errores previstos. No filtres detalles de SQL, tokens, hashes ni errores internos.
- Obtén dependencias del contenedor por el nombre acordado y registra cualquier dependencia nueva en `src/config/container.ts`.
- Conserva el directorio existente `src/infraestructure` (incluida su ortografía) para no introducir árboles paralelos.
- No uses `any` en código nuevo; tipa entradas, resultados, errores y `Request` enriquecidos.
- Las consultas SQL deben estar parametrizadas y mapear filas a entidades explícitamente.
- Nunca registres contraseñas, JWTs, secretos, PII innecesaria ni el contenido completo de errores externos.

## Comandos de verificación

```bash
npm run build
npm run test:run
npm run test:coverage
npm run mutation
```

Para cambios normales ejecuta como mínimo `npm run build` y `npm run test:run`. Ejecuta cobertura o mutación cuando el cambio toque reglas críticas, seguridad o lógica de cálculo.

## Lectura dirigida

- Contexto del repositorio: `.agents/context.md`
- Diseño de capas: `.agents/architecture/backend.architecture.md`
- Patrones concretos: `.agents/architecture/backend.patterns.md`
- Reglas de implementación: `.agents/instructions/backend.instructions.md`
- Contratos OpenAPI: `.agents/instructions/swagger.instructions.md`
- Pruebas: `.agents/testing/strategy.md` y `.agents/testing/patterns.md`
- Habilidades de trabajo: `.agents/skills/`
- Especificaciones de negocio: `.agents/specs/`

