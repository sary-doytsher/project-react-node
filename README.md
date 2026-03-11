# חנות אונליין - פרויקט React

פרויקט React מלא עם Redux, React Router ו-Material UI להקמת חנות מקוונת.

## תכונות

- 🛒 **מערכת סל קניות מלאה** - הוספה, הסרה ועדכון כמויות
- 👤 **ניהול משתמשים** - הרשמה, התחברות ויציאה
- 🔐 **הרשאות** - הבחנה בין משתמש רגיל למנהל
- 📦 **ניהול מוצרים** - CRUD מלא למוצרים (למנהלים בלבד)
- 💾 **Local Storage** - שמירת סל קניות ומשתמש מחובר
- 🎨 **Material UI** - עיצוב מודרני ומגיב
- ✅ **אימות טפסים** - עם React Hook Form

## טכנולוגיות

- **React 18** - ספריית UI
- **Redux Toolkit** - ניהול State גלובלי
- **React Router v6** - ניווט וניתוב
- **Material UI (MUI)** - ספריית עיצוב
- **React Hook Form** - ניהול טפסים
- **Axios** - קריאות HTTP
- **Vite** - כלי Build מהיר

## מבנה הפרויקט

```
src/
├── api/                    # שירותי API
│   ├── productService.js
│   ├── userService.js
│   └── orderService.js
├── app/                    # הגדרות Redux
│   └── store.js
├── features/               # Redux Slices
│   ├── products/
│   │   └── productsSlice.js
│   ├── cart/
│   │   └── cartSlice.js
│   └── user/
│       └── userSlice.js
├── pages/                  # עמודים ראשיים
│   ├── ProductList.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── SignUp.jsx
│   ├── AddProduct.jsx
│   └── EditProduct.jsx
├── components/             # קומפוננטות
│   ├── NavBar.jsx
│   └── Product.jsx
├── css/                    # קבצי עיצוב
├── App.jsx
└── main.jsx
```

## התקנה והפעלה

### שלב 1: התקנת תלויות

```bash
npm install
```

### שלב 2: הגדרת משתני סביבה (אופציונלי)

עדכן את כתובות ה-API בקבצי השירות:
- `src/api/productService.js`
- `src/api/userService.js`
- `src/api/orderService.js`

שנה את `API_URL` לפי השרת שלך (כרגע מוגדר ל-`http://localhost:3000`).

### שלב 3: הוספת תמונות

הוסף תמונות למוצרים בתיקייה `public/images/`. שמות התמונות הזמינים:
- pic1.jpg
- pic2.jpg
- pic3.jpg
- pic4.jpg
- pic5.jpg
- laptop.jpg
- phone.jpg
- tablet.jpg
- headphones.jpg
- camera.jpg

**הערה חשובה:** התמונות אמורות להיות בתיקיית `public/images/`. זוהי דרך זמנית. בפרויקט אמיתי, מומלץ להעלות תמונות לשרת.

### שלב 4: הפעלת הפרויקט

```bash
npm run dev
```

האתר יהיה זמין בכתובת: `http://localhost:5173`

## שימוש באפליקציה

### משתמש אורח
- 👁️ צפייה בכל המוצרים
- 🛒 הוספה לסל קניות
- 🔑 כניסה / הרשמה

### משתמש רגיל (לאחר התחברות)
- ✅ כל התכונות של אורח
- 💳 אישור הזמנות
- 👤 פרופיל משתמש

### מנהל
- ✅ כל התכונות של משתמש רגיל
- ➕ הוספת מוצרים חדשים
- ✏️ עריכת מוצרים קיימים
- 🗑️ מחיקת מוצרים

## Redux Slices

### Products Slice
- `setProducts` - עדכון רשימת המוצרים
- `addProduct` - הוספת מוצר חדש
- `updateProduct` - עדכון מוצר קיים
- `deleteProduct` - מחיקת מוצר
- `setLoading` / `setError` - ניהול מצבי טעינה ושגיאות

### Cart Slice
- `addToCart` - הוספת מוצר לסל
- `increaseQuantity` - הגדלת כמות
- `decreaseQuantity` - הקטנת כמות
- `removeFromCart` - הסרת מוצר מהסל
- `clearCart` - ניקוי הסל

### User Slice
- `setUser` - שמירת משתמש מחובר
- `logout` - יציאה ממערכת
- `setLoading` / `setError` - ניהול מצבי טעינה ושגיאות

## Redux DevTools

להתקנת Redux DevTools Extension:
- [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

התוסף מאפשר לצפות במצב ה-State הגלובלי בזמן אמת ולעקוב אחרי השינויים.

## Local Storage

הפרויקט משתמש ב-Local Storage לשמירת:
- 🛒 **סל קניות** - `cart`
- 👤 **משתמש מחובר** - `user`

הנתונים נשמרים אוטומטית ונטענים בטעינת האפליקציה.

## API Endpoints (דוגמה)

### Products
- `GET /api/products` - קבלת כל המוצרים
- `GET /api/products/:id` - קבלת מוצר לפי ID
- `POST /api/products` - הוספת מוצר חדש
- `PUT /api/products/:id` - עדכון מוצר
- `DELETE /api/products/:id` - מחיקת מוצר

### Users
- `POST /api/users/signup` - הרשמה
- `POST /api/users/login` - התחברות
- `GET /api/users/:id` - קבלת פרטי משתמש
- `PUT /api/users/:id` - עדכון פרטי משתמש

### Orders
- `POST /api/orders` - יצירת הזמנה
- `GET /api/orders/user/:userId` - קבלת הזמנות משתמש
- `GET /api/orders/:id` - קבלת הזמנה לפי ID

## Build ופריסה

```bash
# בנייה לייצור
npm run build

# תצוגה מקדימה של Build
npm run preview
```

הקבצים המוכנים יהיו בתיקיית `dist/`.

### פריסה ל-Netlify

1. צור חשבון ב-[Netlify](https://www.netlify.com/)
2. התחבר את הריפוזיטורי או גרור את תיקיית `dist`
3. הגדרות Build:
   - Build command: `npm run build`
   - Publish directory: `dist`

## הרחבות עתידיות

- [ ] JWT Authentication
- [ ] TypeScript
- [ ] Protected Routes
- [ ] העלאת תמונות לשרת
- [ ] חיפוס וסינון מוצרים
- [ ] מערכת דירוגים וביקורות
- [ ] היסטוריית הזמנות
- [ ] פנל ניהול למנהלים
- [ ] תמיכה בריבוי שפות (i18n)

## פתרון בעיות נפוצות

### תמונות לא מוצגות
- ודא שהתמונות נמצאות ב-`public/images/`
- בדוק את שם הקובץ בדיוק (case-sensitive)
- רענן את הדפדפן (Ctrl+F5)

### Redux State לא מתעדכן
- פתח את Redux DevTools
- בדוק אם ה-actions מתבצעים
- ודא שה-reducers מוגדרים נכון ב-store

### בעיות התחברות
- בדוק את כתובת השרת ב-API services
- ודא שהשרת פועל
- בדוק את ה-Console לשגיאות CORS

## קישורים שימושיים

- [React Documentation](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Router](https://reactrouter.com/)
- [Material UI](https://mui.com/)
- [React Hook Form](https://react-hook-form.com/)

## רישיון

MIT

---

**בהצלחה! 🚀**
