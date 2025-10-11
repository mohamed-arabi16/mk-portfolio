-- Function to set up default portfolio for new users
CREATE OR REPLACE FUNCTION public.setup_new_user_portfolio()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user'::app_role);

  -- Insert default portfolio config
  INSERT INTO public.portfolio_config (
    user_id,
    name,
    username,
    email,
    location,
    bio_en,
    bio_ar,
    hero_title_1_en,
    hero_title_1_ar,
    hero_title_2_en,
    hero_title_2_ar,
    hero_subtitle_en,
    hero_subtitle_ar
  ) VALUES (
    NEW.id,
    'Your Name',
    LOWER(SPLIT_PART(NEW.email, '@', 1)),
    NEW.email,
    'Your Location',
    'Write your bio here in English. Tell your story, your journey, and what drives you.',
    'اكتب سيرتك الذاتية هنا بالعربية. احكِ قصتك ورحلتك وما يحفزك.',
    'Your Title',
    'عنوانك',
    '&',
    'و',
    'Your subtitle here - describe what you do',
    'العنوان الفرعي هنا - صف ما تفعله'
  );

  -- Insert default stats
  INSERT INTO public.stats (user_id, stat_key, value, label_en, label_ar, display_order) VALUES
    (NEW.id, 'projects', '0', 'Projects Completed', 'مشروع مكتمل', 0),
    (NEW.id, 'clients', '0', 'Happy Clients', 'عميل سعيد', 1),
    (NEW.id, 'experience', '0', 'Years Experience', 'سنوات الخبرة', 2);

  -- Insert default skills
  INSERT INTO public.skills (user_id, category, name, display_order) VALUES
    (NEW.id, 'Technical', 'React', 0),
    (NEW.id, 'Technical', 'TypeScript', 1),
    (NEW.id, 'Technical', 'Node.js', 2),
    (NEW.id, 'Creative', 'UI/UX Design', 0),
    (NEW.id, 'Creative', 'Content Creation', 1),
    (NEW.id, 'Languages', 'English', 0);

  RETURN NEW;
END;
$$;

-- Trigger to automatically set up portfolio for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.setup_new_user_portfolio();
