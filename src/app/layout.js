import Navbar from "@/components/Navbar";
import "./globals.css";
import { cookies } from "next/headers";
import { ApiContextProvider } from "@/context/apiContext";
import TabsSection from "@/components/TabsSection";
import { ThemeContextProvider } from "@/context/themeContext";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "light";
  console.log("theme in server side : ",theme)
  return (
    <html lang="en">
      <body className={`w-full  h-full `}>
        <ApiContextProvider>
          <ThemeContextProvider initialTheme={theme}>
            <div
              className={`min-h-screen transition-colors duration-1000 ease-in-out ${theme === "light" ? "bg-[#ffffffd8]" : "bg-[#0c0b0bfb]"}`}
            >
              <Navbar />
              <TabsSection />
              {children}
            </div>
          </ThemeContextProvider>
        </ApiContextProvider>
      </body>
    </html>
  );
}
