# Headless E-commerce Backend

A simple **headless e-commerce backend** built with Node.js, Express, TypeScript, and MongoDB. Supports catalog browsing, guest-first carts, promo codes, and checkout functionality.

---

## **Table of Contents**

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Routes](#api-routes)
- [Seeding Database](#seeding-database)
- [Testing](#testing)
- [Error Handling](#error-handling)

---

## **Tech Stack**

- Node.js + Express (TypeScript)
- MongoDB + Mongoose
- Zod (for validation)
- UUID (for guest cart tokens)
- Helmet, CORS, Morgan for middleware & logging
- Jest + Supertest for testing

---

## **Features**

- **Catalog**: Products with variants and prices
- **Cart**: Guest-first cart management
- **Promos**: Percent or fixed discounts with validity window
- **Checkout**: Create order from cart
- **Orders**: View and manage orders
- **Input validation** and standardized error responses

---

## **Installation**

1. Clone the repository:

```bash
git clone <repo_url>
cd ecommerce-backend
```

2. Install dependencies:

```bash
npm install
```

3. Initialize TypeScript:

```bash
npx tsc --init
```

---

## **Environment Variables**

Create a `.env` file in the project root:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce
```

Replace `<username>` and `<password>` with your MongoDB credentials.

---

## **Running the Project**

- **Development mode** (auto-reload):

```bash
npm run dev
```

- **Production build**:

```bash
npm run build
npm start
```

Server runs on `http://localhost:<PORT>`.

---

## **API Routes**

| Route                     | Method | Description                    |
| ------------------------- | ------ | ------------------------------ |
| `/api/catalog/products`   | GET    | List all products              |
| `/api/catalog/products`   | POST   | POST PRODUCT                   |
| `/api/catalog/:id`        | GET    | Get single product             |
| `/api/cart`               | GET    | Get current cart (guest-first) |
| `/api/cart/items`         | POST   | Add item to cart               |
| `/api/cart/items/:itemId` | PATCH  | Update cart item quantity      |
| `/api/cart/items/:itemId` | DELETE | Remove item from cart          |
| `/api/cart/apply-promo`   | POST   | Apply promo code               |
| `/api/checkout`           | POST   | Checkout cart and create order |
| `/api/orders`             | GET    | Get all orders                 |
| `/api/orders/:id`         | GET    | Get single order               |

---

## **Seeding Database**

Seed sample products and promos:

```bash
npm run seed
```

- Seeds T-Shirt products and promo codes like `WELCOME10` and `FLAT500`.

---

## **Testing**

- Unit & integration tests using Jest + Supertest:

```bash
npm run test
```

- Postman can be used to test all routes manually. Make sure cookies are enabled for guest cart tracking.

---

## **Error Handling**

All API errors return a consistent JSON structure:

```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "Route not found"
  }
}
```

- `code`: error type
- `message`: detailed description

---

## **License**

MIT License
