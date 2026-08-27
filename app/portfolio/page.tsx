import Navigation from "@/components/Navigation";
import OracleLayout from "@/components/oracle/OracleLayout";
import Footer from "@/components/Footer";

export default function PortfolioPage() {
  return (
    <>
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-8%] top-[6%] h-[44rem] w-[44rem] rounded-full bg-accent/[0.08] blur-[130px]" />
        <div className="absolute right-[22%] bottom-[-10%] h-[36rem] w-[36rem] rounded-full bg-steel/[0.06] blur-[130px]" />
      </div>
      <Navigation />
      <main className="relative z-10"><OracleLayout /></main>
      <div className="relative z-10 lg:ml-[47vw] xl:ml-[43vw]"><Footer /></div>
    </>
  );
}
