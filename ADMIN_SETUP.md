# Admin Panel Setup Guide

## Overview

This portfolio now includes a full-featured admin panel where authenticated admins can manage all website content including bilingual translations (English & Arabic).

## Admin Access Setup

### 1. Create an Admin User

First, sign up for an account through the normal authentication flow. Then, grant admin access by running this SQL in your Supabase database:

```sql
-- Replace 'YOUR_USER_EMAIL@example.com' with the actual email
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'YOUR_USER_EMAIL@example.com';
```

Or if you have the user UUID:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-uuid-here', 'admin'::app_role);
```

### 2. Login to Admin Panel

Visit `/admin/login` and login with your credentials. After successful authentication, you'll be redirected to the admin dashboard if you have admin role.

## Admin Panel Features

### 📂 Projects Management (`/admin/projects`)
- Create, edit, and delete portfolio projects
- Manage project details: title, description, role, tech stack
- Set project URLs and thumbnails
- Control display order
- Mark projects as "Coming Soon"

### 🌐 Translations Management (`/admin/translations`)
- Edit English translations (`en.json`)
- Edit Arabic translations (`ar.json`)
- Live JSON editor with syntax validation
- Separate tabs for each language

**Note**: Currently the translation editor shows the JSON but requires manual file updates. To enable automatic saving, you would need to implement a backend endpoint that can write to `/public/locales/` files.

### 🚀 Coming Soon Features
The following admin pages are ready to be implemented (routes exist but need UI):
- `/admin/services` - Manage service offerings
- `/admin/skills` - Manage technical skills
- `/admin/stats` - Manage hero statistics
- `/admin/content` - Manage content items
- `/admin/testimonials` - Manage client testimonials
- `/admin/config` - Edit portfolio configuration

## Translation System

### File Structure

```
public/
  └── locales/
      ├── en.json  # English translations
      └── ar.json  # Arabic translations
```

### Using Translations in Components

```typescript
import { useLanguage } from "@/components/LanguageProvider";

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('hero.title1')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### Translation Keys Structure

Translations use dot notation to access nested values:

```json
{
  "hero": {
    "title1": "Full-Stack",
    "subtitle": "Creating amazing web applications"
  }
}
```

Access with: `t('hero.title1')` or `t('hero.subtitle')`

## Security Features

✅ **Role-Based Access Control**
- Separate `user_roles` table for managing permissions
- Server-side validation using `has_role()` security definer function
- Prevents privilege escalation attacks

✅ **Row Level Security**
- All admin policies use the `has_role()` function
- Database enforces permissions at the data layer
- No client-side role checking vulnerabilities

✅ **Authentication Required**
- All admin routes check for valid session
- Automatic redirect to login if not authenticated
- Session verification on page load

## Database Schema

### Tables with Admin Access

All these tables have RLS policies allowing admins full CRUD access:

- `projects` - Portfolio projects
- `services` - Service offerings  
- `skills` - Technical skills
- `stats` - Statistics/metrics
- `content_items` - Social media content
- `testimonials` - Client testimonials
- `portfolio_config` - General configuration

### Admin Role Management

```sql
-- Check who has admin access
SELECT u.email, ur.role, ur.created_at
FROM user_roles ur
JOIN auth.users u ON ur.user_id = u.id
WHERE ur.role = 'admin';

-- Remove admin access
DELETE FROM user_roles 
WHERE user_id = 'user-uuid-here' AND role = 'admin';
```

## Multi-Language Support

The site fully supports English (LTR) and Arabic (RTL) with:

- Automatic RTL layout switching
- Language switcher in navigation
- Persistent language preference (localStorage)
- All UI text uses translation keys

## Selling as a Template

To use this as a template for multiple clients:

1. **For each client**, create a separate Supabase project
2. **Grant them admin access** using the SQL command above
3. **They can manage** all content through the admin panel
4. **Translations** - either provide pre-translated content or let them edit the JSON

### Optional: Multi-Tenant Setup

For a true SaaS approach where multiple clients share one database:

1. Add `tenant_id` to all tables
2. Create a tenant management system
3. Modify RLS policies to filter by tenant
4. Update admin panel to show only tenant's data

## Development Notes

- Admin pages do not show in the navigation bar
- Access admin at `/admin` (direct URL navigation)
- Logout returns to `/admin/login`
- "View Site" button in admin returns to homepage
- Translation reloading happens automatically on language switch

## Troubleshooting

**Cannot access admin panel:**
- Verify user has `admin` role in `user_roles` table
- Check browser console for authentication errors
- Ensure user is properly logged in

**Translations not updating:**
- Check browser console for JSON syntax errors
- Verify translation files are valid JSON format
- Reload page after translation changes

**Database errors:**
- Verify all tables have proper RLS policies
- Check that `has_role()` function exists
- Ensure user_roles table has the admin role enum
