import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Layers,
  Code,
  Image,
  BarChart3,
  Star,
  Languages,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/admin", exact: true },
  { title: "Config", icon: Settings, href: "/admin/config" },
  { title: "Projects", icon: Briefcase, href: "/admin/projects" },
  { title: "Services", icon: Layers, href: "/admin/services" },
  { title: "Skills", icon: Code, href: "/admin/skills" },
  { title: "Content", icon: Image, href: "/admin/content" },
  { title: "Stats", icon: BarChart3, href: "/admin/stats" },
  { title: "Testimonials", icon: Star, href: "/admin/testimonials" },
  { title: "Translations", icon: Languages, href: "/admin/translations" },
];

export function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/admin/login");
  };

  const isActive = (href: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === href;
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="w-64 border-e border-border bg-card/50 backdrop-blur-sm flex flex-col fixed top-0 start-0 h-screen z-40">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-border">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
          <span className="font-bold text-lg">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-accent/10",
                active && "bg-accent/20 text-accent font-medium"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start"
          asChild
        >
          <Link to="/">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            View Site
          </Link>
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
