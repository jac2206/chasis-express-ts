# Instrucciones de implementación backend

## Antes de modificar

1. Localiza una implementación análoga y la prueba correspondiente.
2. Para comportamiento de negocio, redacta/actualiza una spec SDD.
3. Define los errores y los contratos de entrada/salida antes de codificar.

## Lista de cambios para una capacidad nueva

1. Entidad o value object e invariantes en `domain`.
2. Puerto de repositorio/adaptador y contrato del caso de uso en `domain/interfaces`.
3. `DomainErrors` y `DomainException` para fallos previstos.
4. DTOs y caso de uso en `application`.
5. Tests unitarios del caso de uso con dobles tipados.
6. Adaptador/repository y su prueba.
7. Schema Zod, controlador, middlewares y ruta registrada con `registerRoute`.
8. Registro Awilix, montaje de ruta y prueba HTTP con Supertest.
9. Documentación Swagger y comandos de verificación.

## Calidad

- Mantén funciones pequeñas y con una única intención.
- No hagas consultas en controladores ni lógica de negocio en repositorios.
- Mantén los DTOs específicos por caso de uso cuando las formas de entrada/salida difieran.
- Si se necesita una transacción entre repositorios, define primero el límite transaccional y el puerto adecuado; no disperses `BEGIN/COMMIT` en casos de uso.
- Cambios compatibles hacia atrás son preferibles; documenta toda ruptura de contrato en la spec.

