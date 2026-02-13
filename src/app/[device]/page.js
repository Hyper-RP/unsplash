import LaptopDevice from "@/components/LaptopDevice";
import MobileDevice from "@/components/MobileDevice";

async function Home({ params }) {
  const device = await params;
  console.log(device);
  return <>{device.device === "laptop" ? <LaptopDevice /> : <MobileDevice />}</>;
}

export default Home;
