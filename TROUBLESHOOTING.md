# 🔧 מדריך פתרון בעיות (Troubleshooting)

## 🚨 בעיות נפוצות ופתרונות

### 📦 Installation Issues

#### בעיה: npm install נכשל
```
Error: npm ERR! code ERESOLVE
```

**פתרון:**
```bash
# נסה עם legacy peer deps
npm install --legacy-peer-deps

# או, נקה והתקן מחדש
rm -rf node_modules package-lock.json
npm install
```

#### בעיה: Node.js לא מזוהה
```bash
# בדוק את גרסה
node --version

# צריך Node 14+ (מומלץ 18+)
# התקן מ: https://nodejs.org/
```

---

### 🚀 Runtime Issues

#### בעיה: Port 5173 בשימוש
```
Error: EADDRINUSE: address already in use :::5173
```

**פתרון:**
```bash
# תהליך אחר משתמש בפורט
# פתרון 1: השתמש בפורט שונה
npm run dev -- --port 3000

# פתרון 2: הרוג את התהליך בפורט 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

#### בעיה: Images לא מוצגות
```
GET http://localhost:5173/images/pic1.jpg 404
```

**פתרון:**
1. בדוק ש-התמונות ב-`public/images/`
```bash
ls public/images/
```

2. בדוק את שם הקובץ (case-sensitive!)
```javascript
// לא זה:
<img src="/images/Pic1.jpg" />

// זה נכון:
<img src="/images/pic1.jpg" />
```

3. רענן את הדף (Ctrl+F5)

---

### 🔗 API Issues

#### בעיה: Cannot reach API
```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**פתרון:**
1. בדוק ש-שרת פועל
```bash
# שרת צריך להפעיל ב-port 3000
# או שנה את API_URL בקובץ:
# src/api/productService.js
```

2. בדוק CORS headers
```javascript
// בשרת Node.js:
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
```

#### בעיה: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**פתרון:**
```javascript
// בקובץ axios config:
// src/api/productService.js

import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default client
```

#### בעיה: 404 Not Found
```
Error 404: POST /api/products
```

**בדוק:**
1. האם ה-endpoint קיים בשרת?
2. האם ה-URL נכון?
3. האם ה-HTTP method נכון (GET/POST/PUT/DELETE)?

---

### 💾 Redux Issues

#### בעיה: State לא מתעדכן
```javascript
// dispatch עבד אבל state לא השתנה
```

**בדוק:**
1. פתח Redux DevTools (F12 → Redux tab)
2. ודא שה-action בוצע
3. בדוק ש-reducer מעדכן את ה-state נכון
4. ודא שלא עורמים state (immutability)

```javascript
// ❌ שגוי - mutating
state.products.push(product)

// ✅ נכון - new array
state.products = [...state.products, product]
```

#### בעיה: Redux DevTools לא מתחבר
```
Redux DevTools extension not detected
```

**פתרון:**
1. התקן את התוסף:
   - Chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
   - Firefox: https://addons.mozilla.org/firefox/addon/reduxdevtools/

2. סגור וחזור לפתוח את DevTools (F12)

3. חפש את Redux tab

---

### 🎨 Styling Issues

#### בעיה: Material UI לא עובד
```
Components חסרים סגנון או broken
```

**פתרון:**
```bash
# בדוק שהתקנות MUI:
npm list @mui/material

# אם חסרה, התקן:
npm install @mui/material @emotion/react @emotion/styled
```

#### בעיה: CSS לא טוען
```
Global styles לא חלים
```

**בדוק:**
1. ודא שה-import ב-main.jsx:
```javascript
import './css/global.css'
```

2. בדוק שהקבצים קיימים:
```bash
ls src/css/
```

3. בדוק את console לשגיאות

---

### 🧩 Component Issues

#### בעיה: Component לא render
```
Blank screen או שגיאה
```

**בדוק:**
1. React DevTools (F12 → Components)
2. בדוק את console לשגיאות
3. ודא שכל ה-imports נכונים

#### בעיה: Props לא מגיעות
```javascript
// props undefined
console.log(props) // undefined
```

**פתרון:**
```javascript
// בדוק ש-parent שולח props
<Child product={product} />

// וב-child קורא אותם
function Child({ product }) {
  console.log(product) // יהיה defined
}
```

