# 🧱 Express TS Chasis

## 🚀 DDD + Arquitectura Hexagonal + Awilix + Vitest + Biome + Husky + Commitlint + Winston

Backend base profesional construido con:

* Node.js
* Express 5
* TypeScript
* DDD (Domain-Driven Design)
* Arquitectura Hexagonal (Ports & Adapters)
* Awilix (Inyección de dependencias)
* Vitest (Testing + Coverage)
* Biome (Formatting + Linting)
* Husky (Git Hooks)
* Commitlint (Conventional Commits)
* Winston (Logging estructurado)
* Dotenv (Variables de entorno)
* Middleware global de errores

---

# 🧠 1. Arquitectura

Este proyecto implementa:

* 🔹 DDD (Domain-Driven Design)
* 🔹 Arquitectura Hexagonal (Ports & Adapters)
* 🔹 Clean Architecture
* 🔹 Inversión de Dependencias

---

## 🔷 Arquitectura Hexagonal

El dominio está en el centro y define contratos (interfaces).

La infraestructura implementa esos contratos.

```text
        HTTP (Express)
              ↓
         Controller
              ↓
          Use Case
              ↓
           Domain
              ↑
   Repository / Service / Adapter
```

### 📌 Regla Principal

> Las dependencias siempre apuntan hacia el dominio.

---

# 🧱 2. Capas del Proyecto

---

## 🟢 2.1 Domain (Centro del sistema)

Contiene:

* Entidades
* Interfaces (Ports)
* Errores de dominio
* Excepciones personalizadas

❌ No conoce Express
❌ No conoce base de datos
❌ No conoce frameworks

---

### Ejemplo de Entity

```ts
export class Generic {
  constructor(
    private readonly name: string,
    private readonly lastName: string,
    private readonly age: number,
  ) {
    if (age < 0) {
      throw new Error('Age cannot be negative');
    }
  }

  toPersistence() {
    return {
      name: this.name,
      lastName: this.lastName,
      age: this.age,
    };
  }
}
```

---

## 🟢 2.2 Domain Errors

```ts
export const DomainErrors = {
  GENERIC_INVALID_NAME: {
    code: 'GENERIC_INVALID_NAME',
    message: 'Name must have at least 3 characters',
    statusCode: 422,
  },

  GENERIC_NOT_FOUND: {
    code: 'GENERIC_NOT_FOUND',
    message: 'Generic entity not found',
    statusCode: 404,
  },
};
```

---

## 🟢 2.3 Domain Exception

```ts
export class DomainException extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
  }
}
```

---

## 🔵 2.4 Application Layer

Contiene:

* Casos de uso
* DTOs

### Interface

```ts
export interface ICreateGenericUseCase {
  execute(input: GenericRequestDto): Promise<GenericResponseDto>;
}
```

### Use Case con validación

```ts
export class CreateGenericUseCase implements ICreateGenericUseCase {
  async execute(
    input: GenericRequestDto,
  ): Promise<GenericResponseDto> {
    if (!input.name || input.name.trim().length < 3) {
      const error = DomainErrors.GENERIC_INVALID_NAME;

      throw new DomainException(
        error.code,
        error.message,
        error.statusCode,
      );
    }

    return {
      name: input.name,
      lastName: input.lastName,
      age: input.age,
    };
  }
}
```

---

## 🟣 2.5 Infrastructure

Contiene:

* Controllers
* Routes
* Logger
* Database
* Middlewares
* Implementaciones concretas

---

### Controller

```ts
export class GenericController {
  constructor(
    private readonly createGenericUseCase: ICreateGenericUseCase,
  ) {}

  postGeneric = async (req: Request, res: Response) => {
    const result = await this.createGenericUseCase.execute(req.body);

    res.status(201).json(result);
  };
}
```

---

# ⚙️ 3. Middleware Global de Errores

```ts
import { Request, Response, NextFunction } from 'express';
import { DomainException } from '../../domain/exceptions/domain.exception';
import { logger } from '../logger/logger';

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof DomainException) {
    logger.warn('Domain error', {
      code: err.code,
      message: err.message,
    });

    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  logger.error('Unexpected error', err);

  return res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Internal server error',
  });
}
```

