-- Add hero background URL to portfolio_config table
ALTER TABLE portfolio_config 
ADD COLUMN IF NOT EXISTS hero_bg_url TEXT DEFAULT '/src/assets/hero-bg.jpg';