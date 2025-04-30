# Money Tracker

A simple React + MUI + Tailwind app to track who owes whom what over the next 8 weeks. All data is stored in `localStorage`, so no backend is required.

## Features

- **Add transaction** — Choose a friend, amount, “Paid” or “Received”, and repayment in 1–8 weeks.
- **8-week dashboard** — Shows per-friend and per-week net amounts, plus column and grand totals.
- **Responsive layout** — Form on the left and dashboard on the right on desktop; stacked on mobile devices.
- **Zero backend** — Everything persists in browser `localStorage`.

## Tech Stack

- React
- Material-UI (MUI)
- Tailwind CSS
- date-fns
- Vite

## Folder Structure

```
src/
├── components/
│   ├── MoneyUpdateForm.jsx
│   └── Dashboard.jsx
├── App.jsx
└── index.css
```

## Prerequisites

- Node.js v14+
- npm or yarn

## Installation

1. Clone this repo:
   ```bash
   git clone https://github.com/your-username/sasefied-money-tracker.git
   cd sasefied-money-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser at `http://localhost:5173`

## Usage

1. **Add a transaction**
   - Pick a friend
   - Enter amount
   - Select “Paid” or “Received”
   - Choose repayment in weeks
   - Click **Save Transaction**

2. **View dashboard**
   - See Week 1…8 rows
   - Net per-friend and per-week totals
   - Bottom row shows column totals and grand total

## Customization

- **Friends list** — Edit the `friends` array in both components.
- **Weeks range** — Change `weekOptions` in `MoneyUpdateForm.jsx` and adjust the `8` in `Dashboard.jsx`.

## License

MIT. No warranty. Use at your own risk.

