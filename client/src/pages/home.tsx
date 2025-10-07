import { useEffect } from "react";
import Frame1Pulse from "@/components/frames/Frame1Pulse";
import Frame2Message from "@/components/frames/Frame2Message";
import Frame3Help from "@/components/frames/Frame3Help";
import Frame4Miles from "@/components/frames/Frame4Miles";
import Frame5Heart from "@/components/frames/Frame5Heart";
import Frame6Closing from "@/components/frames/Frame6Closing";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollHint from "@/components/ScrollHint";

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <ScrollProgress />
      <ScrollHint />
      <main className="relative">
        <Frame1Pulse />
        <Frame2Message />
        <Frame3Help />
        <Frame4Miles />
        <Frame5Heart />
        <Frame6Closing />
      </main>
    </div>
  );
}
