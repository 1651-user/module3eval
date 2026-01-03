# Module3Eval - Mini Restaurant Management App (Role-Based)

## 📋 Overview

A comprehensive React-based restaurant management application with role-based access control, featuring admin and customer dashboards with full CRUD operations on restaurant data.

## ✨ Features

### 🔐 Authentication & Authorization
- **Login System** with email and password validation
- **Role-Based Access Control** (Admin & Customer)
- **Protected Routes** - dashboards accessible only after login
- Persistent authentication using localStorage

### 👨‍💼 Admin Dashboard (`/admin/dashboard`)
- **Add Restaurant** - Sidebar form with auto-generated restaurant IDs
- **View All Restaurants** - Grid layout with restaurant cards
- **Update Restaurant** - Navigate to dedicated update page
- **Delete Restaurant** - Remove restaurants from the system
- **Search & Filter** - By name, address, type, and parking availability

### 👤 Customer Dashboard (`/customers/dashboard`)
- **View-Only Access** - Browse all restaurants
- **No CRUD Operations** - Cannot add, update, or delete
- **Search & Filter** - Same filtering capabilities as admin
- **Updated Data Visibility** - See changes made by admin in real-time

### 🔍 Search & Filters
- **Search Bar** - Search by restaurant name or address with auto-focus (useRef)
- **Type Filter** - Filter by cuisine type (Rajasthani, Gujarati, Mughlai, etc.)
- **Parking Filter** - Filter by parking availability

### 🛡️ Edge Cases Handled (Second Priority)

#### Form Validation
- ✅ Empty form validation before adding a restaurant
- ✅ Empty form validation before updating a restaurant
- ✅ All required fields must be filled

#### User Confirmations
- ✅ Confirm dialog before updating a restaurant: *"Are you sure you want to update this restaurant?"*
- ✅ Confirm dialog before deleting a restaurant: *"Are you sure you want to delete?"*

#### Success Feedback
- ✅ Alert message after successful restaurant addition
- ✅ Alert message after successful restaurant update
- ✅ Alert message after successful restaurant deletion
- ✅ Form clears automatically after successful addition

#### Authentication Alerts
- ✅ Alert for invalid login credentials: *"Invalid email or password"*

## ⚙️ React Concepts Used

### Core Hooks
- ✅ **useState** - Form data, search terms, filters
- ✅ **useEffect** - Data persistence, component mount actions
- ✅ **useRef** - Search input auto-focus

### Advanced Patterns
- ✅ **Context API** - AuthContext & RestaurantContext for global state
- ✅ **React Router** - Protected routes and navigation
- ✅ **Conditional Rendering** - Role-based UI components

### Component Architecture
- ✅ **Clean & Reusable Components** - Navbar, RestaurantCard, ProtectedRoute
- ✅ **Props-based Design** - Dashboard with proper props

## 📊 Restaurant Data Format

```json
{
  "restaurantID": 26,
  "restaurantName": "1135 AD",
  "address": "Jaipur, Amber Fort, Rajasthan",
  "type": "Rajasthani",
  "parkingLot": true,
  "image": "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaMLedhYr.jpg"
}
```

### Form Requirements
- **restaurantID** - Auto-generated using `Date.now()`
- **type** - Select dropdown with 7 cuisine options
- **parkingLot** - Select dropdown (Yes/No)
- **image** - Pre-filled with default image URL

## 🔑 Demo Credentials

### Admin Account
- **Email:** admin@gmail.com
- **Password:** admin1234
- **Access:** `/admin/dashboard`

### Customer Account
- **Email:** customer@gmail.com
- **Password:** customer1234
- **Access:** `/customers/dashboard`

## 🚀 Installation & Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
module3eval/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── RestaurantCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── RestaurantContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── CustomerDashboard.jsx
│   │   └── UpdateRestaurant.jsx
│   ├── styles/
│   │   ├── Login.css
│   │   ├── Dashboard.css
│   │   ├── Navbar.css
│   │   ├── RestaurantCard.css
│   │   └── UpdateRestaurant.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

## 💾 Local Storage

- **Key:** `evalData` - Stores all restaurant data
- **Key:** `user` - Stores authenticated user info
- UI automatically renders data from localStorage

## 🎨 Design Features

- 🌙 Premium dark theme with vibrant color palette
- ✨ Smooth animations and micro-interactions
- 💫 Glassmorphism effects
- 📱 Fully responsive design
- 🎯 Modern gradient buttons with hover effects
- 🔄 Smooth transitions throughout

## 📝 Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Login page |
| `/admin/dashboard` | Admin only | Admin dashboard with CRUD |
| `/admin/restaurants/update/:id` | Admin only | Update restaurant page |
| `/customers/dashboard` | Customer only | Customer view-only dashboard |

## 🔒 Protected Routes

- Dashboards do **not open without login**
- Admin routes → **admin only**
- Customer routes → **customer only**
- Invalid authentication redirects to login page

## 📤 Git Workflow

```bash
# Initial commit
git init
git add .
git commit -m "Initial commit: Restaurant Management App"

# Push to GitHub
git remote add origin <repository-url>
git push -u origin main

# Regular commits (every 20 minutes)
git add .
git commit -m "Descriptive commit message"
git push
```

## 🎯 Evaluation Criteria

- ✅ React core concepts implementation
- ✅ Edge case handling
- ✅ Clean component architecture
- ✅ Proper use of hooks and Context API
- ✅ Protected routing implementation
- ✅ Form validation and user feedback
- ✅ localStorage persistence
- ✅ Code quality and organization

## 📌 Important Notes

- Minimum styling used (focus on React concepts)
- Logic and implementation prioritized over UI
- All edge cases properly handled
- Meaningful commit messages
- No commits after deadline

## 🛠️ Technologies

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Vite** 5.0.8
- **localStorage** for data persistence

---

**Developed for Module 3 Evaluation**