Registrar en `server.ts`:

```ts
app.use(errorMiddleware);
```

---

# 🪵 4. Logger con Winston

```ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',

  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),

  transports: [
    new winston.transports.Console(),
  ],
});
```

---

# 🌎 5. Variables de Entorno

### `.env`

```env
PORT=3001
NODE_ENV=local
SHOW_ENV=true

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=generic_db

LOG_LEVEL=info
```

---

### `env.ts`

```ts
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 3000,
  showEnv: process.env.SHOW_ENV === 'true',
};
```

---

# 🧩 6. Inyección de Dependencias – Awilix

```bash
npm install awilix awilix-express
```

### `container.ts`

```ts
import { createContainer, asClass, InjectionMode } from 'awilix';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC,
});
```

---

# 🚀 7. Instalación y Ejecución

## Clonar repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git

cd tu-repo
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Servidor en:

```text
http://localhost:3001
```

---

## Compilar proyecto

```bash
npm run build
```

---

## Ejecutar versión compilada

```bash
npm start
```

---

# 🧪 8. Testing con Vitest

```bash
npm install -D vitest @vitest/coverage-v8 supertest
```

### Ejecutar pruebas

```bash
npm run test
```

### Coverage

```bash
npm run test:coverage
```

---

# 🎨 9. Formateo y calidad de código con Biome

Este proyecto utiliza **Biome** para mantener un estándar consistente de formato y calidad de código.

Biome se utiliza para:

* Formatear código.
* Ejecutar linting.
* Organizar imports.
* Mantener reglas recomendadas para JavaScript y TypeScript.

Biome reemplaza la necesidad de utilizar **Prettier + ESLint** para estas tareas.

---

## 📦 Instalación

```bash
npm install -D @biomejs/biome
```

Inicializar Biome:

```bash
npx @biomejs/biome init
```

Esto genera:

```text
biome.json
```

---

## ⚙️ Configuración

La configuración se encuentra en:

```text
biome.json
```

El estándar definido para el proyecto utiliza:

* 2 espacios de indentación.
* Comillas simples.
* Punto y coma.
* Trailing commas.
* Ancho de línea de 88 caracteres.
* Saltos de línea consistentes.
* Imports organizados automáticamente.
* Linter con reglas recomendadas.
* Finales de línea `LF`.

Biome aplica estas reglas al código JavaScript y TypeScript del proyecto, incluyendo archivos de configuración como `vitest.config.ts`.

No se procesan archivos generados o dependencias como:

```text
node_modules/
dist/
coverage/
.git/
```

---

## 🧹 Formatear código

Para formatear todo el proyecto:

```bash
npm run format
```

Script:

```json
{
  "format": "biome format --write ."
}
```

Este comando modifica automáticamente los archivos necesarios para cumplir las reglas de formato.

---

## 🔍 Validar código

Para validar formato y linting:

```bash
npm run check
```

Script:

```json
{
  "check": "biome check ."
}
```

Este comando valida el código sin modificarlo.

---

# 🪝 10. Git Hooks con Husky

El proyecto utiliza **Husky** para automatizar validaciones durante el proceso de commit.

Husky permite ejecutar comandos automáticamente antes de crear un commit y validar el mensaje del commit.

---

## 📦 Instalación

```bash
npm install -D husky
```

Inicializar Husky:

```bash
npx husky init
```

La estructura será:

```text
.husky/
├── pre-commit
└── commit-msg
```

---

## 🔍 Pre-commit

Archivo:

```text
.husky/pre-commit
```

Contenido:

```sh
#!/usr/bin/env sh

npm run format
```

Cada vez que se realiza un commit:

```bash
git commit
```

Husky ejecuta:

1. `npm run format`

De esta manera:

* Biome formatea automáticamente el código.
* Biome ejecuta el linting.
* Si existen errores, el commit se detiene.

### Flujo

```text
git commit
    ↓
pre-commit
    ↓
npm run format
    ↓
npm run check
    ↓
Biome
    ↓
¿Errores?
 ┌──┴──┐
No    Sí
 ↓     ↓
Continúa  ❌ Commit detenido
```

