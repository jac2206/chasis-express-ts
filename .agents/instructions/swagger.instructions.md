# Instrucciones de Swagger y contratos HTTP

Swagger se genera en runtime desde Zod/OpenAPI; no existe un archivo OpenAPI estático que editar.

- Define request, params, query y response schemas en `src/infraestructure/schemas/`.
- Añade `.openapi({ example: ... })` a inputs que requieran una guía usable.
- Registra rutas por `registerRoute`, completando método, `path`, `swaggerPath`, tag, schemas, handler, seguridad y respuestas particulares.
- `swaggerPath` omite el prefijo `/chasis` y conserva los parámetros como `{id}`.
- Las rutas con JWT deben indicar `isProtected: true` y aplicar los middlewares reales.
- Añade 201/202/204/404/409 cuando el comportamiento lo requiera mediante `customResponses`; el builder aporta 400, 401, 422 y 500 por defecto.
- Confirma que los schemas de respuesta reflejen exactamente el JSON de los controladores y no revelen secretos.
- Revisa manualmente `/docs` al añadir o cambiar endpoints.

