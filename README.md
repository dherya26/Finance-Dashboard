# Finance Dashboard

A responsive React + Vite dashboard for personal finance tracking with charts, insights, and role-based access.

## Features

- Dashboard overview with summary cards
- Balance trend visualization (time-based)
- Spending breakdown visualization (category-based)
- Transaction list with details
- Transaction filtering, sorting, and search
- Role-based UI (Viewer and Admin)
- Insights section for quick analysis
- Zustand state management
- Dark and light theme support
- Responsive layout for desktop and mobile
- INR currency formatting across the app

## Tech Stack

- React (JavaScript)
- Vite
- Tailwind CSS
- Recharts
- Zustand
- date-fns

## Project Structure

```text
finance-dashboard/
  src/
    components/
      cards/
      charts/
      transactions/
      ui/
    data/
    pages/
    store/
    utils/
  public/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Roles

- Viewer: can view dashboards and transactions
- Admin: can add and manage transactions

## Notes

- Theme preference is saved in local storage.
- Currency values are formatted in Indian Rupees (INR).
