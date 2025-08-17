import Header from "./components/App/Header/Header/Header.tsx";
import HealthDashLogo from "./components/App/HeatlhDashLogo/HealthDashLogo.tsx";
import { Outlet } from "react-router-dom";
import Footer from "./components/App/Footer/Footer.tsx";

function App() {
  return (
    <>
      <Header />
      <main>
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
