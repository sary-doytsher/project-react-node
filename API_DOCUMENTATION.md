# תיעוד API - נקודות קצה ופורמטים

## כתובת בסיס
```
http://localhost:3000/api
```

---

## מוצרים (Products)

### קבלת כל המוצרים
```http
GET /products
```

**תשובה:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "iPhone 15",
    "description": "טלפון חכם מתקדם",
    "price": 5499,
    "stock": 25,
    "category": "טלפונים",
    "image": "phone.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### קבלת מוצר בודד
```http
GET /products/:id
```

**פרמטרים:**
- `id` - מזהה המוצר

**תשובה:** אובייקט מוצר בודד

### הוספת מוצר (מנהל בלבד)
```http
POST /products
Content-Type: application/json
```

**Body:**
```json
{
  "name": "שם המוצר",
  "description": "תיאור המוצר",
  "price": 1999.99,
  "stock": 50,
  "category": "קטגוריה",
  "image": "image.jpg"
}
```

**תשובה:** המוצר שנוצר

### עדכון מוצר (מנהל בלבד)
```http
PUT /products/:id
Content-Type: application/json
```

**Body:** שדות לעדכון (חלקי או מלא)

**תשובה:** המוצר המעודכן

### מחיקת מוצר (מנהל בלבד)
```http
DELETE /products/:id
```

**תשובה:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## משתמשים (Users)

### הרשמה
```http
POST /users/signup
Content-Type: application/json
```

**Body:**
```json
{
  "name": "שם מלא",
  "email": "user@example.com",
  "password": "password123",
  "phone": "0501234567",
  "address": "כתובת מלאה"
}
```

**תשובה:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "שם מלא",
  "email": "user@example.com",
  "role": "user",
  "phone": "0501234567",
  "address": "כתובת מלאה"
}
```

**הערה:** הסיסמה לא מוחזרת בתשובה!

### התחברות
```http
POST /users/login
Content-Type: application/json
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**תשובה:** אותו פורמט כמו הרשמה

### קבלת פרטי משתמש
```http
GET /users/:id
```

**תשובה:** אובייקט משתמש (ללא סיסמה)

### עדכון פרטי משתמש
```http
PUT /users/:id
Content-Type: application/json
```

**Body:** שדות לעדכון

**תשובה:** המשתמש המעודכן

---

## הזמנות (Orders)

### יצירת הזמנה
```http
POST /orders
Content-Type: application/json
```

**Body:**
```json
{
  "userId": "507f1f77bcf86cd799439011",
  "items": [
    {
      "productId": "507f1f77bcf86cd799439012",
      "name": "iPhone 15",
      "price": 5499,
      "quantity": 1
    }
  ],
  "totalAmount": 5499,
  "shippingAddress": "כתובת משלוח"
}
```

**תשובה:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "userId": "507f1f77bcf86cd799439011",
  "items": [...],
  "totalAmount": 5499,
  "status": "pending",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### קבלת הזמנות משתמש
```http
GET /orders/user/:userId
```

**תשובה:** מערך של הזמנות

### קבלת הזמנה בודדת
```http
GET /orders/:id
```

**תשובה:** אובייקט הזמנה

---

## קודי שגיאה

- **200** - הצלחה
- **201** - נוצר בהצלחה
- **400** - בקשה לא תקינה
- **401** - לא מורשה
- **403** - אין הרשאה
- **404** - לא נמצא
- **500** - שגיאת שרת

---

## הערות חשובות

### אימות (Authentication)
במימוש מלא, יש להוסיף JWT Token בכל בקשה:
```http
Authorization: Bearer <token>
```

### CORS
ודא שהשרת מאפשר בקשות מ-`http://localhost:5173`

### סכמת MongoDB
השרת צריך לכלול Schemas עבור:
- Product
- User (עם hashing לסיסמה)
- Order

### בדיקות תקינות
השרת צריך לבצע:
- ✓ בדיקת שדות חובה
- ✓ בדיקת פורמט אימייל
- ✓ בדיקת אורך סיסמה
- ✓ בדיקת מחירים חיוביים
- ✓ בדיקת מלאי זמין
