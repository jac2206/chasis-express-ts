# Guía de agentes — Chasis Express TS

Este repositorio es un chasis reutilizable para backends. Usa TypeScript estricto, Express 5, DDD, arquitectura hexagonal, Awilix, Prisma 7 sobre PostgreSQL, Zod/OpenAPI, JWT, Winston, Vitest, Biome, Docker y Floci.

## Orden obligatorio de trabajo (SDD)

1. Lee `README.md`, `.agents/context.md`, la arquitectura y el patrón aplicable.
2. Para cambios de negocio, crea o actualiza primero una especificación en `.agents/specs/`.
3. Define el comportamiento verificable: reglas, casos límite, contrato HTTP y errores.
4. Escribe o actualiza las pruebas que demuestren la especificación.
5. Implementa de dentro hacia fuera: dominio → aplicación → infraestructura → composición HTTP.
6. Si cambia persistencia Prisma, actualiza modelo, migración y cliente generado mediante los comandos documentados.
7. Actualiza Swagger en el mismo cambio que la ruta y ejecuta las verificaciones requeridas.

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
- Respeta `.gitattributes` y `.editorconfig`: usa UTF-8, finales de línea LF y no conviertas archivos a CRLF manualmente.
- No uses `any` en código nuevo; tipa entradas, resultados, errores y `Request` enriquecidos.
- Los modelos Prisma viven en `prisma/models/`; `src/generated/prisma/` es generado y no se edita manualmente.
- Los repositorios Prisma mapean explícitamente entre modelos Prisma y entidades de dominio. El repositorio `generic` legacy que usa `pg` debe parametrizar SQL con `$1`, `$2`, etc.
- Nunca registres contraseñas, JWTs, secretos, PII innecesaria ni el contenido completo de errores externos.

## Comandos de verificación

```bash
npm run build
npm run test:run
npm run test:coverage
npm run mutation
npm run prisma:validate
npm run prisma:generate
```

Para cambios normales ejecuta como mínimo `npm run build` y `npm run test:run`. Si cambia Prisma, ejecuta también `npm run prisma:validate` y `npm run prisma:generate`. Ejecuta cobertura o mutación cuando el cambio toque reglas críticas, seguridad o lógica de cálculo. No ejecutes `prisma:reset` salvo que el usuario lo solicite explícitamente.

## Lectura dirigida

- Contexto del repositorio: `.agents/context.md`
- Diseño de capas: `.agents/architecture/backend.architecture.md`
- Patrones concretos: `.agents/architecture/backend.patterns.md`
- Reglas de implementación: `.agents/instructions/backend.instructions.md`
- Contratos OpenAPI: `.agents/instructions/swagger.instructions.md`
- Pruebas: `.agents/testing/strategy.md` y `.agents/testing/patterns.md`
- Habilidades de trabajo: `.agents/skills/`
- Especificaciones de negocio: `.agents/specs/`

