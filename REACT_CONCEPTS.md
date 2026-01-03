# ⚙️ React Concepts Implementation

## Comprehensive Guide to All React Concepts Used

### 1. useState Hook

#### Location & Usage:

**Login.jsx**
```javascript
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
```
- Manages controlled form inputs for email and password

**AdminDashboard.jsx**
```javascript
const [formData, setFormData] = useState({
  restaurantName: '',
  address: '',
  type: '',
  parkingLot: '',
  image: '...'
});
const [searchTerm, setSearchTerm] = useState('');
const [typeFilter, setTypeFilter] = useState('');
const [parkingFilter, setParkingFilter] = useState('');
```
- Manages restaurant form data
- Manages search and filter states

**UpdateRestaurant.jsx**
```javascript
const [formData, setFormData] = useState({
  restaurantName: '',
  address: '',
  type: '',
  parkingLot: '',
  image: ''
});
```
- Pre-fills and manages update form data

**AuthContext.jsx**
```javascript
const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
```
- Manages authentication state globally

**RestaurantContext.jsx**
```javascript
const [restaurants, setRestaurants] = useState([]);
```
- Manages restaurant list globally

---

### 2. useEffect Hook

#### Location & Usage:

**AuthContext.jsx**
```javascript
useEffect(() => {
  // Check if user is already logged in
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setIsAuthenticated(true);
  }
}, []);
```
- Loads authentication state from localStorage on mount

**RestaurantContext.jsx**
```javascript
useEffect(() => {
  // Load restaurants from localStorage on mount
  const storedRestaurants = localStorage.getItem('evalData');
  if (storedRestaurants) {
    setRestaurants(JSON.parse(storedRestaurants));
  }
}, []);

useEffect(() => {
  // Sync to localStorage whenever restaurants change
  if (restaurants.length >= 0) {
    localStorage.setItem('evalData', JSON.stringify(restaurants));
  }
}, [restaurants]);
```
- Loads restaurant data on mount
- Syncs data to localStorage on every change

**AdminDashboard.jsx & CustomerDashboard.jsx**
```javascript
useEffect(() => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
}, []);
```
- Auto-focuses search input when component mounts

**UpdateRestaurant.jsx**
```javascript
useEffect(() => {
  const restaurant = getRestaurantById(Number(id));
  if (restaurant) {
    setFormData({
      restaurantName: restaurant.restaurantName,
      address: restaurant.address,
      type: restaurant.type,
      parkingLot: restaurant.parkingLot,
      image: restaurant.image
    });
  } else {
    navigate('/admin/dashboard');
  }
}, [id, getRestaurantById, navigate]);
```
- Pre-fills form with existing restaurant data

---

### 3. useRef Hook

#### Location & Usage:

**AdminDashboard.jsx**
```javascript
const searchInputRef = useRef(null);

// Later used to auto-focus
useEffect(() => {
  if (searchInputRef.current) {
    searchInputRef.current.focus();
  }
}, []);
```

**CustomerDashboard.jsx**
```javascript
const searchInputRef = useRef(null);
```

**Navbar.jsx**
```javascript
<input
  ref={searchInputRef}
  type="text"
  placeholder="🔍 Search by name or address..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-input"
/>
```
- Provides direct access to DOM element for auto-focusing

---

### 4. Context API

#### Location & Implementation:

**AuthContext.jsx**
```javascript
// Create context
const AuthContext = createContext(null);

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password) => { /* ... */ };
  const logout = () => { /* ... */ };

  const value = { user, isAuthenticated, login, logout };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

**RestaurantContext.jsx**
```javascript
// Create context
const RestaurantContext = createContext(null);

// Custom hook
export const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error('useRestaurant must be used within RestaurantProvider');
  }
  return context;
};

// Provider component with CRUD operations
export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);

  const addRestaurant = (restaurant) => { /* ... */ };
  const updateRestaurant = (restaurantID, updatedData) => { /* ... */ };
  const deleteRestaurant = (restaurantID) => { /* ... */ };
  const getRestaurantById = (restaurantID) => { /* ... */ };

  const value = {
    restaurants,
    addRestaurant,
    updateRestaurant,
    deleteRestaurant,
    getRestaurantById
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
};
```

**Usage in Components:**
```javascript
// AdminDashboard.jsx
const { restaurants, addRestaurant } = useRestaurant();
const { logout } = useAuth();

// RestaurantCard.jsx
const { deleteRestaurant } = useRestaurant();

