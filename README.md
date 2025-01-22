# **Product API**

This is an API developed in NestJS that fetches product data from Contentful, stores it in a PostgreSQL database, and provides endpoints to query and manage the products. Additionally, it includes a report module protected by JWT authentication.

---

## **Requirements**

- Node.js (v18 or higher)
- Docker and Docker Compose
- PostgreSQL

---

## **Installation**

1. Clone the repository:

```bash
git clone https://github.com/UrielVentura/product-api-ad.git
cd product-api-ad
```

2. Install the dependencies:

```bash
npm install
```

3. Configure the environment variables:

Create a `.env` file at the root of the project and add the following variables:

```plaintext
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

### **Running with Docker**

1. Build and start the containers: This command builds the Docker images and starts the containers in the background.

   ```bash
   docker-compose up -d --build
   ```

2. Access the application:

   Once the containers are running, the API will be available at `http://localhost:3000`.

3. Stop the containers: This command stops and removes the containers.
   ```bash
   docker-compose down
   ```

---

## **API Documentation**

### **API Documentation**

The API documentation is available in Swagger. Once the application is running, access it at: `http://localhost:3000/api/docs`

### **Public Endpoints**

- **Get paginated products**:

  `GET /products`

- **Delete a product**:

  `DELETE /products/:id`

### **Private Endpoints (require JWT authentication)**

- **Percentage of deleted products**:

  `GET /reports/deleted-percentage`

- **Percentage of non-deleted products**:

  `GET /reports/non-deleted-percentage`

- **Top 5 most expensive products**:

  `GET /reports/top-5-expensive`

---

## **Testing**

### **Testing**

To run the tests, use the following command:

```bash
npm run test
```

To see the code coverage:

```bash
npm run test:cov
```

---

## **Continuous Integration (CI)**

### **Continuous Integration (CI)**

The project includes a GitHub Actions workflow that runs tests and linters on each push or pull request. The configuration file is located at `.github/workflows/ci.yml`.

---

## **Project Structure**

The project is organized as follows:

- **src/**
  - `app.controller.ts`: Main application controller.
  - `app.module.ts`: Main application module.
  - `app.service.ts`: Main application service.
  - **auth/**: Authentication module (JWT).
    - `auth.controller.ts`: Authentication controller.
    - `auth.module.ts`: Authentication module.
    - `auth.service.ts`: Authentication service.
    - `auth.service.spec.ts`: Authentication service tests.
    - `jwt.strategy.ts`: JWT strategy for authentication.
  - **contentful/**: Module to interact with Contentful.
    - `contentful.controller.ts`: Contentful controller.
    - `contentful.module.ts`: Contentful module.
    - `contentful.service.ts`: Contentful service.
  - `main.ts`: Application entry point.
  - **products/**: Module to manage products.
    - `product.dto.ts`: Product DTO.
    - `product.entity.ts`: Product entity.
    - `products.controller.ts`: Products controller.
    - `products.module.ts`: Products module.
    - `products.service.ts`: Products service.
    - `products.service.spec.ts`: Products service tests.
  - **reports/**: Reports module.
    - `reports.controller.ts`: Reports controller.
    - `reports.module.ts`: Reports module.
    - `reports.service.ts`: Reports service.
    - `reports.service.spec.ts`: Reports service tests.
  - **tasks/**: Scheduled tasks module.
    - `tasks.module.ts`: Tasks module.
    - `tasks.processor.ts`: Tasks processor (Bull Queue).
    - `tasks.service.ts`: Tasks service.
    - `tasks.service.spec.ts`: Tasks service tests.
