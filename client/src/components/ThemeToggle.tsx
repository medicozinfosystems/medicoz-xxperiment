import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "ocean" | "sunset" | "forest";

const themes: Theme[] = ["light", "dark", "ocean", "sunset", "forest"];
const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  ocean: "Ocean",
  sunset: "Sunset",
  forest: "Forest"
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    document.documentElement.classList.remove("dark", "theme-ocean", "theme-sunset", "theme-forest");
    
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "ocean") {
      document.documentElement.classList.add("theme-ocean");
    } else if (newTheme === "sunset") {
      document.documentElement.classList.add("theme-sunset");
    } else if (newTheme === "forest") {
      document.documentElement.classList.add("theme-forest");
    }
  };

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="default"
      onClick={cycleTheme}
      data-testid="button-theme-toggle"
      className="gap-2"
    >
      <Palette className="h-4 w-4" />
      <span className="font-medium">{themeLabels[theme]}</span>
    </Button>
  );
}
