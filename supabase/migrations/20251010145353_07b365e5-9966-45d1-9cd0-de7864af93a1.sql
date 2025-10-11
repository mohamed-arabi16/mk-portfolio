-- Ensure all CMS tables exist with proper structure and RLS policies

-- Create app_role enum if it doesn't exist
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create user_roles table for admin access
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles"
  ON public.user_roles
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Update existing tables to ensure they support admin management

-- Portfolio config: Allow admins to manage all configs
DROP POLICY IF EXISTS "Admins can manage all portfolio configs" ON public.portfolio_config;
CREATE POLICY "Admins can manage all portfolio configs"
  ON public.portfolio_config
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Projects: Allow admins to manage all projects
DROP POLICY IF EXISTS "Admins can manage all projects" ON public.projects;
CREATE POLICY "Admins can manage all projects"
  ON public.projects
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Services: Allow admins to manage all services
DROP POLICY IF EXISTS "Admins can manage all services" ON public.services;
CREATE POLICY "Admins can manage all services"
  ON public.services
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Skills: Allow admins to manage all skills
DROP POLICY IF EXISTS "Admins can manage all skills" ON public.skills;
CREATE POLICY "Admins can manage all skills"
  ON public.skills
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Stats: Allow admins to manage all stats
DROP POLICY IF EXISTS "Admins can manage all stats" ON public.stats;
CREATE POLICY "Admins can manage all stats"
  ON public.stats
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Content items: Allow admins to manage all content items
DROP POLICY IF EXISTS "Admins can manage all content items" ON public.content_items;
CREATE POLICY "Admins can manage all content items"
  ON public.content_items
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials: Allow admins to manage all testimonials
DROP POLICY IF EXISTS "Admins can manage all testimonials" ON public.testimonials;
CREATE POLICY "Admins can manage all testimonials"
  ON public.testimonials
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));