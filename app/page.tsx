import Navigation from "@/components/Navigation";
import OracleLayout from "@/components/oracle/OracleLayout";
import Footer from "@/components/Footer";

/**
 * Single-page composition. The Oracle (fixed nun scene) is the permanent
 * backdrop; the story scrolls to her right on desktop and over her on mobile.
 */
export default function Home() {
  return (
    <>
      {/* Aurora backdrop — soft colour pools the frosted glass refracts.
          Fixed and decorative; sits behind all content. */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute right-[-8%] top-[6%] h-[44rem] w-[44rem] rounded-full bg-accent/[0.08] blur-[130px]" />
        <div className="absolute right-[22%] bottom-[-10%] h-[36rem] w-[36rem] rounded-full bg-steel/[0.06] blur-[130px]" />
        <div className="absolute left-[38%] top-[42%] h-[30rem] w-[30rem] rounded-full bg-accent/[0.05] blur-[140px]" />
      </div>

      <Navigation />

      <main className="relative z-10">
        <OracleLayout />
      </main>

      {/* Footer sits to the right of the fixed Oracle on desktop, full-width on mobile */}
      <div className="relative z-10 lg:ml-[47vw] xl:ml-[43vw]">
        <Footer />
      </div>
    </>
  );
}
