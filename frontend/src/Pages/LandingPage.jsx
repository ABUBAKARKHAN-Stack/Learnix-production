import { useEffect, useState } from "react";
import LandingFooter from "../Components/LandingFooter";
import LandingHeader from "../Components/LandingHeader";
import LandingMain from "../Components/LandingMain";
import { LoadingAnimation } from "../Components/LoadingAnimation";

function LandingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the animation duration
    }, 4000); // Duration of your loading animation (4 seconds)

    return () => {
      clearTimeout(timer); // Cleanup timer
    };
  }, []);

  // Render the animation during the loading state
  if (loading) {
    return <LoadingAnimation />;
  }

  // Render the main content after the loading is complete
  return (
    <div className="bg-[#FBF8F6] h-screen ">
      <LandingHeader />
      <LandingMain />
      <LandingFooter />
    </div>
  );
}

export default LandingPage;
