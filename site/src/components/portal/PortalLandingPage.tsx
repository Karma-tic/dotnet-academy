import React, { useEffect, useRef } from "react";
import { PortalNav } from "./PortalNav";
import { HeroSchematic } from "./HeroSchematic";
import { AntiSlopManifesto } from "./AntiSlopManifesto";
import { PinnedDissection } from "./PinnedDissection";
import { CurriculumTracks } from "./CurriculumTracks";
import { TcpSandbox } from "./TcpSandbox";
import { AdmissionsSection } from "./AdmissionsSection";
import { EngineeringFaq } from "./EngineeringFaq";
import { PortalFooter } from "./PortalFooter";
import { initSmoothScroll } from "../../lib/smooth-scroll";

export interface PortalLandingPageProps {
  onEnterDotNetCourse: () => void;
  onOpenLegal: (page: "privacy" | "terms" | "contact") => void;
}

export const PortalLandingPage: React.FC<PortalLandingPageProps> = ({
  onEnterDotNetCourse,
  onOpenLegal,
}) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const scrollInstance = initSmoothScroll();
    lenisRef.current = scrollInstance.lenis;

    return () => {
      scrollInstance.destroy();
    };
  }, []);

  const handleNavigateSection = (sectionId: string) => {
    if (sectionId === "top") {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetEl = document.getElementById(sectionId);
    if (targetEl) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetEl, { offset: -64 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] selection:bg-[var(--accent-signal)] selection:text-[var(--bg-base)] font-sans antialiased">
      {/* Fixed Glass Navigation Header */}
      <PortalNav
        onNavigateSection={handleNavigateSection}
        onEnterDotNetCourse={onEnterDotNetCourse}
      />

      {/* Main Structural Flow */}
      <main id="top" className="relative z-10">
        <HeroSchematic
          onExploreClick={() => handleNavigateSection("tracks")}
          onEnterFlagshipClick={onEnterDotNetCourse}
        />

        <AntiSlopManifesto />

        <div id="dissection">
          <PinnedDissection />
        </div>

        <div id="tracks">
          <CurriculumTracks onEnterDotNetCourse={onEnterDotNetCourse} />
        </div>

        <div id="sandbox">
          <TcpSandbox />
        </div>

        <div id="admissions">
          <AdmissionsSection />
        </div>

        <div id="faq">
          <EngineeringFaq />
        </div>
      </main>

      {/* Dark Technical Obsidian Footer with Live Bangalore Clock */}
      <PortalFooter
        onEnterDotNetCourse={onEnterDotNetCourse}
        onNavigateSection={handleNavigateSection}
        onOpenLegal={onOpenLegal}
      />
    </div>
  );
};
