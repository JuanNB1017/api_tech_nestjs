<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

<p>
  Crear una API RESTful que maneje un sistema de gestión de tareas (Task Management System) utilizando NestJS. La API debe permitir realizar operaciones CRUD sobre tareas y gestionar usuarios.
</p>

## Project setup

- [Fork] genera una copia del proyecto en tu cuenta de github mediante un Fork
- Configurar las variables de entorno

```bash
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=test
DB_PASSWORD=test123
DB_NAME=taskmanager

STAGE=dev

JWT_SECRET=YOUR_SECRET_KEY_HERE
JWT_ACCESS_TOKEN_TTL=3600
```

- Instalar dependencias

```bash
$ yarn install
```

- Conexión a la base de datos
<p>Es requerido tener instalado Docker, en caso contrario puedes usar una instancia de MySQL en tu máquina local.</p>

- Iniciar la base de datos

<p>Verificar que el archivo .env esté configurado correctamente</p>

```bash
docker-compose --env-file .env up -d
```

- Documentación de la API
  Para poder visualizar la documentación en la UI de swagger, solo es necesario correr la aplicación en modo desarrollador yarn run start para poder tener la siguiente url http://localhost:3001

## Requerimientos Funcionales
- nestjs
- sequelize orm
- jwt

### 1. Tareas

Cada tarea debe tener las siguientes propiedades:

- `id`: Identificador único (generado automáticamente).
- `title`: Título de la tarea (string).
- `description`: Descripción de la tarea (string).
- `state`: Estado de la tarea (`"open"`, `"in_progress"`, `"done"`).
- `status`: Estado del usuario (`"0"`, `"1"`), 0 es Eliminado, default 1.
- `createdAt`: Fecha y hora de creación de la tarea (timestamp).
- `updatedAt`: Fecha y hora de la última actualización de la tarea (timestamp).
- `deletedAt`: Fecha y hora en la que la tarea fue eliminada (null si no ha sido eliminada).
- `userId`: Relación con el usuario que creó la tarea.

**Endpoints requeridos:**

- `GET /tasks`: Obtener la lista de tareas. Debe excluir las tareas con estado `"deleted"`.
- `POST /tasks`: Crear una nueva tarea.
- `PUT /tasks/:id`: Actualizar una tarea existente (excepto si está en estado `"deleted"`).
- `DELETE /tasks/:id`: Marcar una tarea como eliminada (borrado lógico, actualizando `status` a `"deleted"` y `deletedAt` con la fecha y hora actual).

### 2. Usuarios

Implementar autenticación básica con **JWT** para usuarios. Cada usuario debe tener las siguientes propiedades:

- `id`: Identificador único (generado automáticamente).
- `username`: Nombre de usuario (string, único).
- `password`: Contraseña (string, encriptada).
- `status`: Estado del usuario (`"0"`, `"1"`), 0 es Eliminado, default 1.
- `createdAt`: Fecha y hora de creación del usuario (timestamp).
- `updatedAt`: Fecha y hora de la última actualización del usuario (timestamp).
- `deletedAt`: Fecha y hora en la que el usuario fue eliminada (null si no ha sido eliminada).

**Endpoints requeridos:**

- `POST /auth/signup`: Registrar un nuevo usuario.
- `POST /auth/login`: Autenticar a un usuario y devolver un token JWT.

Solo los usuarios autenticados podrán gestionar sus propias tareas.

**Notas sobre el borrado lógico:**

- El campo `deletedAt` debe ser nulo si la tarea no está eliminada.
- El campo `status` debe cambiar a `"0"` cuando se marque como eliminada.
- El borrado de una tarea o usuario no debe eliminar el registro de la base de datos; en su lugar, debe actualizar los campos `status` y `deletedAt`.

## Criterios de Evaluación

1. **Correctitud técnica:**

   - La API cumple con los requisitos funcionales (CRUD de tareas, autenticación de usuarios).
   - Uso adecuado de NestJS, incluyendo módulos, servicios, controladores, y providers.

2. **Seguridad:**

   - Uso adecuado de JWT para asegurar rutas.
   - Encriptación de contraseñas.

3. **Estructura y estilo del código:**

   - El código está organizado de manera clara, utilizando las mejores prácticas de NestJS.
   - Uso de DTOs para la validación de datos de entrada.

4. **Borrado lógico:**
   - El borrado de tareas y usuarios debe ser lógico (usando los campos `deletedAt` y `status`).
5. **Swagger: Documentacion correcta:**
   - El código está documentado de manera clara, utilizando las herramientas proporcionadas por swagger.

## Instrucciones de Entrega

1. El proyecto debe subirse a un repositorio Git (GitHub, GitLab, etc.) y se debe proporcionar acceso al repositorio. [Mediante el fork]
2. El repositorio debe incluir un archivo `README.md` con las instrucciones para:
   - Explicación de cualquier tecnología utilizada.
   - Cualquier informacion adicional al proyecto

