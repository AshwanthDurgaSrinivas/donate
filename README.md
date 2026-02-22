# 500 Websites for Life – Save Punarvika

This project is a full-stack donation platform dedicated to raising funds for Punarvika's SMA treatment.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: Supabase (PostgreSQL)
- **Payment**: Razorpay Integration

## Getting Started

### 1. Prerequisites
- Node.js installed
- Supabase account (for database)
- Razorpay account (for payments)

### 2. Setup Database (Supabase)
Run the following SQL in your Supabase SQL Editor:
```sql
-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_name TEXT NOT NULL,
  city TEXT,
  email TEXT,
  phone TEXT,
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  transaction_id TEXT,
  order_id TEXT,
  package_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 3. Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` from the provided template and add your credentials.
4. `npm start`

### 4. Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Features
- **Emotional Hero Section**: Engaging design to connect with donors.
- **Live Progress Bar**: Real-time tracking of the ₹16 Crore goal.
- **Public Dashboard**: Transparent feed of all donations.
- **Business Package**: Dedicated section for buying websites for ₹10,000.
- **Transparency Hub**: Downloadable proofs and reports.
- **Admin Panel**: Secure dashboard to manage transactions and proofs.
