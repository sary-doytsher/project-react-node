import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './db.js';
import Product from './models/Product.js';
import User from './models/User.js';
import Order from './models/Order.js';

dotenv.config();

const seedProducts = [
  { name: 'MacBook Pro 16', description: 'מחשב נייד עוצמתי למקצוענים עם מעבד M3 Pro', price: 12999, stock: 15, category: 'מחשבים', image: 'laptop.jpg' },
  { name: 'iPhone 15 Pro', description: 'טלפון חכם מתקדם עם מצלמה פרו ומעבד A17 Pro', price: 5499, stock: 25, category: 'טלפונים', image: 'phone.jpg' },
  { name: 'iPad Air', description: 'טאבלט קל ועוצמתי למולטימדיה ועבודה', price: 3299, stock: 20, category: 'טאבלטים', image: 'tablet.jpg' },
  { name: 'AirPods Pro', description: 'אוזניות אלחוטיות עם ביטול רעשים אקטיבי', price: 999, stock: 50, category: 'אביזרים', image: 'headphones.jpg' },
  { name: 'Sony A7 IV', description: 'מצלמה מקצועית Full Frame למצלמים מתקדמים', price: 8999, stock: 8, category: 'מצלמות', image: 'camera.jpg' },
  { name: 'Dell XPS 15', description: 'מחשב נייד עם מסך 4K ומפרט חזק', price: 7499, stock: 12, category: 'מחשבים', image: 'pic1.jpg' },
  { name: 'Samsung Galaxy S24', description: 'טלפון חכם עם מצלמה 200MP', price: 4299, stock: 30, category: 'טלפונים', image: 'pic2.jpg' },
  { name: 'Logitech MX Master 3', description: 'עכבר אלחוטי ארגונומי למקצוענים', price: 449, stock: 40, category: 'אביזרים', image: 'pic3.jpg' },
  { name: 'LG 27 4K Monitor', description: "מסך 4K 27 אינץ' לגרפיקה ועריכת וידאו", price: 2199, stock: 15, category: 'מסכים', image: 'pic4.jpg' },
  { name: 'Razer BlackWidow V4', description: 'מקלדת גיימינג מכנית עם תאורת RGB', price: 699, stock: 35, category: 'אביזרים', image: 'pic5.jpg' },
];

const seedUsers = [
  { name: 'מנהל ראשי', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { name: 'יוסי כהן', email: 'yossi@example.com', password: '123456', role: 'customer' },
];

const seedDB = async () => {
  await connectDB();

  console.log('🗑️  Clearing existing data...');
  await Product.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  console.log('🌱 Seeding products...');
  await Product.insertMany(seedProducts);

  console.log('🌱 Seeding users...');
  await User.insertMany(seedUsers);

  console.log('✅ Database seeded successfully!');
  await mongoose.disconnect();
  process.exit(0);
};

seedDB();
