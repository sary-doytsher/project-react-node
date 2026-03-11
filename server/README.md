# React Shop API Server

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production

```bash
npm start
```

## Deploy to Render

1. Push this server folder to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repository
4. Set build command: `npm install`
5. Set start command: `npm start`
6. Deploy!

## API Endpoints

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product
- PUT `/api/products/:id` - Update product
- DELETE `/api/products/:id` - Delete product

### Users
- POST `/api/users/signup` - Sign up
- POST `/api/users/login` - Login
- GET `/api/users/:id` - Get user by ID
- PUT `/api/users/:id` - Update user

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/:id` - Get order by ID
- GET `/api/orders/user/:userId` - Get user orders
