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
