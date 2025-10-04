import { useState, useEffect } from "react";
import UserDropdown from "../UserDropdown/UserDropdown.tsx";
import LogoComponent from "../Logo/LogoComponent.tsx";
import Sidebar from "../Sidebar/Sidebar.tsx";
import "./Header.css"

function Header() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);

    useEffect(() => {
        // Manipulating DOM directly, normally React state would handle similar tasks
        document.body.classList.toggle("noInteraction", sidebarOpen || userOpen);
        document.querySelector("main")?.classList.toggle("noInteraction", sidebarOpen || userOpen);
        document.querySelector("footer")?.classList.toggle("noInteraction", sidebarOpen || userOpen);
    }, [sidebarOpen, userOpen]);

    function handleSidebarClick(): void {
        setSidebarOpen(prev => !prev);
    }

    function handleUserClick(): void {
        setUserOpen(prev => !prev);
    }

    return (
        <header>
            <div id="headerContainer" className="smoothSettingsSelectors">
                <Sidebar open={sidebarOpen} onToggle={handleSidebarClick} changeRoute={setSidebarOpen} />
                <LogoComponent />
                <UserDropdown open={userOpen} onToggle={handleUserClick} setUserOpen={setUserOpen} />
            </div>
        </header>
    );
}

export default Header;