// UpdateRestaurant.jsx
const { getRestaurantById, updateRestaurant } = useRestaurant();
```

---

### 5. React Router

#### Location & Implementation:

**App.jsx**
```javascript
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <Router>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Login />} />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/restaurants/update/:id"
              element={
                <ProtectedRoute allowedRole="admin">
                  <UpdateRestaurant />
                </ProtectedRoute>
              }
            />

            {/* Customer Routes - Protected */}
            <Route
              path="/customers/dashboard"
              element={
                <ProtectedRoute allowedRole="customer">
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </RestaurantProvider>
    </AuthProvider>
  );
}
```

**Navigation Hooks:**
```javascript
// Login.jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

if (result.role === 'admin') {
  navigate('/admin/dashboard');
} else {
  navigate('/customers/dashboard');
}

// RestaurantCard.jsx
const navigate = useNavigate();
const handleUpdate = () => {
  navigate(`/admin/restaurants/update/${restaurant.restaurantID}`);
};

// UpdateRestaurant.jsx
import { useParams } from 'react-router-dom';
const { id } = useParams();
```

---

### 6. Conditional Rendering

#### Location & Examples:

**ProtectedRoute.jsx**
```javascript
const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    const redirectPath = user?.role === 'admin' ? '/admin/dashboard' : '/customers/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
```

**RestaurantCard.jsx**
```javascript
{isAdmin && (
  <div className="card-actions">
    <button onClick={handleUpdate} className="update-btn">
      ✏️ Update
    </button>
    <button onClick={handleDelete} className="delete-btn">
      🗑️ Delete
    </button>
  </div>
)}
```
- Shows Update/Delete buttons only for admin

**AdminDashboard.jsx & CustomerDashboard.jsx**
```javascript
{filteredRestaurants.length === 0 ? (
  <div className="no-restaurants">
    <p>No restaurants found</p>
  </div>
) : (
  <div className="restaurant-grid">
    {filteredRestaurants.map(restaurant => (
      <RestaurantCard
        key={restaurant.restaurantID}
        restaurant={restaurant}
        isAdmin={true}
      />
    ))}
  </div>
)}
```
- Conditional rendering based on filtered results

**Dashboard.css**
```css
.dashboard-content {
  display: grid;
  grid-template-columns: 350px 1fr;
}

.dashboard-content.customer-view {
  grid-template-columns: 1fr;
}
```
- Customer dashboard doesn't show sidebar

---

### 7. Clean and Reusable Components

#### Component Structure:

**Reusable Components:**

1. **Navbar.jsx**
   - Props: `role`, `onLogout`, `searchTerm`, `setSearchTerm`, etc.
   - Used in both Admin and Customer dashboards
   - Accepts forwarded ref for search input

2. **RestaurantCard.jsx**
   - Props: `restaurant`, `isAdmin`
   - Conditionally renders admin actions
   - Used in both dashboards with different props

3. **ProtectedRoute.jsx**
   - Props: `children`, `allowedRole`
   - Reusable for any protected route
   - Handles all authentication logic

**Component Props Pattern:**
```javascript
// RestaurantCard.jsx
const RestaurantCard = ({ restaurant, isAdmin }) => {
  // Component logic
};

// Navbar.jsx
const Navbar = ({ 
  role, 
  onLogout, 
  searchTerm, 
  setSearchTerm, 
  typeFilter, 
  setTypeFilter,
  parkingFilter,
  setParkingFilter,
  searchInputRef
}) => {
  // Component logic
};

// ProtectedRoute.jsx
const ProtectedRoute = ({ children, allowedRole }) => {
  // Component logic
};
```

---

## 📊 Summary Table

| Concept | Files Used | Count |
|---------|-----------|-------|
| **useState** | Login, AdminDashboard, CustomerDashboard, UpdateRestaurant, AuthContext, RestaurantContext | 10+ instances |
| **useEffect** | AuthContext, RestaurantContext, AdminDashboard, CustomerDashboard, UpdateRestaurant | 6 instances |
| **useRef** | AdminDashboard, CustomerDashboard, Navbar | 3 instances |
| **Context API** | AuthContext, RestaurantContext (used in 7 components) | 2 contexts |
| **React Router** | App, Login, all Dashboards, UpdateRestaurant, ProtectedRoute | 5 routes |
| **Conditional Rendering** | ProtectedRoute, RestaurantCard, Dashboards | 8+ instances |
| **Reusable Components** | Navbar, RestaurantCard, ProtectedRoute | 3 components |

---

## 🎯 Best Practices Demonstrated

1. **Custom Hooks** - `useAuth()`, `useRestaurant()` for clean context consumption
2. **Error Handling** - Context validation with helpful error messages
3. **Prop Validation** - Proper prop passing and destructuring
4. **Component Composition** - Provider pattern, wrapper components
5. **Separation of Concerns** - Contexts handle business logic, components handle UI
6. **DRY Principle** - Reusable components avoid code duplication
7. **Controlled Components** - All form inputs are controlled
8. **Side Effect Management** - useEffect for data persistence and DOM manipulation

---

**All required React concepts have been successfully implemented!**
