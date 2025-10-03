import { useState, useEffect } from "react";
import AdminDropdown from "../AdminDropdown/AdminDropdown.tsx";
import LogoComponent from "../Logo/LogoComponent.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import "./Header.css"

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [adminOpen, setAdminOpen] = useState(false);

    useEffect(() => {
        // Manipulating DOM directly, normally React state would handle similar tasks
        document.body.classList.toggle("noInteraction", sidebarOpen || adminOpen);
        document.querySelector("main")?.classList.toggle("noInteraction", sidebarOpen || adminOpen);
        document.querySelector("footer")?.classList.toggle("noInteraction", sidebarOpen || adminOpen);
    }, [sidebarOpen, adminOpen]);

    function handleSidebarClick(): void {
        setSidebarOpen(prev => !prev);
    }

    function handleAdminClick(): void {
        setAdminOpen(prev => !prev);
    }

    return (
        <header>
            <div id="headerContainer" className="smoothSettingsSelectors">
                <Sidebar open={sidebarOpen} onToggle={handleSidebarClick} changeRoute={setSidebarOpen} />
                <LogoComponent />
                <AdminDropdown open={adminOpen} onToggle={handleAdminClick} setAdminOpen={setAdminOpen} />
            </div>
        </header>
    );
}

export default Header;