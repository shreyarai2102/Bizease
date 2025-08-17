-- Update businesses table to allow null user_id for anonymous submissions
ALTER TABLE businesses ALTER COLUMN user_id DROP NOT NULL;

-- Add index for registration_id lookups
CREATE INDEX IF NOT EXISTS idx_businesses_registration_id ON businesses(registration_id);
