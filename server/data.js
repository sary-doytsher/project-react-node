// Mock database - in production, replace with real database
let products = [
  {
    _id: '1',
    name: 'MacBook Pro 16',
    description: 'מחשב נייד עוצמתי למקצוענים עם מעבד M3 Pro',
    price: 12999,
    stock: 15,
    category: 'מחשבים',
    image: 'laptop.jpg',
  },
  {
    _id: '2',
    name: 'iPhone 15 Pro',
    description: 'טלפון חכם מתקדם עם מצלמה פרו ומעבד A17 Pro',
    price: 5499,
    stock: 25,
    category: 'טלפונים',
    image: 'phone.jpg',
  },
  {
    _id: '3',
    name: 'iPad Air',
    description: 'טאבלט קל ועוצמתי למולטימדיה ועבודה',
    price: 3299,
    stock: 20,
    category: 'טאבלטים',
    image: 'tablet.jpg',
  },
  {
    _id: '4',
    name: 'AirPods Pro',
    description: 'אוזניות אלחוטיות עם ביטול רעשים אקטיבי',
    price: 999,
    stock: 50,
    category: 'אביזרים',
    image: 'headphones.jpg',
  },
  {
    _id: '5',
    name: 'Sony A7 IV',
    description: 'מצלמה מקצועית Full Frame למצלמים מתקדמים',
    price: 8999,
    stock: 8,
    category: 'מצלמות',
    image: 'camera.jpg',
  },
  {
    _id: '6',
    name: 'Dell XPS 15',
    description: 'מחשב נייד עם מסך 4K ומפרט חזק',
    price: 7499,
    stock: 12,
    category: 'מחשבים',
    image: 'pic1.jpg',
  },
  {
    _id: '7',
    name: 'Samsung Galaxy S24',
    description: 'טלפון חכם עם מצלמה 200MP',
    price: 4299,
    stock: 30,
    category: 'טלפונים',
    image: 'pic2.jpg',
  },
  {
    _id: '8',
    name: 'Logitech MX Master 3',
    description: 'עכבר אלחוטי ארגונומי למקצוענים',
    price: 449,
    stock: 40,
    category: 'אביזרים',
    image: 'pic3.jpg',
  },
  {
    _id: '9',
    name: 'LG 27 4K Monitor',
    description: 'מסך 4K 27 אינץ\' לגרפיקה ועריכת וידאו',
    price: 2199,
    stock: 15,
    category: 'מסכים',
    image: 'pic4.jpg',
  },
  {
    _id: '10',
    name: 'Razer BlackWidow V4',
    description: 'מקלדת גיימינג מכנית עם תאורת RGB',
    price: 699,
    stock: 35,
    category: 'אביזרים',
    image: 'pic5.jpg',
  },
];

let users = [
  {
    _id: 'admin1',
    name: 'מנהל ראשי',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    _id: 'user1',
    name: 'יוסי כהן',
    email: 'yossi@example.com',
    password: '123456',
    role: 'customer',
  },
];

let orders = [];

let nextProductId = 11;
let nextUserId = 3;
let nextOrderId = 1;

export const db = {
  products: {
    getAll: () => products,
    getById: (id) => products.find((p) => p._id === id),
    create: (product) => {
      const newProduct = { ...product, _id: String(nextProductId++) };
      products.push(newProduct);
      return newProduct;
    },
    update: (id, productData) => {
      const index = products.findIndex((p) => p._id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        return products[index];
      }
      return null;
    },
    delete: (id) => {
      const index = products.findIndex((p) => p._id === id);
      if (index !== -1) {
        const deleted = products[index];
        products = products.filter((p) => p._id !== id);
        return deleted;
      }
      return null;
    },
  },
  users: {
    getAll: () => users,
    getById: (id) => users.find((u) => u._id === id),
    getByEmail: (email) => users.find((u) => u.email === email),
    create: (user) => {
      const newUser = { ...user, _id: `user${nextUserId++}`, role: 'customer' };
      users.push(newUser);
      return newUser;
    },
    update: (id, userData) => {
      const index = users.findIndex((u) => u._id === id);
      if (index !== -1) {
        users[index] = { ...users[index], ...userData };
        return users[index];
      }
      return null;
    },
  },
  orders: {
    getAll: () => orders,
    getById: (id) => orders.find((o) => o._id === id),
    getByUserId: (userId) => orders.filter((o) => o.userId === userId),
    create: (order) => {
      const newOrder = {
        ...order,
        _id: String(nextOrderId++),
        createdAt: new Date().toISOString(),
      };
      orders.push(newOrder);
      return newOrder;
    },
  },
};
