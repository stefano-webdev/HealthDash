import AdminDropdown from "../AdminDropdown/AdminDropdown.tsx";
import LogoComponent from "../Logo/LogoComponent.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import "./Header.css"

function Header() {
    return (
        <div id="headerContainer">
            <Sidebar />
            <LogoComponent />
            <AdminDropdown />
        </div>
    );
}

export default Header;