Los tests no se ejecutan automáticamente en cada commit. Se recomienda ejecutarlos mediante CI/CD o antes de crear un Pull Request.

---

# 📝 11. Conventional Commits con Commitlint

El proyecto utiliza **Commitlint** para garantizar que todos los commits sigan el estándar **Conventional Commits**.

---

## 📦 Instalación

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

---

## ⚙️ Configuración

Archivo:

```text
commitlint.config.json
```

Contenido:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

---

## 🪝 Commit-msg

Archivo:

```text
.husky/commit-msg
```

Contenido:

```sh
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

Este hook valida el mensaje del commit antes de permitir que se cree.

---

## ✅ Commits válidos

```bash
git commit -m "feat: add generic module"

git commit -m "fix: resolve generic validation"

git commit -m "refactor: improve generic repository"

git commit -m "test: add generic use case tests"

git commit -m "docs: update project documentation"

git commit -m "chore: update dependencies"
```

---

## ❌ Commits inválidos

```bash
git commit -m "crear generic"

git commit -m "feat add generic"

git commit -m "feat : add generic"
```

El formato correcto es:

```text
type: description
```

Ejemplo:

```text
feat: add generic module
```

No debe existir un espacio entre el tipo y `:`.

---

# 🔄 12. Flujo completo de Git

Al ejecutar:

```bash
git commit -m "feat: add biome configuration"
```

se ejecuta:

```text
                    git commit
                         ↓
                ┌────────────────┐
                │   pre-commit   │
                └───────┬────────┘
                        ↓
                 npm run format
                        ↓
                  npm run check
                        ↓
                      Biome
                        ↓
                ┌────────────────┐
                │   commit-msg   │
                └───────┬────────┘
                        ↓
                    Commitlint
                        ↓
              Conventional Commits
                        ↓
                     ✅ Commit
```

Si Biome encuentra errores o Commitlint detecta un mensaje inválido, el commit no se crea.

---

# 📂 13. Estructura del Proyecto

```text
src
├── application
├── domain
│   ├── entities
│   ├── interfaces
│   ├── errors
│   └── exceptions
├── infraestructure
│   ├── controllers
│   ├── http
│   ├── logger
│   ├── middlewares
│   └── database
├── config
│   └── container.ts
├── main.ts
└── server.ts
```

Archivos principales de configuración:

```text
├── AGENTS.md
├── biome.json
├── commitlint.config.json
├── vitest.config.ts
├── jsconfig.json
├── package.json
└── .husky
    ├── pre-commit
    └── commit-msg
```

---

# 📡 14. Endpoints

```text
GET     /api/v1/generic

POST    /api/v1/generic

PATCH   /api/v1/generic/:id
```

---

# 🧠 15. Principios Aplicados

* Separation of Concerns
* Dependency Inversion
* Clean Architecture
* Single Responsibility
* Testabilidad
* Manejo transversal de errores
* Logging estructurado
* Formateo y linting automatizado
* Conventional Commits
* Git Hooks automatizados
* Validación automática de código

---

# 🏁 Conclusión

Este chasis permite:

* Escalar a microservicios.
* Cambiar base de datos sin tocar dominio.
* Implementar eventos.
* Probar lógica sin levantar servidor.
* Mantener una arquitectura limpia y profesional.
* Mantener un estándar de código consistente.
* Automatizar formato y linting.
* Garantizar mensajes de commit consistentes.
* Evitar commits que no cumplan las reglas del proyecto.

---

> El dominio define el negocio.
> La aplicación ejecuta acciones.
> La infraestructura implementa detalles.
> Biome mantiene la calidad y consistencia del código.
> Husky automatiza las validaciones.
> Commitlint garantiza Conventional Commits.

```json
{
  "sub": "user-12345",
  "username": "julian.arango",
  "client_id": "asdasdasdas",
  "type": "access",
  "scopes": [
    "generic",
    "company"
  ],
  "iss": "auth-service",
  "aud": "express-ts-chasis"
}
```
