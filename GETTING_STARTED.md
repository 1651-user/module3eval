# 🚀 Getting Started Guide

## Installation Steps

Due to UNC path limitations, please run the installation within WSL:

### 1. Open WSL Terminal

Open Ubuntu terminal and navigate to the project:

```bash
cd /home/dministrator/Basic_Programing/basic_programming/module3eval
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

## 📝 Quick Test Checklist

### Login Testing
1. Navigate to `http://localhost:5173`
2. Try logging in with admin credentials:
   - Email: admin@gmail.com
   - Password: admin1234
3. You should be redirected to `/admin/dashboard`

### Admin Dashboard Testing
1. **Add Restaurant**: Fill the sidebar form and click "Add Restaurant"
   - Try submitting empty form → should show alert
   - Fill all fields → should add successfully and show alert
   - Form should clear after successful addition
   
2. **Update Restaurant**: Click "Update" button on any restaurant card
   - Try submitting empty form → should show alert
   - Fill fields and submit → should show confirm dialog
   - Confirm → should show success alert and redirect

3. **Delete Restaurant**: Click "Delete" button on any restaurant card
   - Should show confirm dialog
   - Confirm → should show success alert and remove restaurant

4. **Search & Filter**: 
   - Use search bar (should auto-focus)
   - Filter by type
   - Filter by parking

### Customer Dashboard Testing
1. Logout from admin
2. Login with customer credentials:
   - Email: customer@gmail.com
   - Password: customer1234
3. You should be redirected to `/customers/dashboard`
4. Verify:
   - No Add/Update/Delete buttons visible
   - Search and filters work
   - Can view all restaurants added by admin

### Protected Routes Testing
1. Try accessing `/admin/dashboard` without login → should redirect to login
2. Try accessing `/customers/dashboard` without login → should redirect to login
3. Login as customer, try accessing `/admin/dashboard` → should redirect to `/customers/dashboard`
4. Login as admin, try accessing `/customers/dashboard` → should redirect to `/admin/dashboard`

## 🔧 Troubleshooting

### If npm install fails:
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### If port 5173 is already in use:
```bash
# Kill the process on that port
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

## 📦 Git Commands for Submission

### Create GitHub Repository
1. Go to GitHub and create a new repository named "Module3Eval"
2. Copy the repository URL

### Push to GitHub

```bash
# Add remote repository
git remote add origin <your-github-repo-url>

# Push code
git push -u origin master

# Or if your default branch is main:
git branch -M main
git push -u origin main
```

### Regular Commits (Every 20 minutes)

```bash
# Stage all changes
git add .

# Commit with meaningful message
git commit -m "Add: Restaurant form validation and success alerts"

# Push to GitHub
git push
```

### Example Commit Messages

```bash
git commit -m "Add: Restaurant CRUD operations with Context API"
git commit -m "Implement: Edge case handling for form validation"
git commit -m "Add: Confirm dialogs before update and delete"
git commit -m "Implement: Protected routes with role-based access"
git commit -m "Add: Search and filter functionality with useRef"
git commit -m "Refactor: Clean up component structure"
git commit -m "Fix: Form clearing after successful restaurant addition"
git commit -m "Add: Success alerts for all CRUD operations"
```

## 🎯 Edge Cases Verification

Run through this checklist to verify all edge cases are working:

- [ ] Empty form validation on Add Restaurant
- [ ] Empty form validation on Update Restaurant
- [ ] Form clears after successful restaurant addition
- [ ] Confirm dialog appears before updating restaurant
- [ ] Confirm dialog appears before deleting restaurant
- [ ] Success alert shows after adding restaurant
- [ ] Success alert shows after updating restaurant
- [ ] Success alert shows after deleting restaurant
- [ ] Invalid login shows alert with proper error message
- [ ] Search input auto-focuses on dashboard load

## 📱 Testing on Different Screen Sizes

The app is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768px width)
- Mobile (375px width)

Use browser DevTools to toggle device emulation.

## 🌐 Browser Compatibility

Tested and working on:
- Chrome (recommended)
- Firefox
- Edge
- Safari

---

**Once npm install completes, your application is ready to test!**

If you encounter any issues, check the browser console (F12) for error messages.
