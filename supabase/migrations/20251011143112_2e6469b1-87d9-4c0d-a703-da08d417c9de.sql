-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Portfolio Config Table
CREATE TABLE public.portfolio_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  username TEXT UNIQUE,
  name TEXT,
  bio_en TEXT,
  bio_ar TEXT,
  location TEXT,
  email TEXT,
  phone TEXT,
  whatsapp_link TEXT,
  cv_url TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  hero_title_1_en TEXT,
  hero_title_1_ar TEXT,
  hero_title_2_en TEXT,
  hero_title_2_ar TEXT,
  hero_subtitle_en TEXT,
  hero_subtitle_ar TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.portfolio_config ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_portfolio_config_updated_at
  BEFORE UPDATE ON public.portfolio_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Projects Table
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  role TEXT,
  stack TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  project_url TEXT,
  is_coming_soon BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Services Table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  icon TEXT,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  features_en TEXT[] DEFAULT '{}',
  features_ar TEXT[] DEFAULT '{}',
  price_en TEXT,
  price_ar TEXT,
  timeline_en TEXT,
  timeline_ar TEXT,
  cta_text_en TEXT,
  cta_text_ar TEXT,
  cta_link TEXT,
  is_external BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Skills Table
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_skills_updated_at
  BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Content Items Table
CREATE TABLE public.content_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title_en TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  thumbnail_url TEXT,
  external_url TEXT,
  platform TEXT,
  content_type TEXT,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  engagement_rate NUMERIC(5,2) DEFAULT 0,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON public.content_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Testimonials Table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  client_name TEXT NOT NULL,
  client_title_en TEXT,
  client_title_ar TEXT,
  content_en TEXT NOT NULL,
  content_ar TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Stats Table
CREATE TABLE public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stat_key TEXT NOT NULL,
  label_en TEXT NOT NULL,
  label_ar TEXT NOT NULL,
  value TEXT NOT NULL,
  description_en TEXT,
  description_ar TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, stat_key)
);

ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_stats_updated_at
  BEFORE UPDATE ON public.stats
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for portfolio_config
CREATE POLICY "Users can view own config"
  ON public.portfolio_config FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own config"
  ON public.portfolio_config FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own config"
  ON public.portfolio_config FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for projects
CREATE POLICY "Users can view own projects"
  ON public.projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
  ON public.projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
  ON public.projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
  ON public.projects FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for services
CREATE POLICY "Users can view own services"
  ON public.services FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own services"
  ON public.services FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own services"
  ON public.services FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own services"
  ON public.services FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for skills
CREATE POLICY "Users can view own skills"
  ON public.skills FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills"
  ON public.skills FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills"
  ON public.skills FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills"
  ON public.skills FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for content_items
CREATE POLICY "Users can view own content"
  ON public.content_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own content"
  ON public.content_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own content"
  ON public.content_items FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content"
  ON public.content_items FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for testimonials
CREATE POLICY "Users can view own testimonials"
  ON public.testimonials FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials"
  ON public.testimonials FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials"
  ON public.testimonials FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for stats
CREATE POLICY "Users can view own stats"
  ON public.stats FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON public.stats FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON public.stats FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stats"
  ON public.stats FOR DELETE
  USING (auth.uid() = user_id);