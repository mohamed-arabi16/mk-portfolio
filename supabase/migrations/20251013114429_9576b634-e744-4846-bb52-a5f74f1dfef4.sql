-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Create RLS policies for project-images bucket
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can update project images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Users can delete project images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-images' 
  AND auth.role() = 'authenticated'
);

-- Add bilingual description columns to projects table
ALTER TABLE projects ADD COLUMN description_en TEXT;
ALTER TABLE projects ADD COLUMN description_ar TEXT;

-- Migrate existing description data to description_en
UPDATE projects SET description_en = description WHERE description IS NOT NULL;

-- Drop old description column
ALTER TABLE projects DROP COLUMN description;