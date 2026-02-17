import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";

export default async function Home() {
  return (
    <div className="flex text-[#b92c7e] justify-center items-center text-lg mt-6">
      Select a device to get started...
    </div>
  );
}
