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
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=

# Contentful Configuration
CONTENTFUL_SPACE_ID=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_ENVIRONMENT=
CONTENTFUL_CONTENT_TYPE=

# Redis Configuration
REDIS_HOST=
REDIS_PORT=

# JWT Configuration
JWT_SECRET=
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

- **Generate JWT Token**:

  `POST /auth/token`

  This endpoint generates a JWT token that can be used to access the private endpoints. It uses dummy data (`test-user` and `adminApplyDigital`) for demonstration purposes.

  Example response:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
  }
  ```

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

## **Postman Collection**

To make it easier to test the API endpoints, you can use the provided Postman collection and environment. Follow these steps:

### **1. Download the Files**

Download the following files from the `/postman` folder in this repository:

- [product-api-ad.postman_collection.json](./postman/product-api-ad.postman_collection.json)
- [product-api-ApplyD.postman_environment.json](./postman/product-api-ApplyD.postman_environment.json)

### **2. Import the Collection and Environment**

1. Open Postman.
2. Click on **Import** in the top-left corner.
3. Select the downloaded files:
   - `product-api-ad.postman_collection.json`
   - `product-api-ApplyD.postman_environment.json`

### **3. Set Up the Environment**

1. After importing, go to the **Environments** section in Postman.
2. Select the `product-api-ApplyD` environment from the dropdown in the top-right corner.

### **4. Start Testing**

- Use the `Product API AD` collection to test all the API endpoints, including public and private routes.
- For private endpoints, first generate a JWT token using the `POST /auth/token` endpoint and save it in the environment variable `token`.

### **Example Workflow**

1. **Generate a JWT Token**:

   - Use the `POST /auth/token` endpoint to generate a token.
   - The token will be automatically saved in the `token` environment variable.

2. **Access Private Endpoints**:
   - Use the `token` variable in the `Authorization` header for private endpoints.
   - Example: `Authorization: Bearer {{token}}`

### **Notes**

- The collection includes examples for all endpoints, including pagination, filtering, and report generation.
- The environment file contains predefined variables (e.g., `token`) to simplify testing.

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
