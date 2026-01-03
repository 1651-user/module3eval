# Restaurant Management App

A React application for managing restaurants with role-based access control.

## Features

### Authentication
- Login system with email and password
- Two user roles: Admin and Customer
- Protected routes based on user role

### Admin Features
- Add new restaurants
- Update existing restaurants
- Delete restaurants
- Search and filter restaurants

### Customer Features
- View all restaurants
- Search and filter restaurants
- No modify permissions

## Edge Cases Handled

1. Form validation prevents empty submissions
2. Form clears after successful restaurant addition
3. Confirmation dialog before updating a restaurant
4. Confirmation dialog before deleting a restaurant
5. Success alerts after add, update, and delete operations

## React Concepts Used

- useState for managing state
- useEffect for side effects
- useRef for search input focus
- Context API for global state management
- React Router for navigation
- Conditional rendering for role-based UI

## Installation

```bash
npm install
npm run dev
```

## Login Credentials

Admin:
- Email: admin@gmail.com
- Password: admin1234

Customer:
- Email: customer@gmail.com
- Password: customer1234

## Restaurant Data Structure

Each restaurant has:
- restaurantID (auto-generated)
- restaurantName
- address
- type (Rajasthani, Gujarati, Mughlai, etc.)
- parkingLot (true/false)
- image URL

## Data Storage

All data is stored in localStorage with the key "evalData".

## Routes

- / - Login page
- /admin/dashboard - Admin dashboard
- /admin/restaurants/update/:id - Update restaurant
- /customers/dashboard - Customer dashboard

## Technologies

- React 18.2.0
- React Router DOM 6.20.0
- Vite 5.0.8
- localStorage for data persistence
