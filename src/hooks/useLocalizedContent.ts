import { useLanguage } from "@/components/LanguageProvider";

/**
 * Hook to handle bilingual database content
 * Automatically selects the appropriate language field based on current language
 */
export function useLocalizedContent() {
  const { language } = useLanguage();
  
  /**
   * Get localized value from a database object with _en and _ar fields
   * @param item - Database object containing bilingual fields
   * @param field - Base field name (without _en or _ar suffix)
   * @returns Localized string value
   */
  const localize = <T extends Record<string, any>>(
    item: T | null | undefined,
    field: string
  ): string => {
    if (!item) return '';
    
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    const value = language === 'ar' ? item[arField] : item[enField];
    return value || item[enField] || ''; // Fallback to English if Arabic is missing
  };

  /**
   * Get localized array from a database object with _en and _ar array fields
   * @param item - Database object containing bilingual array fields
   * @param field - Base field name (without _en or _ar suffix)
   * @returns Localized array
   */
  const localizeArray = <T extends Record<string, any>>(
    item: T | null | undefined,
    field: string
  ): string[] => {
    if (!item) return [];
    
    const enField = `${field}_en`;
    const arField = `${field}_ar`;
    
    const value = language === 'ar' ? item[arField] : item[enField];
    return Array.isArray(value) ? value : (Array.isArray(item[enField]) ? item[enField] : []);
  };

  return { localize, localizeArray };
}
