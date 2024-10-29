import Footer_light from "@/components/Footer_light";
import HeroInfos from "@/components/HeroInfos";
import Infos from "@/components/Infos";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <HeroInfos/>
        <Infos/>
        <Footer_light/>
      </div>
    </main>
  );
}