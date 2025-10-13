-- Create contact_project_types table
CREATE TABLE public.contact_project_types (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  label_en text NOT NULL,
  label_ar text NOT NULL,
  value text NOT NULL UNIQUE,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_project_types ENABLE ROW LEVEL SECURITY;

-- Public can view active project types
CREATE POLICY "Public can view active project types"
  ON public.contact_project_types FOR SELECT
  USING (is_active = true);

-- Users can view their own project types
CREATE POLICY "Users can view own project types"
  ON public.contact_project_types FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can insert their own project types
CREATE POLICY "Users can insert own project types"
  ON public.contact_project_types FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own project types
CREATE POLICY "Users can update own project types"
  ON public.contact_project_types FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own project types
CREATE POLICY "Users can delete own project types"
  ON public.contact_project_types FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_contact_project_types_updated_at
  BEFORE UPDATE ON public.contact_project_types
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default project types for existing users
INSERT INTO public.contact_project_types (user_id, label_en, label_ar, value, display_order)
SELECT 
  id,
  'App MVP Sprint',
  'سباق تطوير التطبيق MVP',
  'app-mvp',
  0
FROM auth.users
UNION ALL
SELECT 
  id,
  'Content Growth 30-Day',
  'نمو المحتوى لمدة 30 يومًا',
  'content-growth',
  1
FROM auth.users
UNION ALL
SELECT 
  id,
  'Hybrid Launch',
  'إطلاق هجين',
  'hybrid-launch',
  2
FROM auth.users
UNION ALL
SELECT 
  id,
  'Consulting',
  'استشارات',
  'consulting',
  3
FROM auth.users
UNION ALL
SELECT 
  id,
  'Other',
  'أخرى',
  'other',
  4
FROM auth.users;