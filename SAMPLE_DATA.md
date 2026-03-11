# נתוני דוגמה לפיתוח

## משתמשים לדוגמה

### מנהל
```json
{
  "name": "מנהל ראשי",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin",
  "phone": "0501234567",
  "address": "תל אביב"
}
```

### משתמש רגיל
```json
{
  "name": "יוסי כהן",
  "email": "yossi@example.com",
  "password": "123456",
  "role": "user",
  "phone": "0527654321",
  "address": "ירושלים"
}
```

## מוצרים לדוגמה

```json
[
  {
    "_id": "1",
    "name": "MacBook Pro 16",
    "description": "מחשב נייד עוצמתי למקצוענים עם מעבד M3 Pro",
    "price": 12999,
    "stock": 15,
    "category": "מחשבים",
    "image": "laptop.jpg"
  },
  {
    "_id": "2",
    "name": "iPhone 15 Pro",
    "description": "טלפון חכם מתקדם עם מצלמה פרו ומעבד A17 Pro",
    "price": 5499,
    "stock": 25,
    "category": "טלפונים",
    "image": "phone.jpg"
  },
  {
    "_id": "3",
    "name": "iPad Air",
    "description": "טאבלט קל ועוצמתי למולטימדיה ועבודה",
    "price": 3299,
    "stock": 20,
    "category": "טאבלטים",
    "image": "tablet.jpg"
  },
  {
    "_id": "4",
    "name": "AirPods Pro",
    "description": "אוזניות אלחוטיות עם ביטול רעשים אקטיבי",
    "price": 999,
    "stock": 50,
    "category": "אביזרים",
    "image": "headphones.jpg"
  },
  {
    "_id": "5",
    "name": "Sony A7 IV",
    "description": "מצלמה מקצועית Full Frame למצלמים מתקדמים",
    "price": 8999,
    "stock": 8,
    "category": "מצלמות",
    "image": "camera.jpg"
  },
  {
    "_id": "6",
    "name": "Dell XPS 15",
    "description": "מחשב נייד עם מסך 4K ומפרט חזק",
    "price": 7499,
    "stock": 12,
    "category": "מחשבים",
    "image": "pic1.jpg"
  },
  {
    "_id": "7",
    "name": "Samsung Galaxy S24",
    "description": "טלפון חכם עם מצלמה 200MP",
    "price": 4299,
    "stock": 30,
    "category": "טלפונים",
    "image": "pic2.jpg"
  },
  {
    "_id": "8",
    "name": "Logitech MX Master 3",
    "description": "עכבר אלחוטי ארגונומי למקצוענים",
    "price": 449,
    "stock": 40,
    "category": "אביזרים",
    "image": "pic3.jpg"
  },
  {
    "_id": "9",
    "name": "LG 27 4K Monitor",
    "description": "מסך 4K 27 אינץ' לגרפיקה ועריכת וידאו",
    "price": 2199,
    "stock": 15,
    "category": "מסכים",
    "image": "pic4.jpg"
  },
  {
    "_id": "10",
    "name": "Razer BlackWidow V4",
    "description": "מקלדת גיימינג מכנית עם תאורת RGB",
    "price": 699,
    "stock": 35,
    "category": "אביזרים",
    "image": "pic5.jpg"
  }
]
```

## דוגמה לשימוש ב-Mock Data

אם אין לך שרת זמין, תוכל להשתמש בנתונים אלו בקוד:

### בקובץ ProductList.jsx

```javascript
// במקום:
const data = await productService.getAllProducts()

// השתמש ב:
const mockProducts = [
  // העתק את המערך למעלה
]
dispatch(setProducts(mockProducts))
```

### הוספת נתוני Mock ל-Redux בעת טעינה

יצירת קובץ `src/mockData.js`:

```javascript
export const mockProducts = [
  // המוצרים מלמעלה
]

export const mockUsers = [
  // המשתמשים מלמעלה
]
```

ואז ב-`ProductList.jsx`:

```javascript
import { mockProducts } from '../mockData'

// בתוך useEffect:
dispatch(setProducts(mockProducts))
```

## הערות חשובות

1. **נתונים אלו הם לפיתוח בלבד**
2. בפרודקשן, השתמש ב-API אמיתי
3. ודא שהשרת שלך מחזיר נתונים בפורמט דומה
4. ה-`_id` צריך להיות ייחודי לכל מוצר
