import { Button } from "@/components/ui/button";
import { useLanguage } from "./LanguageProvider";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="h-9 w-9 rounded-xl hover:bg-accent/10 transition-colors"
      title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
    >
      <Globe className="h-5 w-5" />
    </Button>
  );
}