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
        document.body.style.overflow = sidebarOpen || adminOpen ? "hidden" : "auto";
        const main = document.querySelector("main")!;
        const footer = document.querySelector("footer")!;
        main.style.pointerEvents = sidebarOpen || adminOpen ? "none" : "auto";
        main.style.opacity = sidebarOpen || adminOpen ? "0.2" : "1";
        footer.style.pointerEvents = sidebarOpen || adminOpen ? "none" : "auto";
        footer.style.opacity = sidebarOpen || adminOpen ? "0.2" : "1";

        // Add cleanup function for better control
        return () => {
            document.body.style.overflow = "auto";
            main.style.pointerEvents = "auto";
            main.style.opacity = "1";
            footer.style.pointerEvents = "auto";
            footer.style.opacity = "1";
        };
    }, [sidebarOpen, adminOpen]);

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
            <div id="headerContainer" className="smoothSettingsSelectors">
                <Sidebar open={sidebarOpen} onToggle={handleSidebarClick} changeRoute={setSidebarOpen} />
                <LogoComponent />
                <AdminDropdown open={adminOpen} onToggle={handleAdminClick} />
            </div>
        </header>
    );
}

export default Header;