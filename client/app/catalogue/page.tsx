import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";
import { ExpandableCard } from "../../components/ExpandableCard";
import HeroCatalogue from "@/components/HeroCatalogue";
import Footer_light from "@/components/Footer_light";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <HeroCatalogue/>
        <ExpandableCard/>
      </div>
      <Footer_light/>
    </main>
  );
}