import { useState } from "react";
import "./AdminDropdown.css";

type AdminDropdownProps = {
    open: boolean;
    onToggle: () => void;
};

function AdminDropdown({ open, onToggle }: AdminDropdownProps) {
    const [infoMessage, setInfoMessage] = useState<{ message: string, type: "info" } | null>(null);

    // Handle admin options (Profile, Settings, Logout)
    // Currently shows an info message
    function handleInfo() {
        onToggle();
        document.body.style.overflow = "auto";
        const main = document.querySelector("main")!;
        const footer = document.querySelector("footer")!;
        main.style.pointerEvents = "auto";
        main.style.opacity = "1";
        footer.style.pointerEvents = "auto";
        footer.style.opacity = "1";
        setInfoMessage({
            message: `Attualmente questa sezione è presente solo a scopo dimostrativo. 
            Grazie per avere utilizzato il progetto`, type: "info"
        });
    }

    return (
        <>
            <div id="adminWrapper">
                <button onClick={onToggle} id="adminButton" aria-expanded={open} aria-controls="adminMenu">
                    {/* User icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                        <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 
                        320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 
                        368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 
                        576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                    </svg>
                    {/* Dropdown arrow icon */}
                    <svg viewBox="0 0 200 200" className={`${open ? 'rotate180' : ''}`}>
                        <polyline
                            points="15,110 100,180 185,110"
                            fill="none"
                            strokeWidth="30" />
                    </svg>
                </button>

                <ul id="adminMenu" className={`adminSettingsUl ${open ? 'fadeDownAdmin' : ''}`}>
                    <li>
                        <button type="button" onClick={handleInfo}>Profilo</button>
                    </li>

                    <li>
                        <button type="button" onClick={handleInfo}>Supporto</button>
                    </li>

                    <li>
                        <button type="button" onClick={handleInfo}>Logout</button>
                    </li>
                </ul>
            </div>
            {infoMessage && (
                <div className="confirmMessageCont info">
                    <button id="closeInfoBtn" aria-label="Close popup" onClick={() => setInfoMessage(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                            <path d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 
                            93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 
                            114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 
                            139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 
                            546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 
                            320L504.6 148.5z" />
                        </svg>
                    </button>
                    <p>{infoMessage.message.split(".")[0]}.</p>
                    <p>{infoMessage.message.split(".")[1]} <strong><em style={{ color: "var(--secondaryRed)" }}>HealthDash!</em></strong></p>
                </div>
            )}
        </>
    );
}

export default AdminDropdown;