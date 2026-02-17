"use client"
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

export const themeContext = createContext();

export function ThemeContextProvider({ children,initialTheme }) {
  const [theme, setTheme] = useState(initialTheme);
    const router=useRouter()
  function themeHandler() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.cookie = `theme=${newTheme};path:/`;
    router.refresh()

  }

  const value = {theme, setTheme, themeHandler};

  return <themeContext.Provider value={value} >{children}</themeContext.Provider>;
}