---

### 📝 Form Issues

#### בעיה: Form לא validate
```
לא מופיעות הודעות שגיאה
```

**בדוק:**
```javascript
// עם useForm:
const { register, handleSubmit, formState: { errors } } = useForm()

// בטופס:
<input {...register('email', { required: 'Required' })} />
{errors.email && <span>{errors.email.message}</span>}
```

#### בעיה: Form לא submit
```javascript
const onSubmit = (data) => {
  console.log('Not called!')
}
```

**בדוק:**
1. form tag עם onSubmit
2. button type="submit"
3. כל ה-fields registered
4. בדוק browser console

---

### 🔐 Authentication Issues

#### בעיה: User לא נשמר
```
useSelector מחזיר null
```

**בדוק:**
1. Redux DevTools - האם dispatch קרא?
2. Local Storage - `localStorage.getItem('user')`
3. Redux slice - האם setUser עובד?

#### בעיה: Login לא עובד
```
API call fail או שגיאה
```

**בדוק:**
1. API endpoint קיים?
2. Email/Password נכונים?
3. Server מחזיר token?
4. Network tab בdevtools

---

### 🛒 Cart Issues

#### בעיה: סל לא נשמר
```
סל ריק אחרי refresh
```

**בדוק:**
1. localStorage.getItem('cart')
2. CartSlice מטעין מ-localStorage?
3. Redux state מתעדכן?

#### בעיה: כמות לא עולה
```
increaseQuantity לא עובד
```

**בדוק:**
1. dispatch ה-action?
2. item._id קיים?
3. Reducer עדכן את state?

---

### 📱 Responsive Issues

#### בעיה: לא responsive ב-mobile
```
Layout broken בטלפון
```

**בדוק:**
1. Meta viewport ב-HTML:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

2. Media queries ב-CSS:
```css
@media (max-width: 768px) { }
```

3. MUI sx props:
```javascript
sx={{ display: { xs: 'none', md: 'block' } }}
```

---

### 🐛 Browser Console Errors

#### "Cannot read property 'map' of undefined"
```javascript
// products היא undefined
// בדוק:
const { products } = useSelector(state => state.products)
// ודא שהיא מערך ריק במקום undefined
```

#### "Object is not iterable"
```javascript
// לנסיון map על non-array
// בדוק את סוג הנתונים
console.log(typeof data) // צריך להיות 'array'
```

#### "Cannot find module"
```
Module not found: Can't resolve './file'
```

**בדוק:**
1. שם הקובץ נכון?
2. Path נכון?
3. Extension נכון?

---

### ⚡ Performance Issues

#### בעיה: אתר איטי
```
Slow render, lag
```

**בדוק:**
1. Lighthouse (DevTools → Lighthouse)
2. Network tab - בדוק גודל קבצים
3. Console - בדוק לשגיאות חוזרות
4. React DevTools - בדוק renders מיותרים

**פתרונות:**
```javascript
// Use useMemo ו useCallback
const memoizedValue = useMemo(() => computeExpensiveValue(), [])
const memoizedCallback = useCallback(() => doSomething(), [])

// Lazy load components
import { lazy, Suspense } from 'react'
const Component = lazy(() => import('./Component'))
<Suspense fallback={<Loading />}>
  <Component />
</Suspense>
```

---

## 🆘 Emergency Restart

אם הכל שבור:

```bash
# 1. צא מה-dev server (Ctrl+C)

# 2. נקה cache
rm -rf node_modules
rm package-lock.json

# 3. התקן מחדש
npm install

# 4. הרץ מחדש
npm run dev
```

---

## 📞 דרכי סיוע

### בעיה במסמכים?
- בדוק את [README.md](./README.md)
- בדוק את [SETUP.md](./SETUP.md)
- בדוק את [CHEAT_SHEET.md](./CHEAT_SHEET.md)

### בעיה בקוד?
1. DevTools (F12)
2. Console לשגיאות
3. Redux DevTools
4. Network tab

### עוד עזרה?
- Search: StackOverflow, Google
- Docs: React, Redux, MUI
- Community: GitHub Discussions

---

**זכור: חשוב לקרוא את error messages בـ console! 🎯**
