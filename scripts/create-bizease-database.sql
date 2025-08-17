-- Create businesses table to store business registration data
CREATE TABLE IF NOT EXISTS public.businesses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    industry TEXT NOT NULL,
    owner_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Delhi',
    state TEXT DEFAULT 'Delhi',
    pincode TEXT NOT NULL,
    employees_count TEXT NOT NULL,
    annual_revenue TEXT,
    registration_id TEXT UNIQUE DEFAULT ('BIZ-' || UPPER(SUBSTRING(gen_random_uuid()::text, 1, 8))),
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create checklist_items table to store checklist progress
CREATE TABLE IF NOT EXISTS public.checklist_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    estimated_time TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_ecards table to store generated e-cards
CREATE TABLE IF NOT EXISTS public.business_ecards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
    qr_data JSONB NOT NULL,
    validity_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_ecards ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access for business registration
CREATE POLICY "Allow public insert on businesses" ON public.businesses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select on businesses" ON public.businesses
    FOR SELECT USING (true);

CREATE POLICY "Allow public update on businesses" ON public.businesses
    FOR UPDATE USING (true);

-- Create policies for checklist items
CREATE POLICY "Allow public access on checklist_items" ON public.checklist_items
    FOR ALL USING (true);

-- Create policies for e-cards
CREATE POLICY "Allow public access on business_ecards" ON public.business_ecards
    FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_businesses_registration_id ON public.businesses(registration_id);
CREATE INDEX IF NOT EXISTS idx_businesses_email ON public.businesses(email);
CREATE INDEX IF NOT EXISTS idx_checklist_items_business_id ON public.checklist_items(business_id);
CREATE INDEX IF NOT EXISTS idx_business_ecards_business_id ON public.business_ecards(business_id);
