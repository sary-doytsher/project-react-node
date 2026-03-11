# 📑 Index - רשימת כל הקבצים

## 🎯 מסמכי התחלה (START HERE!)

### בחר לפי מטרה:

**רוצה להתחיל מהר?**
→ [SETUP.md](./SETUP.md)

**רוצה להבין את הפרויקט?**
→ [README.md](./README.md)

**יש לך בעיה?**
→ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

**רוצה להעלות לאינטרנט?**
→ [DEPLOYMENT.md](./DEPLOYMENT.md)

**רוצה טיפים וטריקים?**
→ [CHEAT_SHEET.md](./CHEAT_SHEET.md)

---

## 📚 ניווט לפי סוג קובץ

### 📝 Documentation (10 files)
| קובץ | תיאור | קריאה |
|------|-------|--------|
| [README.md](./README.md) | תיעוד ראשי ומלא | ⭐⭐⭐ |
| [SETUP.md](./SETUP.md) | מדריך התקנה מהיר | ⭐⭐⭐ |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | סיכום הפרויקט | ⭐⭐ |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | מבנה תיקיות | ⭐⭐ |
| [SAMPLE_DATA.md](./SAMPLE_DATA.md) | דוגמאות נתונים | ⭐ |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | תיעוד endpoints | ⭐⭐ |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | הנחיות Deploy | ⭐⭐⭐ |
| [CHEAT_SHEET.md](./CHEAT_SHEET.md) | ייחוס מהיר | ⭐⭐ |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | פתרון בעיות | ⭐⭐ |
| [FINAL_REPORT.md](./FINAL_REPORT.md) | דוח סיום | ⭐ |

### ⚙️ Config Files (5 files)
| קובץ | תיאור |
|------|-------|
| `package.json` | Dependencies ו-scripts |
| `vite.config.js` | Vite configuration |
| `index.html` | HTML root |
| `.gitignore` | Git ignore rules |
| `.env.example` | Environment template |

### 🔧 Scripts (1 file)
| קובץ | תיאור |
|------|-------|
| `download-images.ps1` | הורדת תמונות placeholder |

---

## 💻 Source Code (`src/` directory)

### API Services (3 files)
```
src/api/
├── productService.js  - CRUD operations on products
├── userService.js     - Signup, Login, User profile
└── orderService.js    - Order management
```

### Redux Store (4 files)
```
src/app/
└── store.js           - Redux store configuration

src/features/
├── products/
│   └── productsSlice.js    - Products state management
├── cart/
│   └── cartSlice.js        - Cart state management
└── user/
    └── userSlice.js        - User state management
```

### Pages (6 files)
```
src/pages/
├── ProductList.jsx    - All products view
├── Cart.jsx          - Shopping cart
├── Login.jsx         - User login
├── SignUp.jsx        - User registration
├── AddProduct.jsx    - Admin: Add product
└── EditProduct.jsx   - Admin: Edit product
```

### Components (2 files)
```
src/components/
├── NavBar.jsx        - Navigation bar
└── Product.jsx       - Product card
```

### Styling (2 files)
```
src/css/
├── global.css        - Global styles
└── components.css    - Component styles
```

### Core Files (5 files)
```
src/
├── App.jsx           - Main app component
├── App.css           - App styles
├── main.jsx          - Entry point
├── index.css         - Base styles
├── config.js         - App configuration
└── mockData.js       - Mock data for development
```

---

## 📁 Assets

### Images Folder
```
public/images/
├── README.txt       - Instructions
├── pic1.jpg        - ← Add images here
├── pic2.jpg
├── pic3.jpg
├── pic4.jpg
├── pic5.jpg
├── laptop.jpg
├── phone.jpg
├── tablet.jpg
├── headphones.jpg
└── camera.jpg
```

---

## 🗺️ Quick Reference by Task

### "I want to..."

#### ...understand the project structure
1. [README.md](./README.md) - Start here
2. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - See all files
3. [SAMPLE_DATA.md](./SAMPLE_DATA.md) - Understand data format

#### ...set up and run the project
1. [SETUP.md](./SETUP.md) - Installation steps
2. Run `npm install`
3. Add images to `public/images/`
4. Run `npm run dev`

#### ...add/modify a feature
1. [CHEAT_SHEET.md](./CHEAT_SHEET.md) - Code snippets
2. Check `src/` directory
3. Use Redux DevTools to debug

#### ...connect to my API
1. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - See all endpoints
2. Update URLs in `src/api/*.js` files
3. Test with Redux DevTools

#### ...solve a problem
1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
2. Check `console` in browser DevTools
3. Use Redux DevTools to inspect state

#### ...deploy to production
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Full guide
2. `npm run build`
3. Upload to Netlify/Vercel

#### ...learn React/Redux concepts
1. [CHEAT_SHEET.md](./CHEAT_SHEET.md) - Quick reference
2. Links in each document
3. Official documentation

---

## 📊 File Count Summary

| Category | Count |
|----------|-------|
| Documentation | 10 |
| Config Files | 5 |
| API Services | 3 |
| Redux | 4 |
| Pages | 6 |
| Components | 2 |
| CSS | 2 |
| Core | 5 |
| Scripts | 1 |
| **TOTAL** | **38+** |

---

## 🚀 Recommended Reading Order

### For First Time Users:
1. [SETUP.md](./SETUP.md) - Get it running
2. [README.md](./README.md) - Understand features
3. [CHEAT_SHEET.md](./CHEAT_SHEET.md) - Learn code patterns
4. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Explore files

### For Developers:
1. [README.md](./README.md) - Feature overview
2. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Backend integration
3. [CHEAT_SHEET.md](./CHEAT_SHEET.md) - Code reference
4. Start with `src/pages/ProductList.jsx`

### For Troubleshooting:
1. [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues
2. Browser DevTools Console
3. Redux DevTools
4. Check the specific file in `src/`

### For Deployment:
1. [DEPLOYMENT.md](./DEPLOYMENT.md) - Full guide
2. [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Feature checklist
3. [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - Backend setup

---

## 💡 Pro Tips

1. **Use Ctrl+K Ctrl+O** in VS Code to quickly open files
2. **Use Ctrl+Shift+F** to search across all files
3. **Open terminal in VS Code** with Ctrl+` for quick npm commands
4. **Use Redux DevTools** to understand state changes
5. **Read error messages** in the console carefully!

---

## 🎯 What's Next?

- [ ] Run `npm install`
- [ ] Add images
- [ ] Run `npm run dev`
- [ ] Open [http://localhost:5173](http://localhost:5173)
- [ ] Explore the app
- [ ] Read [CHEAT_SHEET.md](./CHEAT_SHEET.md) for code patterns
- [ ] Connect to your API

---

**Start with [SETUP.md](./SETUP.md) right now! 🚀**
