-- Enable public read access to all portfolio tables
-- This allows the homepage to display portfolio data without authentication

-- Portfolio Config
CREATE POLICY "Public can view portfolio config"
ON portfolio_config FOR SELECT
USING (true);

-- Projects
CREATE POLICY "Public can view projects"
ON projects FOR SELECT
USING (true);

-- Services
CREATE POLICY "Public can view services"
ON services FOR SELECT
USING (true);

-- Skills
CREATE POLICY "Public can view skills"
ON skills FOR SELECT
USING (true);

-- Content Items
CREATE POLICY "Public can view content"
ON content_items FOR SELECT
USING (true);

-- Testimonials
CREATE POLICY "Public can view testimonials"
ON testimonials FOR SELECT
USING (true);

-- Stats
CREATE POLICY "Public can view stats"
ON stats FOR SELECT
USING (true);

-- Add new fields to portfolio_config for editable about section content
ALTER TABLE portfolio_config 
ADD COLUMN IF NOT EXISTS global_perspective_title_en TEXT DEFAULT 'Global Perspective',
ADD COLUMN IF NOT EXISTS global_perspective_title_ar TEXT DEFAULT 'منظور عالمي',
ADD COLUMN IF NOT EXISTS global_perspective_desc_en TEXT DEFAULT 'Working with international teams and understanding diverse markets to create solutions that resonate globally.',
ADD COLUMN IF NOT EXISTS global_perspective_desc_ar TEXT DEFAULT 'العمل مع فرق دولية وفهم الأسواق المتنوعة لإنشاء حلول تلقى صدى عالمياً.',
ADD COLUMN IF NOT EXISTS career_evolution_title_en TEXT DEFAULT 'Career Evolution',
ADD COLUMN IF NOT EXISTS career_evolution_title_ar TEXT DEFAULT 'تطور المسيرة المهنية',
ADD COLUMN IF NOT EXISTS career_evolution_desc_en TEXT DEFAULT 'Continuous growth through learning, adapting to new technologies, and embracing challenges that drive innovation.',
ADD COLUMN IF NOT EXISTS career_evolution_desc_ar TEXT DEFAULT 'النمو المستمر من خلال التعلم والتكيف مع التقنيات الجديدة واحتضان التحديات التي تدفع الابتكار.',
ADD COLUMN IF NOT EXISTS cooperative_approach_title_en TEXT DEFAULT 'Cooperative Approach',
ADD COLUMN IF NOT EXISTS cooperative_approach_title_ar TEXT DEFAULT 'نهج تعاوني',
ADD COLUMN IF NOT EXISTS cooperative_approach_desc_en TEXT DEFAULT 'Building strong partnerships through open communication, shared goals, and mutual respect in every project.',
ADD COLUMN IF NOT EXISTS cooperative_approach_desc_ar TEXT DEFAULT 'بناء شراكات قوية من خلال التواصل المفتوح والأهداف المشتركة والاحترام المتبادل في كل مشروع.',
ADD COLUMN IF NOT EXISTS work_section_bg_url TEXT DEFAULT '/src/assets/project-showcase.jpg';