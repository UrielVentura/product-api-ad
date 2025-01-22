# **Product API**

Esta es una API desarrollada en NestJS que obtiene datos de productos desde Contentful, los almacena en una base de datos PostgreSQL y proporciona endpoints para consultar y gestionar los productos. Además, incluye un módulo de informes protegido por autenticación JWT.

---

## **Requerimientos**

- Node.js (v18 o superior)
- Docker y Docker Compose
- PostgreSQL

---

## **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/UrielVentura/product-api-ad.git
   cd product-api-ad
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

   ```paintext
   # Database Configuration
   DB_HOST=db
   DB_PORT=5432
   DB_USERNAME=user
   DB_PASSWORD=password
   DB_DATABASE=product_db

   # Contentful Configuration
   CONTENTFUL_SPACE_ID=9xs1613l9f7v
   CONTENTFUL_ACCESS_TOKEN=I-ThsT55eE_B3sCUWEQyDT4VqVO3x__20ufuie9usns
   CONTENTFUL_ENVIRONMENT=master
   CONTENTFUL_CONTENT_TYPE=product

   # Redis Configuration
   REDIS_HOST=redis
   REDIS_PORT=6379

   # JWT Configuration
   JWT_SECRET=secret
   ```

---

### **Ejecución con Docker**

1.  Construye y levanta los contenedores: Este comando construye las imágenes de Docker y levanta los contenedores en segundo plano.

    ```bash
    docker-compose up -d --build
    ```

2.  Accede a la aplicacion:

        Una vez que los contenedores estén en ejecución, la API estará disponible en `http://localhost:3000`.

3.  Detén los contenedores: Este comando detiene y elimina los contenedores.
    ```bash
    docker-compose down
    ```

---

## **Documentación de la API**

### **Documentación de la API**

La documentación de la API está disponible en Swagger. Una vez que la aplicación esté en ejecución, accede a: `http://localhost:3000/api/docs`

### **Endpoints Públicos**

- **Obtener productos paginados**:

  `GET /products`

- **Eliminar un producto**:

  `DELETE /products/:id`

### **Endpoints Privados (requieren autenticación JWT)**

- **Porcentaje de productos eliminados**:

  `GET /reports/deleted-percentage`

- **Porcentaje de productos no eliminados**:

  `GET /reports/non-deleted-percentage`

- **Top 5 productos más caros**:

  `GET /reports/top-5-expensive`

---

## **Pruebas**

### **Pruebas**

Para ejecutar las pruebas, usa el siguiente comando:

```bash
npm run test
```

Para ver la cobertura de codigo:

```bash
npm run test:cov
```

---

## **Integración Continua (CI)**

### **Integración Continua (CI)**

El proyecto incluye un workflow de GitHub Actions que ejecuta pruebas y linters en cada push o pull request. El archivo de configuración se encuentra en `.github/workflows/ci.yml`.

---

## **Estructura del Proyecto**

El proyecto está organizado de la siguiente manera:

- **src/**
  - `app.controller.ts`: Controlador principal de la aplicación.
  - `app.module.ts`: Módulo principal de la aplicación.
  - `app.service.ts`: Servicio principal de la aplicación.
  - **auth/**: Módulo de autenticación (JWT).
    - `auth.controller.ts`: Controlador de autenticación.
    - `auth.module.ts`: Módulo de autenticación.
    - `auth.service.ts`: Servicio de autenticación.
    - `auth.service.spec.ts`: Pruebas del servicio de autenticación.
    - `jwt.strategy.ts`: Estrategia JWT para autenticación.
  - **contentful/**: Módulo para interactuar con Contentful.
    - `contentful.controller.ts`: Controlador de Contentful.
    - `contentful.module.ts`: Módulo de Contentful.
    - `contentful.service.ts`: Servicio de Contentful.
  - `main.ts`: Punto de entrada de la aplicación.
  - **products/**: Módulo para gestionar productos.
    - `product.dto.ts`: DTO para productos.
    - `product.entity.ts`: Entidad de productos.
    - `products.controller.ts`: Controlador de productos.
    - `products.module.ts`: Módulo de productos.
    - `products.service.ts`: Servicio de productos.
    - `products.service.spec.ts`: Pruebas del servicio de productos.
  - **reports/**: Módulo de informes.
    - `reports.controller.ts`: Controlador de informes.
    - `reports.module.ts`: Módulo de informes.
    - `reports.service.ts`: Servicio de informes.
    - `reports.service.spec.ts`: Pruebas del servicio de informes.
  - **tasks/**: Módulo de tareas programadas.
    - `tasks.module.ts`: Módulo de tareas.
    - `tasks.processor.ts`: Procesador de tareas (Bull Queue).
    - `tasks.service.ts`: Servicio de tareas.
    - `tasks.service.spec.ts`: Pruebas del servicio de tareas.
