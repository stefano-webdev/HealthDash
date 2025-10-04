import { useState, useEffect } from "react";
import "./UserDropdown.css";

type UserDropdownProps = {
    open: boolean;
    onToggle: () => void;
    setUserOpen: (open: boolean) => void;
};

function UserDropdown({ open, onToggle, setUserOpen }: UserDropdownProps) {
    const [infoMessage, setInfoMessage] = useState<{ message: string, type: "info" } | null>(null);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // Clicking outside of the filters dropdown closes it
    function handleClickOutside(e: MouseEvent) {
        if (!(e.target as HTMLElement).closest('#userButton')) {
            setUserOpen(false);
        }
    }

    // Focus out closes the dropdown if focus is outside of it
    function handleKeyOutside(e: React.FocusEvent<HTMLUListElement>) {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            setUserOpen(false);
        }
    }

    // Handle user options (Profile, Settings, Logout)
    // Currently shows an info message
    function handleInfo() {
        onToggle();
        setInfoMessage({
            message: `Attualmente questa sezione è presente solo a scopo dimostrativo. 
            Grazie per avere utilizzato il progetto`, type: "info"
        });
    }

    return (
        <>
            <div id="userWrapper">
                <button onClick={onToggle} id="userButton" aria-expanded={open} aria-controls="userMenu">
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

                <ul id="userMenu" className={`userSettingsUl ${open ? 'fadeDownUser' : ''}`} onBlur={handleKeyOutside}>
                    <li>
                        <button type="button" onClick={handleInfo} tabIndex={open ? 0 : -1}>Profilo</button>
                    </li>

                    <li>
                        <button type="button" onClick={handleInfo} tabIndex={open ? 0 : -1}>Supporto</button>
                    </li>

                    <li>
                        <button type="button" onClick={handleInfo} tabIndex={open ? 0 : -1}>Logout</button>
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

export default UserDropdown;