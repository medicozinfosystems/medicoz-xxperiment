import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function LanguageToggle() {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "en" | "hi" | null;
    const initialLanguage = savedLanguage || "en";
    setLanguage(initialLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "hi" : "en";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
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
