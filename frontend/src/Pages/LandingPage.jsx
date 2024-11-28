import { useEffect, useState } from "react";
import LandingFooter from "../Components/LandingFooter";
import LandingHeader from "../Components/LandingHeader";
import LandingMain from "../Components/LandingMain";
import { LoadingAnimation } from "../Components/LoadingAnimation";
import ThemeChangerButton from "../Components/ThemeChangerButton";
import { ThemeContextProvider, useTheme } from "../Context/ThemeContext";
function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState('light')


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the animation duration
    }, 4000); // Duration of your loading animation (4 seconds)

    return () => {
      clearTimeout(timer); // Cleanup timer
    };
  }, []);

  useEffect(() => {
    const htmlTag = document.querySelector('html')
    htmlTag.classList.remove('light', 'dark')
    htmlTag.classList.add(themeMode)
  }, [themeMode])

  const lightTheme = () => {
    setThemeMode('light')
  }
  const darkTheme = () => {
    setThemeMode('dark')
  }

  // Render the animation during the loading state
  if (loading) {
    return <LoadingAnimation />;
  }

  // Render the main content after the loading is complete
  return (
    <ThemeContextProvider value={{ defaultTheme: themeMode, lightTheme, darkTheme }} >
      <div className="bg-[#FBF8F6] transition-colors  dark:bg-black h-fit ">
        <LandingHeader />
        <LandingMain />
        <LandingFooter />
      {/* <ThemeChangerButton /> */}
      </div>
    </ThemeContextProvider>

  );
}

export default LandingPage;
