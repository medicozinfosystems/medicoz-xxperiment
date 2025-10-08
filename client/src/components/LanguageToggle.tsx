import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/TranslationContext";

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);
  };

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggleLanguage}
      data-testid="button-language-toggle"
      className="gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === "en" ? "हिन्दी" : "English"}</span>
    </Button>
  );
}
