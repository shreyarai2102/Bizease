-- Update RLS policies to allow anonymous business creation
-- Drop existing policies
DROP POLICY IF EXISTS "Users can insert their own businesses" ON businesses;
DROP POLICY IF EXISTS "Users can view their own businesses" ON businesses;
DROP POLICY IF EXISTS "Users can insert their own checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Users can view their own checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Users can update their own checklist items" ON checklist_items;
DROP POLICY IF EXISTS "Users can insert their own e-cards" ON e_cards;
DROP POLICY IF EXISTS "Users can view their own e-cards" ON e_cards;

-- Create new policies that allow anonymous access for business registration
CREATE POLICY "Allow anonymous business creation" ON businesses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow business viewing by registration_id" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Allow checklist item creation" ON checklist_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow checklist item viewing" ON checklist_items
  FOR SELECT USING (true);

CREATE POLICY "Allow checklist item updates" ON checklist_items
  FOR UPDATE USING (true);

CREATE POLICY "Allow e-card creation" ON e_cards
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow e-card viewing" ON e_cards
  FOR SELECT USING (true);
