-- Add missing columns to checklist_items table
ALTER TABLE checklist_items 
ADD COLUMN IF NOT EXISTS is_required BOOLEAN DEFAULT true;

-- Update existing records to have is_required values
UPDATE checklist_items 
SET is_required = true 
WHERE is_required IS NULL;
