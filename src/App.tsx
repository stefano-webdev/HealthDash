import Header from "./components/App/Header/Header/Header.tsx";
import HealthDashLogo from "./components/App/HeatlhDashLogo/HealthDashLogo.tsx";
import { Outlet } from "react-router-dom";
import "./styles/global.css";
import "./styles/responsive.css";
import Footer from "./components/App/Footer/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <a id="torna_portfolio" href="https://stefanodev.it/">Torna al portfolio</a>
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