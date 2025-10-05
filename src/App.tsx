import "./styles/global.css";
import "./styles/responsive.css";
import { useEffect } from "react";
import type { hospitalShape } from "./components/Home/PatientsToday.tsx";
import Header from "./components/App/Header/Header/Header.tsx";
import HealthDashLogo from "./components/App/HeatlhDashLogo/HealthDashLogo.tsx";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/App/ScrollToTop.tsx";
import Footer from "./components/App/Footer/Footer.tsx";

function App() {
  useEffect(() => {
    function handleLoad() {
      document.body.classList.remove("preload");
      document.body.classList.add("smoothSettingsSelectors");
    }
    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  const unknownData: string | null = localStorage.getItem("hospitalData");
  const savedData: hospitalShape = unknownData ? JSON.parse(unknownData) : {};

  // Load the saved theme or set the default theme to light
  if (savedData.settings?.theme) {
    document.documentElement.classList.add(savedData.settings.theme);
  } else {
    document.documentElement.classList.add("light");
    localStorage.setItem("hospitalData", JSON.stringify({
      ...savedData,
      settings: {
        ...savedData.settings,
        theme: "light"
      }
    }));
  }

  // Load the saved border radius or set the default border radius to medium
  if (savedData.settings?.borderRadius) {
    document.documentElement.classList.add(savedData.settings.borderRadius);
  } else {
    document.documentElement.classList.add("brMedium");
    localStorage.setItem("hospitalData", JSON.stringify({
      ...savedData,
      settings: {
        ...savedData.settings,
        borderRadius: "brMedium"
      }
    }));
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <a id="backPortfolio" href="https://stefanodev.it/">Torna al portfolio</a>
        <HealthDashLogo />
        <div id="mainContainer">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;