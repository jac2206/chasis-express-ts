# 🧱 Express TS Chasis

Backend base profesional construido con:

**Express 5 + TypeScript + Clean Architecture + DDD + Arquitectura Hexagonal + Prisma + PostgreSQL + Awilix + Zod + Swagger + JWT + Winston + Vitest + Biome**

---

# 🏗️ Arquitectura

El proyecto combina **Clean Architecture, DDD y Arquitectura Hexagonal**, separando las reglas de negocio de los detalles de infraestructura.

Flujo general:

```text
HTTP
 ↓
Routes
 ↓
Middlewares
 ↓
Controllers
 ↓
Use Cases
 ↓
Domain
 ↓
Repository Interfaces
 ↓
Infrastructure
 ↓
Prisma
 ↓
PostgreSQL
```

### Estructura principal

```text
src/
├── application/
│   ├── dto/
│   └── use-cases/
├── config/
├── domain/
├── infraestructure/
├── generated/
│   └── prisma/
├── main.ts
└── server.ts
```

### Responsabilidad de cada capa

| Capa               | Responsabilidad                                     |
| ------------------ | --------------------------------------------------- |
| **Domain**         | Entidades, reglas y contratos                       |
| **Application**    | Casos de uso y DTOs                                 |
| **Infrastructure** | Express, Prisma, PostgreSQL, JWT, logger y adapters |
| **Config**         | Variables de entorno e inyección de dependencias    |

La regla principal es que el **Domain no depende de Infrastructure**.

---

# 📦 Instalación

Requisitos:

* Node.js 24+
* PostgreSQL
* npm

Instalar dependencias:

```bash
npm install
```

Configurar las variables de entorno:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
```

---

# 🗄️ Prisma + PostgreSQL

El proyecto utiliza **Prisma 7.10.0** para trabajar con PostgreSQL.

### Instalar Prisma

```bash
npm install prisma@7.10.0 @prisma/client@7.10.0 @prisma/adapter-pg pg
```

Para TypeScript:

```bash
npm install -D @types/pg
```

### Inicializar Prisma

```bash
npx prisma init
```

Esto crea la estructura inicial de Prisma.

```text
prisma/
└── schema.prisma

prisma.config.ts
```

### Generar Prisma Client

```bash
npm run prisma:generate
```

El cliente generado se encuentra en:

```text
src/generated/prisma/
```

---

# 🧬 Modelos Prisma

Los modelos se mantienen separados dentro de:

```text
prisma/
├── models/
├── migrations/
└── schema.prisma
```

Actualmente el entorno de pruebas utiliza:

```text
Database: test
Schema:   test
```

```text
testr
└── test
    ├── users
    ├── addresses
    └── document_type
```

La configuración de Prisma se encuentra en:

```text
prisma.config.ts
```

---

# 🔄 Migraciones

Las migraciones permiten versionar los cambios realizados en la base de datos.

### Crear y aplicar una migración

```bash
npm run prisma:migrate -- --name nombre_migracion
```

### Crear sin aplicar

```bash
npm run prisma:migrate:create -- --name nombre_migracion
```

### Revisar estado

```bash
npm run prisma:status
```

### Producción

```bash
npm run prisma:deploy
```

```text
prisma:migrate → desarrollo
prisma:deploy  → producción
```

### Reset de desarrollo

```bash
npm run prisma:reset
```

**No utilizar en producción.**

### Prisma Studio

```bash
npm run prisma:studio
```

---

# 💉 Inyección de Dependencias

El proyecto utiliza **Awilix** para resolver las dependencias.

Las implementaciones se registran en:

```text
src/config/container.ts
```

Flujo:

```text
Use Case
   ↓
Repository Interface
   ↓
Repository
   ↓
