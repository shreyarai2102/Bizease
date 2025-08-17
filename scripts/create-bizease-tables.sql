-- Create businesses table to store business registration data
CREATE TABLE IF NOT EXISTS businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name VARCHAR(255) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  owner_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL DEFAULT 'Delhi',
  state VARCHAR(100) NOT NULL DEFAULT 'Delhi',
  pincode VARCHAR(10) NOT NULL,
  employee_count VARCHAR(50) NOT NULL,
  annual_revenue VARCHAR(50),
  registration_id VARCHAR(50) UNIQUE,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checklist_items table to store dynamic checklist data
CREATE TABLE IF NOT EXISTS checklist_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  estimated_time VARCHAR(50),
  status VARCHAR(50) DEFAULT 'pending',
  is_required BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create e_cards table to store generated e-card data
CREATE TABLE IF NOT EXISTS e_cards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  card_data JSONB NOT NULL,
  qr_code_data TEXT,
  validity_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE e_cards ENABLE ROW LEVEL SECURITY;

-- Create policies for businesses table
CREATE POLICY "Users can view their own businesses" ON businesses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own businesses" ON businesses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own businesses" ON businesses
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for checklist_items table
CREATE POLICY "Users can view their own checklist items" ON checklist_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = checklist_items.business_id 
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own checklist items" ON checklist_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = checklist_items.business_id 
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own checklist items" ON checklist_items
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = checklist_items.business_id 
      AND businesses.user_id = auth.uid()
    )
  );

-- Create policies for e_cards table
CREATE POLICY "Users can view their own e-cards" ON e_cards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = e_cards.business_id 
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own e-cards" ON e_cards
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses 
      WHERE businesses.id = e_cards.business_id 
      AND businesses.user_id = auth.uid()
    )
  );