## ACTUALIZACION Por JuanNB1017

Se completaron los requerimientos establecidos por los parametos descritos en este archivo, Completando las URLs requeridas para las peticiones sobre modificacion y peticion de Tareas y Usuarios, A continuacion dejare una pequeña documentacion sobre los APIs realizados.

## Documentacion:

1.- *** Sign Up ***
   - URL: `http://localhost:3001/auth/signup`
   - METHOD: `POST`
   - Parametros de entrada: { "username": "Jhon Smith", "password": "Smith1234" }
   - Response:  
      - Peticion exitosa: { "id": 200,"username": "username" }
      - Peticion fallida por usuario duplicado: { "message": "Este usuario ya está en uso, intente otro diferente", "error": "Conflict", "statusCode": 409 }
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

2.- *** Login ***
   - URL: `http://localhost:3001/auth/login`
   - METHOD: `POST`
   - Parametros de entrada: { "username": "Jhon Smith", "password": "Smith1234" }
   - Response:  
      - Peticion exitosa: { "access_token": "eyJhbGciOiJIUzI" }
      - Peticion fallida por credenciales: { "message": "Credenciales inválidas", "error": "Unauthorized", "statusCode": 401 }
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

3.- *** Get Tasks ***
   - URL: `http://localhost:3001/tasks`
   - METHOD: `GET`
   - Authentication: Bearer eyJhbGciOiJIUzI...
   - Response:
      - Peticion exitosa: [{"id": 1,"title": "Task 1","deletedAt": null...},{...},...]
      - Peticion denegada por JWT: {"message": "Unauthorized","statusCode": 401}
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

4.- *** Post Tasks ***
   - URL: `http://localhost:3001/tasks`
   - METHOD: `POST`
   - Parametros de entrada: { "title":"mi tarea", "description": "Una prueba" }
   - Authentication: Bearer eyJhbGciOiJIUzI...
   - Response:
      - Peticion exitosa: [{"id": 1,"title": "mi tarea","description": "Una prueba"...}]
      - Peticion denegada por JWT: {"message": "Unauthorized","statusCode": 401}
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

5.- *** Put Tasks ***
   - URL: `http://localhost:3001/tasks/:idTask:`
   - METHOD: `PUT`
   - Parametros de entrada: { "state": "in_progress",/*Opcionales*/ "description": "Una prueba" "title":"mi tarea"}
   - Authentication: Bearer eyJhbGciOiJIUzI...
   - Response:
      - Peticion exitosa: [{"id": 1,"title": "mi tarea modificada","description": "Una prueba"...}]
      - Peticion denegada por Tarea eliminada o no pertenece al usaurio: { "message": "Task not found or this task does not belong to the user","error": "Not Found","statusCode": 404}
      - Peticion denegada por JWT: {"message": "Unauthorized","statusCode": 401}
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

6.- *** Delete Tasks ***
   - URL: `http://localhost:3001/tasks/:idTask:`
   - METHOD: `DELETE`
   - Authentication: Bearer eyJhbGciOiJIUzI...
   - Response:
      - Peticion exitosa: { "message": "task has been eliminated","error": "Request", "statusCode": 200 }
      - Peticion denegada por Tarea eliminada o no pertenece al usaurio: { "message": "Task not found or this task does not belong to the user","error": "Not Found","statusCode": 404}
      - Peticion denegada por JWT: {"message": "Unauthorized","statusCode": 401}
      - Peticion erronea por conexiones: { "statusCode": 500, "message": "Internal server error" }

## Añadidos y configuracion

<p>
  Gestión de Tareas (CRUD): Las operaciones CRUD están implementadas para la gestión de tareas. Los usuarios pueden crear, actualizar, eliminar y obtener listas de tareas.
</p>
<p>
   Autenticación JWT: Durante el registro y el inicio de sesión, se genera un token JWT que se usa para validar las peticiones posteriores. Se implementaron estrategias de protección en rutas usando Guards.
</p>
<p>
   Conexión a MySQL con Sequelize: Sequelize fue configurado como ORM para manejar la persistencia de los datos en MySQL, simplificando las consultas y el mapeo de las tablas hacia modelos en el código.
</p>
<p>
   Creacion de modelos: Los modelos fueron especificados para la ejecucion de representaciones en código de las tablas de la base de datos en workbench, definidas con Sequelize ORM.
</p>
<p>
   TDD (Test-Driven Development): El proyecto implementa pruebas para asegurar que las funcionalidades claves, como la autenticación y la gestión de tareas, funcionen correctamente.
</p>
<p>
   Bcrypt: bcrypt se usa para generar un hash seguro de la contraseña antes de almacenarla en la base de datos. Esto se logra con bcrypt.hash(password, 10), donde el número 10 representa el "factor de costo" (cuántas veces se aplica el algoritmo de hash para aumentar su seguridad).
</p>