Prisma
```

Esto permite reemplazar implementaciones fácilmente y facilita las pruebas.

---

# 🔐 Autenticación

La autenticación utiliza **JWT**.

La implementación se encuentra en:

```text
src/infraestructure/security/
```

Las rutas protegidas utilizan:

```text
Authorization: Bearer <token>
```

---

# ✅ Validación

Los datos de entrada se validan utilizando **Zod**.

Los schemas se encuentran en:

```text
src/infraestructure/schemas/
```

Flujo:

```text
Request
 ↓
Validation Middleware
 ↓
Zod
 ↓
Controller
 ↓
Use Case
```

---

# ⚠️ Manejo de errores

Los errores se centralizan mediante un middleware global.

```text
Use Case / Domain
       ↓
DomainException
       ↓
Error Middleware
       ↓
HTTP Response
```

Los errores de dominio se encuentran en:

```text
src/domain/errors/
src/domain/exceptions/
```

---

# 🪵 Logging

El proyecto utiliza **Winston** para logging estructurado.

La implementación se encuentra en:

```text
src/infraestructure/logger/
```

---

# 📖 Swagger / OpenAPI

La API está documentada mediante Swagger/OpenAPI.

La documentación se encuentra en:

```text
src/infraestructure/docs/
```

---

# 🧪 Testing

El proyecto utiliza **Vitest**.

```bash
npm run test
```

Ejecutar una sola vez:

```bash
npm run test:run
```

Coverage:

```bash
npm run test:coverage
```

---

# 🎨 Calidad de código

El proyecto utiliza **Biome**.

Formatear:

```bash
npm run format
```

Validar:

```bash
npm run check
```

---

# 🪝 Git Hooks

**Husky** y **Commitlint** automatizan las validaciones de Git.

Los commits utilizan **Conventional Commits**.

Ejemplos:

```text
feat: add user repository
fix: resolve database connection
test: add user tests
refactor: improve dependency injection
docs: update README
chore: update dependencies
```

---

# 🚀 Desarrollo

Iniciar el proyecto:

```bash
npm run dev
```

Compilar:

```bash
npm run build
```

Ejecutar la versión compilada:

```bash
npm start
```

---

# 📋 Scripts

### Aplicación

```bash
npm run dev
npm run build
npm start
```

### Prisma

```bash
npm run prisma:generate
npm run prisma:validate
npm run prisma:migrate
npm run prisma:migrate:create
npm run prisma:deploy
npm run prisma:status
npm run prisma:reset
npm run prisma:studio
```

También pueden ejecutarse directamente con Prisma:

```bash
npx prisma generate
npx prisma validate
npx prisma migrate dev
npx prisma migrate deploy
npx prisma migrate status
npx prisma migrate reset
npx prisma studio
```

### Testing

```bash
npm run test
npm run test:run
npm run test:coverage
```

### Calidad

```bash
npm run format
npm run check
```

---

# 🔁 Flujo de trabajo

Para desarrollar una nueva funcionalidad:

```text
Entity / Domain
      ↓
Interface
      ↓
Use Case
      ↓
Repository
      ↓
Controller
      ↓
Route
      ↓
Schema
```

Si requiere cambios en PostgreSQL:

```text
Modificar modelo Prisma
        ↓
prisma:validate
        ↓
prisma:migrate
        ↓
prisma:generate
        ↓
Tests
        ↓
Build
```

En producción:

```text
CI/CD
 ↓
prisma:deploy
 ↓
npm start
```

---

# 🏁 Objetivo

Este proyecto funciona como un **chasis reutilizable para APIs profesionales en Node.js**, proporcionando desde el inicio:

* Clean Architecture
* DDD
* Arquitectura Hexagonal
* Dependency Injection
* Repository Pattern
* Prisma + PostgreSQL
* JWT
* Zod
* Swagger/OpenAPI
* Winston
* Vitest
* Biome
* Husky
* Commitlint
* Migraciones versionadas

La idea es que un nuevo proyecto pueda comenzar sobre esta estructura sin tener que configurar nuevamente toda la infraestructura base.
