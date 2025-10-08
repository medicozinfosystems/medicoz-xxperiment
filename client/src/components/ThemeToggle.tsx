import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Theme = "ocean" | "dark";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("ocean");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "ocean");

    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove("dark", "theme-ocean", "theme-dark");

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (newTheme === "ocean") {
      // Ocean is the default light theme, no extra class needed
      document.documentElement.classList.add("theme-ocean");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "ocean" ? "dark" : "ocean";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="default"
      onClick={toggleTheme}
      data-testid="button-theme-toggle"
      className="gap-2"
    >
      {theme === "ocean" ? (
        <>
          <Sun className="h-4 w-4" />
          <span className="font-medium">Ocean</span>
        </>
      ) : (
        <>
          <Moon className="h-4 w-4" />
          <span className="font-medium">Dark</span>
        </>
      )}
    </Button>
  );
}
