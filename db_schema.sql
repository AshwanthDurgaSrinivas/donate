-- Database Schema for Save Punarvika - PostgreSQL (Compatible with PGAdmin)

-- Donations table
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  amount NUMERIC(15, 2) NOT NULL CHECK (amount >= 1),
  status TEXT DEFAULT 'pending', 
  order_id TEXT UNIQUE NOT NULL,
  payment_id TEXT,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Stats table (Atomic counters)
CREATE TABLE stats (
  id INT PRIMARY KEY DEFAULT 1,
  total_raised NUMERIC(20, 2) DEFAULT 0,
  total_donors INT DEFAULT 0,
  websites_sold INT DEFAULT 0,
  target_amount NUMERIC(20, 2) DEFAULT 160000000,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

-- Initialize stats row
INSERT INTO stats (id, total_raised, total_donors, websites_sold, target_amount) 
VALUES (1, 0, 0, 0, 160000000)
ON CONFLICT (id) DO NOTHING;

-- Website leads table
CREATE TABLE IF NOT EXISTS website_leads (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT, 
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
