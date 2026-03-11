import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db } from './data.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'React Shop API Server', status: 'running' });
});

// ==================== PRODUCTS ROUTES ====================

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.products.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.products.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new product
app.post('/api/products', (req, res) => {
  try {
    const newProduct = db.products.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product
app.put('/api/products/:id', (req, res) => {
  try {
    const updatedProduct = db.products.update(req.params.id, req.body);
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const deletedProduct = db.products.delete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== USERS ROUTES ====================

// Sign up
app.post('/api/users/signup', (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = db.users.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = db.users.create({ email, password, name });
    
    // Don't send password back
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
app.post('/api/users/login', (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.users.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  try {
    const user = db.users.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user
app.put('/api/users/:id', (req, res) => {
  try {
    const updatedUser = db.users.update(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== ORDERS ROUTES ====================

// Create order
app.post('/api/orders', (req, res) => {
  try {
    const newOrder = db.orders.create(req.body);
    // הורד מלאי לכל מוצר בהזמנה
    if (req.body.items && Array.isArray(req.body.items)) {
      req.body.items.forEach(({ _id, quantity }) => {
        const product = db.products.getById(_id)
        if (product) {
          db.products.update(_id, { stock: Math.max(0, product.stock - quantity) })
        }
      })
    }
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  try {
    const order = db.orders.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get orders by user ID
app.get('/api/orders/user/:userId', (req, res) => {
  try {
    const orders = db.orders.getByUserId(req.params.userId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}/api`);
});
