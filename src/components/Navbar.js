"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { PiDeviceMobileSpeakerLight } from "react-icons/pi";
import { CiLaptop } from "react-icons/ci";
import { apiContext } from "@/context/apiContext";
import { useParams } from "next/navigation";
function Navbar() {
  const [theme, setTheme] = useState("dark");
  const params = useParams();
  const router = useRouter();
  const { fetchData, setData } = useContext(apiContext);
  async function viewHandler() {
    router.push(params.device === "mobile" ? "/laptop" : "/mobile");
  }

  function themeHandler() {
    const newTheme=theme==="dark" ? "light" : "dark";
    setTheme(newTheme);
    document.cookie = `theme=${newTheme};path=/`;
    router.refresh();
  }

  useEffect(() => {
    document.cookie = `theme=${theme};path=/`;
  },[]);

  useEffect(() => {
    setData([]);
    fetchData();
  }, [params.device]);

  return (
    <div className="w-10/12 relative mx-auto flex justify-center ">
      <motion.div
  key={theme}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <Image
    src={theme === "light" ? "/logo/R-img.jpg" : "/logo/R-logo2.png"}
    width={100}
    height={100}
    alt="logo"
  />
</motion.div>
      <div className="flex w-[5rem] mt-[1rem]  absolute right-[2rem] justify-between">
        {theme === "dark" ? (
          <FaMoon
            size={23}
            onClick={() => themeHandler()}
            className="mt-[0.3rem] text-[white]"
          />
        ) : (
          <MdSunny
            size={23}
            onClick={() => themeHandler()}
            className="mt-[0.3rem] text-[black]"
          />
        )}
        {params.device === "laptop" ? (
          <PiDeviceMobileSpeakerLight
            onClick={() => viewHandler()}
            size={30}
            className={`${theme === "light" ? "text-[black]" : "text-[white]"}`}
          />
        ) : (
          <CiLaptop
            onClick={() => viewHandler()}
            size={33}
            className={`${theme === "light" ? "text-[black]" : "text-[white]"}`}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
