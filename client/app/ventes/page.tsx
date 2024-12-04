import Footer_light from "@/components/Footer_light";
import HeroInfos from "@/components/HeroInfos";
import HeroVentes from "@/components/HeroVentes";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { Ventes } from "@/components/Ventes";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <HeroVentes/>
        <Ventes/>
        <Footer_light/>
      </div>
    </main>
  );
}