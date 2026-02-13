"use client";
import Image from "next/image";
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
  const { fetchData,setData} = useContext(apiContext);
  async function viewHandler() {
    router.push(params.device === "mobile" ? "/laptop" : "/mobile");
  }

  function themeHandler() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    document.cookie = `theme=${theme};path=/`;
    router.refresh();
  }
  useEffect(() => {
    setData([])
    fetchData();
  }, [params.device]);

  return (
    <div className="w-10/12 relative mx-auto flex justify-center ">
      <Image
        className="transition-colors duration-1000 ease-in-out"
        src={`${theme === "dark" ? "/logo/R-img.jpg" : "/logo/R-logo2.png"}`}
        width={100}
        height={100}
        alt="not found"
      ></Image>
      <div className="flex w-[5rem] mt-[1rem]  absolute right-[2rem] justify-between">
        {theme === "dark" ? (
          <FaMoon
            size={23}
            onClick={() => themeHandler()}
            className="mt-[0.3rem] text-[black]"
          />
        ) : (
          <MdSunny
            size={23}
            onClick={() => themeHandler()}
            className="mt-[0.3rem] text-[white]"
          />
        )}
        {params.device === "laptop" ? (
          <PiDeviceMobileSpeakerLight
            onClick={() => viewHandler()}
            size={30}
            className={`${theme === "dark" ? "text-[black]" : "text-[white]"}`}
          />
        ) : (
          <CiLaptop
            onClick={() => viewHandler()}
            size={33}
            className={`${theme === "dark" ? "text-[black]" : "text-[white]"}`}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
