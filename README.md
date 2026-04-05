# Finance Dashboard

A responsive finance dashboard built with React + Vite for tracking income and expenses through charts, insights, and role-based actions.

## Assignment Coverage

- Dashboard overview with summary cards
- Time-based visualization (Balance Trend)
- Category-based visualization (Spending Breakdown)
- Transaction list with details
- Transaction filtering, sorting, and search
- Role-based UI (Viewer and Admin)
- Insights section
- State management with Zustand
- Responsive design for desktop and mobile

## Core Features

- Real-time totals for balance, income, and expenses
- Pie chart for expense category distribution
- Line chart for month-by-month trend overview
- Transaction add flow (Admin), read-only flow (Viewer)
- Consistent INR formatting across cards, charts, and table
- Light/Dark theme with persistent preference

## Tech Stack

- React (JavaScript)
- Vite
- Tailwind CSS + custom CSS variables
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

## Local Setup

```bash
npm install
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - production build
- `npm run preview` - preview production build locally

## Roles

- Viewer: can view dashboard and transactions
- Admin: can add/manage transactions

## Technical Decisions and Trade-offs

- Zustand was chosen over Redux for lower boilerplate and faster development.
- Recharts was used to accelerate chart delivery with React-friendly APIs.
- Data is currently mock/in-memory for assignment speed; backend persistence can be added later.
- JavaScript was used for rapid iteration; TypeScript migration is straightforward if stricter typing is needed.

## Notes

- Theme preference is saved in local storage.
- Currency formatting uses Indian Rupees (INR).
