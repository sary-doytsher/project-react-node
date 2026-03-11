# מדריך התקנה מהירה

## שלב 1: התקנת Dependencies

פתח טרמינל בתיקיית הפרויקט והרץ:

```bash
npm install
```

## שלב 2: הוספת תמונות (חשוב!)

התיקייה `public/images` נוצרה אך ריקה.

**אפשרות 1: הורד תמונות מהאינטרנט**
1. עבור לאתרים כמו [Unsplash](https://unsplash.com) או [Pexels](https://pexels.com)
2. חפש תמונות של מוצרים (מחשבים, טלפונים, אוזניות וכו')
3. שמור את התמונות עם השמות הבאים:
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

**אפשרות 2: צור תמונות placeholder**
אם אין לך תמונות, אפשר להשתמש בשירות placeholder:
- https://via.placeholder.com/400x300
- שמור תמונות אלו עם השמות הנדרשים

## שלב 3: הגדרת השרת

עדכן את כתובת השרת בקבצים הבאים:
- `src/api/productService.js`
- `src/api/userService.js`
- `src/api/orderService.js`

שנה את הקבוע `API_URL` לכתובת השרת שלך (ברירת מחדל: `http://localhost:3000`)

## שלב 4: הפעלת הפרויקט

```bash
npm run dev
```

האתר יהיה זמין ב: http://localhost:5173

## שלב 5: התקנת Redux DevTools (מומלץ)

התקן את התוסף בדפדפן שלך:
- **Chrome**: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
- **Firefox**: https://addons.mozilla.org/firefox/addon/reduxdevtools/

התוסף מאפשר לצפות ב-Redux State בזמן אמת.

## בדיקת התקינות

1. פתח את האפליקציה בדפדפן
2. ודא שה-NavBar מוצג
3. נסה לעבור בין הדפים
4. פתח Redux DevTools (F12 → Redux tab)
5. בדוק שהסטייט הגלובלי מוגדר נכון

## נתוני דוגמה

אם אין לך שרת זמין, תוכל להשתמש בנתוני Mock (ראה `SAMPLE_DATA.md`)

## פתרון בעיות

### תמונות לא מוצגות
```
✓ ודא שהקבצים נמצאים ב-public/images/
✓ בדוק את שם הקובץ (case-sensitive)
✓ רענן את הדף (Ctrl+F5)
```

### שגיאות Build
```bash
# נקה node_modules והתקן מחדש
rm -rf node_modules package-lock.json
npm install
```

### בעיות CORS
```
✓ ודא שהשרת מאפשר CORS
✓ בדוק את כתובת השרת ב-API services
✓ השתמש ב-proxy בvite.config.js
```

## מוכן לעבוד! 🎉

כעת אתה יכול:
- 👁️ לצפות במוצרים
- 🛒 להוסיף לסל
- 👤 להירשם ולהתחבר
- (מנהלים) ➕ להוסיף ולערוך מוצרים
