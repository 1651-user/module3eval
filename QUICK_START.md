# Quick Start Commands for Ubuntu Terminal

## 1. Navigate to Project Directory
```bash
cd /home/dministrator/Basic_Programing/basic_programming/module3eval
```

## 2. Install Dependencies
```bash
npm install
```

## 3. Start Development Server
```bash
npm run dev
```

The app will be available at: http://localhost:5173

---

## 4. Push to GitHub (After Testing)

### Create GitHub Repository First:
1. Go to https://github.com
2. Click "New Repository"
3. Name it: **Module3Eval**
4. Do NOT initialize with README (we already have one)
5. Copy the repository URL

### Then run these commands:
```bash
# Add remote repository
git remote add origin <your-github-repo-url>

# Push to GitHub
git push -u origin master
# OR if your default branch is main:
git branch -M main
git push -u origin main
```

---

## 5. Regular Commits (Every 20 minutes)
```bash
git add .
git commit -m "Your descriptive commit message"
git push
```

---

## Example Commit Messages:
- "Add: Restaurant form validation"
- "Implement: Protected routes with role-based access"
- "Add: Confirm dialogs for update and delete operations"
- "Fix: Form clearing after successful addition"
- "Add: Search and filter functionality"
- "Refactor: Improve component structure"

---

## Testing Credentials:

### Admin:
- Email: admin@gmail.com
- Password: admin1234

### Customer:
- Email: customer@gmail.com
- Password: customer1234

---

## Current Git Status:
```bash
# Check current status
git status

# View commit history
git log --oneline

# Check remote URL
git remote -v
```
