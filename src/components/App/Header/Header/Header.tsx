import { useState } from "react";
import AdminDropdown from "../AdminDropdown/AdminDropdown.tsx";
import LogoComponent from "../Logo/LogoComponent.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import "./Header.css"

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    function handleSidebarClick(): void {
        if (adminOpen) {
            setAdminOpen(false);
        }
        setSidebarOpen(prev => !prev);
    }

    function handleAdminClick(): void {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
        setAdminOpen(prev => !prev);
    }

    return (
        <header>
            <div id="headerContainer">
                <Sidebar open={sidebarOpen} onToggle={handleSidebarClick} />
                <LogoComponent />
                <AdminDropdown open={adminOpen} onToggle={handleAdminClick} />
            </div>
        </header>
    );
}

export default Header;