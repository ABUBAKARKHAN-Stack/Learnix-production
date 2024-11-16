import LandingFooter from "../Components/LandingFooter";
import LandingHeader from "../Components/LandingHeader";
import LandingMain from "../Components/LandingMain";

function LandingPage() {


  return (
    <div className="bg-[#FBF8F6] h-screen ">
      <LandingHeader/>
      <LandingMain />
      <LandingFooter/>
    </div>
  )
}

export default LandingPage;
